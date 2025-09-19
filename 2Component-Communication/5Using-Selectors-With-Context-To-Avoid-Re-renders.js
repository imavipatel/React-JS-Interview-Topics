/**
 * 📘 React Notes
 * Topic: Using Selectors with Context to Avoid Re-renders
 *
 * Beginner Friendly Explanation:
 * ------------------------------
 * - When we use React Context, every component that reads the context will re-render
 *   whenever the context value changes.
 * - This can cause performance issues if many components depend on the same context.
 *
 * Example Problem:
 * ----------------
 * Imagine we have a Context that stores a user object:
 *   { name: "Avi", age: 25, theme: "dark" }
 *
 * If ANY property changes (like "theme"), all components using the context re-render,
 * even if they only care about "name".
 *
 * ✅ Solution: Use "selectors"
 * ----------------------------
 * - Instead of giving components the entire context value,
 *   give them only the specific piece of data they need.
 * - This reduces unnecessary re-renders.
 *
 * How to Do It:
 * -------------
 * 1. Create Context with full state.
 * 2. Create custom hooks (selectors) that extract specific values.
 * 3. Use these hooks inside components, so only relevant parts cause re-renders.
 *
 * Example Implementation:
 */

import React, { createContext, useContext, useState, useMemo } from "react";

// 1. Create Context
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Avi",
    age: 25,
    theme: "dark",
  });

  // memoize value to avoid re-creating object
  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// 2. Selector hooks
export const useUserName = () => {
  const { user } = useContext(UserContext);
  return user.name; // only name
};

export const useUserTheme = () => {
  const { user } = useContext(UserContext);
  return user.theme; // only theme
};

// 3. Components using selectors
const ShowName = () => {
  const name = useUserName();
  console.log("Render: ShowName");
  return <h1>{name}</h1>;
};

const ShowTheme = () => {
  const theme = useUserTheme();
  console.log("Render: ShowTheme");
  return <p>Theme: {theme}</p>;
};

/**
 * Why This Works:
 * ---------------
 * - React re-renders a component when the props/state/context it uses changes.
 * - If we only "read" part of the context using selectors, only that part triggers re-render.
 * - This prevents components from updating when unrelated context values change.
 *
 * 🚀 Benefit: Better performance in large apps.
 */

/**
 * ===============================
 * Q & A (Interview Style)
 * ===============================
 *
 * Q1: Why does using full context value cause too many re-renders?
 * A1: Because React re-renders every component that reads the context whenever the entire value changes,
 *     even if the component only uses a small part.
 *
 * Q2: How do selectors improve performance?
 * A2: By giving components only the specific part of the context they need,
 *     so only relevant updates trigger re-renders.
 *
 * Q3: Can we combine selectors with memoization?
 * A3: Yes, using `useMemo` ensures context value object references are stable,
 *     reducing unnecessary renders even further.
 *
 * Q4: What are some other alternatives if context re-renders become a big issue?
 * A4: Options include Redux, Zustand, Jotai, or using libraries like `use-context-selector`
 *     which give built-in selector support for Context.
 */
