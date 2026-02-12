import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import SeoHead from "@/components/seo/SeoHead";
import { useRouter } from "next/router";
import { getCachedData, setCachedData } from "@/lib/cache";
import { handleRateLimit } from "@/lib/rateLimit";

/** Define Types for Coin */
type Coin = {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number | null;
};

/** Define HomePage Props */
type HomePageProps = {
  coins: Coin[];
  rateLimit?: {
    isRateLimited: boolean;
    retryAfter: number;
  };
};

/** Default HomePage Function */
const HomePage = ({ coins, rateLimit }: HomePageProps) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const [secondsLeft, setSecondsLeft] = useState(
    rateLimit?.retryAfter ?? 0
  );

  useEffect(() => {
    if (rateLimit?.retryAfter) {
      setSecondsLeft(rateLimit.retryAfter);
    }
  }, [rateLimit]);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsNavigating(true);
    const handleComplete = () => setIsNavigating(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const filteredCoins = coins.filter((coins) => {
    return coins.name.toLowerCase().includes(search.toLowerCase())
  });

  return (
    <>
      <SeoHead
        title="Top 50 Cryptocurrency Prices Today | CryptoScale"
        description="Live cryptocurrency prices, market cap data, and 24h changes for the top 50 coins. Updated server-side for SEO accuracy."
      />

      <main className="min-h-screen bg-background">

        {rateLimit?.isRateLimited && secondsLeft > 0 && (
          <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600">
            API rate limit reached. Please wait {secondsLeft}s...
          </div>
        )}

        <div className="container py-8">

          {isNavigating && (
            <div className="mb-4 text-xs text-muted">
              Loading...
            </div>
          )}

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Top Cryptocurrencies
            </h1>
            <p className="mt-1 text-sm text-muted">
              Server-side rendered market overview
            </p>
          </div>

          {/* Search */}
          <div className="mb-6 flex justify-end">
            <div className="w-full sm:max-w-sm">
              <input
                type="text"
                placeholder="Search coin..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Table Wrapper */}
          <div className="overflow-x-auto rounded-lg border border-border bg-white">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-card text-muted">
                <tr>
                  <th className="hidden sm:table-cell px-4 py-3 text-left font-medium">#</th>
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Symbol</th>
                  <th className="px-4 py-3 text-left font-medium">Price</th>
                  <th className="px-4 py-3 text-left font-medium">24h%</th>
                </tr>
              </thead>

              <tbody>
                {filteredCoins.map((coin, index) => (
                  <tr
                    key={coin.id}
                    className="border-t border-border hover:bg-gray-50 hover:cursor-pointer"
 /** Button */ onClick={() => router.push(`/coin/${coin.id}`)}

                  >
                    <td className="hidden sm:table-cell px-4 py-3 text-muted">
                      {index + 1}
                    </td>

                    <td className="px-4 py-3 font-medium">
                      <div className="max-w-40 truncate sm:max-w-none">
                        {coin.name}
                      </div>
                      <span className="uppercase text-xs text-muted">
                        {coin.symbol}
                      </span>
                    </td>


                    <td className="px-4 py-3 uppercase text-muted">
                      {coin.symbol}
                    </td>

                    <td className="px-4 py-3">
                      ${coin.current_price ? coin.current_price.toLocaleString() : "—"}                  </td>

                    <td className={
                      `px-4 py-3 font-medium ${coin.price_change_percentage_24h !== null &&
                        coin.price_change_percentage_24h >= 0
                        ? "text-green-600"
                        : "text-red-600"
                      } `
                    }>
                      {coin.price_change_percentage_24h !== null
                        ? `${coin.price_change_percentage_24h.toFixed(2)}%`
                        : "—"}
                    </td>

                  </tr>
                ))}
                {filteredCoins.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-sm text-muted"
                    >
                      No coins found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </main>

    </>
  );
};


/** API fetch and return response converted using json() method */
export const getServerSideProps: GetServerSideProps = async (context) => {



  /** Cache function */
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=120"
  )

  const CACHE_DURATION = 60 * 1000;
  const cacheKey = "top-50-coins";

  const cached = getCachedData(cacheKey, CACHE_DURATION);
  if (cached) {
    return { props: { coins: cached } };
  }

  try {
    /** Fetching data */
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets" +
      "?vs_currency=usd" +
      "&order=market_cap_desc" +
      "&per_page=50" +
      "&page=1" +
      "&sparkline=false")

    if (!res.ok) {
      const rateLimit = handleRateLimit(res.status);

      if (rateLimit.isRateLimited) {
        return {
          props: {
            coins: [],
            rateLimit: rateLimit,
          },
        };
      }

      return { props: { coins: [] } };
      }

    /** Converting raw data in json friendly */
    const data = await res.json();

    /** API Failure */
    if (!Array.isArray(data)) {
      console.error("Unexpected API response structure:", data);
      return { props: { coins: [] } };
    }

    const shapedData = data.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      current_price: coin.current_price,
      price_change_percentage_24h: coin.price_change_percentage_24h,
    }));
    


    setCachedData(cacheKey, shapedData);

    return {
      props: {
        coins: shapedData,
      },
    };

  }
  catch (error) {
    console.error("Failed to fetch CoinGecko data:", error);
    return { props: { coins: [] } };
  }
};

export default HomePage;
