"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval } from "date-fns"
import { CalendarDays, Users2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Cita {
  id: string
  name: string
  date: string
  time: string
  professional: string
  branch: string
  status: string
}

export default function AdminDashboardPage() {
  const [citasHoy, setCitasHoy] = useState<Cita[]>([])
  const [citasSemana, setCitasSemana] = useState<Cita[]>([])
  const [citasMes, setCitasMes] = useState<Cita[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const obtenerCitas = async () => {
      const snapshot = await getDocs(collection(db, "citas"))
      const hoy = new Date()

      const todasLasCitas: Cita[] = snapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          name: data.name ?? "Sin nombre",
          date: data.date,
          time: data.time,
          professional: data.professional,
          branch: data.branch,
          status: data.status
        }
      })

      const citasConFechaValida = todasLasCitas.filter(cita => {
        try {
          const fullDate = new Date(`${cita.date}T${cita.time}`)
          return !isNaN(fullDate.getTime())
        } catch {
          return false
        }
      })

      const hoyInicio = startOfDay(hoy)
      const hoyFin = endOfDay(hoy)
      const semanaInicio = startOfWeek(hoy, { weekStartsOn: 1 }) // Lunes
      const semanaFin = endOfWeek(hoy, { weekStartsOn: 1 })
      const mesInicio = startOfMonth(hoy)
      const mesFin = endOfMonth(hoy)

      setCitasHoy(
        citasConFechaValida.filter(cita =>
          isWithinInterval(new Date(`${cita.date}T${cita.time}`), {
            start: hoyInicio,
            end: hoyFin
          })
        )
      )

      setCitasSemana(
        citasConFechaValida.filter(cita =>
          isWithinInterval(new Date(`${cita.date}T${cita.time}`), {
            start: semanaInicio,
            end: semanaFin
          })
        )
      )

      setCitasMes(
        citasConFechaValida.filter(cita =>
          isWithinInterval(new Date(`${cita.date}T${cita.time}`), {
            start: mesInicio,
            end: mesFin
          })
        )
      )

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

  const renderCitas = (titulo: string, citas: Cita[]) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <CalendarDays size={18} />
          {titulo} ({citas.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {citas.length === 0 ? (
          <p className="text-sm text-muted-foreground">Sin citas registradas.</p>
        ) : (
          citas.map((cita) => (
            <div
              key={cita.id}
              className="border rounded p-2 flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4"
            >
              <div>
                <p className="font-medium text-sm md:text-base">{cita.name}</p>
                <p className="text-xs text-muted-foreground md:text-sm">
                  {cita.professional} · {cita.branch}
                </p>
                <p className="text-xs text-muted-foreground md:text-sm">
                  {format(new Date(`${cita.date}T${cita.time}`), "PPPp")} · {cita.status}
                </p>
              </div>
              <div className="flex justify-end">
                <Users2 size={18} />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{saludo()} Maravilla 🌟</h1>

      {loading ? (
        <p>Cargando citas...</p>
      ) : (
        <div className="space-y-4">
          {renderCitas("Citas de hoy", citasHoy)}
          {renderCitas("Citas de esta semana", citasSemana)}
          {renderCitas("Citas de este mes", citasMes)}
        </div>
      )}
    </div>
  )
}