/*
====================================================
📘 React Notes – Profiling with React DevTools Profiler & Flamegraphs
====================================================

🔹 Performance optimization requires knowing **where bottlenecks are**.  
React DevTools Profiler helps visualize component rendering costs and behavior.  
Flamegraphs show the "cost tree" of rendering, helping pinpoint slow components.

----------------------------------------------------
1️⃣ What is the React DevTools Profiler?
----------------------------------------------------
- A tab in React DevTools (Chrome/Firefox).
- Records rendering activity during an interaction.
- Shows:
  - Which components rendered.
  - How long each render took.
  - Why a component rendered (props, state, hooks).

----------------------------------------------------
2️⃣ What is a Flamegraph?
----------------------------------------------------
- A visualization where:
  - Each box = a component.
  - Width = render duration (bigger = slower).
  - Color = render type (e.g., re-render vs commit).
- Lets you **spot expensive components** instantly.

----------------------------------------------------
3️⃣ How to Use Profiler
----------------------------------------------------
Step 1: Install React DevTools.  
Step 2: Open the "Profiler" tab in browser devtools.  
Step 3: Click "Start Profiling" → perform actions in your app.  
Step 4: Stop profiling → inspect flamegraph/timeline.

----------------------------------------------------
4️⃣ Profiling Example
----------------------------------------------------
Imagine typing in a search box:
- Profiler may show `<SearchBar>` re-rendering fast (good).
- But `<ProductList>` re-renders on every keystroke (bad).

Flamegraph reveals that **list rendering dominates time**.
Solution: memoization, transitions, or virtualization.
*/

/* ------------------------------------------------------------------
   📘 Example 1: Simple Component with Profiling Target
-------------------------------------------------------------------*/
import React, { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}

// 🔎 In Profiler: Each click → re-render. Cost is minimal here.

/* ------------------------------------------------------------------
   📘 Example 2: Detecting Unnecessary Re-renders
-------------------------------------------------------------------*/
import React, { useState } from "react";

function Item({ value }) {
  console.log("Rendered:", value);
  return <li>{value}</li>;
}

export function ItemList({ items }) {
  return (
    <ul>
      {items.map((i, idx) => (
        <Item key={idx} value={i} />
      ))}
    </ul>
  );
}

export function ParentList() {
  const [count, setCount] = useState(0);
  const items = ["Apple", "Banana", "Orange"];

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Re-render</button>
      <ItemList items={items} />
    </div>
  );
}

// 🔎 Profiler will show: ItemList + Item re-render unnecessarily when count changes.
// 💡 Fix: Wrap <Item> with React.memo.

/* ------------------------------------------------------------------
   📘 Example 3: Profiling in Real Project (Case Study)
-------------------------------------------------------------------*/
// 🛒 E-commerce product grid
// Problem: Product cards re-render whenever cart count changes.

import React, { useState, memo } from "react";

const ProductCard = memo(function ProductCard({ product }) {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  );
});

export function ProductGrid({ products }) {
  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export function ECommerceApp({ products }) {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCartCount((c) => c + 1)}>
        Add to Cart ({cartCount})
      </button>
      <ProductGrid products={products} />
    </div>
  );
}

// 🔎 Profiler flamegraph BEFORE memoization: every ProductCard re-rendered.
// ✅ AFTER memoization: only ProductGrid renders, ProductCard skipped.

/*
----------------------------------------------------
5️⃣ Pitfalls in Profiling
----------------------------------------------------
❌ Profiling in dev builds → slower than production.  
❌ Misinterpreting flamegraph (wide box ≠ always bad).  
❌ Optimizing prematurely without real bottlenecks.  

----------------------------------------------------
6️⃣ Best Practices
----------------------------------------------------
- Always profile in production mode (build + serve).  
- Use memoization (React.memo, useMemo, useCallback) only where flamegraph shows re-renders.  
- Combine with browser Performance tab for holistic view.  
- Focus on user-facing lag, not micro-optimizations.  

====================================================
❓ Q & A Section
====================================================
Q1: What is the purpose of the React Profiler?  
👉 To analyze which components rendered, why, and how long they took.  

Q2: What does a wide flamegraph box mean?  
👉 The component took more time to render (could be a bottleneck).  

Q3: How to reduce re-renders seen in Profiler?  
👉 Use React.memo, useCallback, useMemo, or restructure state.  

Q4: Why should profiling be done in production build?  
👉 Dev build adds extra checks → false impression of slowness.  

Q5: Can React Profiler detect memory leaks?  
👉 No, it’s for render performance. Use Chrome Performance tools for memory.  

====================================================
End of Notes 🚀
====================================================
*/
