/*
====================================================
📘 React Notes – React.memo: Caveats & Deep Dive
====================================================

React.memo is a higher-order component (HOC) used to **memoize functional components**.
It prevents unnecessary re-renders when props haven't changed.

----------------------------------------------------
🔹 Key Idea
----------------------------------------------------
- Wrap a component with React.memo to optimize performance.
- React.memo does a **shallow comparison** of props by default.
- Only re-renders the component if props reference changes.

----------------------------------------------------
⚡ Caveats / Gotchas
----------------------------------------------------
1. **Shallow comparison**
   - Objects, arrays, and functions are compared by reference.
   - Passing a new object/array inline will always trigger re-render.

2. **Not always a performance win**
   - Memoization adds extra comparison overhead.
   - For cheap components, React.memo might be unnecessary.

3. **Props functions**
   - Use useCallback to memoize callbacks passed as props.

4. **State inside component**
   - React.memo only cares about props.
   - Internal state changes always trigger re-render.

----------------------------------------------------
✅ Example 1: Basic React.memo
----------------------------------------------------
*/
import React from "react";

const Child = React.memo(function Child({ value }) {
  console.log("Child rendered");
  return <p>{value}</p>;
});

function Parent() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child value="Hello" />
    </div>
  );
}

/*
----------------------------------------------------
✅ Example 2: Props function with useCallback
----------------------------------------------------
*/
import React, { useState, useCallback } from "react";

const Button = React.memo(({ onClick, label }) => {
  console.log("Button rendered");
  return <button onClick={onClick}>{label}</button>;
});

function Toolbar() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => setCount((c) => c + 1), []);

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={increment} label="Increment" />
    </div>
  );
}

/*
----------------------------------------------------
✅ Example 3: Pitfall with objects
----------------------------------------------------
*/
import React, { useState } from "react";

function Profile({ user }) {
  console.log("Profile rendered");
  return <p>{user.name}</p>;
}

const MemoProfile = React.memo(Profile);

function App() {
  const [count, setCount] = useState(0);
  const user = { name: "Alice" }; // new object each render!

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <MemoProfile user={user} />
    </div>
  );
}

/*
----------------------------------------------------
Notes
----------------------------------------------------
- React.memo is useful for expensive or frequently re-rendered components.
- Always consider shallow comparison limitations.
- Combine with useCallback/useMemo for best performance.

----------------------------------------------------
Q & A Section
----------------------------------------------------
Q1: What does React.memo do?  
👉 Memoizes functional components to prevent unnecessary re-renders.

Q2: Does React.memo deep compare props?  
👉 No, only shallow comparison by default.

Q3: How to prevent re-render when passing functions as props?  
👉 Use useCallback to memoize functions.

Q4: Should I wrap all components in React.memo?  
👉 No, only wrap expensive or frequently re-rendered components.

====================================================
End of Notes 🚀
====================================================
*/
