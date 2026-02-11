import { GetServerSideProps } from "next";

const BASE_URL = "https://cryptoscale.vercel.app"; 

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader("Content-Type", "text/xml");

  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets" +
    "?vs_currency=usd" +
    "&order=market_cap_desc" +
    "&per_page=50" +
    "&page=1" +
    "&sparkline=false"
  );

  const coins = await response.json();

  const urls = coins
    .map((coin: any) => {
      return `
        <url>
          <loc>${BASE_URL}/coin/${coin.id}</loc>
          <changefreq>hourly</changefreq>
          <priority>0.8</priority>
        </url>
      `;
    })
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${BASE_URL}</loc>
        <changefreq>hourly</changefreq>
        <priority>1.0</priority>
      </url>
      ${urls}
    </urlset>
  `;

  context.res.write(sitemap);
  context.res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
