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

<img width="1543" height="916" alt="Image" src="https://github.com/user-attachments/assets/f54d0add-6c5b-4aa9-aaa4-662bcdb29f86" />

### Coin Detail Page (Dynamic SEO Page)

<img width="1518" height="911" alt="Image" src="https://github.com/user-attachments/assets/aecc02ab-0776-41fa-b50f-c175b9c82900" />

### Lighthouse SEO Report

<img width="1920" height="917" alt="Image" src="https://github.com/user-attachments/assets/04da1378-2e22-4073-9c42-307652577685" />
<img width="1920" height="917" alt="Image" src="https://github.com/user-attachments/assets/2a69a82d-9edc-4e4a-8cf1-302b8df75236" />

### Mobile View

<p>
  <img width="380" height="828" alt="Image" src="https://github.com/user-attachments/assets/b8074640-3c37-45f5-8000-f16e432b8809" />
  <img width="383" height="827" alt="Image" src="https://github.com/user-attachments/assets/9c97350a-5fad-40e4-bf4f-1b6123cab779" />
</p>

### Search Panel

<img width="1534" height="587" alt="Image" src="https://github.com/user-attachments/assets/e30d9cf4-acc8-4e3a-bbf2-848f0f0541bf" />


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
