/**
 * 📘 React Notes: Prop Drilling Problem & Alternatives
 *
 * Beginner Friendly Explanation:
 * ---------------------------------
 * 🔹 Prop Drilling = When you pass props through multiple layers of components,
 *    even if only the last (deepest) child actually needs the data.
 *
 * - Problem: Too many "unnecessary" props being passed around.
 * - Code becomes hard to read, maintain, and refactor.
 *
 * ✅ Example 1: Prop Drilling Problem
 */
const GreatGrandChild = ({ user }) => {
  return <h3>User: {user}</h3>;
};

const GrandChild = ({ user }) => {
  return <GreatGrandChild user={user} />;
};

const Child = ({ user }) => {
  return <GrandChild user={user} />;
};

const Parent = () => {
  const user = "Avi";
  return <Child user={user} />; // user is passed down through every level
};

// ❌ Problem: Child & GrandChild don’t care about `user` but still pass it.

/**
 * ✅ Solution 1: React Context API (avoid prop drilling)
 * - Context provides a "global storage" that any child can access directly.
 */
const UserContext = React.createContext();

const GreatGrandChildFixed = () => {
  const user = React.useContext(UserContext);
  return <h3>User: {user}</h3>;
};

const ParentWithContext = () => {
  const user = "Avi";
  return (
    <UserContext.Provider value={user}>
      <Child /> {/* no need to pass user everywhere */}
    </UserContext.Provider>
  );
};

/**
 * ✅ Solution 2: State Management Libraries (Redux, Zustand, Recoil, Jotai, etc.)
 * - For larger apps, Context can get messy.
 * - Redux provides a central store where any component can "subscribe" to data.
 *
 * Example (conceptual, not full Redux code):
 *
 * const store = configureStore(...);
 * <Provider store={store}>
 *    <App />
 * </Provider>
 *
 * const user = useSelector((state) => state.user);
 * const dispatch = useDispatch();
 */

/**
 * ✅ Solution 3: Component Composition
 * - Instead of drilling props, pass needed JSX as `children` or render props.
 */
const Layout = ({ children }) => {
  return <div className="layout">{children}</div>;
};

const ParentWithComposition = () => {
  const user = "Avi";
  return (
    <Layout>
      <GreatGrandChild user={user} /> {/* directly pass where needed */}
    </Layout>
  );
};

/**
 * -----------------------------------------------------------------
 * 🔑 Key Takeaways
 * -----------------------------------------------------------------
 * 1. Prop Drilling = Passing props through components that don’t need them.
 * 2. Bad for readability & maintenance in deep component trees.
 * 3. Alternatives:
 *    - Context API (good for small/medium apps).
 *    - Redux / Zustand / Recoil (better for larger apps).
 *    - Component Composition (pass JSX instead of drilling props).
 */

/**
 * -----------------------------------------------------------------
 * ❓ Q & A Section (Interview Style)
 * -----------------------------------------------------------------
 *
 * Q1: What is prop drilling?
 * A1: Passing props through multiple components just to reach a deeply nested child,
 *     even if intermediate components don’t use those props.
 *
 * Q2: Why is prop drilling a problem?
 * A2: It makes code harder to read, maintain, and refactor.
 *     Small changes require updating multiple components.
 *
 * Q3: How do you solve prop drilling?
 * A3: Use Context API, state management libraries (Redux, Zustand, Recoil),
 *     or composition patterns.
 *
 * Q4: When should you use Context vs Redux?
 * A4: Use Context for small-medium apps with simple state.
 *     Use Redux (or others) when you have complex, shared, or large-scale state management.
 *
 * Q5: What is an alternative to props besides Context/Redux?
 * A5: Component composition → pass JSX directly instead of data props.
 */
