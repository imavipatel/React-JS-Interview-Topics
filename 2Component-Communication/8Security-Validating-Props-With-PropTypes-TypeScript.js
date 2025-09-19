/**
 * 📘 React Notes
 * Topic: Security – Validating Props with PropTypes / TypeScript
 *
 * Beginner Friendly Explanation:
 * ------------------------------
 * - In React, components receive data through props.
 * - If props are wrong (wrong type, missing, unexpected data),
 *   it can cause bugs and even security risks (like unsafe rendering).
 *
 * ✅ Two ways to validate props:
 * 1. PropTypes (built-in React package, runtime validation)
 * 2. TypeScript (static type checking at compile time)
 *
 * Both approaches help make sure components are used safely and correctly.
 */

import React from "react";
import PropTypes from "prop-types";

/**
 * ===============================
 * Example 1: Using PropTypes
 * ===============================
 */

const UserProfile = ({ name, age, isAdmin }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>Age: {age}</p>
      {isAdmin && <p>🔒 Admin Access</p>}
    </div>
  );
};

// PropTypes validation
UserProfile.propTypes = {
  name: PropTypes.string.isRequired, // must be a string
  age: PropTypes.number, // must be a number
  isAdmin: PropTypes.bool, // must be a boolean
};

// Default props (safety fallback)
UserProfile.defaultProps = {
  age: 18,
  isAdmin: false,
};

/**
 * ✅ Why PropTypes?
 * -----------------
 * - Catches errors during development.
 * - Prevents invalid data from breaking components.
 * - Example: If "age" was passed as a string → Warning shown in console.
 */

/**
 * ===============================
 * Example 2: Using TypeScript
 * ===============================
 *
 * With TypeScript, we use interfaces or types to define props.
 * TypeScript checks before compiling, so we catch errors early.
 */

// TypeScript version (just for understanding, not runnable in plain JS):
/*
type UserProfileProps = {
  name: string;
  age?: number;
  isAdmin?: boolean;
};

const UserProfileTS: React.FC<UserProfileProps> = ({ name, age = 18, isAdmin = false }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>Age: {age}</p>
      {isAdmin && <p>🔒 Admin Access</p>}
    </div>
  );
};
*/

/**
 * ✅ Why TypeScript?
 * ------------------
 * - Stronger safety: Errors are caught before running the app.
 * - Helps with auto-complete, documentation, and fewer bugs.
 * - Prevents passing unexpected props at compile-time.
 */

/**
 * 🚨 Security Angle:
 * ------------------
 * - Validating props ensures malicious or invalid data does not slip in.
 * - Prevents issues like rendering unsafe HTML or breaking UI.
 * - Example: If expecting `number` but receive `<script>hack()</script>`,
 *   PropTypes/TypeScript validation will warn or block it.
 */

/**
 * ===============================
 * Q & A (Interview Style)
 * ===============================
 *
 * Q1: Why do we validate props in React?
 * A1: To ensure components receive the correct data, prevent bugs,
 *     and reduce security risks from unexpected/malicious input.
 *
 * Q2: What’s the difference between PropTypes and TypeScript?
 * A2: PropTypes → runtime validation (errors shown in console).
 *     TypeScript → compile-time validation (errors before running).
 *
 * Q3: Which one is more powerful?
 * A3: TypeScript, because it prevents mistakes before execution
 *     and provides IDE support. But PropTypes is useful in plain JS projects.
 *
 * Q4: How does this improve security?
 * A4: By preventing unsafe or unexpected props (like wrong types or injected data)
 *     from reaching sensitive parts of the app, reducing risks like XSS or crashes.
 */
