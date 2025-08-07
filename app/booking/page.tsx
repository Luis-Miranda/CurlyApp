"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { db } from "@/lib/firebase"
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { services } from "../data/services"
import { Service } from "../types/service"

const servicios = ["Color", "Corte", "Curly Love", "Curly Detox"] //Se tinenen que cambiar los servicios en espera a maravilla
const sucursales = ["Av. Miguel Angel de Quevedo 520a"]
const colaboradoras = ["Key", "Coco", "Mali", "Con", "Mayra", "Moni", "Karla"]

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [hora, setHora] = useState("")
  const [servicio, setServicio] = useState("")
  const [sucursal, setSucursal] = useState("")
  const [colaboradora, setColaboradora] = useState("")
  const [nombre, setNombre] = useState("")
  const [telefono, setTelefono] = useState("")
  const [email, setEmail] = useState("")
  const [colaboradorasDisponibles, setColaboradorasDisponibles] = useState<string[]>([])

  // Horarios válidos
  const horariosDisponibles = [
    "10:00", "11:00", "12:00", "13:00",
    "15:00", "16:00", "17:00", "18:00"
  ]

  useEffect(() => {
    const obtenerColaboradoras = async () => {
      if (!selectedDate || !sucursal) return
      const snapshot = await getDocs(collection(db, "citas"))
      const fechaStr = format(selectedDate, "yyyy-MM-dd")

      const citasDelDia = snapshot.docs
        .map(doc => doc.data())
        .filter(cita => {
          const citaDate = cita.fecha?.toDate?.()
          return citaDate && format(citaDate, "yyyy-MM-dd") === fechaStr
        })

      const colaboradorasOcupadas = new Set<string>()

      citasDelDia.forEach(cita => {
        if (cita.sucursal && cita.colaboradora && cita.sucursal !== sucursal) {
          colaboradorasOcupadas.add(cita.colaboradora)
        }
      })

      const libres = colaboradoras.filter(colab => !colaboradorasOcupadas.has(colab))
      setColaboradorasDisponibles(libres)
    }

    obtenerColaboradoras()
  }, [selectedDate, sucursal])

  const handleSubmit = async () => {
    if (!selectedDate || !hora || !servicio || !sucursal || !nombre || !telefono || !email) {
      alert("Por favor, completa todos los campos obligatorios.")
      return
    }

    const snapshot = await getDocs(collection(db, "citas"))
    const fechaStr = format(selectedDate, "yyyy-MM-dd")

    const citasDelDia = snapshot.docs
      .map(doc => doc.data())
      .filter(cita =>
        cita.colaboradora &&
        cita.fecha?.toDate &&
        format(cita.fecha.toDate(), "yyyy-MM-dd") === fechaStr &&
        cita.hora === hora &&
        cita.colaboradora === (colaboradora || cita.colaboradora)
      )

    const mismaFechaYColaboradora = snapshot.docs
      .map(doc => doc.data())
      .filter(cita =>
        cita.colaboradora === colaboradora &&
        cita.fecha?.toDate &&
        format(cita.fecha.toDate(), "yyyy-MM-dd") === fechaStr
      )

    if (mismaFechaYColaboradora.length >= 4) {
      alert("La colaboradora ya tiene 4 citas este día. Elige otra fecha u hora.")
      return
    }

    const asignada = colaboradora || colaboradorasDisponibles[Math.floor(Math.random() * colaboradorasDisponibles.length)]

    await addDoc(collection(db, "citas"), {
      nombre,
      telefono,
      email,
      servicio,
      sucursal,
      colaboradora: asignada,
      fecha: Timestamp.fromDate(selectedDate),
      hora,
    })

    alert("Cita agendada con éxito.")
    setNombre("")
    setTelefono("")
    setEmail("")
    setServicio("")
    setSucursal("")
    setColaboradora("")
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

        <Select value={colaboradora} onValueChange={setColaboradora}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una colaboradora (opcional)" />
          </SelectTrigger>
          <SelectContent>
            {colaboradorasDisponibles.map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            fromDate={new Date()}
            toDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
          />
        </div>
      </div>

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

      <Button onClick={handleSubmit} className="w-full mt-4">Agendar cita</Button>
    </div>
  )
}