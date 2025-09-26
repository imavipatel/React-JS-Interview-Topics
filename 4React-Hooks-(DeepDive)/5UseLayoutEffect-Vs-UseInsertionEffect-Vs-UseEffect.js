/*
====================================================
📘 React Notes – useEffect vs useLayoutEffect vs useInsertionEffect
====================================================

🔹 React provides 3 main "effect" hooks:
- `useEffect` → For async, non-blocking side effects.
- `useLayoutEffect` → For DOM mutations that need to happen *before* the browser paints.
- `useInsertionEffect` → For injecting styles (like CSS-in-JS) at the right time.

----------------------------------------------------
1️⃣ useEffect – Normal Side Effects
----------------------------------------------------
- Runs **after the browser paints** (async & non-blocking).
- Commonly used for data fetching, subscriptions, timers.
- Doesn’t block rendering.

✅ Example:
*/
import {
  useEffect,
  useLayoutEffect,
  useInsertionEffect,
  useState,
} from "react";

function UseEffectExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("✅ useEffect runs AFTER paint");
    document.title = `Count: ${count}`;
  }, [count]);

  return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>;
}

/*
💡 Real-Life Analogy:
Imagine writing a diary entry (effect) **after finishing your day** (paint).  
It doesn’t affect what happened, just records it.

----------------------------------------------------
2️⃣ useLayoutEffect – Sync DOM Updates
----------------------------------------------------
- Runs **synchronously after DOM mutations but before paint**.
- Blocks the browser from painting until it finishes.
- Useful when you need to measure DOM size/position or synchronously update layout.

✅ Example:
*/
function UseLayoutEffectExample() {
  const [width, setWidth] = useState(0);
  const boxRef = React.useRef();

  useLayoutEffect(() => {
    console.log("📏 Measuring box width BEFORE paint");
    setWidth(boxRef.current.offsetWidth);
  }, []);

  return (
    <div>
      <div
        ref={boxRef}
        style={{ width: "200px", height: "50px", background: "lightblue" }}
      >
        Box
      </div>
      <p>Measured Width: {width}</p>
    </div>
  );
}

/*
💡 Real-Life Analogy:
Before you hang a painting on the wall (paint),  
you first **measure the wall space** (layout effect).  
If you don’t measure before painting, the frame may not fit.

----------------------------------------------------
3️⃣ useInsertionEffect – Style Injection (React 18+)
----------------------------------------------------
- Runs **before any DOM mutations**.
- Designed for **CSS-in-JS libraries** (like styled-components, emotion).
- Ensures styles are injected before layout effects run.
- Rarely used directly in app code.

✅ Example:
*/
function UseInsertionEffectExample() {
  useInsertionEffect(() => {
    console.log("🎨 Injecting styles before DOM mutations");
    const style = document.createElement("style");
    style.innerHTML = "body { background: #f0f8ff; }";
    document.head.appendChild(style);
  }, []);

  return <p>Background color injected with useInsertionEffect</p>;
}

/*
💡 Real-Life Analogy:
Before building a house (DOM),  
you first **lay down the blueprint and paint swatches** (insertion effect).  
This way, the style/design is ready before walls are put up.

----------------------------------------------------
4️⃣ Comparison Table
----------------------------------------------------
| Hook               | Timing                                   | Use Case                             |
|--------------------|-------------------------------------------|---------------------------------------|
| useEffect          | After paint (async)                     | Data fetching, subscriptions, logging |
| useLayoutEffect    | After DOM update, before paint (sync)    | Measure DOM, sync UI with layout      |
| useInsertionEffect | Before DOM mutations                     | Inject styles (CSS-in-JS libraries)   |

----------------------------------------------------
5️⃣ Timeline Diagram
----------------------------------------------------
Render
   ⬇
🟣 useInsertionEffect (before DOM mutations)
   ⬇
🟡 DOM update
   ⬇
🔵 useLayoutEffect (before paint)
   ⬇
🎨 Browser paints
   ⬇
🟢 useEffect (after paint, async)

----------------------------------------------------
6️⃣ Best Practices
----------------------------------------------------
✔️ Prefer `useEffect` for most side effects (safe & async).  
✔️ Use `useLayoutEffect` only when you must block paint (e.g., measuring DOM).  
✔️ Avoid `useInsertionEffect` unless building a styling library.  
⚠️ Don’t overuse `useLayoutEffect` → can cause performance bottlenecks.

----------------------------------------------------
❓ Q & A
----------------------------------------------------
Q1: Why not use `useLayoutEffect` everywhere?  
👉 Because it blocks painting and can cause jank, making the app feel slower.

Q2: When is `useInsertionEffect` needed?  
👉 Mostly for libraries that inject CSS dynamically, not everyday app code.

Q3: Which effect runs first if all three are used?  
👉 `useInsertionEffect` → `useLayoutEffect` → `useEffect`.

Q4: Can I safely fetch data in `useLayoutEffect`?  
👉 No, fetching should go in `useEffect` to avoid blocking render.

====================================================
End of Notes 🚀
====================================================
*/

/*  
====================================================
📘 React Notes – useEffect vs useLayoutEffect vs useInsertionEffect
====================================================

🔹 Three effect hooks in React handle side effects, but they run at different times.

----------------------------------------------------
1️⃣ useEffect – After Paint (Async, Non-blocking)
----------------------------------------------------
- Runs after the browser paints the screen.
- Good for async work: fetching APIs, subscriptions, timers.
- Doesn’t block paint → avoids jank.
- ❌ Not for measuring DOM layout → causes flicker.

✅ Real-Life Example: Fetching user profile
*/
import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  useInsertionEffect,
} from "react";

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {user ? <p>{user.name}</p> : <p>Loading...</p>}
    </div>
  );
}

/*
----------------------------------------------------
2️⃣ useLayoutEffect – Synchronous After DOM Mutation (Before Paint)
----------------------------------------------------
- Runs immediately after DOM updates, before paint.
- Useful for measuring DOM nodes (size/position).
- Can block paint → use sparingly.

✅ Real-Life Example: Measuring error container height for auto-scroll
*/
function ErrorContainer({ errors }) {
  const errorRef = useRef(null);

  useLayoutEffect(() => {
    if (errors.length > 0 && errorRef.current) {
      const height = errorRef.current.offsetHeight;
      console.log("Error container height:", height);
      errorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [errors]);

  return (
    <div ref={errorRef} style={{ background: "lightcoral", padding: "10px" }}>
      {errors.map((err, i) => (
        <p key={i}>{err}</p>
      ))}
    </div>
  );
}

/*
----------------------------------------------------
3️⃣ useInsertionEffect – Before DOM Mutations Commit
----------------------------------------------------
- Runs earlier than useLayoutEffect.
- Primary use: injecting styles before paint (CSS-in-JS, theming).
- Avoids FOUC (Flash of Unstyled Content).

✅ Real-Life Example: Theme injection
*/
function ThemeInjector({ theme }) {
  const [styleTag] = useState(() => document.createElement("style"));

  useInsertionEffect(() => {
    styleTag.innerHTML =
      theme === "dark"
        ? "body { background: black; color: white; }"
        : "body { background: white; color: black; }";
    document.head.appendChild(styleTag);

    return () => {
      styleTag.remove();
    };
  }, [theme]);

  return <p>Theme applied: {theme}</p>;
}

/*
----------------------------------------------------
📊 Side-by-Side Project Examples
----------------------------------------------------

| Hook              | Real-Life Example                          | Why It Fits                        |
|-------------------|--------------------------------------------|------------------------------------|
| useEffect         | Fetching user profile from API             | Async, no layout dependency        |
| useLayoutEffect   | Measuring error container + auto-scroll    | Needs DOM size before paint        |
| useInsertionEffect| Injecting theme styles dynamically         | Must apply styles before first paint|

====================================================
End of Notes 🚀
====================================================
*/
