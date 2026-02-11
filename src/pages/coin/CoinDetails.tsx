type CoinDetailsProps = {
  name: string;
  description: string;
  marketCap: number;
  volume: number;
  supply: number;
  change24h: number;
};

export default function CoinDetails({
  name,
  description,
  marketCap,
  volume,
  supply,
  change24h
}: CoinDetailsProps) {
  if (!description) return null;

  return (
    <>
      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-3">
          About {name}
        </h2>

        <div
          className="text-sm text-muted leading-relaxed space-y-3"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-4">
          Market Overview
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="p-4 border rounded-lg bg-white">
            <p className="text-xs text-muted">Market Cap</p>
            <p className="mt-1 font-semibold">
              ${marketCap.toLocaleString("en-US")}
            </p>
          </div>

          <div className="p-4 border rounded-lg bg-white">
            <p className="text-xs text-muted">24h Volume</p>
            <p className="mt-1 font-semibold">
              ${volume.toLocaleString("en-US")}
            </p>
          </div>

          <div className="p-4 border rounded-lg bg-white">
            <p className="text-xs text-muted">Circulating Supply</p>
            <p className="mt-1 font-semibold">
              {supply.toLocaleString("en-US")}
            </p>
          </div>

          <div className="p-4 border rounded-lg bg-white">
            <p className="text-xs text-muted">24h Change</p>
            <p
              className={`mt-1 font-semibold ${change24h >= 0
                  ? "text-green-600"
                  : "text-red-600"
                }`}
            >
              {change24h.toFixed(2)}%
            </p>
          </div>
        </div>
      </section>

    </>

  );
}
