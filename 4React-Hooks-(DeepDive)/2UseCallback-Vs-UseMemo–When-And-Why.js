/*
====================================================
📘 React Notes – useCallback vs useMemo
====================================================

🔹 Both `useCallback` and `useMemo` are React hooks for **performance optimization**.  
They prevent unnecessary recalculations or re-creations when dependencies haven’t changed.  

----------------------------------------------------
1️⃣ useCallback
----------------------------------------------------
- Returns a **memoized version of a function**.
- Prevents re-creation of the function on every render.
- Useful when passing callbacks to child components to avoid unnecessary re-renders.

✅ Example:
*/
import { useState, useCallback, useMemo } from "react";

function CounterWithCallback() {
  const [count, setCount] = useState(0);

  // ✅ Memoized callback
  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []); // no deps → function identity stable

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>➕ Increment</button>
    </div>
  );
}

/*
⚡ When to use:
- Passing functions as props to children wrapped in `React.memo`.
- Event handlers or callbacks that shouldn’t change unless dependencies change.

----------------------------------------------------
2️⃣ useMemo
----------------------------------------------------
- Returns a **memoized value**.
- Used to avoid expensive recalculations on every render.
- Recomputes only if dependencies change.

✅ Example:
*/
function ExpensiveCalculation({ num }) {
  // Expensive computation
  const fib = (n) => (n <= 1 ? 1 : fib(n - 1) + fib(n - 2));

  // ✅ Memoize result
  const result = useMemo(() => fib(num), [num]);

  return (
    <p>
      Fibonacci of {num} = {result}
    </p>
  );
}

/*
⚡ When to use:
- Expensive computations (sorting, filtering, calculations).
- Deriving computed values from props/state.

----------------------------------------------------
3️⃣ Comparison – useCallback vs useMemo
----------------------------------------------------
- `useCallback(fn, deps)` → memoizes a **function**.
- `useMemo(factory, deps)` → memoizes a **value (result of computation)**.
- Internally, `useCallback(fn, deps)` is equivalent to:
   `useMemo(() => fn, deps)`.

----------------------------------------------------
4️⃣ Example: Both Together
----------------------------------------------------
*/
function List({ items, filter }) {
  // ✅ useMemo for computed list
  const filteredItems = useMemo(
    () => items.filter((i) => i.includes(filter)),
    [items, filter]
  );

  // ✅ useCallback for handler
  const handleClick = useCallback((item) => {
    console.log("Clicked:", item);
  }, []);

  return (
    <ul>
      {filteredItems.map((item) => (
        <li key={item} onClick={() => handleClick(item)}>
          {item}
        </li>
      ))}
    </ul>
  );
}

/*
----------------------------------------------------
5️⃣ Best Practices
----------------------------------------------------
✔️ Use `useCallback` when:
   - Passing stable functions to memoized child components.
   - Preventing unnecessary function re-creation.

✔️ Use `useMemo` when:
   - Avoiding expensive recalculations.
   - Computing derived state (sorted lists, filtered data).

⚠️ Don’t overuse! → Both add memory overhead.  
Use only for **performance-critical** scenarios.

----------------------------------------------------
❓ Q & A
----------------------------------------------------
Q1: Are `useCallback` and `useMemo` the same?  
👉 No. One memoizes functions (`useCallback`), the other memoizes values (`useMemo`).

Q2: Can I replace `useCallback(fn, deps)` with `useMemo(() => fn, deps)`?  
👉 Yes, they are equivalent, but `useCallback` is clearer semantically.

Q3: Should I wrap every function with `useCallback`?  
👉 No! Only if passing to memoized children or avoiding re-renders.

====================================================
End of Notes 🚀
====================================================
*/
