/* 
===================================================
📘 Virtual DOM vs Real DOM vs Shadow DOM – Notes (Easy Explanation)
===================================================
These are three different "DOM" concepts you will often hear about in web development.
React mainly uses the Virtual DOM, browsers have the Real DOM, and Web Components use Shadow DOM.
===================================================
*/

// ------------------------------
// 1. Real DOM (The Browser's DOM)
// ------------------------------
/*
- This is the actual DOM that the browser creates from your HTML.
- It is a tree of nodes (elements).
- Example: <div><h1>Hello</h1></div> becomes a tree in memory.
- When something changes (like innerHTML), the browser updates the DOM directly.

⚠ Problem:
- Changing one element can force the browser to re-check and repaint large
  parts of the page (slow when the page is big).
*/

const realDOMExample = document.createElement("div");
realDOMExample.innerHTML = "<h1>Hello World</h1>";
document.body.appendChild(realDOMExample);

// ------------------------------
// 2. Virtual DOM (React's Trick)
// ------------------------------
/*
- Virtual DOM is NOT in the browser. It’s just a plain JavaScript object
  that looks like the real DOM.
- React keeps this "virtual copy" of the UI in memory.

How it works:
1. You update state/props ➝ React updates Virtual DOM (fast, just JS).
2. React compares the new Virtual DOM with the old one (diffing).
3. React finds what changed and updates ONLY that part in the Real DOM.

✅ Benefit:
- Faster than updating the Real DOM directly all the time.
- Avoids re-rendering the whole page.
*/

const virtualDOMNode = {
  type: "h1",
  props: { className: "title", children: "Hello World" },
};
// This is just a JS object, not a real element.

// ------------------------------
// 3. Shadow DOM (Encapsulation)
// ------------------------------
/*
- Shadow DOM is a feature provided by browsers.
- It lets you attach a hidden, isolated DOM tree to an element.
- Styles and elements inside Shadow DOM don’t leak outside, and outside
  styles don’t leak in.
- Used for Web Components (like <video>, <input>, etc.).

Example:
*/

const host = document.createElement("div");
const shadow = host.attachShadow({ mode: "open" });
shadow.innerHTML = `<style>h1 { color: red; }</style><h1>Shadow DOM Title</h1>`;
document.body.appendChild(host);

/*
Here:
- <h1> inside shadow root is styled red.
- But outside <h1> elements are NOT affected.
*/

// ------------------------------
// 4. Quick Recap (Comparison)
// ------------------------------
/*
🟢 Real DOM:
   - The actual page structure in the browser.
   - Slow when updating many elements often.
   - Example: document.getElementById(), innerHTML.

🟢 Virtual DOM:
   - A copy of the DOM in JavaScript (used by React).
   - Makes updates faster by only changing what is needed.
   - Example: React elements via React.createElement().

🟢 Shadow DOM:
   - A hidden DOM tree inside an element.
   - Encapsulates styles/markup.
   - Example: Web Components, <video>, <input>.
*/

/* 
===================================================
❓ Q & A Section (Interview Style)
===================================================

Q1: What is the Real DOM?
A1: The Real DOM is the actual tree of elements that the browser creates 
    from your HTML. Changing it directly is slow because even small changes 
    can force the browser to update a lot of elements.

Q2: What is the Virtual DOM in React?
A2: The Virtual DOM is a lightweight copy of the Real DOM stored in memory 
    as JavaScript objects. React updates this first, compares it with the 
    old copy, and then updates only the parts that actually changed.

Q3: Why is the Virtual DOM faster?
A3: Because it avoids touching the Real DOM too often. React does the heavy 
    work in memory (fast) and only sends the minimum changes to the Real DOM.

Q4: What is the Shadow DOM used for?
A4: Shadow DOM is used to keep a component’s DOM and styles separate from 
    the rest of the page. It makes sure CSS doesn’t leak in or out. Used in 
    Web Components.

Q5: How is Shadow DOM different from Virtual DOM?
A5: 
   - Shadow DOM ➝ Encapsulation (hiding & scoping).
   - Virtual DOM ➝ Performance optimization (diffing & updating).
   - Different goals, both useful.

Q6: Do React and Shadow DOM work together?
A6: Yes, React can render into a Shadow DOM, but React itself doesn’t depend 
    on Shadow DOM. React mainly uses the Virtual DOM for efficiency.

Q7: Can you give an example of Shadow DOM in real HTML?
A7: Yes, many built-in elements use Shadow DOM. For example, <input type="date"> 
    uses Shadow DOM to render its calendar popup.

Q8: If Virtual DOM is so fast, why don’t browsers just use it instead of Real DOM?
A8: Because the Real DOM is the actual representation of the page that the 
    browser must maintain. Virtual DOM is just a trick libraries like React 
    use on top of the Real DOM to make updates more efficient.

===================================================
*/
