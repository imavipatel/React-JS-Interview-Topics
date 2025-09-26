/*  
====================================================
📘 React Notes – React 18+ Hooks: useId, useTransition, useDeferredValue
====================================================

React 18 introduced new hooks to improve **concurrent rendering**, **unique ID generation**, and **performance handling**.

----------------------------------------------------
1️⃣ useId – Stable Unique IDs
----------------------------------------------------
- Generates a unique, stable ID for accessibility or form elements.
- Same across server & client (important for SSR).
- Useful when you need unique IDs but don’t want random ones each render.

✅ Example: Form Labels
*/
import React, { useId, useState, useTransition, useDeferredValue } from "react";

function EmailForm() {
  const id = useId();
  return (
    <div>
      <label htmlFor={`${id}-email`}>Email:</label>
      <input id={`${id}-email`} type="email" />
    </div>
  );
}

/*
----------------------------------------------------
2️⃣ useTransition – Prioritize Updates
----------------------------------------------------
- Helps mark updates as **non-urgent**.
- UI stays responsive during heavy state updates.
- Returns `[isPending, startTransition]`.
- Good for expensive re-renders (e.g., filtering, search).

✅ Example: Search Filtering
*/
function SearchBox({ items }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(items);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    startTransition(() => {
      const results = items.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(results);
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} placeholder="Search..." />
      {isPending && <p>Updating list...</p>}
      <ul>
        {filtered.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/*
----------------------------------------------------
3️⃣ useDeferredValue – Defers Re-Renders
----------------------------------------------------
- Creates a deferred version of a value.
- Lets urgent updates (typing) happen immediately, while deferring expensive updates (list rendering).
- Similar to `useTransition`, but for values instead of state updates.

✅ Example: Live Search
*/
function SearchDeferred({ items }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(deferredQuery.toLowerCase())
  );

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {filtered.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/*
----------------------------------------------------
📊 Comparison
----------------------------------------------------
| Hook              | Purpose                                   | Example Use Case                   |
|-------------------|-------------------------------------------|------------------------------------|
| useId             | Stable unique IDs                         | Form labels, accessibility IDs      |
| useTransition     | Mark non-urgent updates                   | Search filters, large list updates  |
| useDeferredValue  | Defer value updates for performance       | Smooth input with heavy filtering   |

----------------------------------------------------
❓ Q & A Section
----------------------------------------------------
Q1: Why not use Math.random() for IDs?  
👉 Not stable across server & client → hydration mismatch.

Q2: Difference between useTransition and useDeferredValue?  
👉 `useTransition` wraps updates, `useDeferredValue` defers values.

Q3: Does useTransition make UI faster?  
👉 Not exactly – it keeps urgent updates (typing, clicks) smooth by deferring heavy ones.

Q4: Can useDeferredValue be combined with useMemo?  
👉 Yes, to avoid re-computing expensive filters.

Q5: Do these hooks replace memoization tools like React.memo?  
👉 No, they complement them for concurrency-friendly rendering.

====================================================
End of Notes 🚀
====================================================
*/
