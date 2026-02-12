import { GetServerSideProps } from "next";
import CoinSeoHead from "@/components/seo/CoinSeoHead";
import CoinDetails from "./CoinDetails";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getCachedData, setCachedData } from "@/lib/cache";

/** Define Coin Detail Type */

type CoinDetail = {
  id: string;
  name: string;
  symbol: string;
  current_price: number | null;
  description: string;
  market_cap: number | null;
  total_volume: number | null;
  circulating_supply: number | null;
  price_change_percentage_24h: number | null;
}

/** Define Page Props */

type CoinPageProps = {
  coin: CoinDetail | null;
}

/** Dynamic Coin Page  */

const CoinPage = ({ coin }: CoinPageProps) => {

  const router = useRouter();
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

  return (
    <>
      {coin && (
        <CoinSeoHead
          id={coin.id}
          name={coin.name}
          symbol={coin.symbol}
          price={coin.current_price ?? 0}
        />
      )}

      <main className="min-h-screen bg-background">
        <div className="container py-8">

          {isNavigating && (
            <div className="mb-4 text-xs text-muted">
              Loading...
            </div>
          )}

          <button
            onClick={() => router.push("/")}
            className="text-sm text-muted hover:underline"
          >
            ← Back to Dashboard
          </button>

          {!coin ? (
            <div className="text-center text-sm text-muted">
              Coin not found
            </div>
          ) : (

            <>
              <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight" >
                  {coin.name}
                </h1>
                <p className="mt-1 text-sm uppercase text-muted">
                  {coin.symbol}
                </p>
              </div>

              <div className="rounded-lg border border-border bg-white p-6">
                <p className="text-sm text-muted">Current Price</p>
                <p className="mt-1 text-xl font-semibold">
                  {coin.current_price ? `$${coin.current_price.toLocaleString()}` : "—"}
                </p>
              </div>
              <CoinDetails
                name={coin.name}
                description={coin.description}
                marketCap={coin.market_cap}
                volume={coin.total_volume}
                supply={coin.circulating_supply}
                change24h={coin.price_change_percentage_24h}
              />
            </>
          )}

        </div>

       
      </main>
    </>
  )



}

export const getServerSideProps: GetServerSideProps = async (context) => {


  /** Cache function */
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=120"
  );

  const { id } = context.params as { id: string };

  const CACHE_DURATION = 60 * 1000;
  const cacheKey = `coin-${id}`;

  const cached = getCachedData(cacheKey, CACHE_DURATION);

  if (cached) {
    return { props: { coin: cached } };
  }

  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);

    if (!res.ok) {
      return { props: { coin: null } };
    }

    const data = await res.json();

    const shapedCoin = {
      id: data.id,
      name: data.name,
      symbol: data.symbol,
      current_price: data.market_data?.current_price?.usd ?? null,
      description: data.description?.en || "",
      market_cap: data.market_data?.market_cap?.usd ?? null,
      total_volume: data.market_data?.total_volume?.usd ?? null,
      circulating_supply: data.market_data?.circulating_supply ?? null,
      price_change_percentage_24h:
        data.market_data?.price_change_percentage_24h ?? null,
    };

    setCachedData(cacheKey, shapedCoin);

    return {
      props: {
        coin: shapedCoin,
      },
    };



  } catch {
    return { props: { coin: null } };
  }
};


export default CoinPage;