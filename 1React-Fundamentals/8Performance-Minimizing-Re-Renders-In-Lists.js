/* 
===================================================
📘 Performance: Minimizing Re-renders in Lists
===================================================

Problem:
- Lists in React can re-render many times when state/props change.
- Unnecessary re-renders = slow performance (especially for large lists).

Goal:
- Optimize list rendering so React only updates what’s needed.

===================================================
*/

// ------------------------------
// 1. Why Re-renders Happen in Lists
// ------------------------------
/*
- Parent component re-renders → child list re-renders too.
- Missing or wrong keys cause React to rebuild items.
- Inline functions or objects in props create "new references".
- Large lists (1000+ items) can be slow if all re-render.
*/

// ------------------------------
// 2. Best Practices to Minimize Re-renders
// ------------------------------

/*
✅ Use proper keys:
   - Always use unique, stable keys (like id).
   - Avoid using index as a key.

✅ Use React.memo:
   - Prevents re-render if props didn’t change.
*/

import React, { memo } from "react";

const ListItem = memo(function ListItem({ item }) {
  console.log("Rendering:", item.name);
  return <li>{item.name}</li>;
});

function ItemList({ items }) {
  return (
    <ul>
      {items.map((it) => (
        <ListItem key={it.id} item={it} />
      ))}
    </ul>
  );
}

/*
✅ Use useCallback & useMemo for functions/values passed as props
   - Prevents creating a new function/object on every render.
*/

import { useCallback } from "react";

function Parent({ items }) {
  const handleClick = useCallback((id) => {
    console.log("Clicked:", id);
  }, []);

  return (
    <ul>
      {items.map((it) => (
        <button key={it.id} onClick={() => handleClick(it.id)}>
          {it.name}
        </button>
      ))}
    </ul>
  );
}

/*
✅ Virtualize long lists:
   - Use libraries like react-window or react-virtualized.
   - Renders only items visible on the screen, not the whole list.
*/

import { FixedSizeList as VirtualList } from "react-window";

function BigList({ items }) {
  return (
    <VirtualList
      height={200}
      itemCount={items.length}
      itemSize={35}
      width={300}
    >
      {({ index, style }) => <div style={style}>{items[index]}</div>}
    </VirtualList>
  );
}

// ------------------------------
// 3. ASCII Diagram
// ------------------------------

/*
Without optimization:
--------------------------------
Parent re-renders → All list items re-render (slow)

With optimization:
--------------------------------
Parent re-renders → Only changed items re-render (fast)
*/

// ------------------------------
// 4. Quick Recap
// ------------------------------
/*
🟢 Use unique keys for lists.
🟢 Wrap list items with React.memo to avoid re-renders.
🟢 Use useCallback / useMemo for stable props & functions.
🟢 For huge lists → use virtualization (react-window, react-virtualized).
🟢 Avoid unnecessary inline functions or objects in props.
*/

/* 
===================================================
❓ Q & A Section (Interview Style)
===================================================

Q1: Why do lists re-render in React?
A1: Because when parent re-renders, all child items also re-render, even if only one item changed.

Q2: How do keys help minimize re-renders?
A2: Keys let React match old and new items, so only changed ones update instead of re-rendering the whole list.

Q3: What does React.memo do for list items?
A3: React.memo prevents a component from re-rendering if its props haven’t changed.

Q4: Why should we use useCallback with lists?
A4: Without useCallback, new function references are created on every render, causing unnecessary re-renders.

Q5: What is list virtualization?
A5: A performance technique where only visible items are rendered to the DOM, saving memory and CPU.

Q6: Which libraries can we use for virtualization?
A6: react-window, react-virtualized.

Q7: Should we always use index as a key?
A7: No. Use index only if the list is static and never changes. Otherwise, use stable unique keys.

Q8: What’s the best way to handle a list with thousands of items?
A8: Use virtualization (react-window/react-virtualized) so only a small portion is rendered at once.

===================================================
*/
