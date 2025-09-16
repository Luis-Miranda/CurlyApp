import { cookies } from "next/headers"
import { auth } from "@/lib/firebase"
import { getAuth } from "firebase-admin/auth"
import { adminApp } from "@/lib/firebase-admin"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

export async function getServerSession() {
    const cookieStore = await cookies()
    const session = cookieStore.get("session")

    if (!session?.value) return null

    try {
        const decodedToken = await getAuth(adminApp).verifySessionCookie(session.value, true)
        const { uid, email } = decodedToken

        // Obtener rol del usuario desde Firestore
        const userDoc = await getDoc(doc(db, "users", uid))
        const userData = userDoc.exists() ? userDoc.data() : null

        return {
            uid,
            email,
            role: userData?.role || "colaborador",
            displayName: userData?.displayName || null
        }
    } catch (error) {
        console.error("❌ Error al verificar cookie de sesión:", error)
        return null
    }
}