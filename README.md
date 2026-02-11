# CryptoScale

CryptoScale is a server-side rendered (SSR) cryptocurrency dashboard built with Next.js and Tailwind CSS.  
The project demonstrates programmatic SEO, dynamic metadata generation, and production-level caching using real-world crypto market data.

---

## 🚀 Project Description

CryptoScale fetches live cryptocurrency data from the CoinGecko API and renders:

- A server-side rendered dashboard of the top 50 cryptocurrencies  
- Dynamic, SEO-optimized coin detail pages  
- Structured data (JSON-LD) for search engine visibility  
- A dynamic sitemap for crawlability  

The project is optimized for technical SEO and ranking evaluation.

---

## 🛠 Tech Stack

- **Next.js (Pages Router, SSR)**
- **TypeScript**
- **Tailwind CSS**
- **CoinGecko Public API**
- **Vercel (Deployment + Edge Caching)**

---

## 🎯 Project Goal

The objective was to build a clean, production-ready SSR application that demonstrates:

- Server-side rendering with `getServerSideProps`
- Programmatic SEO page generation
- Dynamic meta tags and structured data
- Technical SEO best practices
- Edge caching for API protection
- Minimal, scalable architecture

---

## CryptoScale — Project Structure

```
cryptoscale/
│
├── public/
│
├── src/
│ ├── components/
│ │ └── seo/
│ │ ├── SeoHead.tsx
│ │ ├── CoinSeoHead.tsx
│ │ └── coinJsonLd.ts
│ │
│ ├── pages/
│ │ ├── coin/
│ │ │ └── [id].tsx
│ │ ├── _app.tsx
│ │ ├── _document.tsx
│ │ ├── index.tsx
│ │ └── sitemap.xml.ts
│ │
│ └── styles/
│
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md

```

## ⚙️ Implementation Overview

### Part 1 — Project Setup
- Initialized Next.js (Pages Router)
- Configured Tailwind CSS
- Cleaned boilerplate
- Structured folder architecture

### Part 2 — SSR Dashboard
- Fetch top 50 coins via CoinGecko
- Server-side rendering for SEO
- Client-side search filter
- Responsive, mobile-friendly UI

### Part 3 — Programmatic SEO Pages
- Dynamic route: `/coin/[id]`
- SSR per coin page
- Dynamic `<title>` and `<meta description>`
- JSON-LD structured data (`FinancialProduct`)
- Reusable SEO architecture (`SeoHead`, `CoinSeoHead`)

### Part 4 — Technical SEO Polish
- Edge caching with `Cache-Control`
- Dynamic `/sitemap.xml`
- Lighthouse SEO score: 4/4 (validated)
- Production deployment on Vercel

---

## 📊 SEO Strategy & Keyword Research

The project targets **long-tail cryptocurrency price queries**, such as:

- “Bitcoin price today”
- “Ethereum live price”
- “Pepe coin price USD”

Each coin page dynamically generates:
- SEO-friendly titles
- Optimized meta descriptions
- Structured data for rich search results

This improves crawlability and search engine indexing.

---

## 📸 Screenshots

### Dashboard (SSR Home Page)
_Add screenshot here_

### Coin Detail Page (Dynamic SEO Page)
_Add screenshot here_

### Lighthouse SEO Report
_Add screenshot here_


- Dashboard overview

<img src="" width="90%" />

- Transaction table with filters

<img src="" width="90%" />

- Transaction details panel

<img src="" width="90%" />

- Mobile responsive view

<p>
  <img src="" width="35%" />
  <img src="" width="35%" />
</p>

---

## 🌐 In Action

https://cryptoscale.vercel.app

---

## 📦 Run Locally

```bash
npm install
npm run dev

npm run build
npm start

```