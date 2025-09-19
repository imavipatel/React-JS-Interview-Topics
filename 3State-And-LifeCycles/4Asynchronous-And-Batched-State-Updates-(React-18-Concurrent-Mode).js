/*  
====================================================
📘 React Notes – Asynchronous & Batched State Updates (React 18 Concurrent Mode)
====================================================

🔹 In React 18+, state updates are **asynchronous** and **batched by default**, even inside event handlers.  
🔹 This improves performance and avoids unnecessary re-renders.

----------------------------------------------------
1️⃣ What is Batched Updates?
----------------------------------------------------
- **Before React 18**: Only updates inside React event handlers were batched.
- **After React 18**: All updates (event handlers, promises, setTimeout, etc.) are automatically batched.

- **Batched update** = multiple state updates combined into a single render.

----------------------------------------------------
2️⃣ Example: Before React 18 (Not Batched)
----------------------------------------------------
import React, { useState } from "react";

function CounterOld() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const handleClick = () => {
    setCount1(count1 + 1);
    setCount2(count2 + 1);
    console.log(count1, count2); // ❌ shows old state
  };

  return (
    <div>
      <p>Count1: {count1}</p>
      <p>Count2: {count2}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}

/* 
- Each setState triggered a separate render.
- console.log showed old state values because setState is async.
*/

/*
----------------------------------------------------
3️⃣ Example: React 18 Batched Updates
----------------------------------------------------
*/
import React, { useState } from "react";

function CounterNew() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const handleClick = () => {
    setCount1((prev) => prev + 1);
    setCount2((prev) => prev + 1);
    console.log("Inside event:", count1, count2); // still shows old values
  };

  return (
    <div>
      <p>Count1: {count1}</p>
      <p>Count2: {count2}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}

/*
✅ Both state updates are batched into a single re-render.
- Performance improves.
- You avoid multiple re-renders for sequential updates.
*/
/*
----------------------------------------------------
4️⃣ Asynchronous Updates with Promises or setTimeout
----------------------------------------------------
*/
function CounterAsync() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setTimeout(() => {
      setCount((prev) => prev + 1);
      setCount((prev) => prev + 1);
      // ✅ In React 18, these are batched even inside setTimeout
    }, 1000);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment Async</button>
    </div>
  );
}

/*
Before React 18:
- setTimeout updates would trigger separate renders.
- After React 18:
- Updates are automatically batched for better performance.
*/

/*

----------------------------------------------------
5️⃣ Key Points
----------------------------------------------------
- React 18 introduces **automatic batching** for all updates.
- State updates inside promises, timeouts, and events are **combined** into one render.
- Always use **functional updates** (`prev => prev + 1`) when updating state multiple times.
- React uses **concurrent mode** to schedule renders efficiently.
- console.log immediately after setState may show old value because updates are async.

----------------------------------------------------
❓ Q & A Section
----------------------------------------------------
Q1: What is batching in React?  
👉 Combining multiple state updates into a single render for performance.

Q2: Is batching automatic in React 18?  
👉 Yes, all updates are batched by default, even outside event handlers.

Q3: Why do we use functional updates like `prev => prev + 1`?  
👉 Because state updates are async and previous state may not reflect immediately.

Q4: Does batching affect how the UI looks?  
👉 No, UI will render correctly, but fewer renders happen internally.

Q5: How does concurrent mode help with async updates?  
👉 It schedules multiple updates efficiently without blocking the main thread.

====================================================
End of Notes 🚀
====================================================

*/
