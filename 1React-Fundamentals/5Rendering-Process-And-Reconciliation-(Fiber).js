/* 
===================================================
📘 Rendering Process & Reconciliation (Fiber)
===================================================

React's job is to update the UI efficiently when data (state/props) changes.

🔑 Key Terms:
- Rendering: Turning React components into UI elements (DOM nodes).
- Reconciliation: Deciding what changes need to be made to the actual DOM.
- Fiber: React's internal engine/architecture that makes rendering faster and smoother.

===================================================
*/

// ------------------------------
// 1. Rendering in React
// ------------------------------
/*
Step 1: You write JSX → Babel converts it → React.createElement.
Step 2: React builds a Virtual DOM tree (a lightweight copy of Real DOM).
Step 3: When data changes, React re-renders the component tree virtually.
Step 4: React compares new Virtual DOM with old one (Diffing).
Step 5: React updates only the changed parts in Real DOM.

This makes updates FAST compared to directly changing the Real DOM.
*/

// Example: Only the changed text updates, not the entire <div>
function Example() {
  return (
    <div>
      <p>Hello World!</p>
    </div>
  );
}

/* 
-------------------------------
ASCII Diagram (Rendering Flow)
-------------------------------

JSX ----> Virtual DOM ----> Diffing ----> Real DOM Update
*/

// ------------------------------
// 2. Reconciliation
// ------------------------------
/*
Reconciliation = "how React updates the DOM efficiently."

- React compares old Virtual DOM with new Virtual DOM.
- Uses an algorithm called "Diffing":
   1. If element type is different → remove old, add new.
   2. If same type → update only changed attributes/props.
   3. For lists → keys help React identify elements.
- Goal: Avoid touching the entire DOM, only update what's necessary.
*/

// Example: List rendering with keys
function ItemList(props) {
  return (
    <ul>
      {props.items.map((item) => (
        <li key={item.id}>{item.name}</li> // keys help reconciliation
      ))}
    </ul>
  );
}

// ------------------------------
// 3. Fiber (React 16+)
// ------------------------------
/*
Fiber = React's new reconciliation engine (introduced in React 16).

Why Fiber?
- Old React (Stack Reconciler) worked synchronously (once started, couldn't stop).
- With big trees, UI froze until updates finished.
- Fiber allows async rendering → breaking work into chunks.

How Fiber works:
- Splits rendering work into units called "fibers".
- Prioritizes updates (high priority = user typing, low priority = background tasks).
- Can pause, reuse, and abort rendering tasks.
- Improves performance for complex apps.

Think of Fiber as: "React’s scheduler + diffing engine".
*/

/* 
-------------------------------
ASCII Diagram (Fiber Concept)
-------------------------------

Without Fiber (old):
------------------------------------
[ Work starts ] ------> [ Work ends ]
(UI freezes until done)

With Fiber:
------------------------------------
[ Small Work ] → [ Pause ] → [ Resume ] → [ Commit ]
(UI stays responsive)
*/

// ------------------------------
// 4. Quick Recap
// ------------------------------
/*
🟢 Rendering:
   - JSX → Virtual DOM → Diff → Real DOM
   - Fast because React updates only changed parts

🟢 Reconciliation:
   - Process of comparing old vs new Virtual DOM
   - Uses keys for list optimization
   - Avoids re-rendering everything

🟢 Fiber:
   - Internal engine since React 16
   - Supports async rendering
   - Breaks work into chunks
   - Prioritizes updates (better UX)
*/

/* 
===================================================
❓ Q & A Section (Interview Style)
===================================================

Q1: What is rendering in React?
A1: The process of turning JSX into Virtual DOM, then updating the Real DOM with changes.

Q2: What is reconciliation?
A2: The process React uses to figure out what changed in the Virtual DOM and update only those parts in the Real DOM.

Q3: Why does React use Virtual DOM?
A3: Directly changing Real DOM is slow. Virtual DOM makes it faster by only updating what's necessary.

Q4: What is the role of "keys" in reconciliation?
A4: Keys help React identify which list items changed, added, or removed. Without keys, React may re-render unnecessarily.

Q5: What is Fiber in React?
A5: Fiber is React’s internal engine (from React 16) that handles rendering in small units, allows async updates, and improves performance.

Q6: How does Fiber improve performance?
A6: It breaks rendering work into chunks, can pause/resume, and prioritizes important tasks like user input over less urgent updates.

Q7: What happens if two elements have the same type during reconciliation?
A7: React updates their attributes/props instead of recreating the element.

Q8: What happens if element types are different?
A8: React destroys the old one and creates a new one.

===================================================
*/
