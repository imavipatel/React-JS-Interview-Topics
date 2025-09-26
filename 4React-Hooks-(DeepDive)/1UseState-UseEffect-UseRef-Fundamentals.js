/*
🔹 React Hooks Fundamentals: useState, useEffect, useRef

----------------------------------------------------
📌 useState – State Management
- Adds local state to functional components.
- State updates trigger re-render.
- Initial value can be primitive, object, or function.

✅ Example:
*/
import { useState, useEffect, useRef } from "react";

function Counter() {
  const [count, setCount] = useState(0); // state variable

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>➕ Increment</button>
    </div>
  );
}

/*
----------------------------------------------------
📌 useEffect – Side Effects
- Handles tasks outside React’s rendering (side effects).
- Examples: data fetching, subscriptions, timers, DOM updates.
- Runs after render by default.
- Cleanup function can avoid memory leaks.

✅ Example:
*/
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []); // empty dependency → runs only once after mount

  return <p>⏱ Time: {seconds}s</p>;
}

/*
----------------------------------------------------
📌 useRef – Persistent Mutable Value
- Stores a mutable value that does NOT trigger re-renders.
- Can directly reference DOM elements.
- Commonly used for:
  ✔ Storing previous values
  ✔ Managing focus, text inputs, or canvas elements
  ✔ Holding timers/interval IDs

✅ Example 1: Access DOM element
*/
function InputFocus() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} placeholder="Type here..." />
      <button onClick={focusInput}>🎯 Focus</button>
    </div>
  );
}

/*
✅ Example 2: Storing Previous State
*/
function PreviousValueTracker() {
  const [count, setCount] = useState(0);
  const prevCount = useRef(null);

  useEffect(() => {
    prevCount.current = count; // update ref after render
  }, [count]);

  return (
    <div>
      <p>
        Now: {count}, Before: {prevCount.current}
      </p>
      <button onClick={() => setCount(count + 1)}>➕ Increment</button>
    </div>
  );
}

/*
----------------------------------------------------
📌 Summary
- useState → Local state, re-renders on change.
- useEffect → Side effects (fetch, subscriptions, timers).
- useRef → Mutable reference, no re-render, access DOM/previous state.

⚡ Tip:
- If value affects rendering → useState.
- If value persists but doesn’t affect rendering → useRef.
- If action is a side effect (outside React) → useEffect.
*/
