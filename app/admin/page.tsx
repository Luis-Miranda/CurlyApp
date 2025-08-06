"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import { format } from "date-fns"
import { CalendarDays, Users2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Cita {
  id: string
  nombre: string
  fecha: any
  colaboradora: string
  sucursal: string
}

export default function AdminDashboardPage() {
  const [citasPorDia, setCitasPorDia] = useState<Record<string, Cita[]>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const obtenerCitas = async () => {
      const snapshot = await getDocs(collection(db, "citas"))
      const hoy = new Date()

      const citas: Cita[] = snapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          nombre: data.nombre ?? "Sin nombre",
          fecha: data.fecha,
          colaboradora: data.colaboradora,
          sucursal: data.sucursal
        }
      })

      const futuras = citas.filter(cita => {
        const fecha = cita.fecha?.toDate ? cita.fecha.toDate() : new Date(cita.fecha)
        return fecha >= hoy
      })

      const agrupadas: Record<string, Cita[]> = {}

      futuras.forEach(cita => {
        const fechaStr = format(
          cita.fecha?.toDate ? cita.fecha.toDate() : new Date(cita.fecha),
          "yyyy-MM-dd"
        )
        if (!agrupadas[fechaStr]) agrupadas[fechaStr] = []
        agrupadas[fechaStr].push(cita)
      })

      setCitasPorDia(agrupadas)
      setLoading(false)
    }

    obtenerCitas()
  }, [])

  const saludo = () => {
    const hora = new Date().getHours()
    if (hora < 12) return "Buenos días"
    if (hora < 18) return "Buenas tardes"
    return "Buenas noches"
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{saludo()} Maravilla 🌟</h1>

      {loading ? (
        <p>Cargando citas...</p>
      ) : (
        Object.entries(citasPorDia)
          .sort(([fechaA], [fechaB]) => fechaA.localeCompare(fechaB))
          .map(([fecha, citas]) => (
            <Card key={fecha} className="mb-4">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CalendarDays size={18} />
                  {format(new Date(fecha), "PPP", { locale: undefined })}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {citas.map(cita => (
                  <div
                    key={cita.id}
                    className="border rounded p-2 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{cita.nombre}</p>
                      <p className="text-sm text-muted-foreground">
                        {cita.colaboradora} · {cita.sucursal}
                      </p>
                    </div>
                    <Users2 size={18} />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))
      )}
    </div>
  )
}
