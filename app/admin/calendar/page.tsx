'use client'

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, doc, getDocs, setDoc } from "firebase/firestore"
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { toast } from "sonner"
import Link from "next/link"

const profesionales = [
  "Keyla", "Coco", "Cintia", "Mayra", "Karen", "Vane", "Karla", "Mony", "Maravilla Curly"
]

export default function AdminCalendarPage() {
  const [profesional, setProfesional] = useState("")
  const [diasBloqueados, setDiasBloqueados] = useState<string[]>([])
  const [diasExistentes, setDiasExistentes] = useState<Record<string, string[]>>({})

  const hoy = new Date()
  const diasDelMes = eachDayOfInterval({
    start: startOfMonth(hoy),
    end: endOfMonth(hoy),
  })

  useEffect(() => {
    const cargarBloqueos = async () => {
      const snapshot = await getDocs(collection(db, "blockedDaysByProfessional"))
      const datos: Record<string, string[]> = {}

      snapshot.forEach(doc => {
        const data = doc.data()
        datos[data.name] = data.blockedDays || []
      })

      setDiasExistentes(datos)
    }

    cargarBloqueos()
  }, [])

  useEffect(() => {
    if (profesional) {
      setDiasBloqueados(diasExistentes[profesional] || [])
    }
  }, [profesional, diasExistentes])

  const toggleDia = (dia: string) => {
    if (diasBloqueados.includes(dia)) {
      setDiasBloqueados(diasBloqueados.filter(d => d !== dia))
    } else {
      setDiasBloqueados([...diasBloqueados, dia])
    }
  }

  const guardarCambios = async () => {
    if (!profesional) {
      toast.error("Selecciona una profesional")
      return
    }

    await setDoc(doc(db, "blockedDaysByProfessional", profesional), {
      name: profesional,
      blockedDays: diasBloqueados,
    })

    toast.success("Días bloqueados actualizados ✅")
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-center">
          Bloqueo de días por profesional
        </h1>

        <Link href="/admin/calendar/enabled-months">
          <Button variant="outline">
            Configurar meses habilitados
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <Select value={profesional} onValueChange={setProfesional}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una profesional" />
          </SelectTrigger>
          <SelectContent>
            {profesionales.map(p => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-6">
        {diasDelMes.map((dia) => {
          const fecha = format(dia, "yyyy-MM-dd")
          const bloqueado = diasBloqueados.includes(fecha)

          return (
            <button
              key={fecha}
              onClick={() => toggleDia(fecha)}
              className={`p-2 border rounded-md text-sm text-center
                ${bloqueado ? "bg-red-400 text-white" : "bg-white hover:bg-gray-100"}`}
            >
              {format(dia, "d")}
            </button>
          )
        })}
      </div>

      <Button onClick={guardarCambios} disabled={!profesional}>
        Guardar cambios
      </Button>
    </div>
  )
}