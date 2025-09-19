'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id')
  const appointmentId = searchParams.get('appointmentId')

  const [appointment, setAppointment] = useState<any>(null)

  useEffect(() => {
    const verificarPago = async () => {
      if (!sessionId || !appointmentId) {
        router.push('/booking')
        return
      }

      // 1️⃣ Verificar en Stripe si el pago fue exitoso
      const res = await fetch(`/api/stripe/check-session?session_id=${sessionId}`)
      const session = await res.json()
      if (session.payment_status !== 'paid') {
        router.push('/booking')
        return
      }

      // 2️⃣ Obtener la cita desde Firestore
      const ref = doc(db, 'citas', appointmentId)
      const snap = await getDoc(ref)

      if (!snap.exists()) {
        router.push('/booking')
        return
      }

      const cita = snap.data()
      setAppointment(cita)

      // 3️⃣ Actualizar estatus a pagada
      await updateDoc(ref, { status: 'pagada' })

      // 4️⃣ Mandar correo con Resend
      await fetch('/api/send-confirmation-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cita.email,
          name: cita.name,
          date: cita.date,
          time: cita.time,
          professional: cita.professional,
          branch: cita.branch,
          service: cita.service
        })
      })
    }

    verificarPago()
  }, [sessionId, appointmentId, router])

  if (!appointment) {
    return <p className="text-center mt-10">Verificando tu pago... 🔄</p>
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">¡Gracias por tu pago! 💖</h1>
      <p className="mb-2">Tu cita fue confirmada para:</p>
      <p className="font-semibold text-lg">
        {appointment.date} a las {appointment.time} con {appointment.professional}
      </p>
      <p className="text-muted-foreground mb-6">{appointment.branch}</p>
      <p className="text-muted-foreground mb-6">
        Te contactaremos 48hrs antes de tu cita vía WhatsApp para confirmar tu asistencia.
      </p>
    </div>
  )
}