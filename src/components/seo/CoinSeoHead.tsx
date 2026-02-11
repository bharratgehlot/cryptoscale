import Head from "next/head";
import { generateCoinJsonLd } from "./coinJsonLd";

type CoinSeoHeadProps = {
  name: string;
  symbol: string;
  price: number;
};

export default function CoinSeoHead({ name, symbol, price }: CoinSeoHeadProps) {
  const baseUrl = "https://cryptoscale.vercel.app";
  const coinPath = `/coin/${name.toLowerCase()}`;
  const fullUrl = `${baseUrl}${coinPath}`;
  const ogImage = `${baseUrl}/og-image.png`;

  const title = `${name} (${symbol.toUpperCase()}) Price Today | CryptoScale`;
  const description = `Live ${name} price today is $${price.toLocaleString()}. View real-time price data, charts, and market insights for ${name}.`;

  const jsonLd = generateCoinJsonLd({
    name,
    symbol,
    price,
  });

  return (
    <Head>
      {/* Primary Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta
        name="keywords"
        content={`${name} price, ${symbol} price today, ${name} live price USD, ${name} market cap`}
      />

      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />

      {/* OpenGraph */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="CryptoScale" />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </Head>
  );
}
