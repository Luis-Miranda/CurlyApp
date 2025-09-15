import { useEffect, useState } from "react"
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth"
import { auth } from "@/lib/firebase"

type Role = "admin" | "profesional" | "recepcionista" | "guest"

type UserData = {
  email: string
  role: Role
}

export function useUser() {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdTokenResult()
        const role = (token.claims.role as Role) || "guest"

        setUser({
          email: firebaseUser.email || "",
          role,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { user, loading }
}