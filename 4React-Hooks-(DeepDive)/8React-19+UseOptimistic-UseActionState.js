/*  
====================================================
📘 React Notes – React 19+ Hooks: useOptimistic, useActionState
====================================================

React 19 introduces new hooks to make **async UI updates** and **form actions** simpler.

----------------------------------------------------
1️⃣ useOptimistic – Instant UI Updates (Optimistic UI)
----------------------------------------------------
- Lets you show temporary UI updates **before** the server responds.
- Common in chats, likes, comments → feels instant.
- Prevents “lag” while waiting for async operations.

✅ Example: Adding a Comment (Optimistic Update)
*/
import React, { useState, useOptimistic, useActionState } from "react";

function Comments() {
  const [comments, setComments] = useState([
    "Nice post!",
    "Thanks for sharing",
  ]);
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment) => [...state, newComment] // optimistic update logic
  );

  const handleAdd = async (comment) => {
    addOptimisticComment(comment); // show instantly
    await new Promise((r) => setTimeout(r, 1000)); // fake API delay
    setComments((prev) => [...prev, comment]); // real update
  };

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {optimisticComments.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
      <button onClick={() => handleAdd("Awesome!")}>Add Comment</button>
    </div>
  );
}

/*
----------------------------------------------------
2️⃣ useActionState – Managing Form Actions
----------------------------------------------------
- Simplifies async form handling (e.g., login, signup).
- Automatically manages **loading, error, success states**.
- Prevents boilerplate for form submissions.

✅ Example: Login Form
*/
async function fakeLogin(prevState, formData) {
  await new Promise((r) => setTimeout(r, 1000));
  if (formData.get("password") !== "123") {
    return { error: "Invalid password" };
  }
  return { success: true };
}

function LoginForm() {
  const [state, formAction, isPending] = useActionState(fakeLogin, {});

  return (
    <form action={formAction}>
      <input name="username" placeholder="Username" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </button>
      {state?.error && <p style={{ color: "red" }}>{state.error}</p>}
      {state?.success && <p style={{ color: "green" }}>Login successful!</p>}
    </form>
  );
}

/*
----------------------------------------------------
📊 Comparison
----------------------------------------------------
| Hook          | Purpose                                    | Example Use Case            |
|---------------|--------------------------------------------|-----------------------------|
| useOptimistic | Show instant UI before async result        | Comments, likes, chat apps  |
| useActionState| Manage async form actions (loading/errors) | Login, signup, checkout     |

----------------------------------------------------
❓ Q & A Section
----------------------------------------------------
Q1: What problem does useOptimistic solve?  
👉 It avoids laggy UI by showing temporary state while waiting for server.

Q2: Is optimistic update risky?  
👉 Yes, if server rejects the action → must handle rollback properly.

Q3: How is useActionState different from useState?  
👉 It’s designed specifically for **form actions** and auto-handles async states.

Q4: Can I combine useOptimistic and useActionState?  
👉 Yes! Example: optimistic comment UI + form validation.

Q5: Are these hooks backward compatible with React 18?  
👉 No, they are part of React 19 features.

====================================================
End of Notes 🚀
====================================================
*/
