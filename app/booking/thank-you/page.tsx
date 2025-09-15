'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { db } from '@/lib/firebase'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { format } from 'date-fns'
import { toast } from 'sonner'

export default function ThankYouPage() {
  const router = useRouter()
  const [appointment, setAppointment] = useState<any>(null)

useEffect(() => {
  const saved = localStorage.getItem('pendingAppointment')
  const confirmed = localStorage.getItem('appointmentConfirmed')

  // Si no hay datos o ya fue confirmada
  if (!saved || confirmed === 'true') {
    router.push('/booking')
    return
  }

  const data = JSON.parse(saved)
  setAppointment(data)

  const guardarCita = async () => {
    try {
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
        notes: data.notas || 'Sin notas',
        status: 'confirmada',
        createdAt: Timestamp.now(),
      })

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
      <p className="font-semibold text-lg">{appointment.fecha} a las {appointment.hora} con {appointment.profesional}</p>
      <p className="text-muted-foreground mb-6">{appointment.sucursal}</p>
      <p className='text-muted-foreground mb-6'>Te contactaremos 48hrs antes de tu cita, vía WhatsApp para confirmar tu asistencia.</p>
    </div>
  )
}