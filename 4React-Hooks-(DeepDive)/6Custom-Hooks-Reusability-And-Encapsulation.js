/*  
====================================================
📘 React Notes – Custom Hooks: Reusability & Encapsulation
====================================================

🔹 Custom hooks let us extract logic from components into reusable functions.  
They always start with `use` and can call other hooks inside.

✨ Benefits:
- **Reusability** → Share logic between multiple components.
- **Encapsulation** → Hide complex logic, expose only what’s needed.
- **Cleaner Components** → Components focus on UI, hooks handle logic.

----------------------------------------------------
1️⃣ Example – Without Custom Hook (Repetition)
----------------------------------------------------
*/
import React, { useState, useEffect } from "react";

function WindowSizeComponent1() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <p>Window width: {width}</p>;
}

function WindowSizeComponent2() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <p>Another width: {width}</p>;
}

/*
❌ Problem: Duplicate logic in both components.

----------------------------------------------------
2️⃣ Example – With Custom Hook (Reusable)
----------------------------------------------------
*/
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

function WindowComponentA() {
  const width = useWindowWidth();
  return <p>Window width: {width}</p>;
}

function WindowComponentB() {
  const width = useWindowWidth();
  return <p>Another width: {width}</p>;
}

/*
✅ Advantage: Logic is written once → used in multiple places.

----------------------------------------------------
3️⃣ Example – Encapsulation of Business Logic
----------------------------------------------------
*/
function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fakeLogin = setTimeout(() => setUser({ name: "Alice" }), 1000);
    return () => clearTimeout(fakeLogin);
  }, []);

  return user;
}

function Dashboard() {
  const user = useAuth();
  return <h1>Welcome {user ? user.name : "Guest"}</h1>;
}

/*
----------------------------------------------------
4️⃣ Key Rules of Custom Hooks
----------------------------------------------------
- Must start with `use` (naming convention).
- Can use other hooks (`useState`, `useEffect`, etc.).
- Should return state, values, or functions.
- Keep them pure → no direct rendering logic.

----------------------------------------------------
❓ Q & A Section
----------------------------------------------------
Q1: Why use custom hooks?  
👉 To reuse logic and keep components clean.

Q2: Can custom hooks return JSX?  
👉 No, they should only return values/functions, not UI.

Q3: Can one hook use another?  
👉 Yes, hooks are composable.

Q4: Do custom hooks replace Context/Redux?  
👉 No, they complement them by managing local logic.

Q5: What’s an example use case?  
👉 Authentication, form handling, fetching data, window resize tracking.

====================================================
End of Notes 🚀
====================================================
*/
