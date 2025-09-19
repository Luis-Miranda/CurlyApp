// app/api/stripe/create-checkout-session/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20" as any,
})

export async function POST(req: Request) {
  try {
    const { name, email, date, time, appointmentId } = await req.json()
    console.log("📩 Datos recibidos:", { name, email, date, time, appointmentId })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'mxn',
            unit_amount: 30000, // $300 MXN
            product_data: {
              name: `Anticipo Maravilla Curly - ${date} - ${time}`,
              description: `Cliente: ${name}`,
            },
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: { name, date, time, appointmentId }, // 👈 guardamos referencia a la cita
      allow_promotion_codes: true,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking`,
    })

    console.log("✅ Session creada:", session.id)
    return NextResponse.json({ sessionUrl: session.url })
  } catch (error) {
    console.error("❌ Error en create-checkout-session:", error)
    return NextResponse.json(
      { error: "Error al crear sesión Stripe" },
      { status: 500 }
    )
  }
}