import { NextResponse } from "next/server"
import Stripe from "stripe"
import { db } from "@/lib/firebase"
import { doc, updateDoc } from "firebase/firestore"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20" as any,
})

// 🔑 este secret lo obtienes en tu dashboard de Stripe
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature") as string
  const body = await req.text()

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err: any) {
    console.error("❌ Error verificando firma Stripe:", err.message)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  // 🚨 aquí procesamos eventos
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const appointmentId = session.metadata?.appointmentId

    console.log("✅ Pago confirmado en Stripe:", session.id, "para cita:", appointmentId)

    if (appointmentId) {
      try {
        const ref = doc(db, "citas", appointmentId)
        await updateDoc(ref, { status: "confirmada" })
        console.log("📄 Cita actualizada en Firestore:", appointmentId)
      } catch (err) {
        console.error("❌ Error actualizando cita en Firestore:", err)
      }
    }
  }

  return NextResponse.json({ received: true })
}