'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function TestEmailPage() {
  const [loading, setLoading] = useState(false)

  const sendTestEmail = async () => {
    setLoading(true)

    const response = await fetch('/api/send-confirmation-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'andy_25munoz@hotmail.com', // ✅ pon aquí tu correo real
        name: 'Andrea Muñoz',
        date: '2025-09-13',
        time: '11:00'
      }),
    })

    const result = await response.json()
    console.log(result)
    setLoading(false)
    alert('Correo de prueba enviado (revisa spam también)')
  }

  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl font-bold mb-6">Prueba de envío de correo</h2>
      <Button onClick={sendTestEmail} disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar correo de prueba'}
      </Button>
    </div>
  )
}