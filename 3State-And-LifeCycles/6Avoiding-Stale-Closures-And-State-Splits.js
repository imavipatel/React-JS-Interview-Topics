/*  
====================================================
📘 React Notes – Avoiding Stale Closures & State Splits
====================================================

🔹 Two common problems in React state management:
1. **Stale Closures** – when a function captures "old state" because it was created in an earlier render.  
2. **State Splits** – when related data is split across multiple `useState` calls, making it harder to update consistently.

----------------------------------------------------
1️⃣ Stale Closures Problem
----------------------------------------------------
- React functions capture variables from the render they were created in.  
- If you reference state directly inside async functions, timers, or effects → you may get an **old value**.

Example:
*/

import React, { useState, useEffect } from "react";

function TimerStale() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // ❌ Problem: "count" is always 0 because closure captured initial state
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <p>Count: {count}</p>;
}

/*  
----------------------------------------------------
2️⃣ Fixing Stale Closures with Functional Updates
----------------------------------------------------
✅ Always use the functional form of setState when the new value depends on the old one.
*/

function TimerFixed() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => prev + 1); // ✅ Uses latest state
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <p>Count: {count}</p>;
}

/*  
----------------------------------------------------
3️⃣ Another Fix: useRef for Stable Values
----------------------------------------------------
- `useRef` stores a mutable value that survives re-renders.  
- Useful when closures need to "see" the latest value without re-subscribing.
*/

function TimerWithRef() {
  const [count, setCount] = useState(0);
  const countRef = React.useRef(count);

  useEffect(() => {
    countRef.current = count; // keep ref updated
  }, [count]);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(countRef.current + 1); // ✅ Always latest
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <p>Count: {count}</p>;
}

/*  
----------------------------------------------------
4️⃣ State Splits Problem
----------------------------------------------------
- Beginners often use many `useState` calls for related pieces of state.
- Example: user profile stored in multiple states.
*/

function ProfileBad() {
  const [name, setName] = useState("Alice");
  const [age, setAge] = useState(25);
  const [city, setCity] = useState("Delhi");

  // ❌ Updating related fields separately may cause inconsistent state
  return (
    <p>
      {name}, {age}, {city}
    </p>
  );
}

/*  
----------------------------------------------------
5️⃣ Fixing State Splits – Use Objects or Reducers
----------------------------------------------------
✅ Group related data into one state object (or use useReducer for complex logic).
*/

function ProfileGood() {
  const [profile, setProfile] = useState({
    name: "Alice",
    age: 25,
    city: "Delhi",
  });

  const updateCity = () => setProfile((prev) => ({ ...prev, city: "Mumbai" }));

  return (
    <p>
      {profile.name}, {profile.age}, {profile.city}
    </p>
  );
}

/*  
Alternative: useReducer for complex state updates
*/
function ProfileWithReducer() {
  const reducer = (state, action) => {
    switch (action.type) {
      case "updateCity":
        return { ...state, city: action.payload };
      default:
        return state;
    }
  };

  const [profile, dispatch] = React.useReducer(reducer, {
    name: "Alice",
    age: 25,
    city: "Delhi",
  });

  return (
    <div>
      <p>
        {profile.name}, {profile.age}, {profile.city}
      </p>
      <button
        onClick={() => dispatch({ type: "updateCity", payload: "Mumbai" })}
      >
        Move to Mumbai
      </button>
    </div>
  );
}

/*  
----------------------------------------------------
6️⃣ Key Rules to Avoid Stale Closures & State Splits
----------------------------------------------------
- ✅ Use functional updates (`setState(prev => ...)`) when state depends on the previous value.
- ✅ Use `useRef` for stable values across renders without re-subscribing.
- ✅ Group related state into objects or reducers.
- ❌ Avoid splitting related data into too many `useState`s.
- ❌ Don’t rely on direct state inside async callbacks without functional updates.

----------------------------------------------------
❓ Q & A Section
----------------------------------------------------
Q1: What is a stale closure in React?  
👉 When a function "remembers" old state/props due to closures from previous renders.

Q2: How to fix stale closures?  
👉 Use functional updates (`prev => prev + 1`) or refs (`useRef`) to access latest state.

Q3: What is state splitting?  
👉 Storing related pieces of state separately, causing harder updates and bugs.

Q4: How to avoid state splits?  
👉 Group related data in objects or use `useReducer`.

Q5: When should I use multiple useState instead of one object?  
👉 When states are independent and don’t need to update together.

====================================================
End of Notes 🚀
====================================================
*/
