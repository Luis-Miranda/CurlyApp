"use client"

import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type Cita = {
  nombre: string
  telefono: string
  servicio: string
  fecha: Date
  colaboradora: string
  sucursal: string
  hora: string
}

export default function AdminDashboardPage() {
  const [citasFuturas, setCitasFuturas] = useState<Record<string, Cita[]>>({})
  const [saludo, setSaludo] = useState("")

 useEffect(() => {
  const obtenerCitas = async () => {
    try {
      const snapshot = await getDocs(collection(db, "citas"))
      const ahora = new Date()

      const futuras: Record<string, Cita[]> = {}

      snapshot.docs.forEach(doc => {
        const data = doc.data()
        if (!data.fecha || !data.fecha.toDate) return

        const fecha = data.fecha.toDate()
        if (fecha < ahora) return

        const cita: Cita = {
          nombre: data.nombre || "Sin nombre",
          telefono: data.telefono || "No proporcionado",
          servicio: data.servicio || "Sin servicio",
          colaboradora: data.colaboradora || "Sin asignar",
          fecha,
          hora: data.hora || "Sin hora",
          sucursal: data.sucursal || "Sin sucursal",
        }

        const dia = format(fecha, "yyyy-MM-dd")
        if (!futuras[dia]) futuras[dia] = []
        futuras[dia].push(cita)
      })

      setCitasFuturas(futuras)
    } catch (error) {
      console.error("Error obteniendo citas:", error)
    }
  }

  const horaActual = new Date().getHours()
  if (horaActual < 12) setSaludo("Buen día")
  else if (horaActual < 19) setSaludo("Buenas tardes")
  else setSaludo("Buenas noches")

  obtenerCitas()
}, [])


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{saludo} Maravilla ✨</h1>
      <Separator />
      {Object.entries(citasFuturas).map(([fecha, citas]) => (
        <div key={fecha} className="space-y-4">
          <h2 className="text-lg font-bold">📅 {format(new Date(fecha), "dd MMMM yyyy")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {citas.map((cita, index) => (
              <Card key={index}>
                <CardContent className="p-4 space-y-1">
                  <p><strong>Colaboradora:</strong> {cita.colaboradora}</p>
                  <p><strong>Servicio:</strong> {cita.servicio}</p>
                  <p><strong>Hora:</strong> {cita.hora}</p>
                  <p><strong>Cliente:</strong> {cita.nombre}</p>
                  <p><strong>Teléfono:</strong> {cita.telefono}</p>
                  <p><strong>Sucursal:</strong> {cita.sucursal}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
