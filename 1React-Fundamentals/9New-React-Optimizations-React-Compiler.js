/* 
===================================================
📘 New React Optimizations: React Compiler (React Forget – Auto Memoization)
===================================================

React team introduced a new optimization called **React Compiler**, 
also known as "React Forget".

🔑 Purpose:
- Automatically optimize React components for performance.
- Removes the need for manual memoization (React.memo, useMemo, useCallback).
- Still experimental (React 18+ labs).

Think of it as:
🧠 "A smart assistant that automatically makes your React components faster."

===================================================
*/

// ------------------------------
// 1. What Problem Does It Solve?
// ------------------------------
/*
In React today:
- We manually optimize components to prevent re-renders.
- Tools: React.memo, useCallback, useMemo.
- But these are easy to misuse or overuse.

Problem:
- Developers often forget to memoize.
- Or they use it incorrectly (causing bugs or memory waste).

Solution:
- React Compiler does this automatically.
*/

// ------------------------------
// 2. What is React Compiler (React Forget)?
// ------------------------------
/*
- A build-time compiler that analyzes your code.
- Detects pure components & hooks.
- Automatically applies memoization when safe.
- Eliminates the need to manually wrap everything in React.memo/useMemo/useCallback.
*/

// ------------------------------
// 3. Example Without Compiler
// ------------------------------

import React, { memo, useCallback } from "react";

const Button = memo(function Button({ onClick, label }) {
  console.log("Rendered:", label);
  return <button onClick={onClick}>{label}</button>;
});

function App() {
  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []);

  return <Button onClick={handleClick} label="Click Me" />;
}

// Here we manually used `memo` + `useCallback`.

// ------------------------------
// 4. Example With React Compiler (Auto Memoization)
// ------------------------------
/*
With React Compiler:
- You just write normal components.
- Compiler auto-memoizes where needed.
*/

function ButtonNew({ onClick, label }) {
  console.log("Rendered:", label);
  return <button onClick={onClick}>{label}</button>;
}

function AppNew() {
  function handleClick() {
    console.log("Clicked!");
  }

  return <ButtonNew onClick={handleClick} label="Click Me" />;
}

// React Compiler automatically ensures ButtonNew
// doesn't re-render unnecessarily.

// ------------------------------
// 5. How It Works (Simple Explanation)
// ------------------------------
/*
1. Compiler checks your code at build time.
2. If a component doesn’t depend on changing values → it memoizes automatically.
3. If functions/objects are stable → no re-renders.
4. It’s smarter than useMemo/useCallback, because:
   - Knows when memoization is safe
   - Avoids memory bloat from over-memoization
*/

// ------------------------------
// 6. Current Status (2025)
// ------------------------------
/*
- Still experimental (labs).
- Being tested in real projects by React team.
- Goal: Become a default part of React in the future.
*/

// ------------------------------
// 7. Quick Recap
// ------------------------------
/*
🟢 React Compiler = Auto optimization tool.
🟢 Removes need for manual memo, useMemo, useCallback.
🟢 Analyzes code at build time → adds memoization automatically.
🟢 Safer + smarter than manual optimizations.
🟢 Still experimental, not widely available in production yet.
*/

/* 
===================================================
❓ Q & A Section (Interview Style)
===================================================

Q1: What is React Compiler (React Forget)?
A1: It’s a new optimization system that automatically memoizes React components at build time, removing the need for manual memo/useMemo/useCallback.

Q2: Why do we need React Compiler?
A2: Because developers often forget to optimize components, or do it wrong. React Compiler handles it automatically and correctly.

Q3: How does React Compiler improve performance?
A3: It prevents unnecessary re-renders by auto-detecting when components/props are stable and memoizing them safely.

Q4: Is React Compiler available now?
A4: It’s still experimental (React 18+ labs). It’s being tested and not fully production-ready yet.

Q5: Does React Compiler replace React.memo/useMemo/useCallback?
A5: Yes, eventually. The goal is developers won’t need to use them manually anymore.

Q6: What’s the difference between manual memoization and React Compiler?
A6: 
   - Manual: You decide where to use memo/useMemo/useCallback.
   - Compiler: Automatically applies memoization at build time, smarter and safer.

Q7: Can I use React Compiler today in my project?
A7: Not fully. It’s experimental, available in React Labs, and may be included in future stable releases.

===================================================
*/
