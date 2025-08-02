// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDA2UCV_Sl-r0TOBTJlcZcDWWE4D_2teU4",
  authDomain: "maravillacurly-e2254.firebaseapp.com",
  projectId: "maravillacurly-e2254",
  storageBucket: "maravillacurly-e2254.appspot.com", // ← corregido
  messagingSenderId: "171554825515",
  appId: "1:171554825515:web:c7651b29775c3b9820916e",
  measurementId: "G-DY2BWPYPJ1"
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
