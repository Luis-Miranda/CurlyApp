import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { adminAuth } from "@/lib/firebase-admin"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { idToken } = body

    if (!idToken) {
      return NextResponse.json({ error: "Falta el token" }, { status: 400 })
    }

    const decodedToken = await adminAuth.verifyIdToken(idToken)

    if (!decodedToken) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 })
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 días
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    })

    const cookieStore = await cookies()
    cookieStore.set("session", sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    })

    return NextResponse.json({ message: "Sesión creada con éxito" }, { status: 200 })
  } catch (error) {
    console.error("Error al crear sesión:", error)
    return NextResponse.json({ error: "Error al crear la sesión" }, { status: 500 })
  }
}