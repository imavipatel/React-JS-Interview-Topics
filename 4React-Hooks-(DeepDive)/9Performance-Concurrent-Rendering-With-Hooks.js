/*  
====================================================
📘 React Notes – Performance: Concurrent Rendering with Hooks (React 18+)
====================================================

React 18 introduced **Concurrent Rendering** to make UIs more responsive
by breaking rendering work into smaller units that can be interrupted,
paused, or resumed without blocking the main thread.

Key Idea:
- React can prepare multiple versions of the UI in memory.
- User interactions (like typing, clicking) stay responsive while React renders updates.
- Hooks like `useTransition` and `useDeferredValue` help manage concurrency.

Why Concurrent Rendering?
- Prevents UI blocking during heavy re-renders.
- Ensures user input stays smooth (e.g., typing in a search bar).
- Enables prioritization: urgent updates (user input) vs non-urgent (list rendering).

Hooks Supporting Concurrent Rendering
1. `useTransition` - Marks state updates as non-urgent (low-priority).
2. `useDeferredValue` - Defers a value until the UI has time to render it.
3. `useId` - Helps generate unique IDs in concurrent mode.
4. `useOptimistic` (React 19+) - Optimistic UI updates while awaiting async confirmation.

Common Pitfalls
- Not all browsers/devices show clear performance gains (depends on workload).
- Overuse of `useTransition` can lead to delayed UI updates.
- Forgetting to separate urgent vs non-urgent updates properly.

Best Practices
- Use `useTransition` for slow-rendering components (lists, charts).
- Use `useDeferredValue` for derived values based on fast-changing input.
- Keep urgent updates (forms, input, navigation) separate from expensive renders.

📘 Example 1: useTransition for Search
*/
import React, { useState, useTransition } from "react";

function SearchApp() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    startTransition(() => {
      const filtered = bigList.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} placeholder="Search..." />
      {isPending && <p>Loading...</p>}
      <ul>
        {results.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}

import React, { useState, useDeferredValue } from "react";

function SearchWithDeferredValue() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const filtered = bigList.filter((item) =>
    item.toLowerCase().includes(deferredQuery.toLowerCase())
  );

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to search..."
      />
      <ul>
        {filtered.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}

import React, { useState, useTransition, useDeferredValue } from "react";

function CombinedConcurrentSearch() {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);
  const filtered = bigList.filter((item) =>
    item.toLowerCase().includes(deferredQuery.toLowerCase())
  );

  return (
    <div>
      <input
        value={query}
        onChange={(e) => {
          const value = e.target.value;
          setQuery(value);
          startTransition(() => {});
        }}
        placeholder="Concurrent Search..."
      />
      {isPending && <p>Updating list...</p>}
      <ul>
        {filtered.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}

function ProductSearch({ products }) {
  const [searchTerm, setSearchTerm] = useState("");
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const [isPending, startTransition] = useTransition();

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(deferredSearchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    startTransition(() => {});
  };

  return (
    <div>
      <input
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search products..."
      />
      {isPending && <p>Loading products...</p>}
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
