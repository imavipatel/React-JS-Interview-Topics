/**
 * 📘 React Notes
 * Topic: Controlled vs Uncontrolled Components
 *
 * Beginner Friendly Explanation:
 * ------------------------------
 * In React, forms (like input, textarea, select) can be handled in 2 ways:
 * 1. Controlled Components → React controls the form data using state.
 * 2. Uncontrolled Components → The DOM (browser) controls the form data, React just reads it.
 *
 * ✅ Controlled Components
 * -------------------------
 * - The input value is stored in React state.
 * - Every change is handled by an `onChange` function.
 * - React is the "single source of truth".
 * - Easier to validate, manipulate, or reset data.
 *
 * Example:
 */

import React, { useState, useRef } from "react";

const ControlledInput = () => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value); // React state stores value
  };

  return (
    <div>
      <h3>Controlled Input</h3>
      <input type="text" value={text} onChange={handleChange} />
      <p>You typed: {text}</p>
    </div>
  );
};

/**
 * ✅ Uncontrolled Components
 * ---------------------------
 * - The input value is stored in the DOM itself (not React state).
 * - We access it using refs (`useRef`).
 * - Simpler for quick forms but harder to manage validations.
 *
 * Example:
 */

const UncontrolledInput = () => {
  const inputRef = useRef();

  const showValue = () => {
    alert(`You typed: ${inputRef.current.value}`); // read directly from DOM
  };

  return (
    <div>
      <h3>Uncontrolled Input</h3>
      <input type="text" ref={inputRef} />
      <button onClick={showValue}>Show Value</button>
    </div>
  );
};

/**
 * ✅ Key Differences:
 * -------------------
 * Controlled:
 *   - React manages value via state.
 *   - Easy to validate and manipulate.
 *   - More code but predictable.
 *
 * Uncontrolled:
 *   - DOM manages value.
 *   - Less code, quicker setup.
 *   - Harder to validate, less predictable.
 *
 * 🚀 Best Practice:
 * - Use Controlled Components for most cases (forms, validation).
 * - Use Uncontrolled only for simple cases (like uncontrolled file inputs).
 */

/**
 * ===============================
 * Q & A (Interview Style)
 * ===============================
 *
 * Q1: What is the main difference between controlled and uncontrolled components?
 * A1: Controlled components store form data in React state, while uncontrolled components let
 *     the DOM handle the data and React just reads it using refs.
 *
 * Q2: Which one is better for form validation?
 * A2: Controlled components, because React always has the latest value in its state,
 *     making validation easy.
 *
 * Q3: Can we mix controlled and uncontrolled components?
 * A3: Technically yes, but it can create confusion. Best practice is to stick with one approach.
 *
 * Q4: Give an example where uncontrolled components are useful.
 * A4: For file inputs (`<input type="file" />`), uncontrolled is easier since file handling is
 *     done by the browser, and React just reads the file reference.
 */
