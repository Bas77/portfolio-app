import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJ6BZpXyBoQoMqKne-f4zfOPgS8tjgwLA",
  authDomain: "portfolio-5b841.firebaseapp.com",
  projectId: "portfolio-5b841",
  storageBucket: "portfolio-5b841.firebasestorage.app",
  messagingSenderId: "778844556461",
  appId: "1:778844556461:web:4eaa35d6a8d5589829ca24",
  measurementId: "G-7P4Y1CZDBV",
};

// Initialize Firebase safely for both server and client
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Conditionally initialize Analytics only on the client-side
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, db, analytics };