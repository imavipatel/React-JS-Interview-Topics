/**
 * 📘 React Notes
 * Topic: Event Emitters & Custom Hooks for Communication
 *
 * Beginner Friendly Explanation:
 * ------------------------------
 * In React, components usually communicate in two main ways:
 * 1. Parent → Child (via props)
 * 2. Child → Parent (via callback functions)
 *
 * But what if we need to communicate between components that
 * are NOT directly related (siblings, deeply nested, etc.)?
 *
 * ✅ Solution → Event Emitters or Custom Hooks
 *
 * - Event Emitters: Work like a radio system. A component "emits" (sends) an event,
 *   and another component "listens" (subscribes) to that event.
 * - Custom Hooks: Wrap the logic (like event handling) into reusable functions,
 *   so multiple components can share it easily.
 */

/**
 * ===============================
 * Example 1: Simple Event Emitter
 * ===============================
 */
import React, { useEffect, useState } from "react";

// A very simple event emitter
class EventEmitter {
  constructor() {
    this.events = {};
  }

  // Subscribe (listen) to event
  on(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }

  // Emit (send) event
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(data));
    }
  }
}

export const globalEmitter = new EventEmitter();

// Component A: Emits an event
const Sender = () => {
  const sendMessage = () => {
    globalEmitter.emit("newMessage", "Hello from Sender!");
  };

  return <button onClick={sendMessage}>Send Message</button>;
};

// Component B: Listens for event
const Receiver = () => {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    globalEmitter.on("newMessage", (data) => setMsg(data));
  }, []);

  return <p>Received: {msg}</p>;
};

/**
 * ===============================
 * Example 2: Custom Hook for Events
 * ===============================
 */

const useEvent = (eventName, handler) => {
  useEffect(() => {
    globalEmitter.on(eventName, handler);
  }, [eventName, handler]);
};

// Usage
const ReceiverWithHook = () => {
  const [msg, setMsg] = useState("");

  useEvent("newMessage", (data) => setMsg(data));

  return <p>Receiver with Hook: {msg}</p>;
};

/**
 * ✅ Why Use This?
 * ----------------
 * - Helps in communication between components that are not directly connected.
 * - Makes code reusable and cleaner using custom hooks.
 * - Great for scenarios like:
 *   * Notification system
 *   * Cross-component communication
 *   * Event logging / analytics
 *
 * 🚨 BUT: Use Context, Redux, or Zustand for large-scale state sharing.
 * Event emitters are more useful for "occasional signals".
 */

/**
 * ===============================
 * Q & A (Interview Style)
 * ===============================
 *
 * Q1: What problem do event emitters solve in React?
 * A1: They allow communication between components that don’t have a direct parent-child relationship.
 *
 * Q2: Why wrap event emitter logic in a custom hook?
 * A2: To avoid repeating boilerplate code, make the logic reusable, and keep components clean.
 *
 * Q3: When should we prefer Context/Redux over event emitters?
 * A3: When the state is global, frequently updated, or needs to be shared across many components.
 *     Event emitters are better for occasional events, like "user logged in" or "notification received".
 *
 * Q4: Can event emitters cause performance issues?
 * A4: Yes, if too many events are fired or listeners are not cleaned up properly.
 *     Always unsubscribe (cleanup) when components unmount.
 */
