/*
====================================================
📘 React Notes – Future: Async Context API Proposal
====================================================

React is exploring an **Async Context API** to allow context values to be asynchronous,
making it easier to fetch and provide data without blocking UI updates.

Key Idea
- Traditional Context API provides synchronous values.
- Async Context allows context providers to handle promises.
- Useful for fetching data from APIs or performing async operations before providing context.

Benefits
- Reduce prop drilling for async data.
- Avoid loading states in multiple components.
- Simplifies handling of data fetching at the context level.
*/

// Example: Async User Context (Conceptual)
import React, { createContext, useContext, useState, useEffect } from "react";

const AsyncUserContext = createContext();

export function AsyncUserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/current-user");
      const data = await res.json();
      setUser(data);
      setLoading(false);
    }
    fetchUser();
  }, []);

  return (
    <AsyncUserContext.Provider value={{ user, loading }}>
      {children}
    </AsyncUserContext.Provider>
  );
}

export function useAsyncUser() {
  return useContext(AsyncUserContext);
}

// Usage Example
function UserProfile() {
  const { user, loading } = useAsyncUser();

  if (loading) return <p>Loading user...</p>;
  return <p>Welcome, {user.name}!</p>;
}

/*
Notes
- Async Context API is a proposal and may change.
- React may introduce built-in support for async context handling in the future.
- Currently, developers need to manage async state inside context providers manually.

Q & A Section
Q1: What problem does Async Context solve?  
👉 It provides a way to supply async values through context without extra prop drilling.

Q2: Is this available in stable React?  
👉 Not yet, it’s a proposal. Current approach uses async inside context providers.

Q3: How does it help with loading states?  
👉 Loading states can be centralized in the context provider instead of in every component.

Q4: Can this work with suspense?  
👉 Yes, it can integrate with React Suspense for async data handling.

====================================================
End of Notes 🚀
====================================================
*/
