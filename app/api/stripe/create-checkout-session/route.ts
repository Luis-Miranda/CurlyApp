// app/api/stripe/create-checkout-session/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil', // usa una versión válida y estable
})

export async function POST(req: Request) {
  const { name, email, date, time } = await req.json()

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'mxn',
            unit_amount: 40000, /* 40000 */
            product_data: {
              name: `Anticipo Maravilla Curly - ${date} - ${time}`,
              description: `Cliente: ${name}`,
            },
          },
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      customer_email: email,
      metadata: { name, date, time },
      success_url: `https://www.maravillacurly.com.mx/booking/thank-you`,
      cancel_url: `https://www.maravillacurly.com.mx/booking`,
    })

    return NextResponse.json({ sessionUrl: session.url })
  }  catch (error) {
  console.error("Error al crear sesión:", error instanceof Error ? error.message : error)
  return NextResponse.json({ error: "Error al crear la sesión" }, { status: 500 })
}
}

