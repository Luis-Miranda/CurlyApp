import { NextRequest, NextResponse } from "next/server"
import { getAuth } from "firebase-admin/auth"
import { initializeApp, getApps, cert } from "firebase-admin/app"

const serviceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
}

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount as any),
  })
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("__session")?.value || ""
  const pathname = req.nextUrl.pathname

  try {
    const decodedToken = await getAuth().verifySessionCookie(token, true)
    const role = decodedToken.role // 👈 Asumimos que lo guardas en el token

    if (pathname.startsWith("/admin")) {
      if (!role) {
        return NextResponse.redirect(new URL("/login", req.url))
      }

      // ⚠️ Condiciones según el rol
      if (role === "admin") {
        return NextResponse.next()
      }

      if (role === "profesional") {
        // Puedes limitar qué subrutas puede ver el profesional
        if (
          pathname.startsWith("/admin/clients") ||
          pathname.startsWith("/admin/citas")
        ) {
          return NextResponse.next()
        } else {
          return NextResponse.redirect(new URL("/unauthorized", req.url))
        }
      }

      // Si no es un rol válido
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

    return NextResponse.next()
  } catch (err) {
    console.log("Middleware error:", err)
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

// Solo aplica para estas rutas
export const config = {
  matcher: ["/admin/:path*"],
}