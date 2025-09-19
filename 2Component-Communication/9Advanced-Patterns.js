/**
 * 📘 React Notes
 * Topic: Advanced Patterns – Mediator, Observer, Pub/Sub for React Apps
 *
 * Beginner Friendly Explanation:
 * ------------------------------
 * React gives us props, state, and context for communication.
 * But sometimes in large apps, we need more advanced patterns
 * to handle **complex communication** between many components.
 *
 * Three common patterns are:
 * 1. Mediator → A "middleman" manages communication.
 * 2. Observer → Components "watch" for changes.
 * 3. Pub/Sub (Publish–Subscribe) → A message system for decoupled communication.
 */

/**
 * ===============================
 * 1. Mediator Pattern
 * ===============================
 * - One central object (Mediator) controls communication between components.
 * - Components don’t talk to each other directly → They go through the mediator.
 *
 * Analogy: A "teacher" (mediator) in a classroom. Students (components)
 * don’t all shout at each other, they raise hands, and the teacher manages it.
 */

class Mediator {
  constructor() {
    this.handlers = {};
  }

  register(event, handler) {
    this.handlers[event] = handler;
  }

  send(event, data) {
    if (this.handlers[event]) {
      this.handlers[event](data);
    }
  }
}

// Example Usage
const mediator = new Mediator();

mediator.register("login", (user) => {
  console.log("User logged in:", user);
});

mediator.send("login", { name: "Avi" });

/**
 * ✅ Use case in React:
 * - Handling complex workflows where many components need coordination.
 */

/**
 * ===============================
 * 2. Observer Pattern
 * ===============================
 * - Objects (Observers) "subscribe" to another object (Subject).
 * - When the Subject changes, it notifies all Observers.
 *
 * Analogy: You "follow" a YouTube channel (Subject).
 * When the channel uploads a video, you (Observer) get notified.
 */

class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}

// Example Usage
const subject = new Subject();

subject.subscribe((msg) => console.log("Observer 1:", msg));
subject.subscribe((msg) => console.log("Observer 2:", msg));

subject.notify("New Data Available");

/**
 * ✅ Use case in React:
 * - Global state libraries like Redux and MobX follow Observer principles.
 * - Whenever state changes, all connected components re-render.
 */

/**
 * ===============================
 * 3. Pub/Sub Pattern (Publish–Subscribe)
 * ===============================
 * - Similar to Observer but uses an **event bus** (global channel).
 * - Publisher sends a message to the channel.
 * - Subscribers listen for messages from the channel.
 * - Publishers and Subscribers don’t know about each other → Decoupled.
 *
 * Analogy: A "radio station" (publisher) broadcasts news.
 * People (subscribers) tune in, but the radio station doesn’t know them personally.
 */

class PubSub {
  constructor() {
    this.events = {};
  }

  subscribe(event, handler) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(handler);
  }

  publish(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((handler) => handler(data));
    }
  }
}

// Example Usage
const pubsub = new PubSub();

pubsub.subscribe("chat", (msg) => console.log("User A got:", msg));
pubsub.subscribe("chat", (msg) => console.log("User B got:", msg));

pubsub.publish("chat", "Hello World");

/**
 * ✅ Use case in React:
 * - Notification systems
 * - Event-driven UI (like chat apps, logging, analytics)
 * - Decoupling independent modules
 */

/**
 * ===============================
 * Summary
 * ===============================
 * - Mediator → Central "middleman" for component communication.
 * - Observer → One object notifies many observers (like state → UI updates).
 * - Pub/Sub → Decoupled event system with publishers & subscribers.
 *
 * 🚀 Tip:
 * - For small apps → use props, context.
 * - For large apps → patterns like these (or libraries like Redux, Zustand).
 */

/**
 * ===============================
 * Q & A (Interview Style)
 * ===============================
 *
 * Q1: What is the difference between Observer and Pub/Sub?
 * A1: Observer → Observers know the Subject directly and get updates.
 *     Pub/Sub → Publishers & Subscribers are decoupled via an event bus.
 *
 * Q2: How is Mediator different from Pub/Sub?
 * A2: Mediator controls communication directly (central authority).
 *     Pub/Sub is more free, any publisher can send, any subscriber can listen.
 *
 * Q3: Which pattern does Redux use?
 * A3: Redux is based on Observer (components subscribe to the store),
 *     with some Pub/Sub-like behavior when actions are dispatched.
 *
 * Q4: When would you use Mediator in React?
 * A4: When multiple components need to coordinate (e.g., a checkout process
 *     where cart, payment, and shipping must talk in a controlled way).
 *
 * Q5: Is Pub/Sub good for large React apps?
 * A5: It’s useful, but can get hard to debug if too many events exist.
 *     Use libraries (Redux, Zustand, Recoil) that implement structured patterns.
 */
