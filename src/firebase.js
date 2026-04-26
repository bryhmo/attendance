// ─────────────────────────────────────────────────────────────────────────────
// STEP 1: Replace the values below with your own Firebase project credentials.
// Get them from: https://console.firebase.google.com
//   → Your Project → Project Settings → Your Apps → Web App → Config
// ─────────────────────────────────────────────────────────────────────────────

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:            "AIzaSyAlz8HeB1kcGkBkRtwhXxNiLviWQwx8zzA",
  authDomain:        "attendqr-3136e.firebaseapp.com",
  projectId:         "attendqr-3136e",
  storageBucket:     "attendqr-3136e.firebasestorage.app",
  messagingSenderId: "963699647401",
  appId:             "1:963699647401:web:448a1b0151330fb7f6dab8",
};

const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);


