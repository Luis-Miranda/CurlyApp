"use client"

import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth"

export function useUserRole() {
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "usuarios", user.uid)
        const userSnap = await getDoc(userRef)
        if (userSnap.exists()) {
          setRole(userSnap.data().role || null)
        }
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { role, loading }
}