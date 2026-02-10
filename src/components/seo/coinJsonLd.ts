/** Type defination for the Json-ld Input */

type CoinJsonLdInput = {
  name: string;
  symbol: string;
  price: number;
};

/** Function for generating Coin JSON-LD */

export function generateCoinJsonLd({ name, symbol, price,} : CoinJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name,
    tickerSymbol: symbol.toLowerCase(),
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "USD",
    },
  };
}