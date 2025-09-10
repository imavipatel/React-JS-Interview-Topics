/* 
===================================================
📘 JSX & Babel Transpilation – Notes
===================================================
JSX (JavaScript XML) is a syntax extension for JavaScript used in React.
Browsers do not understand JSX directly, so Babel transpiles JSX into
React.createElement() calls.
===================================================
*/

// ------------------------------
// 1. JSX Example
// ------------------------------
const elementJSX = <h1>Hello, World!</h1>;

/*
Babel transpiles into:
*/
const elementBabel = React.createElement("h1", null, "Hello, World!");

// ------------------------------
// 2. JSX with Props
// ------------------------------
const elementJSXProps = <h1 className="title">Hello World</h1>;

/*
Babel transpiles into:
*/
const elementBabelProps = React.createElement(
  "h1",
  { className: "title" },
  "Hello World"
);

// ------------------------------
// 3. Nested JSX
// ------------------------------
const nestedJSX = (
  <div id="container">
    <h1>Hello</h1>
    <p>World</p>
  </div>
);

/*
Babel transpiles into:
*/
const nestedBabel = React.createElement(
  "div",
  { id: "container" },
  React.createElement("h1", null, "Hello"),
  React.createElement("p", null, "World")
);

// ------------------------------
// 4. JSX with Components
// ------------------------------
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const componentJSX = <Welcome name="Avi" />;

/*
Babel transpiles into:
*/
function WelcomeBabel(props) {
  return React.createElement("h1", null, "Hello, ", props.name);
}

const componentBabel = React.createElement(Welcome, { name: "Avi" });

// ------------------------------
// 5. React.createElement – Signature
// ------------------------------
/*
React.createElement(type, props, ...children)

- type: string (for HTML tags) OR Component function/class
- props: object with attributes, event handlers, etc.
- children: nested elements or strings
*/

// Example
const example = React.createElement(
  "button",
  { onClick: () => alert("Clicked!") },
  "Click Me"
);

// Returns React element object:
const exampleObject = {
  type: "button",
  props: {
    onClick: () => alert("Clicked!"),
    children: "Click Me",
  },
};

// ------------------------------
// 6. Quick Recap (Mind Map)
// ------------------------------
/*
JSX → Babel → React.createElement → React element (JS object)
    → React DOM → Actual DOM update
*/

// ✅ JSX is just syntactic sugar for React.createElement.
// ✅ React.createElement returns a plain JS object (React element).
// ✅ React DOM uses reconciliation to update the real DOM efficiently.

/* 
===================================================
❓ Q & A Section (Interview Style)
===================================================
Q1: What is JSX?
A1: JSX is a syntax extension for JavaScript, used in React to describe UI.
    It looks like HTML but compiles to React.createElement().

Q2: Why do we need Babel for JSX?
A2: Browsers don’t understand JSX directly. Babel transpiles JSX into
    React.createElement() calls which browsers can run as plain JS.

Q3: What does React.createElement() return?
A3: It returns a plain JavaScript object (called a React element), which
    represents a virtual DOM node.

Q4: What is the signature of React.createElement()?
A4: React.createElement(type, props, ...children)

Q5: What is the difference between JSX and React.createElement?
A5: JSX is syntactic sugar, easier to read/write.
    React.createElement is what JSX compiles to behind the scenes.

Q6: Is JSX mandatory in React?
A6: No. You can use React without JSX by writing React.createElement()
    directly, but JSX makes code much more readable.

Q7: How does nested JSX translate into React.createElement calls?
A7: Nested JSX creates nested React.createElement() calls.
    Example:
      <div><h1>Hello</h1></div>
    ➝ React.createElement("div", null, React.createElement("h1", null, "Hello"))

Q8: When JSX is transpiled, what kind of structure do we get?
A8: A tree of JavaScript objects (React elements) which React uses in
    reconciliation to update the real DOM.

===================================================
*/
