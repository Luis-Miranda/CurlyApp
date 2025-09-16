'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
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
  'Color + Chill': 120,
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
  'Rizos de Gala': 60,
  'Retoque de tinte': 120
}

export default function ThankYouPage() {
  const router = useRouter()
  const [appointment, setAppointment] = useState<any>(null)

  useEffect(() => {
    const saved = localStorage.getItem('pendingAppointment')
    const confirmed = localStorage.getItem('appointmentConfirmed')

    // Redirigir si ya fue confirmada o no existe
    if (!saved || confirmed === 'true') {
      router.push('/booking')
      return
    }

    const data = JSON.parse(saved)
    setAppointment(data)

    const guardarCita = async () => {
      try {
        const duracion = duracionesPorServicio[data.servicio] || 60

        await addDoc(collection(db, 'citas'), {
          type: data.tipoServicio,
          professional: data.profesional,
          date: data.fecha,
          time: data.hora,
          name: data.nombre,
          email: data.email,
          phone: data.telefono,
          branch: data.sucursal,
          service: [data.servicio],
          duration: duracion,
          notes: data.notas || 'Sin notas',
          status: 'confirmada',
          createdAt: Timestamp.now()
        })

        // Enviar correo
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

        toast.success('¡Tu cita fue confirmada! 🎉')
        localStorage.setItem('appointmentConfirmed', 'true')
      } catch (error) {
        console.error('Error al guardar la cita confirmada:', error)
        toast.error('No se pudo confirmar tu cita.')
      }
    }

    guardarCita()
  }, [router])

  if (!appointment) return null

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">¡Gracias por tu pago! 💖</h1>
      <p className="mb-2">Tu cita ha sido confirmada para:</p>
      <p className="font-semibold text-lg">
        {appointment.fecha} a las {appointment.hora} con {appointment.profesional}
      </p>
      <p className="text-muted-foreground mb-6">{appointment.sucursal}</p>
      <p className="text-muted-foreground mb-6">
        Te contactaremos 48 hrs antes de tu cita vía WhatsApp para confirmar tu asistencia.
      </p>
    </div>
  )
}