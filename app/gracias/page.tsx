'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

export default function GraciasPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white dark:bg-black">
      <CheckCircle className="text-yellow-500 w-16 h-16 mb-6 animate-bounce" />

      <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
        ¡Gracias por tu reserva!
      </h1>

      <p className="text-lg text-muted-foreground max-w-md mb-6">
        Hemos recibido tu cita y la estamos procesando. Te llegará una confirmación pronto por WhatsApp o correo.
      </p>

      <Button asChild className="bg-yellow-500 text-black hover:bg-yellow-400 transition-all">
        <Link href="/">Volver al inicio</Link>
      </Button>
    </div>
  )
}