/*
🔹 Advanced: Server-Driven State Management (React Server Components - RSC)

📌 What are React Server Components (RSC)?
- Introduced by React team for **React 18+** and future.
- They allow components to be rendered on the **server** instead of the client.
- Enable sending **pre-rendered UI + state** from the server to the client.
- Focus on performance and developer experience.

---

📌 Key Features
1. **Server-Rendered State**
   - State can live on the server, avoiding unnecessary duplication in the client.
   - Useful for heavy computation, DB queries, or secure logic.

2. **Automatic Code Splitting**
   - RSCs are never bundled into client-side JS → smaller client bundle size.

3. **Streaming UI**
   - Server can stream component chunks to client → faster **Time-to-Interactive (TTI)**.

4. **Seamless Client + Server Components**
   - Client components handle interactivity.
   - Server components fetch/render data, then send it down.

---

📌 Benefits
- 🚀 Smaller bundles → less JS parsing on client.
- 🔒 Secure – sensitive logic (DB queries, API secrets) stays on server.
- 🌐 Improved performance for slow devices/networks.
- ⚡ Faster initial page loads with **streaming rendering**.

---

📌 Example: Server Component
*/

// ✅ Server Component (runs only on server, can fetch DB directly)
async function ServerProductList() {
  const products = await db.query("SELECT * FROM products");
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}

/*
📌 Example: Mixing Server + Client Components
- Server handles data fetching.
- Client handles interactivity.
*/

// ✅ Client Component (for interactivity)
("use client");
import { useState } from "react";

function AddToCartButton({ productId }) {
  const [added, setAdded] = useState(false);
  return (
    <button onClick={() => setAdded(true)}>
      {added ? "✅ Added" : "➕ Add to Cart"}
    </button>
  );
}

// ✅ Using together
function ProductPage({ product }) {
  return (
    <div>
      <h2>{product.name}</h2>
      <AddToCartButton productId={product.id} />
    </div>
  );
}

/*
📌 Alternatives & Considerations
- RSC is **not a replacement** for client state (useState/useReducer).
- Works best with frameworks like **Next.js 13+ (App Router)**.
- Avoids prop-drilling by letting server pre-compose state + UI.
- Still experimental → limited ecosystem support.

---

✅ Summary
- React Server Components push state mgmt to server → lighter client apps.
- Good for: data-heavy apps, dashboards, e-commerce.
- Use with Next.js 13+ App Router for production-ready setup.
*/
