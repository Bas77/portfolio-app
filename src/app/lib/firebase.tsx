// lib/firebase.ts

import { initializeApp } from "firebase/app";
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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };