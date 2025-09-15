/* 
===================================================
📘 Props vs State – Immutability & Data Flow
===================================================
React apps are built using components. Components can receive "data" in two ways:
- Props (data passed from outside)
- State (data managed inside the component)
===================================================
*/

// ------------------------------
// 1. Props (Properties)
// ------------------------------
/*
- Props are like function arguments.
- Data is passed *into* a component from a parent.
- Read-only: A component cannot change its own props.
- Immutable: Once given, you should not modify props directly.
- Help make components reusable and predictable.
*/

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Usage:
const element1 = <Welcome name="Avi" />;
// "name" is a prop given by the parent component

// ------------------------------
// 2. State
// ------------------------------
/*
- State is data that belongs to a component itself.
- Managed inside the component (local state).
- A component can change its state with setState (class) or useState (function).
- When state changes, React re-renders the component.
- Mutable (can change), but must be updated in an immutable way (never change directly).
*/

import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0); // useState Hook

  return (
    <div>
      <p>Count: {count}</p>
      {/* update state immutably using setCount */}
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// ------------------------------
// 3. Immutability
// ------------------------------
/*
- Both props and state should be treated as immutable.
- Immutable means: Do not change the value directly.
- Instead, create a new object/array/value and update it.

Example (❌ wrong way):
state.list.push(newItem); // modifies original array directly

Example (✅ correct way):
setList([...state.list, newItem]); // creates new array with old + new
*/

// ------------------------------
// 4. Data Flow in React
// ------------------------------
/*
- React has a "one-way data flow" (top-down).
- Parent passes data to child via props.
- Child cannot change props, but can notify parent using callbacks.
- State is owned by a specific component; can be passed down to children as props.
*/

// Parent -> Child data flow
function Child(props) {
  return <p>Message from parent: {props.message}</p>;
}

function Parent() {
  return <Child message="Hello Child!" />;
}

// ------------------------------
// 5. Quick Recap (Comparison)
// ------------------------------
/*
🟢 Props:
   - Passed from parent
   - Read-only
   - Immutable
   - Makes components reusable
   - Example: <Button color="red" />

🟢 State:
   - Managed inside component
   - Mutable (but updated immutably)
   - Causes re-render when changed
   - Example: useState, this.setState
*/

/* 
===================================================
❓ Q & A Section (Interview Style)
===================================================

Q1: What are props in React?
A1: Props are inputs to a component, passed from the parent. They are read-only and cannot be changed by the component itself.

Q2: What is state in React?
A2: State is local data managed by a component. It can change over time using setState (class) or useState (function).

Q3: What does "immutability" mean in React?
A3: It means we should never modify props or state directly. Instead, we create a new copy of data and update it. This makes React updates predictable and efficient.

Q4: What happens when state changes?
A4: React re-renders the component with the new state value.

Q5: Can props be changed by the component itself?
A5: No, props are immutable. Only the parent component can pass new props.

Q6: How is data flow handled in React?
A6: Data flows one way (top-down). Parents pass props to children. If children need to update parent data, they use callback functions provided via props.

Q7: Example: If you want a child to update parent state, how do you do it?
A7: Pass a function from parent as a prop to the child. Child calls that function to notify parent.

Q8: Which should you use, props or state?
A8: 
   - Use props when the component needs data from outside.
   - Use state when the component needs to manage its own data internally.

===================================================
*/
