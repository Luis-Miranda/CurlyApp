import { initializeApp, cert, getApps, getApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"

const serviceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
}

const app = getApps().length === 0
  ? initializeApp({
      credential: cert(serviceAccount as any),
    })
  : getApp()

export const adminAuth = getAuth(app)