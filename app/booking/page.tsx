"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Clock } from "lucide-react"
import { db } from "@/lib/firebase"
import { addDoc, collection, getDocs } from "firebase/firestore"
import { format } from "date-fns"

const services = [
  { id: 1, name: "Curly Cut & Style", duration: "90 min", price: "$85" },
  { id: 2, name: "Deep Conditioning Treatment", duration: "90 min", price: "$65" },
  { id: 3, name: "Curl Refresh & Style", duration: "60 min", price: "$45" },
  { id: 4, name: "Curly Hair Consultation", duration: "45 min", price: "$35" },
  { id: 5, name: "Bridal Curly Styling", duration: "120 min", price: "$150" },
  { id: 6, name: "Curl Training Session", duration: "75 min", price: "$75" },
]

const timeSlots = ["10:00 AM", "11:30 AM", "1:00 PM", "3:00 PM", "4:30 PM", "6:00 PM"]
const colaboradoras = ["Key", "Coco", "Mali", "Con", "Mayra", "Moni", "Karla"]
const sucursales = ["Sucursal Portales", "Sucursal División del Norte"]

export default function BookingPage() {
  const searchParams = useSearchParams()
  const preSelectedService = searchParams.get("service")

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedService, setSelectedService] = useState(preSelectedService || "")
  const [selectedTime, setSelectedTime] = useState("")
  const [sucursal, setSucursal] = useState("")
  const [colaboradora, setColaboradora] = useState("")
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", notes: "" })
  const [blockedDates, setBlockedDates] = useState<string[]>([])
  const [colaboradorasDisponibles, setColaboradorasDisponibles] = useState<string[]>([])

  useEffect(() => {
    const fetchBlocked = async () => {
      const snapshot = await getDocs(collection(db, "bloqueos"))
      const dates = snapshot.docs.map((doc) => format(doc.data().fecha.toDate(), "yyyy-MM-dd"))
      setBlockedDates(dates)
    }
    fetchBlocked()
  }, [])

  useEffect(() => {
    const obtenerColaboradoras = async () => {
      if (!selectedDate || !sucursal) return
      const snapshot = await getDocs(collection(db, "citas"))
      const fechaStr = format(selectedDate, "yyyy-MM-dd")
      const citasDelDia = snapshot.docs.map(doc => doc.data()).filter(cita => format(cita.fecha.toDate(), "yyyy-MM-dd") === fechaStr)
      const colaboradorasAsignadas = new Set<string>()
      citasDelDia.forEach(cita => {
        if (cita.sucursal && cita.colaboradora && cita.sucursal !== sucursal) {
          colaboradorasAsignadas.add(cita.colaboradora)
        }
      })
      const libres = colaboradoras.filter(colab => !colaboradorasAsignadas.has(colab))
      setColaboradorasDisponibles(libres)
    }
    obtenerColaboradoras()
  }, [selectedDate, sucursal])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const colaboradoraAsignada = colaboradora || colaboradorasDisponibles[Math.floor(Math.random() * colaboradorasDisponibles.length)]
    const snapshot = await getDocs(collection(db, "citas"))
    const fechaStr = format(selectedDate!, "yyyy-MM-dd")
    const citasExistentes = snapshot.docs.map(doc => doc.data()).filter(cita => format(cita.fecha.toDate(), "yyyy-MM-dd") === fechaStr && cita.colaboradora === colaboradoraAsignada)

    if (citasExistentes.length >= 4) {
      alert(`La colaboradora ${colaboradoraAsignada} ya tiene 4 citas asignadas ese día.`)
      return
    }

    const horarioOcupado = citasExistentes.some(cita => cita.hora === selectedTime)
    if (horarioOcupado) {
      alert(`La colaboradora ${colaboradoraAsignada} ya tiene una cita a las ${selectedTime}.`)
      return
    }

    await addDoc(collection(db, "citas"), {
      ...formData,
      servicio: selectedService,
      fecha: selectedDate,
      hora: selectedTime,
      sucursal,
      colaboradora: colaboradoraAsignada,
    })

    alert("¡Cita solicitada con éxito! Te contactaremos pronto para confirmar.")
  }

  const selectedServiceDetails = services.find((s) => s.name === selectedService)
  const isDateDisabled = (date: Date) => {
    const today = new Date()
    const maxDate = new Date()
    maxDate.setMonth(today.getMonth() + 3)
    const formatted = format(date, "yyyy-MM-dd")
    return date < today || date > maxDate || blockedDates.includes(formatted) || date.getDay() === 0
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Book Your Appointment</h1>
        <p className="text-lg text-muted-foreground">Schedule your curly hair transformation with us</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" /> Servicio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label>Selecciona el servicio</Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Elige un servicio" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s.id} value={s.name}>{s.name} - {s.duration} - {s.price}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedServiceDetails && (
                <div className="p-2 bg-muted rounded-md text-sm">
                  {selectedServiceDetails.name} | {selectedServiceDetails.duration} | {selectedServiceDetails.price}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sucursal</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={sucursal} onValueChange={setSucursal}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una sucursal" />
                </SelectTrigger>
                <SelectContent>
                  {sucursales.map((suc) => (
                    <SelectItem key={suc} value={suc}>{suc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Colaboradora</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={colaboradora} onValueChange={setColaboradora}>
                <SelectTrigger>
                  <SelectValue placeholder="Puedes elegir o dejar que asignemos una" />
                </SelectTrigger>
                <SelectContent>
                  {colaboradorasDisponibles.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Fecha</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar selected={selectedDate} onSelect={setSelectedDate} mode="single" className="rounded-md border" disabled={isDateDisabled} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Horario</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un horario disponible" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Datos de contacto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nombre completo</Label>
                <Input id="name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} required />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="notes">Notas adicionales</Label>
              <Textarea id="notes" placeholder="¿Algo que debamos saber?" value={formData.notes} onChange={(e) => handleInputChange("notes", e.target.value)} rows={3} />
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button type="submit" size="lg" className="w-full md:w-auto">Solicitar cita</Button>
          <p className="text-sm text-muted-foreground mt-2">Te contactaremos para confirmar tu cita.</p>
        </div>
      </form>
    </div>
  )
}
