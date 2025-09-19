'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { toast } from 'sonner'

export default function ThankYouPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const appointmentId = searchParams.get('appointmentId') // 🔑 lo pasamos desde API

  const [appointment, setAppointment] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!sessionId || !appointmentId) {
      router.push('/booking')
      return
    }

    const confirmarCita = async () => {
      try {
        // 1. Validamos la sesión en Stripe
        const res = await fetch(`/api/stripe/check-session?session_id=${sessionId}`)
        if (!res.ok) throw new Error('No se pudo validar la sesión de Stripe')
        const stripeData = await res.json()

        if (stripeData.payment_status !== 'paid') {
          toast.error('El pago no fue confirmado.')
          router.push('/booking')
          return
        }

        // 2. Obtenemos la cita desde Firestore
        const ref = doc(db, 'citas', appointmentId)
        const snap = await getDoc(ref)

        if (!snap.exists()) {
          toast.error('No encontramos tu cita en el sistema.')
          router.push('/booking')
          return
        }

        const data = snap.data()
        setAppointment(data)

        // 3. Aviso visual
        toast.success('¡Tu cita fue confirmada! 🎉')
      } catch (error) {
        console.error('❌ Error al confirmar cita:', error)
        toast.error('No se pudo confirmar tu cita.')
        router.push('/booking')
      } finally {
        setLoading(false)
      }
    }

    confirmarCita()
  }, [router, sessionId, appointmentId])

  if (loading) {
    return <p className="text-center py-10">Procesando pago y confirmando tu cita...</p>
  }

  if (!appointment) return null

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">¡Gracias por tu pago! 💖</h1>
      <p className="mb-2">Tu cita ha sido registrada para:</p>
      <p className="font-semibold text-lg">
        {appointment.date} a las {appointment.time} con {appointment.professional}
      </p>
      <p className="text-muted-foreground mb-6">{appointment.branch}</p>
      <p className="text-muted-foreground mb-6">
        Nuestro equipo confirmará tu cita y te contactará por WhatsApp 📲.
      </p>
    </div>
  )
}