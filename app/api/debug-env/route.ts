import { NextResponse } from "next/server";

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "🚫 No autorizado en producción" },
      { status: 403 }
    );
  }

  return NextResponse.json({
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "❌ No definida",
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? "✅ Definida" : "❌ No definida",
    RESEND_API_KEY: process.env.RESEND_API_KEY ? "✅ Definida" : "❌ No definida",
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || "❌ No definida",
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL ? "✅ Definida" : "❌ No definida",
  });
}