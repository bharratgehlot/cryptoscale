import Head from "next/head";
import { generateCoinJsonLd } from "./coinJsonLd";

type CoinSeoHeadProps = {
  name: string;
  symbol: string;
  price: number;
};

export default function CoinSeoHead({ name, symbol, price }: CoinSeoHeadProps) {

  const title = `${name} (${symbol.toUpperCase()}) Price Today | CryptoScale`;
  const description = `Live ${name} price today is $${price.toLocaleString()}. View real-time price data and market insights for ${name}.`;

  const jsonLd = generateCoinJsonLd({
    name,
    symbol,
    price,
  });

  return (

    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </Head>

  );
}