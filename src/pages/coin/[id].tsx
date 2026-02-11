import { GetServerSideProps } from "next";
import CoinSeoHead from "@/components/seo/CoinSeoHead";
import Link from "next/link";
import CoinDetails from "./CoinDetails";

/** Define Coin Detail Type */

type CoinDetail = {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  description: string;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  price_change_percentage_24h: number;
}

/** Define Page Props */

type CoinPageProps = {
  coin: CoinDetail | null;
}

/** Dynamic Coin Page  */

const CoinPage = ({ coin }: CoinPageProps) => {


  return (
    <>




      {coin && (
        <CoinSeoHead
          id={coin.id}
          name={coin.name}
          symbol={coin.symbol}
          price={coin.current_price}
        />
      )}

      <main className="min-h-screen bg-background">
        <div className="container py-8">


          {/* Back Button */}
          <div className="mb-6">
            <Link
              href="/"
              className="text-sm text-muted hover:underline"
            >
              ← Back to Dashboard
            </Link>
          </div>

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
                  ${coin.current_price.toLocaleString()}
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

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}
      `);

    if (!res.ok) {
      return { props: { coin: null } };
    }

    const data = await res.json();

    return {
      props: {
        coin: {
          id: data.id,
          name: data.name,
          symbol: data.symbol,
          current_price: data.market_data.current_price.usd,
          description: data.description?.en || "",
          market_cap: data.market_data.market_cap.usd,
          total_volume: data.market_data.total_volume.usd,
          circulating_supply: data.market_data.circulating_supply,
          price_change_percentage_24h: data.market_data.price_change_percentage_24h,
        },
      },
    };
  } catch {
    return { props: { coin: null } };
  }
};


export default CoinPage;