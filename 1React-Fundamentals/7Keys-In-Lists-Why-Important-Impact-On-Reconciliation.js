/* 
===================================================
📘 Keys in Lists – Why Important & Impact on Reconciliation
===================================================

🔑 What are Keys?
- Keys are special string attributes you give to elements in a list.
- Example: <li key={item.id}>{item.name}</li>
- React uses keys to identify which items have changed, been added, or removed.

Think of keys like "unique IDs" for React elements.

===================================================
*/

// ------------------------------
// 1. Example Without Keys
// ------------------------------
/*
If you don’t give keys, React uses index as a fallback.
This can cause bugs when list items change order or are updated.
*/

function BadList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li> // ❌ using index as key
      ))}
    </ul>
  );
}

// ------------------------------
// 2. Example With Proper Keys
// ------------------------------
/*
Better: Use something unique and stable (like id).
*/

function GoodList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li> // ✅ using unique id as key
      ))}
    </ul>
  );
}

// ------------------------------
// 3. Why Keys Are Important
// ------------------------------
/*
When React updates the DOM (Reconciliation):

- Without keys:
   React may destroy and recreate DOM nodes unnecessarily.
   This can cause performance issues and bugs (like losing input focus).

- With proper keys:
   React reuses existing DOM nodes when possible.
   Only changes what’s actually different.
   This makes updates faster and safer.
*/

/* 
-------------------------------
ASCII Diagram (Impact of Keys)
-------------------------------

Suppose we have a list: [A, B, C]

Case 1: Without Keys
- Update: [B, A, C]
- React thinks all items changed
- Re-renders entire list ❌

Case 2: With Keys
- Update: [B, A, C] (with unique IDs)
- React sees: A ↔ A, B ↔ B, C ↔ C
- Only swaps positions efficiently ✅
*/

// ------------------------------
// 4. Key Rules
// ------------------------------
/*
✅ Keys should be unique among siblings.
✅ Best: Use database IDs or unique identifiers.
⚠️ Don’t use array indexes unless the list is static (never changes).
⚠️ Keys are not passed as props (they’re used internally by React).
*/

// ------------------------------
// 5. Quick Recap
// ------------------------------
/*
🟢 Keys help React identify elements in a list.
🟢 Proper keys = efficient reconciliation (faster updates).
🟢 Wrong keys (like index) = bugs + unnecessary re-renders.
🟢 Keys must be stable and unique.
*/

/* 
===================================================
❓ Q & A Section (Interview Style)
===================================================

Q1: What are keys in React?
A1: Keys are unique identifiers for elements in a list. They help React track which items changed, added, or removed.

Q2: Why are keys important?
A2: They make reconciliation efficient by allowing React to reuse existing DOM elements instead of re-rendering everything.

Q3: What happens if we don’t use keys?
A3: React falls back to using array indexes. This can cause bugs (like losing input focus) and extra re-rendering.

Q4: Why should we avoid using index as key?
A4: Because if list order changes, React may mix up elements, causing unexpected behavior.

Q5: Do keys get passed as props to the component?
A5: No. Keys are only used internally by React’s reconciliation process.

Q6: What is the best choice for a key?
A6: A unique and stable value like an item’s ID from the database.

Q7: What happens in reconciliation when keys are wrong?
A7: React may destroy and recreate DOM nodes unnecessarily, leading to performance issues.

===================================================
*/
