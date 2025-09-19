/**
 * 📘 React Notes
 * Topic: useState vs useReducer – When to use which
 *
 * Beginner Friendly Explanation:
 * ------------------------------
 * React gives us two hooks for managing state:
 *
 * 1. useState → Simple, local state (easy cases).
 * 2. useReducer → Complex state logic (multiple transitions, advanced cases).
 *
 * ✅ useState
 * ----------------
 * - Best for simple, independent state values.
 * - Directly sets and updates state.
 * - Easy and beginner-friendly.
 *
 * ✅ useReducer
 * ----------------
 * - Best for complex state with multiple conditions.
 * - Works like Redux: state changes are controlled by a reducer function.
 * - Easier to manage when state logic is advanced.
 *
 * Analogy:
 * --------
 * - useState = "Notepad" (quick, simple storage).
 * - useReducer = "Project Planner" (structured, handles many moving parts).
 */

import React, { useState, useReducer } from "react";

/**
 * ===============================
 * Example 1: useState
 * ===============================
 * Best for simple counters, toggles, input fields, etc.
 */

const CounterWithUseState = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>useState Counter: {count}</h3>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
};

/**
 * ===============================
 * Example 2: useReducer
 * ===============================
 * Best for complex state transitions.
 */

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

const CounterWithUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h3>useReducer Counter: {state.count}</h3>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
};

/**
 * ===============================
 * When to Use Which?
 * ===============================
 * - useState:
 *   * Simple state (booleans, numbers, strings).
 *   * Few state updates.
 *
 * - useReducer:
 *   * Complex state with many transitions.
 *   * Multiple related values (e.g., form with many fields).
 *   * When state logic needs to be predictable and testable.
 *
 * 🚀 Rule of Thumb:
 * Start with useState.
 * If state grows complex → switch to useReducer.
 */

/**
 * ===============================
 * Q & A (Interview Style)
 * ===============================
 *
 * Q1: What is the difference between useState and useReducer?
 * A1: useState is for simple state management, while useReducer
 *     handles complex state logic with multiple transitions.
 *
 * Q2: When should you prefer useReducer?
 * A2: When state updates depend on previous state OR when
 *     there are multiple actions that affect state differently.
 *
 * Q3: Is useReducer like Redux?
 * A3: Yes, it follows the same reducer pattern, but limited to one component
 *     (while Redux manages global state).
 *
 * Q4: Can you replace useState with useReducer always?
 * A4: Technically yes, but it adds unnecessary complexity
 *     for simple states like toggles or counters.
 *
 * Q5: Example where useReducer is better than useState?
 * A5: Managing a shopping cart (add, remove, update quantity, reset).
 */
