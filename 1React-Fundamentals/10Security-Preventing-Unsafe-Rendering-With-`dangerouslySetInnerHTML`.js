/**
 * 📘 React Notes: Security in Rendering
 * Topic: Preventing unsafe rendering with dangerouslySetInnerHTML
 *
 * Beginner Friendly Explanation:
 * ---------------------------------
 * By default, React protects us from attackers by escaping (cleaning) any values
 * that go inside JSX. This prevents malicious code (like JavaScript <script> tags)
 * from running inside our app.
 *
 * Example:
 * const name = "<img src=x onerror=alert('Hacked!') />";
 * <div>{name}</div>
 * 👉 React will render it as plain text instead of executing.
 *
 * But React also gives a special property: `dangerouslySetInnerHTML`.
 * - This lets you inject raw HTML into your component.
 * - It's called "dangerous" because if you put untrusted content here,
 *   attackers can run malicious JavaScript (XSS attack).
 *
 * -----------------------
 * ❌ Example: Unsafe Usage
 * -----------------------
 */
const UnsafeComponent = ({ userContent }) => {
  return <div dangerouslySetInnerHTML={{ __html: userContent }} />;
};

// If userContent = "<img src=x onerror=alert('You are hacked!') />"
// 👉 This will execute malicious code in the browser!

/**
 * ------------------------
 * ✅ Safe Usage (Sanitized)
 * ------------------------
 * Best Practice:
 * - Only use `dangerouslySetInnerHTML` when you **trust** the content
 *   (e.g., static help text, markdown already sanitized).
 * - If the content comes from user input or outside sources → sanitize it.
 *
 * Sanitization Libraries: DOMPurify, sanitize-html
 */
import DOMPurify from "dompurify";

const SafeComponent = ({ userContent }) => {
  const cleanHTML = DOMPurify.sanitize(userContent);
  return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
};

/**
 * ------------------------
 * ✅ Safer Alternatives
 * ------------------------
 * - Prefer JSX whenever possible instead of raw HTML.
 * Example:
 */
const SaferAlt = ({ userContent }) => {
  return <p>{userContent}</p>; // React auto escapes here
};

/**
 * -----------------------------------------------------------------
 * 🔑 Key Takeaways
 * -----------------------------------------------------------------
 * 1. React escapes HTML by default to protect you.
 * 2. Using dangerouslySetInnerHTML bypasses this safety.
 * 3. Only use it with trusted + sanitized HTML.
 * 4. Use libraries like DOMPurify to clean data from users/servers.
 * 5. If possible, avoid it and use normal JSX instead.
 */

/**
 * -----------------------------------------------------------------
 * ❓ Q & A Section (Interview Style)
 * -----------------------------------------------------------------
 *
 * Q1: Why is `dangerouslySetInnerHTML` considered dangerous?
 * A1: Because it directly injects raw HTML into the DOM, which can execute
 *     malicious scripts (XSS attack) if the content isn’t sanitized.
 *
 * Q2: Does React escape HTML by default?
 * A2: Yes, React automatically escapes values in JSX to prevent XSS.
 *
 * Q3: When should you use `dangerouslySetInnerHTML`?
 * A3: Only when absolutely necessary, such as rendering sanitized
 *     Markdown or trusted HTML snippets.
 *
 * Q4: How do you prevent unsafe rendering when using it?
 * A4: Use a sanitization library like DOMPurify before injecting the HTML.
 *
 * Q5: What’s the best alternative?
 * A5: Use JSX normally (e.g., <div>{content}</div>), which React will escape.
 */
