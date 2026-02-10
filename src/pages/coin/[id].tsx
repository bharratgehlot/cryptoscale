import { GetServerSideProps } from "next";
import Head from "next/head";

/** Define Coin Detail Type */

type CoinDetail = {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
}

/** Define Page Props */

type CoinPageProps = {
  coin: CoinDetail | null;
}

/** Dynamic Coin Page  */

const CoinPage = ({ coin }: CoinPageProps) => {
  const title = coin
    ? `${coin.name} (${coin.symbol.toUpperCase()}) Price Today | CryptoScale`
    : "Coin Not Found | CryptoScale";

  const description = coin
    ? `Live ${coin.name} price today is $${coin.current_price.toLocaleString()}. View real-time price data and market insights for ${coin.name}.`
    : "Cryptocurrency data not available.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <main className="min-h-screen bg-background">
        <div className="container py-8">

          {!coin ? (
            <div className="text-center text-sm text-muted">
              Coin not found
            </div>
          ) : (

            <>
              <div className="mb-6">
                <h1 className="text-2xl fond-bold tracking-tight" >
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

            </>
          )}

        </div>

      </main>
    </>
  )



}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const res = await fetch(`
      https://api.coingecko.com/api/v3/coins/${id}
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
        },
      },
    };
  } catch {
    return { props: { coin: null } };
  }
};


export default CoinPage;