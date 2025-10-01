/*
📌 Avoiding Unnecessary Re-renders with Selectors & Memoization
==============================================================

🎯 Problem:
- In React/Redux apps, components often re-render even if the data they need didn’t change.
- Causes:
  * Passing new object/array references as props.
  * State shape → component subscribes to large slices (re-renders when unrelated data changes).
  * Inline functions not memoized.
  * Shallow comparisons failing for deep data.

🛠️ Solutions:
1️⃣ Use Selectors
2️⃣ Use Memoization
3️⃣ Combine with React.memo / PureComponent
----------------------------------------------

1️⃣ Selectors
-------------
- Functions that extract specific pieces of state from Redux store.
- Avoids re-rendering due to unrelated state changes.
- Can be memoized with libraries like **Reselect**.

Benefits:
- Encapsulates state access logic.
- Avoids recalculation of derived data.
- Works well with React.memo.

Example (without selector):
*/

const mapStateToProps1 = (state) => ({
  user: state.user, // gives entire user object
  transactions: state.txn, // component re-renders even if only user changes
});

/*
Example (with selector + reselect):
*/

import { createSelector } from "reselect";

const selectUser = (state) => state.user;
const selectTxn = (state) => state.txn;

const selectUserName = createSelector(
  [selectUser],
  (user) => user.name // memoized → recalculates only if `user` changes
);

const mapStateToProps2 = (state) => ({
  userName: selectUserName(state),
});

/*
----------------------------------------------
2️⃣ Memoization
---------------
- Caches results of expensive computations.
- Avoids recalculating derived data unless inputs change.
- In React:
  * React.memo → memoize component rendering
  * useMemo → memoize computed values
  * useCallback → memoize functions

Example (expensive computation):
*/

import React, { useMemo } from "react";

function ExpensiveList({ items }) {
  const sortedItems = useMemo(() => {
    console.log("Sorting...");
    return [...items].sort();
  }, [items]);

  return (
    <ul>
      {sortedItems.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

/*
----------------------------------------------
3️⃣ Selectors + React.memo
---------------------------
- Selectors reduce props → less re-render triggers.
- React.memo stops unnecessary re-render if props unchanged.

Example:
*/

const UserInfo = React.memo(({ name }) => {
  console.log("UserInfo rendered");
  return <div>{name}</div>;
});

const mapStateToProps = (state) => ({
  name: selectUserName(state), // only name, not full user object
});

/*
----------------------------------------------
📌 Best Practices
- Always select the smallest possible slice of state.
- Use Reselect or custom memoization for derived data.
- Wrap pure functional components with React.memo.
- Use useCallback for functions passed as props.
- Normalize Redux state (avoid nested structures causing deep compares).
- Avoid inline object/array literals in props → memoize them with useMemo.

🚀 Outcome:
- Prevents unnecessary renders → improves performance in large React/Redux apps.
*/
