/*  
====================================================
📘 React Notes – Derived State Pitfalls & Alternatives
====================================================

🔹 "Derived state" = when you create component state from props.  
Example: copying a prop into state and then updating it separately.

⚠️ Problem: Derived state often leads to **bugs** because state doesn’t automatically update when props change.  
This causes the UI to go "out of sync".

----------------------------------------------------
1️⃣ Example of Derived State (Pitfall)
----------------------------------------------------
*/

// ❌ Bad Example – Derived State
import React, { useState, useEffect, useMemo } from "react";

function UserName({ initialName }) {
  const [name, setName] = useState(initialName); // derived from props

  // If parent changes "initialName", this state WON’T update automatically.
  return (
    <div>
      <p>Name: {name}</p>
      <button onClick={() => setName("NewName")}>Change</button>
    </div>
  );
}

/* 
Parent updates <UserName initialName="Bob" />  
❌ Still shows "Alice" (old state). 
*/

/*----------------------------------------------------
2️⃣ Pitfalls of Derived State
----------------------------------------------------
- ❌ Out of sync → props change but state doesn’t update.
- ❌ Duplicate data → same info exists in two places (props + state).
- ❌ Hard to debug → not clear which is the "real source".
- ❌ Extra re-renders → maintaining unnecessary state.
----------------------------------------------------
3️⃣ Correct Alternatives
----------------------------------------------------
*/

/* ✅ Alternative 1: Use props directly */
function UserNameDirect({ name }) {
  return <p>Name: {name}</p>;
}

/* ✅ Alternative 2: Compute values from props */
function Price({ amount, taxRate }) {
  const total = amount + amount * taxRate; // derived on the fly
  return <p>Total: {total}</p>;
}

/* ✅ Alternative 3: Use useMemo for heavy calculations */
function PriceWithMemo({ amount, taxRate }) {
  const total = useMemo(() => amount + amount * taxRate, [amount, taxRate]);
  return <p>Total: {total}</p>;
}

/* ✅ Alternative 4: Sync state with props carefully */
function EditableName({ initialName }) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName); // keep state in sync
  }, [initialName]);

  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}

/*----------------------------------------------------
4️⃣ When Derived State is OK
----------------------------------------------------
✔️ Form inputs – user can edit value that started from props.  
✔️ Animations – initial value comes from props but changes later.  
✔️ Performance – caching expensive calculations (useMemo is better).  

----------------------------------------------------
5️⃣ Key Rules to Avoid Pitfalls
----------------------------------------------------
- ✅ Prefer props directly over copying them into state.  
- ✅ If state is required, always sync it with useEffect.  
- ✅ Avoid duplication unless absolutely necessary.  
- ✅ Ask: "Can I calculate this from props instead of storing it?"

----------------------------------------------------
❓ Q & A Section
----------------------------------------------------
Q1: What is "derived state"?  
👉 State created from props (e.g., useState(props.value)).

Q2: Why is derived state dangerous?  
👉 It causes "stale UI" because it doesn’t update when props change.

Q3: How do you fix derived state problems?  
👉 Use props directly, compute values on the fly, or sync with useEffect.

Q4: When is derived state acceptable?  
👉 Editable forms, animations, or caching use cases.

Q5: Which modern tool helps avoid derived state?  
👉 useMemo for computed values, or just using props directly.

====================================================
End of Notes 🚀
====================================================

*/
