/**
 * 📌 Build Optimization in React Apps
 *
 * ✅ Why Optimize?
 * - Reduce bundle size → faster load time
 * - Improve performance → less JS parsing/execution
 * - Optimize network usage → smaller payloads
 * - Better UX, especially on slow networks/devices
 *
 * -----------------------------------------------------------
 * 1️⃣ Tree-shaking
 * -----------------------------------------------------------
 * - Removes unused code during bundling (dead-code elimination).
 * - Supported by modern bundlers: Webpack, Rollup, ESBuild, Vite.
 * - Works best with ES Modules (import/export).
 *
 * Example:
 *   // utils.js
 *   export const usedFn = () => console.log("used");
 *   export const unusedFn = () => console.log("unused");
 *
 *   // app.js
 *   import { usedFn } from './utils';
 *   usedFn(); // only this remains in final bundle
 *
 * ⚠️ Caveat:
 * - Tree-shaking fails if using CommonJS (`require`).
 * - Dynamic imports may complicate optimization.
 *
 * -----------------------------------------------------------
 * 2️⃣ Code Splitting
 * -----------------------------------------------------------
 * - Breaks bundle into smaller chunks.
 * - Loads code only when needed (on-demand).
 * - Prevents users from downloading all code at once.
 *
 * 🔹 Approaches:
 *   a) Route-based splitting (React.lazy + Suspense)
 *   b) Component-level splitting
 *   c) Vendor splitting (separate React, lodash, etc.)
 *
 * Example (Route-based):
 */

import React, { Suspense, lazy } from "react";

const Dashboard = lazy(() => import("./Dashboard"));
const Settings = lazy(() => import("./Settings"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
      <Settings />
    </Suspense>
  );
}

/**
 * -----------------------------------------------------------
 * 3️⃣ Bundle Analyzers
 * -----------------------------------------------------------
 * - Tools to visualize bundle size and dependencies.
 * - Helps identify large libraries, unused dependencies.
 *
 * Popular tools:
 * - webpack-bundle-analyzer
 * - source-map-explorer
 * - Vite Plugin Visualizer
 *
 * Example (Webpack):
 *   npm install --save-dev webpack-bundle-analyzer
 *   // In webpack config:
 *   const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
 *   plugins: [ new BundleAnalyzerPlugin() ]
 *
 * -----------------------------------------------------------
 * 🚀 Case Study
 * -----------------------------------------------------------
 * 🏢 Large React E-commerce Platform
 * - Problem: Initial bundle size 4.5 MB → Slow on 3G.
 * - Applied optimizations:
 *   ✔ Tree-shaking removed unused lodash & moment.js code.
 *   ✔ Code splitting for product pages & admin panel.
 *   ✔ Bundle analyzer revealed heavy charting library → replaced with lighter alternative.
 * - Result: Bundle reduced to 1.2 MB, TTI improved by 60%.
 *
 * -----------------------------------------------------------
 * 📊 Before & After Bundle Comparison
 * -----------------------------------------------------------
 * Before Optimization:
 * - Main bundle: 4.5 MB
 * - Vendor chunk: 2.2 MB (React + Lodash + Chart.js)
 * - Product page: 800 KB
 * - Admin panel: 900 KB
 *
 * After Optimization:
 * - Main bundle: 1.2 MB
 * - Vendor chunk: 1 MB (React + Lodash tree-shaken + Chart.js lighter alternative)
 * - Product page: 400 KB (lazy-loaded)
 * - Admin panel: 300 KB (lazy-loaded)
 * - Initial load time improved ~3x on slow network
 *
 * -----------------------------------------------------------
 * 🔑 Key Takeaways
 * -----------------------------------------------------------
 * - Use ES modules for effective tree-shaking.
 * - Apply lazy loading for routes & heavy components.
 * - Regularly analyze bundles → avoid regressions.
 * - Prefer lightweight dependencies & alternatives.
 */
