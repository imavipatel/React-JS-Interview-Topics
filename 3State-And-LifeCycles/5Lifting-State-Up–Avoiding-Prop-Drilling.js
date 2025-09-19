/*  
====================================================
📘 React Notes – Lifting State Up (Avoiding Prop Drilling)
====================================================

🔹 **Prop drilling problem**: When data is passed through multiple layers of components unnecessarily.  
🔹 **Lifting state up**: Moving the shared state to the nearest common parent so children can access/update it without deep prop passing.

----------------------------------------------------
1️⃣ What is Prop Drilling?
----------------------------------------------------
- Passing props through many components that don’t need them, just to reach a child.
- Makes code harder to maintain and refactor.

Example: Passing `count` and `setCount` through multiple layers.

----------------------------------------------------
2️⃣ Without Lifting State (Prop Drilling Example)
----------------------------------------------------
*/

import React, { useState } from "react";

function GrandParent() {
  const [count, setCount] = useState(0);

  return <Parent count={count} setCount={setCount} />;
}

function Parent({ count, setCount }) {
  // ❌ Parent doesn’t need count, but still passes it down
  return <Child count={count} setCount={setCount} />;
}

function Child({ count, setCount }) {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

/*  
Problem: `Parent` is forced to receive and forward props it doesn’t use.  
This is called **prop drilling**. 
*/

/*  
----------------------------------------------------
3️⃣ With Lifting State Up (Better Approach)
----------------------------------------------------
*/

function GrandParentLifted() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* ✅ State is managed here and directly passed to children that need it */}
      <ChildDisplay count={count} />
      <ChildControls setCount={setCount} />
    </div>
  );
}

function ChildDisplay({ count }) {
  return <p>Count: {count}</p>;
}

function ChildControls({ setCount }) {
  return (
    <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
  );
}

/*  
✅ Advantages of lifting state up:
- No unnecessary prop drilling.
- Components only receive what they need.
- Easier to manage shared state.
*/

/*  
----------------------------------------------------
4️⃣ When to Lift State
----------------------------------------------------
✔️ When multiple components need to **share the same data**.  
✔️ When parent needs to **coordinate child behavior**.  
✔️ When avoiding duplication of the same state in different components.  

⚠️ But: Don’t lift state too high unnecessarily → can cause unrelated re-renders.
*/

/*  
----------------------------------------------------
5️⃣ Alternatives to Lifting State (for big apps)
----------------------------------------------------
- Context API → share state globally without drilling.  
- State management libraries → Redux, Zustand, Jotai, Recoil.  
- Event emitters / custom hooks → for specific communication.  
*/

/*  
----------------------------------------------------
❓ Q & A Section
----------------------------------------------------
Q1: What does "lifting state up" mean?  
👉 Moving state to the closest common parent so children can share it.

Q2: Why is prop drilling bad?  
👉 It forces components to pass props they don’t use, making code harder to maintain.

Q3: How does lifting state help avoid prop drilling?  
👉 Children directly receive props from a parent instead of through multiple layers.

Q4: When should you lift state up?  
👉 When two or more components depend on the same state.

Q5: What are alternatives to lifting state up?  
👉 Context API or state management libraries for larger/global state.

====================================================
End of Notes 🚀
====================================================

*/
