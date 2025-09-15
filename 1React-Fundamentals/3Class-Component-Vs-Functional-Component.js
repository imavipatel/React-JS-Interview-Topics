/* 
===================================================
📘 React Components – Functional vs Class
===================================================
In React, components are building blocks of the UI.
There are two main types: Functional Components and Class Components.
===================================================
*/

// ------------------------------
// 1. Functional Components
// ------------------------------
/*
- These are simple JavaScript functions.
- They accept props (input data) and return JSX (UI).
- Introduced first in React, but now with Hooks they can handle state and lifecycle too.
- Easier to read, write, and test.

✅ Best for modern React development.
*/

function GreetingFunctional(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Usage
const element1 = <GreetingFunctional name="Avi" />;

// ------------------------------
// 2. Class Components
// ------------------------------
/*
- These are ES6 classes that extend React.Component.
- They must have a render() method which returns JSX.
- Before Hooks, Class components were the only way to use state & lifecycle methods.
- More boilerplate code compared to functional components.

⚠ In modern React (16.8+), Hooks made functional components more powerful, so class components are less common now.
*/

class GreetingClass extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

// Usage
const element2 = <GreetingClass name="Avi" />;

// ------------------------------
// 3. State Management Difference
// ------------------------------
/*
Functional Component with Hooks:
*/

import { useState } from "react";

function CounterFunctional() {
  const [count, setCount] = useState(0); // useState Hook for state
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

/*
Class Component with State:
*/

class CounterClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 }; // state stored in "this.state"
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

// ------------------------------
// 4. Lifecycle Methods vs Hooks
// ------------------------------
/*
Class Components have lifecycle methods like:
- componentDidMount()
- componentDidUpdate()
- componentWillUnmount()

Functional Components use Hooks instead:
- useEffect(() => { ... }, [])  // replaces componentDidMount
- useEffect(() => { ... }, [deps])  // replaces componentDidUpdate
- useEffect(() => { return () => {...}}, [])  // replaces componentWillUnmount
*/

// ------------------------------
// 5. Quick Recap (Comparison)
// ------------------------------
/*
🟢 Functional Component:
   - Simple function
   - Uses Hooks (useState, useEffect, etc.)
   - Less code, easier to read
   - Preferred in modern React

🟢 Class Component:
   - ES6 class extending React.Component
   - Uses this.state and lifecycle methods
   - More boilerplate code
   - Older style, still works but less used now
*/

/* 
===================================================
❓ Q & A Section (Interview Style)
===================================================

Q1: What is the main difference between Functional and Class components?
A1: Functional components are functions that return JSX. 
    Class components are ES6 classes that extend React.Component and use a render() method.

Q2: Can functional components have state?
A2: Yes, since React 16.8, functional components can use Hooks like useState and useEffect for state and lifecycle.

Q3: Which one is recommended today?
A3: Functional components with Hooks are recommended because they are simpler, shorter, and more powerful.

Q4: How do you handle lifecycle in class vs functional components?
A4: 
   - Class ➝ lifecycle methods (componentDidMount, componentDidUpdate, etc.).
   - Functional ➝ Hooks (useEffect).

Q5: Are class components still supported?
A5: Yes, they are fully supported, but new code usually uses functional components.

Q6: Why did React introduce Hooks?
A6: To make functional components capable of handling state and side effects, 
    reducing the need for class components and making code more reusable.

Q7: Example: How would you create a counter in both?
A7: 
   - Functional: useState Hook for state.
   - Class: use this.state and this.setState().

Q8: Which is easier for beginners?
A8: Functional components are easier to learn and write because they look like simple JavaScript functions.
===================================================
*/
