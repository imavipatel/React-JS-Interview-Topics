/*
📌 Virtualization in React
===========================

🎯 Problem:
- Rendering large lists (e.g., 10,000+ items) directly in React is expensive.
- React tries to render all DOM nodes → memory + performance bottleneck.
- Scrolling becomes laggy, slow re-renders.

🛠️ Solution → Virtualization
- Render only what’s visible in the viewport (plus a small buffer).
- As user scrolls, old items unmount & new items mount dynamically.
- Libraries:
  * react-window (lighter, newer)
  * react-virtualized (feature-rich, older, larger bundle)

----------------------------------------
1️⃣ react-window
----------------------------------------
- Lightweight & modern.
- Focus on performance.
- Good for most list/grid use-cases.

Key Components:
- FixedSizeList → for fixed-height rows.
- VariableSizeList → for dynamic row heights.
- FixedSizeGrid / VariableSizeGrid → for 2D virtualization.

Example:
*/

import { FixedSizeList as List } from "react-window";

function Row({ index, style }) {
  return <div style={style}>Row {index}</div>;
}

export default function App() {
  return (
    <List
      height={400}   // viewport height
      itemCount={1000} // total items
      itemSize={35}    // row height
      width={300}
    >
      {Row}
    </List>
  );
}

/*
Benefits:
- Simple API.
- Small bundle (~2KB gzipped).
- Great for most production apps.

----------------------------------------
2️⃣ react-virtualized
----------------------------------------
- Older, more features than react-window.
- Heavier (~30KB+).
- Good if you need:
  * Infinite scrolling
  * Dynamic cell measurement
  * Masonry layouts
  * AutoSizer, CellMeasurer utilities

Example:
*/

import { List, AutoSizer } from "react-virtualized";

function rowRenderer({ key, index, style }) {
  return (
    <div key={key} style={style}>
      Row {index}
    </div>
  );
}

export default function App() {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          width={width}
          height={height}
          rowCount={1000}
          rowHeight={30}
          rowRenderer={rowRenderer}
        />
      )}
    </AutoSizer>
  );
}

/*
----------------------------------------
3️⃣ Comparison
----------------------------------------
react-window:
- ✅ Smaller, faster, modern.
- ✅ Easier to use.
- ❌ Fewer features (no built-in CellMeasurer, Masonry).
- ✅ Preferred for most modern apps.

react-virtualized:
- ✅ Rich feature set (infinite loader, cell measurement).
- ❌ Heavier bundle size.
- ❌ API slightly more complex.
- ⚡ Good for advanced use-cases.

----------------------------------------
4️⃣ Best Practices
----------------------------------------
- Always measure container height (AutoSizer useful).
- Avoid inline style recalculation → use memoization for rows.
- Use stable keys → avoid unnecessary re-renders.
- Prefer react-window unless you need advanced features.
- For dynamic row heights in react-window → use VariableSizeList.

🚀 Outcome:
- Smooth scrolling, reduced memory usage, better UX for large lists.
*/
