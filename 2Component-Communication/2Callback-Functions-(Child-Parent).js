/**
 * 📘 React Notes: Callback Functions (Child → Parent Communication)
 *
 * Beginner Friendly Explanation:
 * ---------------------------------
 * Normally, data flows one way in React: Parent → Child (via props).
 * But sometimes the **child component needs to send data or events back to the parent**.
 *
 * ❓ How do we do that?
 * 👉 By passing a **function as a prop** from the parent to the child.
 * 👉 The child calls this function, and the parent receives the data.
 *
 * Think of it like this:
 * - Parent gives child a "phone number" (callback function).
 * - Child "calls" the parent when something happens (e.g., button click).
 *
 * ✅ Example 1: Child sends simple message to Parent
 */
const Child = ({ sendMessageToParent }) => {
  return (
    <button onClick={() => sendMessageToParent("Hello from Child!")}>
      Send Message
    </button>
  );
};

const Parent = () => {
  const handleMessage = (msg) => {
    alert("Parent received: " + msg);
  };

  return <Child sendMessageToParent={handleMessage} />;
};

// Output when clicking: "Parent received: Hello from Child!"

/**
 * ✅ Example 2: Child sends form data to Parent
 */
const FormChild = ({ onSubmit }) => {
  const handleSubmit = () => {
    const data = { name: "Avi", age: 25 };
    onSubmit(data); // passing object back to parent
  };

  return <button onClick={handleSubmit}>Submit Form</button>;
};

const FormParent = () => {
  const handleFormData = (formData) => {
    console.log("Form data received in Parent:", formData);
  };

  return <FormChild onSubmit={handleFormData} />;
};

/**
 * ✅ Example 3: Child toggles state in Parent
 */
const ToggleChild = ({ onToggle }) => {
  return <button onClick={() => onToggle()}>Toggle</button>;
};

const ToggleParent = () => {
  const [isOn, setIsOn] = React.useState(false);

  const toggleHandler = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <div>
      <p>Status: {isOn ? "ON ✅" : "OFF ❌"}</p>
      <ToggleChild onToggle={toggleHandler} />
    </div>
  );
};

/**
 * -----------------------------------------------------------------
 * 🔑 Key Takeaways
 * -----------------------------------------------------------------
 * 1. React data flow is one-way: Parent → Child.
 * 2. To send data Child → Parent, pass a callback function as a prop.
 * 3. Child calls that function with arguments (data/events).
 * 4. Parent defines the logic of what happens with that data.
 * 5. Useful for forms, buttons, toggles, or any event in child.
 */

/**
 * -----------------------------------------------------------------
 * ❓ Q & A Section (Interview Style)
 * -----------------------------------------------------------------
 *
 * Q1: Can child components directly change parent state?
 * A1: No, child cannot directly modify parent state.
 *     Instead, parent passes a callback, and child triggers it.
 *
 * Q2: What is a callback function in React props?
 * A2: It’s a function defined in the parent and passed to the child as a prop.
 *     The child calls it to communicate back to the parent.
 *
 * Q3: Why do we use callbacks instead of changing props directly?
 * A3: Because props are read-only. Callbacks keep the one-way data flow intact.
 *
 * Q4: Can a callback send objects/arrays from child to parent?
 * A4: Yes, callback functions can send any JavaScript data type back to the parent.
 *
 * Q5: What are real-life use cases of callbacks (child → parent)?
 * A5:
 *     - Child button tells parent to update state.
 *     - Child form sends data to parent for saving.
 *     - Child input field notifies parent on changes.
 */
