const HomePage = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container py-6">
          <h1 className="text-2xl font-bold tracking-tight">
            CryptoScale
          </h1>
          <p className="mt-1 text-sm text-muted">
            Server-side rendered crypto insights built for SEO
          </p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-16">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-semibold leading-tight">
            Cryptocurrency prices,
            <span className="block text-muted">
              rendered for search engines
            </span>
          </h2>

          <p className="mt-6 text-base text-muted">
            CryptoScale is a server-side rendered dashboard that generates
            SEO-friendly pages for individual cryptocurrencies using real-time
            market data.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              View Dashboard
            </button>

            <button className="rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-card">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Feature Preview */}
      <section className="container pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card">
            <h3 className="text-lg font-semibold">SSR by Default</h3>
            <p className="mt-2 text-sm text-muted">
              All pages are rendered on the server using Next.js
              <code className="ml-1 rounded bg-gray-100 px-1 py-0.5 text-xs">
                getServerSideProps
              </code>
              .
            </p>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold">Programmatic SEO</h3>
            <p className="mt-2 text-sm text-muted">
              Each cryptocurrency has its own dynamic, indexable page with
              structured metadata.
            </p>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold">Clean Architecture</h3>
            <p className="mt-2 text-sm text-muted">
              Minimal code, clear separation of concerns, and recruiter-friendly
              structure.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container py-6 text-sm text-muted">
          © {new Date().getFullYear()} CryptoScale. Built with Next.js & Tailwind.
        </div>
      </footer>
    </main>
  );
};

export default HomePage;
