'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { toast } from 'sonner'
import { format } from 'date-fns'

export default function PaymentSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    const saveAppointment = async () => {
      const data = localStorage.getItem('pendingAppointment')
      if (!data) {
        toast.error('No se encontraron los datos de la cita')
        router.push('/')
        return
      }

      const {
        tipoServicio,
        profesional,
        fecha,
        hora,
        nombre,
        email,
        telefono,
        sucursal,
        servicio,
        notas,
      } = JSON.parse(data)

      try {
        // Guardar en Firestore
        await addDoc(collection(db, 'citas'), {
          type: tipoServicio,
          professional: profesional,
          date: fecha,
          time: hora,
          name: nombre,
          email,
          phone: telefono,
          branch: sucursal,
          service: [servicio],
          notes: notas || 'Sin notas',
          status: 'confirmada',
          createdAt: Timestamp.now(),
          pago: 'anticipo',
        })

        // Enviar correo de confirmación con Resend
        await fetch('/api/send-confirmation-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name: nombre, date: fecha, time: hora }),
        })

        // Guardar en localStorage para mostrar en la página de gracias
        localStorage.setItem('lastAppointment', JSON.stringify({
          name: nombre,
          date: fecha,
          time: hora,
          email,
        }))

        localStorage.removeItem('pendingAppointment')
        router.push('/booking/thank-you')
      } catch (err) {
        console.error(err)
        toast.error('Error al guardar la cita')
        router.push('/')
      }
    }

    saveAppointment()
  }, [router])

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-lg font-medium">Procesando pago y confirmando cita...</p>
    </div>
  )
}