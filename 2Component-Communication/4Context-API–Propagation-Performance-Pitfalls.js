/**
 * 📘 React Notes: Context API – Propagation & Performance Pitfalls
 *
 * Beginner Friendly Explanation:
 * ---------------------------------
 * Context API = A way to share data across the component tree
 * without passing props manually at every level (avoids prop drilling).
 *
 * 🔹 How it works:
 * - `React.createContext()` → makes a Context object.
 * - `Provider` → wraps parent, provides a value.
 * - `useContext()` → child can directly access the value.
 *
 * ✅ Example: Using Context
 */
const UserContext = React.createContext();

const GrandChild = () => {
  const user = React.useContext(UserContext);
  return <h3>👤 User: {user}</h3>;
};

const Parent = () => {
  const user = "Avi";
  return (
    <UserContext.Provider value={user}>
      <GrandChild /> {/* no prop drilling */}
    </UserContext.Provider>
  );
};

/**
 * ----------------------------------------------------
 * ⚡ Propagation (How updates flow in Context)
 * ----------------------------------------------------
 * - When the value inside a Provider changes:
 *   👉 React re-renders ALL components that consume that context.
 * - Even if the child doesn’t use the changed part of the context,
 *   it still re-renders.
 *
 * ✅ Example: Performance Issue
 */
const ThemeContext = React.createContext();

const ChildA = () => {
  const theme = React.useContext(ThemeContext);
  console.log("ChildA re-rendered");
  return <p>Theme: {theme}</p>;
};

const ChildB = () => {
  console.log("ChildB re-rendered (even if it doesn’t care about theme)");
  return <p>I don’t use theme</p>;
};

const App = () => {
  const [theme, setTheme] = React.useState("light");

  return (
    <ThemeContext.Provider value={theme}>
      <ChildA />
      <ChildB /> {/* Still re-renders when theme changes */}
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </ThemeContext.Provider>
  );
};

/**
 * ----------------------------------------------------
 * 🚨 Performance Pitfalls
 * ----------------------------------------------------
 * 1. **Unnecessary re-renders**:
 *    - All consumers of a context re-render when the value changes.
 *
 * 2. **Large contexts slow down**:
 *    - If you store too much (big objects/arrays) in context, changes cause
 *      many components to re-render unnecessarily.
 *
 * 3. **Context not selective**:
 *    - Unlike Redux or Zustand, Context doesn’t have selectors.
 *    - All consumers get notified of ANY change.
 */

/**
 * ✅ Solutions to Performance Pitfalls
 * ----------------------------------------------------
 * 1. **Split Contexts**:
 *    - Instead of one giant context, create multiple smaller ones.
 *    - Example: `ThemeContext`, `AuthContext`, `SettingsContext`.
 *
 * 2. **Memoize Value**:
 *    - Wrap Provider value in `useMemo` so it only changes when necessary.
 */
const AuthContext = React.createContext();

const ParentWithMemo = ({ user }) => {
  const value = React.useMemo(() => ({ user }), [user]);

  return (
    <AuthContext.Provider value={value}>
      <SomeChild />
    </AuthContext.Provider>
  );
};

/**
 * 3. **Selector Libraries**:
 *    - Use libraries like Zustand, Jotai, or Redux for selective subscriptions.
 *    - They allow only specific parts of state to trigger re-renders.
 *
 * 4. **Render Props / Composition**:
 *    - Sometimes simpler patterns (like passing children or props directly)
 *      are more efficient than context.
 */

/**
 * -----------------------------------------------------------------
 * 🔑 Key Takeaways
 * -----------------------------------------------------------------
 * 1. Context solves prop drilling but introduces re-render pitfalls.
 * 2. Any change in Provider value causes all consumers to re-render.
 * 3. Avoid putting frequently changing or large data in Context.
 * 4. Use multiple contexts, memoization, or state management libraries for optimization.
 * 5. Context is best for global, rarely changing data (e.g., theme, language, auth).
 */

/**
 * -----------------------------------------------------------------
 * ❓ Q & A Section (Interview Style)
 * -----------------------------------------------------------------
 *
 * Q1: What is Context API used for?
 * A1: To share data across component trees without prop drilling.
 *
 * Q2: What is the main performance problem with Context?
 * A2: All components that consume the context re-render whenever
 *     the Provider’s value changes.
 *
 * Q3: How can you optimize Context re-renders?
 * A3: Split contexts, memoize values with `useMemo`, or use state libraries
 *     like Redux/Zustand.
 *
 * Q4: When should you avoid Context?
 * A4: When the data changes frequently or when you need selective subscriptions.
 *
 * Q5: What type of data is best for Context?
 * A5: Global but stable values like theme, language, authentication state.
 */
