/**
 * 📌 Security: Preventing Unsafe Rehydration & DOM Injections
 *
 * React apps that use **SSR (Server-Side Rendering)** or **Hydration**
 * are vulnerable if malicious scripts or mismatched HTML slip into the DOM.
 *
 * -----------------------------------------------------------
 * 1️⃣ What is Rehydration?
 * -----------------------------------------------------------
 * - When SSR sends pre-rendered HTML → React "hydrates" it by attaching
 *   event listeners and making it interactive on the client.
 * - If the server HTML and client-side React code differ,
 *   React may trust and keep unsafe server HTML → **Security Risk**.
 *
 * -----------------------------------------------------------
 * 2️⃣ DOM Injection Risks
 * -----------------------------------------------------------
 * - If user input or API data is rendered without sanitization,
 *   attackers can inject malicious `<script>` or HTML.
 * - Example Attack:
 *   User submits: `<img src=x onerror=alert("Hacked!") />`
 *   → if rendered unsafely, it executes JavaScript.
 *
 * 🔥 This is called **XSS (Cross-Site Scripting)**.
 *
 * -----------------------------------------------------------
 * 3️⃣ React’s Built-in Protections
 * -----------------------------------------------------------
 * - By default, React escapes all strings before rendering:
 *   Example:
 *   const name = "<img src=x onerror=alert('hack') />";
 *   <div>{name}</div> → renders as plain text, not HTML.
 *
 * - BUT: Using `dangerouslySetInnerHTML` bypasses this safety.
 *
 * -----------------------------------------------------------
 * 4️⃣ Unsafe Hydration Example
 * -----------------------------------------------------------
 * ❌ BAD (hydration mismatch can keep malicious HTML)
 */

import React from "react";

export default function Unsafe() {
  // Imagine this comes from SSR with unsafe HTML
  const serverHTML = '<img src=x onerror="alert(\'Hacked!\')" />';

  return <div dangerouslySetInnerHTML={{ __html: serverHTML }} />;
}

/**
 * -----------------------------------------------------------
 * 5️⃣ Safe Rendering Example
 * -----------------------------------------------------------
 * ✅ Always sanitize untrusted HTML before hydration.
 */

import DOMPurify from "dompurify";

export default function Safe() {
  const userInput = '<img src=x onerror="alert(\'Hack!\')" />';

  // Sanitize before injecting
  const cleanHTML = DOMPurify.sanitize(userInput);

  return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
}

/**
 * -----------------------------------------------------------
 * 6️⃣ Best Practices for Preventing Unsafe Rehydration
 * -----------------------------------------------------------
 * ✔ Never trust server-side HTML blindly (always sanitize).
 * ✔ Avoid using `dangerouslySetInnerHTML` unless absolutely necessary.
 * ✔ Use libraries like **DOMPurify**, **sanitize-html** for sanitization.
 * ✔ Validate and encode user input at both **server & client**.
 * ✔ Use **Content Security Policy (CSP)** headers to block inline scripts.
 * ✔ Keep SSR markup consistent with client rendering to avoid mismatches.
 *
 * -----------------------------------------------------------
 * 7️⃣ Case Study – Banking Dashboard
 * -----------------------------------------------------------
 * - Problem: During hydration, a mismatch allowed unescaped `<script>` injection
 *   from cached API response → XSS risk.
 *
 * - Fix:
 *   ✔ Introduced `DOMPurify` for all HTML injection points.
 *   ✔ Applied strict CSP headers (`script-src 'self'`).
 *   ✔ Ensured server & client render identical markup.
 *
 * - Results:
 *   🚀 Prevented XSS attempts in penetration testing.
 *   🚀 Improved compliance with OWASP Top 10 security checklist.
 *
 */
