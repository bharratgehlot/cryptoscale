import Head from "next/head";

type SeoHeadProps = {
  title: string;
  description: string;
};

export default function SeoHead( { title, description}: SeoHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />

      {/* OpenGraph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Head>
  )
}