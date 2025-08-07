"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { db } from "@/lib/firebase"
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const servicios = ["Color", "Corte", "Curly Love", "Curly Detox"] // Reemplazar por los definitivos
const sucursales = ["Av. Miguel Ángel de Quevedo 520a"]
const profesionales = ["Key", "Coco", "Mali", "Con", "Mayra", "Moni", "Karla"]

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [hora, setHora] = useState("")
  const [servicio, setServicio] = useState("")
  const [sucursal, setSucursal] = useState("")
  const [profesional, setProfesional] = useState("")
  const [nombre, setNombre] = useState("")
  const [telefono, setTelefono] = useState("")
  const [email, setEmail] = useState("")
  const [profesionalesDisponibles, setProfesionalesDisponibles] = useState<string[]>([])

  const horariosDisponibles = [
    "10:00", "11:00", "12:00", "13:00",
    "15:00", "16:00", "17:00", "18:00"
  ]

  useEffect(() => {
    const obtenerProfesionales = async () => {
      if (!selectedDate || !sucursal) return

      const snapshot = await getDocs(collection(db, "citas"))
      const fechaStr = format(selectedDate, "yyyy-MM-dd")

      const citasDelDia = snapshot.docs
        .map(doc => doc.data())
        .filter(cita => {
          const citaDate = cita.fecha?.toDate?.()
          return citaDate && format(citaDate, "yyyy-MM-dd") === fechaStr
        })

      const profesionalesOcupados = new Set<string>()
      citasDelDia.forEach(cita => {
        if (cita.sucursal && cita.profesional && cita.sucursal !== sucursal) {
          profesionalesOcupados.add(cita.profesional)
        }
      })

      const libres = profesionales.filter(p => !profesionalesOcupados.has(p))
      setProfesionalesDisponibles(libres)
    }

    obtenerProfesionales()
  }, [selectedDate, sucursal])

  const handleSubmit = async () => {
    if (!selectedDate || !hora || !servicio || !sucursal || !nombre || !telefono || !email) {
      alert("Por favor, completa todos los campos obligatorios.")
      return
    }

    const snapshot = await getDocs(collection(db, "citas"))
    const fechaStr = format(selectedDate, "yyyy-MM-dd")

    const mismaFechaYProfesional = snapshot.docs
      .map(doc => doc.data())
      .filter(cita =>
        cita.profesional === profesional &&
        cita.fecha?.toDate &&
        format(cita.fecha.toDate(), "yyyy-MM-dd") === fechaStr
      )

    if (mismaFechaYProfesional.length >= 4) {
      alert("El profesional ya tiene 4 citas este día. Elige otra fecha u hora.")
      return
    }

    const asignado = profesional || profesionalesDisponibles[Math.floor(Math.random() * profesionalesDisponibles.length)]

    await addDoc(collection(db, "citas"), {
      nombre,
      telefono,
      email,
      servicio,
      sucursal,
      profesional: asignado,
      fecha: Timestamp.fromDate(selectedDate),
      hora,
    })

    alert("Cita agendada con éxito.")
    setNombre("")
    setTelefono("")
    setEmail("")
    setServicio("")
    setSucursal("")
    setProfesional("")
    setSelectedDate(undefined)
    setHora("")
  }

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold text-center">Agenda tu cita</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select value={servicio} onValueChange={setServicio}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un servicio" />
          </SelectTrigger>
          <SelectContent>
            {servicios.map(s => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sucursal} onValueChange={setSucursal}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una sucursal" />
          </SelectTrigger>
          <SelectContent>
            {sucursales.map(s => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={profesional} onValueChange={setProfesional}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un profesional (opcional)" />
          </SelectTrigger>
          <SelectContent>
            {(profesionalesDisponibles.length > 0 ? profesionalesDisponibles : profesionales).map(p => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        fromDate={new Date()}
        toDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
        className="w-full"
      />

      <Select value={hora} onValueChange={setHora}>
        <SelectTrigger>
          <SelectValue placeholder="Selecciona la hora" />
        </SelectTrigger>
        <SelectContent>
          {horariosDisponibles.map(h => (
            <SelectItem key={h} value={h}>{h}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input placeholder="Nombre completo" value={nombre} onChange={e => setNombre(e.target.value)} />
      <Input placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} />
      <Input placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} />

      <Button onClick={handleSubmit} className="w-full mt-4">
        Agendar cita
      </Button>
    </div>
  )
}
