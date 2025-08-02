"use client"

import { useEffect, useState } from "react"
import { Timestamp, collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { startOfToday } from "date-fns"

interface Appointment {
  id: string
  name: string
  email: string
  phone: string
  notes: string
  service: string
  colaborador: string
  startTime: Timestamp
  endTime: Timestamp
}

const colaboradores = ["Erika", "Laura", "Karla"]

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filtered, setFiltered] = useState<Appointment[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(startOfToday())
  const [colabFilter, setColabFilter] = useState<string>("all")

  useEffect(() => {
    const fetchAppointments = async () => {
      const q = query(collection(db, "citas"))
      const snapshot = await getDocs(q)
      const data: Appointment[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Appointment[]
      setAppointments(data)
    }
    fetchAppointments()
  }, [])

  useEffect(() => {
    if (!selectedDate) return
    const dayStart = new Date(selectedDate)
    dayStart.setHours(0, 0, 0, 0)
    const dayEnd = new Date(selectedDate)
    dayEnd.setHours(23, 59, 59, 999)

    const filteredResults = appointments.filter((appt) => {
  const start = appt.startTime instanceof Timestamp
    ? appt.startTime.toDate()
    : new Date(appt.startTime)

  return (
    start >= dayStart &&
    start <= dayEnd &&
    (colabFilter === "all" || appt.colaborador === colabFilter)
  )
})
    setFiltered(filteredResults)
  }, [appointments, selectedDate, colabFilter])

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Citas Programadas</h1>
        <p className="text-muted-foreground">Filtra por fecha y colaborador</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium">Fecha</label>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Colaborador</label>
          <Select value={colabFilter} onValueChange={setColabFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Todos los colaboradores" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {colaboradores.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <p className="text-muted-foreground">No hay citas para esta fecha</p>
        ) : (
          filtered.map((appt) => (
            <Card key={appt.id}>
              <CardHeader>
                <CardTitle className="text-lg">{appt.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{appt.email} | {appt.phone}</p>
              </CardHeader>
              <CardContent className="space-y-1">
                <p><strong>Servicio:</strong> {appt.service}</p>
                <p><strong>Colaborador:</strong> {appt.colaborador}</p>
                <p><strong>Hora:</strong> {appt.startTime.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p><strong>Notas:</strong> {appt.notes || "-"}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
