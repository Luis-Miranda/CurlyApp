"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { db } from "@/lib/firebase"
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { toast } from "sonner"
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import PoliticasTexto from "@/components/politicas-texto"

const servicios = ["Color", "Corte", "Curly Love", "Curly Detox"]
const sucursales = ["Av. Miguel Angel de Quevedo 520a"]
const profesionales = ["Key", "Coco", "Mali", "Con", "Mayra", "Moni", "Karla"]
const horariosDisponibles = [
  "10:00", "11:00", "12:00", "13:00",
  "15:00", "16:00", "17:00", "18:00"
]

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
  const [aceptaPoliticas, setAceptaPoliticas] = useState(false)
  const [mostrarModal, setMostrarModal] = useState(false)

  useEffect(() => {
    const obtenerDisponibles = async () => {
      if (!selectedDate || !sucursal) return
      const snapshot = await getDocs(collection(db, "citas"))
      const fechaStr = format(selectedDate, "yyyy-MM-dd")

      const citasDelDia = snapshot.docs
        .map(doc => doc.data())
        .filter(cita => {
          const citaDate = cita.fecha?.toDate?.()
          return citaDate && format(citaDate, "yyyy-MM-dd") === fechaStr
        })

      const ocupados = new Set<string>()
      citasDelDia.forEach(cita => {
        const prof = cita.profesional ?? cita.colaboradora
        if (cita.sucursal && prof && cita.sucursal !== sucursal) {
          ocupados.add(prof)
        }
      })

      const libres = profesionales.filter(p => !ocupados.has(p))
      setProfesionalesDisponibles(libres)
    }

    obtenerDisponibles()
  }, [selectedDate, sucursal])

  const handleConfirmarCita = async () => {
    if (!aceptaPoliticas) {
      toast.error("Debes aceptar las políticas antes de continuar.")
      return
    }

    if (!selectedDate || !hora || !servicio || !sucursal || !nombre || !telefono || !email) {
      toast.error("Por favor, completa todos los campos.")
      return
    }

    const snapshot = await getDocs(collection(db, "citas"))
    const fechaStr = format(selectedDate, "yyyy-MM-dd")
    const profesionalAsignada = profesional || profesionalesDisponibles[Math.floor(Math.random() * profesionalesDisponibles.length)]

    const citaYaExiste = snapshot.docs.some(doc => {
      const data = doc.data()
      const fechaCita = data.fecha?.toDate?.()
      return (
        format(fechaCita, "yyyy-MM-dd") === fechaStr &&
        data.hora === hora &&
        (data.profesional ?? data.colaboradora) === profesionalAsignada
      )
    })

    if (citaYaExiste) {
      toast.error("Ya hay una cita con esta profesional a esa hora.")
      return
    }

    const citasDelDia = snapshot.docs.filter(doc => {
      const data = doc.data()
      const fechaCita = data.fecha?.toDate?.()
      return (
        format(fechaCita, "yyyy-MM-dd") === fechaStr &&
        (data.profesional ?? data.colaboradora) === profesionalAsignada
      )
    })

    if (citasDelDia.length >= 4) {
      toast.error("Esta profesional ya tiene 4 citas ese día.")
      return
    }

    await addDoc(collection(db, "citas"), {
      nombre,
      telefono,
      email,
      servicio,
      sucursal,
      profesional: profesionalAsignada,
      fecha: Timestamp.fromDate(selectedDate),
      hora,
      aceptaPoliticas: true,
      createdAt: new Date()
    })

    toast.success("🎉 ¡Cita agendada con éxito!")
    setNombre("")
    setTelefono("")
    setEmail("")
    setServicio("")
    setSucursal("")
    setProfesional("")
    setSelectedDate(undefined)
    setHora("")
    setAceptaPoliticas(false)
    setMostrarModal(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Reserva tu cita</h1>

      <Select value={servicio} onValueChange={setServicio}>
        <SelectTrigger><SelectValue placeholder="Selecciona un servicio" /></SelectTrigger>
        <SelectContent>{servicios.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
      </Select>

      <Select value={sucursal} onValueChange={setSucursal}>
        <SelectTrigger><SelectValue placeholder="Selecciona una sucursal" /></SelectTrigger>
        <SelectContent>{sucursales.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
      </Select>

      <div className="text-center">
        <label className="block text-sm mb-3 font-medium">Selecciona una fecha:</label>
        <div className="flex justify-center">
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
        <SelectTrigger><SelectValue placeholder="Selecciona la hora" /></SelectTrigger>
        <SelectContent>{horariosDisponibles.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}</SelectContent>
      </Select>

      <Select value={profesional} onValueChange={setProfesional}>
        <SelectTrigger><SelectValue placeholder="Selecciona una profesional (opcional)" /></SelectTrigger>
        <SelectContent>{profesionalesDisponibles.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
      </Select>

      <Input placeholder="Nombre completo" value={nombre} onChange={e => setNombre(e.target.value)} />
      <Input placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} />
      <Input placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} />

      <Dialog open={mostrarModal} onOpenChange={setMostrarModal}>
        <DialogTrigger asChild>
          <Button disabled={!nombre || !telefono || !email || !servicio || !sucursal || !hora || !selectedDate}>
            Continuar
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Políticas de reserva</DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[400px] p-4 border rounded-md">
            <PoliticasTexto />
          </ScrollArea>

          <div className="flex items-center space-x-2 mt-4">
            <Checkbox id="checkbox-politicas" checked={aceptaPoliticas} onCheckedChange={() => setAceptaPoliticas(!aceptaPoliticas)} />
            <label htmlFor="checkbox-politicas" className="text-sm">
              Acepto las políticas de reserva y cancelación
            </label>
          </div>

          <DialogFooter>
            <Button onClick={handleConfirmarCita} disabled={!aceptaPoliticas}>Confirmar cita</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}