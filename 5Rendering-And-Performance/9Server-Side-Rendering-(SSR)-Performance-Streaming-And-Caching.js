/**
 * 📌 Server-Side Rendering (SSR) Performance – Streaming & Caching
 *
 * ✅ Why SSR?
 * - Improves First Contentful Paint (FCP) → better SEO
 * - Delivers pre-rendered HTML for faster initial load
 * - Critical for e-commerce, news portals, dashboards
 *
 * -----------------------------------------------------------
 * 1️⃣ Streaming SSR (React 18+)
 * -----------------------------------------------------------
 * - Instead of waiting for the entire React tree to render,
 *   the server streams HTML in chunks.
 * - User sees content sooner → faster TTFB (Time To First Byte).
 *
 * 🔹 Benefits:
 * - Reduces perceived load time.
 * - Critical content can render while slower parts (below fold) stream later.
 * - Ideal for large apps with heavy components.
 *
 * 🔹 Example (React 18 `renderToPipeableStream`):
 */

import { renderToPipeableStream } from "react-dom/server";
import express from "express";
import App from "./App.js";

const server = express();

server.get("/", (req, res) => {
  const { pipe } = renderToPipeableStream(<App />, {
    onShellReady() {
      res.statusCode = 200;
      res.setHeader("Content-type", "text/html");
      pipe(res); // stream chunks of HTML
    },
    onError(err) {
      console.error(err);
      res.statusCode = 500;
      res.send("Internal Server Error");
    },
  });
});

server.listen(3000);

/**
 * -----------------------------------------------------------
 * 2️⃣ SSR Caching
 * -----------------------------------------------------------
 * - SSR can be expensive (server must render React on every request).
 * - Use caching strategies to optimize performance:
 *
 * 🔹 Types of Caching:
 *   a) Full-page caching – cache the entire HTML response.
 *   b) Fragment caching – cache parts of the UI (e.g., header, footer).
 *   c) Data caching – cache API results to avoid refetching.
 *
 * 🔹 Example (Full-page caching with LRU cache):
 */

import LRU from "lru-cache";

const ssrCache = new LRU({ max: 500, maxAge: 1000 * 60 }); // 1 min cache

server.get("/", (req, res) => {
  const key = req.url;
  if (ssrCache.has(key)) {
    return res.send(ssrCache.get(key)); // return cached HTML
  }

  const { pipe } = renderToPipeableStream(<App />, {
    onShellReady() {
      let body = "";
      res.setHeader("Content-type", "text/html");

      pipe({
        write: (chunk) => {
          body += chunk;
          res.write(chunk);
        },
        end: () => {
          ssrCache.set(key, body);
          res.end();
        },
      });
    },
  });
});

/**
 * -----------------------------------------------------------
 * 3️⃣ Case Study – News Website
 * -----------------------------------------------------------
 * - Problem: High traffic spikes during breaking news
 *   → server load increased → slow response.
 *
 * - Solution:
 *   ✔ Implemented streaming SSR to render headlines quickly.
 *   ✔ Cached article pages using Redis (5 min expiry).
 *   ✔ Used stale-while-revalidate (SWR) to keep cache fresh.
 *
 * - Results:
 *   🚀 TTFB reduced from 2.5s → 0.6s
 *   🚀 Server CPU usage dropped 40%
 *   🚀 Bounce rate improved by 18%
 *
 * -----------------------------------------------------------
 * 🔑 Best Practices
 * -----------------------------------------------------------
 * - Use **streaming SSR** for large apps → faster content delivery.
 * - Always combine SSR with **caching** to reduce server load.
 * - Prefer **fragment/data caching** for dynamic sections.
 * - Use CDN (Cloudflare, Akamai, Vercel Edge) for global delivery.
 * - Monitor with APM tools (Datadog, New Relic) to catch SSR bottlenecks.
 */
