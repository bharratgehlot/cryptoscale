import Head from "next/head";

type SeoHeadProps = {
  title: string;
  description: string;
  url?: string;
};

export default function SeoHead( { title, description, url = "/"}: SeoHeadProps) {
  const baseUrl = "https://cryptoscale.vercel.app";
  const fullUrl = `${baseUrl}${url}`;
  const ogImage = `${baseUrl}/og-image.png`;

  return (
    <Head>

      {/* Primary Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="CryptoScale" />
      <meta 
        name="keywords"
        content="cryptocurrency prices, bitcoin price today, ethereum price, crypto market cap, live crypto prices"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />

      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />

      {/* OpenGraph */}
      <meta property="og:type" content="website" />
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
    </Head>
  )
}