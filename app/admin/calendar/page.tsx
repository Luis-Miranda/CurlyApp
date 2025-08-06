"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { db } from "@/lib/firebase"
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore"
import { toast } from "sonner"

export default function AdminCalendarPage() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlockedDates = async () => {
      try {
        const snapshot = await getDocs(collection(db, "diasBloqueados"))
        const dates = snapshot.docs.map((doc) => {
          const data = doc.data()
          if (data.fecha?.seconds) {
            return new Date(data.fecha.seconds * 1000)
          }
          return new Date(data.fecha)
        })
        setSelectedDates(dates)
      } catch (error) {
        console.error("Error al cargar días bloqueados:", error)
        toast.error("Error al cargar días bloqueados")
      } finally {
        setLoading(false)
      }
    }

    fetchBlockedDates()
  }, [])

  const toggleDate = async (date: Date) => {
    const formatted = format(date, "yyyy-MM-dd")
    const docRef = doc(db, "diasBloqueados", formatted)
    const isBlocked = selectedDates.some(
      (d) => format(d, "yyyy-MM-dd") === formatted
    )

    try {
      if (isBlocked) {
        await deleteDoc(docRef)
        setSelectedDates((prev) =>
          prev.filter((d) => format(d, "yyyy-MM-dd") !== formatted)
        )
        toast.success("Día desbloqueado correctamente")
      } else {
        await setDoc(docRef, { fecha: date })
        setSelectedDates((prev) => [...prev, date])
        toast.success("Día bloqueado correctamente")
      }
    } catch (error) {
      console.error("Error al actualizar día:", error)
      toast.error("Error al actualizar día")
    }
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Bloquear días</h1>
      {!loading ? (
        <Calendar
          mode="multiple"
          selected={selectedDates}
          onDayClick={toggleDate}
          classNames={{
            day_selected: "bg-red-500 text-white hover:bg-red-600",
          }}
        />
      ) : (
        <p className="text-center">Cargando calendario...</p>
      )}
    </div>
  )
}
