/*  
====================================================
📘 React Notes – Class Lifecycle Methods & Equivalent Hooks
====================================================

🔹 In React, **Class Components** use lifecycle methods.
🔹 **Functional Components** use **Hooks** to achieve the same behavior.
🔹 Hooks are easier, cleaner, and more common in modern React.

----------------------------------------------------
1️⃣ Class Lifecycle Phases
----------------------------------------------------
A React class component has 3 main phases:

1. **Mounting (when component is created & added to DOM)**
   - constructor()
   - static getDerivedStateFromProps()
   - render()
   - componentDidMount()

2. **Updating (when props or state change, causing re-render)**
   - static getDerivedStateFromProps()
   - shouldComponentUpdate()
   - render()
   - getSnapshotBeforeUpdate()
   - componentDidUpdate()

3. **Unmounting (when component is removed from DOM)**
   - componentWillUnmount()

----------------------------------------------------
2️⃣ Equivalent Hooks for Each Lifecycle
----------------------------------------------------

🔹 **Mounting**
- `componentDidMount` → `useEffect(() => { ... }, [])`

🔹 **Updating**
- `componentDidUpdate` → `useEffect(() => { ... }, [dependencies])`
- `shouldComponentUpdate` → `React.memo` + `useCallback` / `useMemo`
- `getSnapshotBeforeUpdate` → `useLayoutEffect`

🔹 **Unmounting**
- `componentWillUnmount` → cleanup function inside `useEffect`

----------------------------------------------------
3️⃣ Example: Simple Counter
----------------------------------------------------

// ✅ Class Component Example
class CounterClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log("Constructor: state initialized");
  }

  componentDidMount() {
    console.log("componentDidMount: Component mounted");
    document.title = `Count: ${this.state.count}`;
  }

  componentDidUpdate() {
    console.log("componentDidUpdate: Component updated");
    document.title = `Count: ${this.state.count}`;
  }

  componentWillUnmount() {
    console.log("componentWillUnmount: cleanup");
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}

// ✅ Functional Component with Hooks
import { useEffect, useState } from "react";

function CounterHook() {
  const [count, setCount] = useState(0);

  // componentDidMount + componentDidUpdate
  useEffect(() => {
    console.log("useEffect: runs after render (mount + update)");
    document.title = `Count: ${count}`;
  }, [count]);

  // componentDidMount (only once) + componentWillUnmount
  useEffect(() => {
    console.log("useEffect []: runs once (mount)");
    return () => {
      console.log("Cleanup inside useEffect []: runs on unmount");
    };
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
    </div>
  );
}

----------------------------------------------------
4️⃣ Example: API Data Fetching (Class vs Hooks)
----------------------------------------------------

// ✅ Class Component
class UsersClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [], loading: true };
  }

  componentDidMount() {
    console.log("Fetching users in class component...");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => this.setState({ users: data, loading: false }));
  }

  render() {
    if (this.state.loading) return <p>Loading...</p>;
    return (
      <ul>
        {this.state.users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    );
  }
}

// ✅ Functional Component with Hooks
function UsersHook() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching users in functional component...");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []); // runs once

  if (loading) return <p>Loading...</p>;
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

----------------------------------------------------
5️⃣ Side-by-Side Mapping Table
----------------------------------------------------
| Class Lifecycle Method       | Equivalent Hook / Pattern                 |
|------------------------------|--------------------------------------------|
| constructor                  | useState (initialize state)               |
| getDerivedStateFromProps     | useEffect (with props dependency)         |
| render                       | return (JSX in functional component)      |
| componentDidMount            | useEffect(() => {...}, [])                |
| shouldComponentUpdate        | React.memo / useMemo / useCallback        |
| getSnapshotBeforeUpdate      | useLayoutEffect                           |
| componentDidUpdate           | useEffect(() => {...}, [deps])            |
| componentWillUnmount         | return cleanup() inside useEffect         |

----------------------------------------------------
6️⃣ Key Differences
----------------------------------------------------
- **Class Components** → verbose, multiple lifecycle methods, harder to reuse logic.
- **Functional Components with Hooks** → concise, easier to share logic via custom hooks.
- Hooks combine lifecycle phases into **useEffect** (with different dependency arrays).

----------------------------------------------------
❓ Q & A Section
----------------------------------------------------
Q1: Why were hooks introduced?  
👉 To simplify logic, avoid complexity of lifecycle methods, and make code more reusable.

Q2: Can we use both lifecycle methods and hooks in the same component?  
👉 No. Lifecycle methods are for **class components**, hooks are for **functional components**.

Q3: When should I use `useLayoutEffect` instead of `useEffect`?  
👉 Use `useLayoutEffect` when you need to **measure DOM before paint** (e.g., scroll, dimensions).

Q4: Which one should I prefer for new projects?  
👉 Always prefer **functional components + hooks**, as they are the modern React standard.

Q5: Show a real-world difference between class vs hooks for API fetch.  
👉 ✅ Added above: `UsersClass` (with `componentDidMount`) vs `UsersHook` (with `useEffect([])`).

====================================================
End of Notes 🚀
====================================================
*/
