/*  
====================================================
📘 React Notes – Hooks Pitfalls: Dependency Arrays, Closures, Cleanup Leaks
====================================================

React hooks are powerful, but several pitfalls can lead to bugs or memory leaks.

----------------------------------------------------
1️⃣ Dependency Arrays (useEffect, useCallback, useMemo)
----------------------------------------------------
- Missing dependencies → stale data or missed updates.
- Over-specifying dependencies → unnecessary re-renders.

✅ Example – Missing Dependency
*/
import React, { useEffect, useState } from "react";

function Counter({ step }) {
  const [count, setCount] = useState(0);

  // ❌ Missing 'step' in dependencies
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + step);
    }, 1000);

    return () => clearInterval(interval);
  }, []); // 'step' should be here!

  return <p>Count: {count}</p>;
}

/*
✅ Correct Dependency Array
*/
useEffect(() => {
  const interval = setInterval(() => {
    setCount((c) => c + step);
  }, 1000);

  return () => clearInterval(interval);
}, [step]);

/*
----------------------------------------------------
2️⃣ Stale Closures
----------------------------------------------------
- Closure captures old state/props.
- Happens if effect or callback doesn’t update when state changes.

✅ Example – Stale Closure Problem
*/
function StaleClosure() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setTimeout(() => {
      alert(`Count is ${count}`); // always alerts the initial value
    }, 1000);
  };

  return <button onClick={handleClick}>Show Count</button>;
}

/*
✅ Fix – Include latest value using functional update or dependency
*/
const handleClickFixed = () => {
  setTimeout(() => {
    setCount((prev) => {
      alert(`Count is ${prev}`); // always latest value
      return prev;
    });
  }, 1000);
};

/*
----------------------------------------------------
3️⃣ Cleanup & Memory Leaks
----------------------------------------------------
- Effects or subscriptions not cleaned → memory leaks.
- Cancel timers, subscriptions, event listeners in cleanup.

✅ Example – Event Listener Leak
*/
function WindowListener() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // ❌ Missing cleanup → leaks event listener
    return () => window.removeEventListener("resize", handleResize); // ✅ cleanup
  }, []);

  return <p>Window width: {width}</p>;
}

/*
----------------------------------------------------
4️⃣ Best Practices
----------------------------------------------------
- Always declare all dependencies in dependency arrays.
- Use functional updates for state in closures to avoid stale values.
- Always clean up subscriptions, intervals, and listeners in useEffect return.
- Use ESLint rules (`react-hooks/exhaustive-deps`) to detect dependency issues.

----------------------------------------------------
❓ Q & A Section
----------------------------------------------------
Q1: What happens if you omit a dependency in useEffect?  
👉 Effect may use stale props/state and not respond to updates.

Q2: How to fix stale closures?  
👉 Use functional updates or add proper dependencies.

Q3: How to prevent cleanup leaks?  
👉 Always return cleanup functions in useEffect.

Q4: Can over-specifying dependencies be a problem?  
👉 Yes, it can cause unnecessary re-renders.

Q5: Which ESLint rule helps catch these pitfalls?  
👉 `react-hooks/exhaustive-deps`

====================================================
End of Notes 🚀
====================================================
*/
