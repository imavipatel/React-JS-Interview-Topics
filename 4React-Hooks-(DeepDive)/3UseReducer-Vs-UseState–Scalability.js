/*
====================================================
📘 React Notes – useReducer vs useState (Scalability)
====================================================

🔹 Both `useState` and `useReducer` are hooks for managing state.  
They serve different purposes depending on complexity and scalability.

----------------------------------------------------
1️⃣ useState – Simple Local State
----------------------------------------------------
- Best for simple, independent state values.
- Returns `[state, setState]`.
- Easy to use, minimal boilerplate.

✅ Example:
*/
import { useState, useReducer } from "react";

function CounterWithState() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>➕ Increment</button>
      <button onClick={() => setCount(count - 1)}>➖ Decrement</button>
    </div>
  );
}

/*
⚡ When to use:
- Simple UI toggles (open/close modal).
- Small counters.
- Single field form input.

----------------------------------------------------
2️⃣ useReducer – Complex / Scalable State
----------------------------------------------------
- Best for **complex state logic** or when multiple values depend on each other.
- State is managed by a **reducer function**: `(state, action) => newState`.
- Good for scaling as state grows.

✅ Example:
*/
function CounterWithReducer() {
  const initialState = { count: 0 };

  function reducer(state, action) {
    switch (action.type) {
      case "increment":
        return { count: state.count + 1 };
      case "decrement":
        return { count: state.count - 1 };
      case "reset":
        return { count: 0 };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>
        ➕ Increment
      </button>
      <button onClick={() => dispatch({ type: "decrement" })}>
        ➖ Decrement
      </button>
      <button onClick={() => dispatch({ type: "reset" })}>🔄 Reset</button>
    </div>
  );
}

/*
⚡ When to use:
- Multiple related state transitions.
- Complex forms (with many inputs).
- Scenarios where state update logic is reused.
- When scaling up state logic for maintainability.

----------------------------------------------------
3️⃣ Comparison: useState vs useReducer
----------------------------------------------------
| Feature           | useState                           | useReducer                          |
|-------------------|-------------------------------------|-------------------------------------|
| Syntax            | Simple: [state, setState]          | Complex: [state, dispatch]          |
| Best for          | Local, simple state                | Complex, structured state           |
| State updates     | Direct with setState               | Via actions & reducer function      |
| Boilerplate       | Minimal                            | More code, but organized            |
| Scalability       | Less scalable as state grows       | Very scalable with complex logic    |
| Debugging         | Harder when state logic grows      | Easier with action logs, reducer    |

----------------------------------------------------
4️⃣ When to Choose Which?
----------------------------------------------------
✔️ Use `useState` if:
   - State is simple.
   - You only need a setter.
   - Example: toggles, counters, small forms.

✔️ Use `useReducer` if:
   - State has multiple sub-values.
   - Logic is complex (many conditions).
   - Multiple actions modify the same state.
   - State needs to be predictable & maintainable.

----------------------------------------------------
5️⃣ Example: Form Management
----------------------------------------------------
// ❌ Using useState → messy
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

// ✅ Using useReducer → cleaner
const formReducer = (state, action) => {
  return { ...state, [action.field]: action.value };
};

const [form, dispatch] = useReducer(formReducer, {
  name: "",
  email: "",
  password: "",
});

// Usage
<input
  value={form.name}
  onChange={(e) => dispatch({ field: "name", value: e.target.value })}
/>

/*
----------------------------------------------------
❓ Q & A
----------------------------------------------------
Q1: What is the main difference between `useState` and `useReducer`?  
👉 `useState` manages simple state directly, while `useReducer` uses actions and a reducer for complex state logic.

Q2: Which one is more scalable?  
👉 `useReducer` is more scalable, especially for complex or interdependent state.

Q3: Can we replace all `useState` with `useReducer`?  
👉 Yes, but it’s overkill for simple cases. Use the right tool for the job.

Q4: Why is `useReducer` good for debugging?  
👉 Because state updates are action-driven, making it easier to track and log changes.

====================================================
End of Notes 🚀
====================================================
*/
