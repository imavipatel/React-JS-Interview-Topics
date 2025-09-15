/**
 * 📘 React Notes: Passing Props (Parent → Child)
 *
 * Beginner Friendly Explanation:
 * ---------------------------------
 * Props = "properties"
 * - They are used to send data from a **parent component** to a **child component**.
 * - Think of props like function arguments: parent passes values, child receives them.
 * - Props are **read-only** in child (cannot modify directly).
 *
 * ✅ Example 1: Simple Props Passing
 */
const Child = ({ name }) => {
  return <h1>Hello, {name} 👋</h1>;
};

const Parent = () => {
  return <Child name="Avi" />; // passing "Avi" as prop
};

// Output: Hello, Avi 👋

/**
 * ✅ Example 2: Passing Multiple Props
 */
const UserCard = ({ username, age }) => {
  return (
    <div>
      <p>👤 {username}</p>
      <p>🎂 {age} years old</p>
    </div>
  );
};

const App = () => {
  return <UserCard username="John" age={25} />;
};

/**
 * ✅ Example 3: Passing Functions as Props
 * (So child can "talk back" to parent)
 */
const Button = ({ onClick }) => {
  return <button onClick={onClick}>Click Me!</button>;
};

const ParentWithButton = () => {
  const handleClick = () => {
    alert("Button clicked in child, but handled by parent!");
  };

  return <Button onClick={handleClick} />;
};

/**
 * ✅ Example 4: Passing Objects/Arrays as Props
 */
const Profile = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
    </div>
  );
};

const ParentWithObject = () => {
  const userInfo = { name: "Alice", age: 30 };
  return <Profile user={userInfo} />;
};

/**
 * ✅ Example 5: Special Prop → props.children
 * -------------------------------------------
 * - React gives a special prop called `children`.
 * - It is used when you wrap JSX inside a component.
 * - This allows components to be more flexible.
 */
const Card = ({ children }) => {
  return (
    <div style={{ border: "2px solid black", padding: "10px" }}>{children}</div>
  );
};

const ParentWithChildren = () => {
  return (
    <Card>
      <h2>Title inside card</h2>
      <p>This content is passed as props.children</p>
    </Card>
  );
};

// Here, everything between <Card> ... </Card> becomes props.children.

/**
 * -----------------------------------------------------------------
 * 🔑 Key Takeaways
 * -----------------------------------------------------------------
 * 1. Props = way to send data parent → child.
 * 2. Child components cannot modify props (read-only).
 * 3. Props can be strings, numbers, arrays, objects, or functions.
 * 4. Functions passed as props = communication from child back to parent.
 * 5. Destructure props in child for cleaner code.
 * 6. `props.children` = special prop that holds nested JSX passed inside a component.
 */

/**
 * -----------------------------------------------------------------
 * ❓ Q & A Section (Interview Style)
 * -----------------------------------------------------------------
 *
 * Q1: What are props in React?
 * A1: Props (properties) are used to pass data from parent to child components.
 *
 * Q2: Are props mutable in the child component?
 * A2: No, props are read-only. Child cannot modify them directly.
 *
 * Q3: Can you pass a function as a prop?
 * A3: Yes, functions are often passed so that child can call them
 *     (e.g., for handling events in the parent).
 *
 * Q4: How do props differ from state?
 * A4: Props come from outside (parent) and are immutable inside the child,
 *     while state is managed inside the component itself and can change.
 *
 * Q5: Can props be objects or arrays?
 * A5: Yes, props can be any JavaScript data type, including arrays and objects.
 *
 * Q6: What is props.children?
 * A6: It’s a special prop that contains the JSX written between a component’s
 *     opening and closing tags. It allows creating wrapper components.
 *
 * Q7: When should you use props.children?
 * A7: When building reusable components like Cards, Modals, or Layouts
 *     where you don’t know in advance what content will be inside.
 */
