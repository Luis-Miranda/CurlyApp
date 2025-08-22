import admin from "firebase-admin"
import serviceAccount from "./firebase/firebase-service-account.json"

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  })
}

export const adminAuth = admin.auth()