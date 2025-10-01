/*
📌 React Suspense (Data Fetching & Lazy Loading)
===============================================

🎯 Goal:
- Simplify asynchronous rendering in React.
- Manage loading states declaratively.
- Coordinate async tasks (data fetching, code-splitting) with React's rendering.

------------------------------------------------
1️⃣ Suspense Basics
------------------------------------------------
- Suspense is a component: <Suspense fallback={<Loading/>}>...</Suspense>
- Works as a boundary: if children are "suspending" (not ready yet), 
  React shows `fallback` until they’re ready.

Use-Cases:
- Code-splitting with React.lazy
- Data fetching (with React Cache, frameworks like Relay, Next.js App Router, React Query integration)

------------------------------------------------
2️⃣ Lazy Loading with React.lazy
------------------------------------------------
- Code-splitting: load components only when needed.
*/

import React, { Suspense, lazy } from "react";

const Profile = lazy(() => import("./Profile"));

export default function App() {
  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      <Profile />
    </Suspense>
  );
}

/*
✅ Benefits:
- Smaller initial bundle.
- Faster first paint.
- Load heavy components (charts, modals, routes) on demand.
------------------------------------------------
3️⃣ Suspense for Data Fetching
------------------------------------------------
- With React 18+, data fetching integrates into rendering (Concurrent features).
- Example pattern: "resources" with Suspense.
- React waits until data is ready, then commits UI.

⚠️ Note:
- Suspense doesn’t fetch data itself.
- Needs integration: React Query, Relay, or custom fetch wrappers.
*/

function fetchUser() {
  let status = "pending";
  let result;
  let suspender = fetch("https://jsonplaceholder.typicode.com/users/1")
    .then((res) => res.json())
    .then(
      (data) => {
        status = "success";
        result = data;
      },
      (err) => {
        status = "error";
        result = err;
      }
    );

  return {
    read() {
      if (status === "pending") throw suspender;
      if (status === "error") throw result;
      if (status === "success") return result;
    },
  };
}

const userResource = fetchUser();

function User() {
  const user = userResource.read();
  return <div>{user.name}</div>;
}

export default function AppWithData() {
  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <User />
    </Suspense>
  );
}

/*
✅ What Happens:
- If userResource.read() isn’t ready → throws a Promise.
- Suspense catches it → shows fallback.
- When Promise resolves → component renders with data.

------------------------------------------------
4️⃣ Real Project Example – Suspense + React Query
------------------------------------------------
React Query (v5) integrates with Suspense.
*/

import { useQuery } from "@tanstack/react-query";

function UserDetails() {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/users/1").then((res) =>
        res.json()
      ),
    suspense: true,
  });

  return <h3>{data.name}</h3>;
}

export default function SuspenseWithQuery() {
  return (
    <Suspense fallback={<p>Fetching user...</p>}>
      <UserDetails />
    </Suspense>
  );
}

/*
------------------------------------------------
5️⃣ Common Pitfalls
------------------------------------------------
- Suspense boundaries must wrap async components properly.
- Without boundaries → app crashes when a component suspends.
- Fine-grained boundaries = better UX (wrap sections individually).
- Still experimental for data fetching (but stable for lazy loading).

------------------------------------------------
6️⃣ Best Practices
------------------------------------------------
- Always provide meaningful fallbacks (spinners, skeletons).
- For data fetching, use libraries with Suspense support (React Query, Relay).
- Split large routes/pages/components with React.lazy + Suspense.
- Wrap non-critical UI parts, not the whole app, for smoother UX.
*/




/* ------------------------------------------------------------------
   🏦 Case Study: Banking Dashboard with Suspense
   - Lazy load heavy Chart.js graphs
   - Fetch latest transactions with Suspense + React Query
-------------------------------------------------------------------*/

import React, { Suspense, lazy } from "react";
import { useQuery } from "@tanstack/react-query";

const SpendingChart = lazy(() => import("./SpendingChart"));

function Transactions() {
  const { data } = useQuery({
    queryKey: ["transactions"],
    queryFn: () =>
      fetch("/api/transactions").then((res) => res.json()),
    suspense: true,
  });

  return (
    <ul>
      {data.map((txn) => (
        <li key={txn.id}>
          {txn.date} – {txn.merchant} – ${txn.amount}
        </li>
      ))}
    </ul>
  );
}

export default function BankingDashboard() {
  return (
    <div>
      <h1>Welcome back, Avi 👋</h1>

      {/* Lazy-loaded Chart */}
      <Suspense fallback={<p>Loading chart...</p>}>
        <SpendingChart />
      </Suspense>

      {/* Suspense-wrapped Transactions */}
      <Suspense fallback={<p>Fetching transactions...</p>}>
        <Transactions />
      </Suspense>
    </div>
  );
}

/*
✅ Benefits in Real Project:
- Chart.js bundle loads only when dashboard is opened.
- Transactions fetched asynchronously with Suspense fallback.
- UI stays responsive with concurrent rendering.
- User sees partial UI (header, skeletons) while heavy parts load.

------------------------------------------------
👉 Takeaway:
Suspense + Lazy Loading = Faster initial loads
Suspense + Data Fetching = Declarative async flows
*/
