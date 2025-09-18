'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { db } from '@/lib/firebase'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { toast } from 'sonner'

const duracionesPorServicio: Record<string, number> = {
  'Corte Esencial': 120,
  'Mini Rizos': 120,
  'Rizos Masculinos': 90,
  'Pixie Touch (45 días)': 120,
  'Retoque Curly (1hr)': 60,
  'Consulta Curly': 60,
  'Rizos con Ciencia': 120,
  'Rizos con Ciencia XL': 180,
  'Afro con Ciencia': 240,
  'Rizos Hidratados': 120,
  'Baño de Vapor': 120,
  'Curly Makeover': 120,
  'Revive tu Rizo': 120,
  'Relax and Restore': 120,
  'Rizos y café': 120,
  'Hidratación & Pausa': 120,
  'Rizos Full Ritual': 150,
  'Consulta con Hidratación': 60,
  'Rizos masculinos hidratados': 90,
  'Rizos masculinos con ciencia': 90,
  'Mantenimineto Rizos Masculinos': 90,
  'Corte Escencial XL': 180,
  'Corte Afrorizo Poderoso': 240,
  'Afro Glow': 240,
  'Revive tu Rizo XL': 180,
  'Baño de vapor XL': 180,
  'Baño de vapor Afro': 240,
  'Curly Makeover XL': 180,
  'Rizos Hidratados XL': 120,
  'Definición Curly': 60,
  'Estilízate': 60,
  'Estilízate XL': 120,
  'Estilízate Afro': 90,
  'Rizos de Gala': 60
}

export default function ThankYouPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const [appointment, setAppointment] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('pendingAppointment')
    const confirmed = localStorage.getItem('appointmentConfirmed')

    if (!saved || confirmed === 'true') {
      router.push('/booking')
      return
    }

    const data = JSON.parse(saved)
    setAppointment(data)

    const confirmarPagoYCita = async () => {
      try {
        // 1. Validar en Stripe
        const res = await fetch(`/api/stripe/check-session?session_id=${sessionId}`)
        const stripeData = await res.json()

        if (stripeData.payment_status !== 'paid') {
          toast.error('El pago no fue confirmado.')
          router.push('/booking')
          return
        }

        // 2. Guardar en Firestore
        const duracion = duracionesPorServicio[data.servicio] || 60

        await addDoc(collection(db, 'citas'), {
          tipoServicio: data.tipoServicio,
          profesional: data.profesional,
          fecha: data.fecha,
          hora: data.hora,
          nombre: data.nombre,
          email: data.email,
          telefono: data.telefono,
          sucursal: data.sucursal,
          servicio: data.servicio,
          duracion,
          notas: data.notas || 'Sin notas',
          status: 'por confirmar', // se queda pendiente
          createdAt: Timestamp.now()
        })

        // 3. Enviar correo
        await fetch('/api/send-confirmation-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: data.email,
            name: data.nombre,
            date: data.fecha,
            time: data.hora
          })
        })

        toast.success('¡Tu cita fue registrada! 🎉')
        localStorage.setItem('appointmentConfirmed', 'true')
      } catch (error) {
        console.error('Error al confirmar cita:', error)
        toast.error('No se pudo confirmar tu cita.')
      } finally {
        setLoading(false)
      }
    }

    if (sessionId) confirmarPagoYCita()
  }, [router, sessionId])

  if (loading) {
    return <p className="text-center py-10">Procesando pago y confirmando tu cita...</p>
  }

  if (!appointment) return null

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">¡Gracias por tu pago! 💖</h1>
      <p className="mb-2">Tu cita ha sido registrada para:</p>
      <p className="font-semibold text-lg">
        {appointment.fecha} a las {appointment.hora} con {appointment.profesional}
      </p>
      <p className="text-muted-foreground mb-6">{appointment.sucursal}</p>
      <p className="text-muted-foreground mb-6">
        Nuestro equipo confirmará tu cita y te contactará por WhatsApp 📲.
      </p>
    </div>
  )
}