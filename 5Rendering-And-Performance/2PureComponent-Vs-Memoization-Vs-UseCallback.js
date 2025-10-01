/*
📌 PureComponent vs memoization vs useCallback
----------------------------------------------

1️⃣ React.PureComponent
- A base class for class components.
- Implements a shallow comparison of `props` and `state`.
- Prevents unnecessary re-renders if neither props nor state changed.
- Similar to React.Component but with automatic `shouldComponentUpdate`.

✅ Pros:
- Easy optimization for class components.
- Reduces boilerplate (no need to write `shouldComponentUpdate` manually).

⚠️ Cons:
- Shallow comparison → won't detect deep changes (objects/arrays).
- Works only with class components (not functional).

Example:
*/

import React, { PureComponent } from "react";

class MyClassComp extends PureComponent {
  render() {
    console.log("Rendered MyClassComp");
    return <div>{this.props.name}</div>;
  }
}

/*
----------------------------------------------
2️⃣ React.memo (Memoization for Functional Components)
- Higher Order Component (HOC).
- Wraps functional components.
- Does a shallow comparison of props.
- Prevents re-render if props are the same.

✅ Pros:
- Works for functional components.
- Easy drop-in optimization.
- Can accept custom comparator for deep check.

⚠️ Cons:
- Shallow comparison only (by default).
- Overuse may add overhead → unnecessary memory usage.

Example:
*/

import React from "react";

const MyFuncComp = React.memo(function MyFuncComp({ name }) {
  console.log("Rendered MyFuncComp");
  return <div>{name}</div>;
});

/*
----------------------------------------------
3️⃣ useCallback Hook
- Returns a memoized callback function.
- Prevents unnecessary re-creation of functions on every render.
- Useful when passing callbacks to children (that are memoized with React.memo).

✅ Pros:
- Prevents child components from re-rendering due to new function reference.
- Optimizes expensive event handlers.

⚠️ Cons:
- If dependencies array is large / unstable → may add complexity.
- Should be used wisely, otherwise no real gain.

Example:
*/

import React, { useState, useCallback } from "react";

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []); // same function instance across renders

  return <Child onClick={handleClick} />;
}

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click</button>;
});

/*
----------------------------------------------
📌 Key Differences
- PureComponent → Class components only, shallow compare props/state.
- React.memo → Functional components, shallow compare props.
- useCallback → Memoizes a function reference, often combined with React.memo to prevent child re-render.

📝 When to use:
- Class component → Prefer PureComponent.
- Functional component → Wrap with React.memo.
- Passing callback props → Use useCallback to stabilize function identity.
*/
