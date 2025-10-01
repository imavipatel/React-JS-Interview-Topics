/*
====================================================
📘 React 18+ Notes – Concurrent Rendering
====================================================

🔹 React 18 introduced **Concurrent Rendering** to make apps smoother:
- Rendering is interruptible, pausable, resumable.
- React prioritizes urgent vs non-urgent updates.

Key Features:
1️⃣ Automatic Batching
2️⃣ Transitions (`useTransition`, `startTransition`)

----------------------------------------------------
1️⃣ Automatic Batching
----------------------------------------------------
Before React 18:
- Only React event handlers batched state updates.
- async updates (setTimeout, promises, fetch) triggered multiple re-renders.

Now (React 18+):
- React batches all updates by default (even in async).
- Fewer renders → better performance.
*/

import React, { useState, useEffect } from "react";

export default function AutoBatchingExample() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    setCount((c) => c + 1);
    setFlag((f) => !f);
    // ✅ In React 18: batched → only ONE re-render
    // ❌ In React 17: two re-renders
  }

  useEffect(() => {
    fetch("/api/data").then(() => {
      setCount((c) => c + 1);
      setFlag((f) => !f);
      // ✅ Still batched in React 18
    });
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Flag: {flag.toString()}</p>
      <button onClick={handleClick}>Update</button>
    </div>
  );
}

/*
----------------------------------------------------
2️⃣ Transitions
----------------------------------------------------
Problem:
- Urgent updates (typing, clicks) should feel instant.
- Non-urgent updates (filtering, sorting lists) can be deferred.

Solution:
- React provides `useTransition` / `startTransition`.
- Transitions mark updates as "non-urgent".
- React keeps UI responsive by prioritizing urgent updates first.
*/

import React, { useState, useTransition } from "react";

const bigList = Array.from({ length: 5000 }, (_, i) => `Item ${i + 1}`);

export default function TransitionExample() {
  const [query, setQuery] = useState("");
  const [list, setList] = useState(bigList);
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value); // urgent update → input stays fast

    startTransition(() => {
      // non-urgent update → filter large list
      const filtered = bigList.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setList(filtered);
    });
  }

  return (
    <div>
      <input value={query} onChange={handleChange} placeholder="Search..." />
      {isPending && <p>Updating list...</p>}
      <ul>
        {list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/*
----------------------------------------------------
3️⃣ Real-World Example: E-commerce Product Search
----------------------------------------------------
Scenario:
- User types in a search bar (urgent).
- Product grid re-renders thousands of items (non-urgent).

Without transitions:
- Input typing lags when grid is large.

With transitions:
- Input stays responsive, grid updates asynchronously.
*/

import React, { useState, useTransition } from "react";

function ProductSearch({ products }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(products);
  const [isPending, startTransition] = useTransition();

  function handleInput(e) {
    const value = e.target.value;
    setQuery(value); // urgent

    startTransition(() => {
      const results = products.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(results);
    });
  }

  return (
    <div>
      <input
        value={query}
        onChange={handleInput}
        placeholder="Search products..."
      />
      {isPending && <span>Loading results...</span>}
      <div className="grid">
        {filtered.map((p) => (
          <div key={p.id} className="card">
            {p.name}
          </div>
        ))}
      </div>
    </div>
  );
}

/*
----------------------------------------------------
4️⃣ Pitfalls
----------------------------------------------------
❌ Overusing transitions → unnecessary delays.
❌ Forgetting fallbacks → user may not notice background updates.
❌ Transition does NOT cancel work; it just deprioritizes it.

----------------------------------------------------
5️⃣ Best Practices
----------------------------------------------------
- Use transitions only for heavy updates (lists, charts, grids).
- Always keep urgent updates outside transitions.
- Wrap slow updates in `startTransition` to prevent blocking input.
- Combine with virtualization (react-window) for large lists.

====================================================
❓ Q & A Section
====================================================
Q1: What is automatic batching in React 18?
👉 Grouping multiple state updates into a single render, even in async contexts.

Q2: What problem do transitions solve?
👉 They separate urgent vs non-urgent updates, keeping UI responsive.

Q3: Can batching be disabled?
👉 Yes, using `ReactDOM.flushSync()` for critical updates.

Q4: What’s the difference between `useTransition` and `startTransition`?
👉 `useTransition` gives `isPending` state for UI feedback.  
👉 `startTransition` can be used standalone in non-component code.

Q5: Should I wrap every update in transitions?
👉 No — only heavy computations or large DOM updates.
*/

