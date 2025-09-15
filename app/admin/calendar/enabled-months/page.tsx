// app/admin/calendar/enabled-months/page.tsx

"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore"
import {
  startOfMonth,
  addMonths,
  format,
  isSameMonth,
  eachMonthOfInterval,
} from "date-fns"
import { toast } from "sonner"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export default function EnabledBookingMonthsPage() {
  const [enabledMonths, setEnabledMonths] = useState<string[]>([])
  const today = new Date()
  const start = startOfMonth(today)
  const end = addMonths(start, 5)
  const months = eachMonthOfInterval({ start, end })

  useEffect(() => {
    const fetchEnabledMonths = async () => {
      const snapshot = await getDocs(collection(db, "enabledBookingMonths"))
      const months: string[] = []
      snapshot.forEach((doc) => {
        months.push(doc.id)
      })
      setEnabledMonths(months)
    }
    fetchEnabledMonths()
  }, [])

  const toggleMonth = async (month: string) => {
    try {
      if (enabledMonths.includes(month)) {
        await deleteDoc(doc(db, "enabledBookingMonths", month))
        setEnabledMonths((prev) => prev.filter((m) => m !== month))
        toast.success(`Mes deshabilitado: ${month}`)
      } else {
        await setDoc(doc(db, "enabledBookingMonths", month), { enabled: true })
        setEnabledMonths((prev) => [...prev, month])
        toast.success(`Mes habilitado: ${month}`)
      }
    } catch (error) {
      toast.error("Error al actualizar el mes")
      console.error(error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Habilitar meses para reservar
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {months.map((monthDate) => {
          const formatted = format(monthDate, "yyyy-MM")
          const isChecked = enabledMonths.includes(formatted)
          return (
            <Card key={formatted}>
              <CardHeader>
                <CardTitle>{format(monthDate, "MMMM yyyy")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={formatted}
                    checked={isChecked}
                    onCheckedChange={() => toggleMonth(formatted)}
                  />
                  <label htmlFor={formatted}>
                    {isChecked ? "Habilitado" : "Deshabilitado"}
                  </label>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}