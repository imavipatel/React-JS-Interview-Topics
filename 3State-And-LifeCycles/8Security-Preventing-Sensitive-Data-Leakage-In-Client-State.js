/*  
====================================================
📘 React Notes – State Normalization for Performance
====================================================

🔹 **State normalization** = organizing state in a way that avoids duplication and makes updates efficient.  
🔹 Inspired by how databases store data (like "tables with IDs instead of nested duplicates").  

----------------------------------------------------
1️⃣ Why Normalize State?
----------------------------------------------------
❌ Problem with nested / duplicated state:
- Harder to update deeply nested objects.
- Causes unnecessary re-renders.
- Same data stored in multiple places → risk of inconsistency.

✅ Normalized state:
- Each entity stored once (like a dictionary by ID).
- Components reference IDs instead of duplicating data.
- Updates are simpler and faster.

----------------------------------------------------
2️⃣ Example of Non-Normalized State (Bad)
----------------------------------------------------
*/

function BlogBad() {
  const [blog, setBlog] = React.useState({
    id: 1,
    title: "React Performance",
    comments: [
      { id: 101, text: "Great post!", user: { id: 1, name: "Alice" } },
      { id: 102, text: "Very helpful!", user: { id: 2, name: "Bob" } },
      { id: 103, text: "Thanks!", user: { id: 1, name: "Alice" } }, // ❌ Alice duplicated
    ],
  });

  return <div>{blog.title}</div>;
}

/*  
⚠️ Issues:
- User "Alice" is duplicated in multiple comments.
- Updating "Alice’s name" requires updating multiple places.
- Inefficient and error-prone.
*/

/*  
----------------------------------------------------
3️⃣ Example of Normalized State (Good)
----------------------------------------------------
*/

function BlogGood() {
  const [users, setUsers] = React.useState({
    1: { id: 1, name: "Alice" },
    2: { id: 2, name: "Bob" },
  });

  const [comments, setComments] = React.useState({
    101: { id: 101, text: "Great post!", userId: 1 },
    102: { id: 102, text: "Very helpful!", userId: 2 },
    103: { id: 103, text: "Thanks!", userId: 1 },
  });

  const [blog, setBlog] = React.useState({
    id: 1,
    title: "React Performance",
    commentIds: [101, 102, 103],
  });

  return (
    <div>
      <h2>{blog.title}</h2>
      <ul>
        {blog.commentIds.map((id) => (
          <li key={id}>
            {comments[id].text} – {users[comments[id].userId].name}
          </li>
        ))}
      </ul>
    </div>
  );
}

/*  
✅ Benefits:
- "Alice" stored once. Update `users[1].name` → reflected everywhere.
- Comments just reference `userId`.
- Easier updates, less duplication.
*/

/*  
----------------------------------------------------
4️⃣ How Normalization Improves Performance
----------------------------------------------------
- Prevents **unnecessary re-renders** (fewer changed objects).  
- Makes **comparison faster** (shallow equality works better).  
- Easier to implement **selectors** (like in Redux).  
- Helps when dealing with large lists (users, products, posts).  

----------------------------------------------------
5️⃣ Tools for Normalizing State
----------------------------------------------------
- **Manual normalization** (using objects by IDs).  
- **Redux Toolkit** → has `createEntityAdapter` for normalized slices.  
- **Libraries like Normalizr** → automatically transform nested API responses.  

----------------------------------------------------
❓ Q & A Section
----------------------------------------------------
Q1: What is state normalization?  
👉 Storing data like a database – by IDs, with references, instead of nesting duplicates.

Q2: Why do we normalize state?  
👉 To avoid duplication, simplify updates, and improve performance.

Q3: What happens if state isn’t normalized?  
👉 Duplicates, harder updates, more re-renders, and risk of inconsistency.

Q4: Where is normalization most useful?  
👉 Large apps with lists (users, products, posts, chats, etc.).

Q5: Which React/Redux tools help normalization?  
👉 Redux Toolkit’s `createEntityAdapter` and Normalizr library.

====================================================
End of Notes 🚀
====================================================
*/
