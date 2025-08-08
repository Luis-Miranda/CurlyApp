"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useUser } from "@/hooks/useUser"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const { user, loading } = useUser()

  useEffect(() => {
    if (user && !loading) {
      router.push("/admin") // Redirige al dashboard si ya está logueado
    }
  }, [user, loading])

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/admin") // Redirige después de iniciar sesión
    } catch (err) {
      console.error(err)
      setError("Correo o contraseña incorrectos.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow space-y-4">
        <h1 className="text-2xl font-bold text-center">Iniciar sesión</h1>

        <Input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Button className="w-full" onClick={handleLogin}>
          Entrar
        </Button>
      </div>
    </div>
  )
}