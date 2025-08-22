'use client'

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { ModalPoliticas } from "@/components/politicas-modal"
import { toast } from "sonner"
import { isSameDay } from "date-fns"

const profesionales = ["Key", "Coco", "Mali", "Mayra", "Moni", "Karla", "Sin preferencia"]
const servicios = [
  "Toque Curly (1hr)",
  "Curly Makeover XL/AFRO",
  "Consulta Curly",
  "Relax and restore",
  "Curly Makeover",
  "Revive tu rizo",
  "Baño de vapor Afro",
  "Baño de vapor XL",
  "Rizos Hidratados XL",
  "Rizos Hidratados",
  "Baño de Vapor",
  "Definición curly",
  "Estilizate",
  "Corte Esencial",
  "Revive Tu Rizo XL",
  "Afro Glow",
  "Corte Afrorizo Poderoso",
  "Mini Rizos",
  "Corte Escencial XL",
  "Rizos Masculinos",
  "Rizos Con ciencia XL",
  "Rizos con ciencia",
  "Pixie Touch (45 días)",
  "Rizos y café",
  "Retoque de tinte",
  "Hidratación & Pausa",
  "Rizos Full Ritual",
  "Color + Chill",
  "Consulta con Hidratación"
]
const sucursales = ["Av. Miguel Angel de Quevedo 520a"]
const horasDisponibles = [
  "10:00", "11:00", "12:00", "13:00",
  "15:00", "16:00", "17:00", "18:00"
]

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const servicioParam = searchParams.get("servicio") || ""

  const [nombre, setNombre] = useState("")
  const [telefono, setTelefono] = useState("")
  const [email, setEmail] = useState("")
  const [servicio, setServicio] = useState(servicioParam)
  const [profesional, setProfesional] = useState("")
  const [sucursal, setSucursal] = useState("")
  const [fecha, setFecha] = useState<Date | undefined>(undefined)
  const [hora, setHora] = useState("")
  const [aceptaPoliticas, setAceptaPoliticas] = useState(false)
  const [citas, setCitas] = useState<any[]>([])

  useEffect(() => {
    const fetchCitas = async () => {
      const snapshot = await getDocs(collection(db, "citas"))
      const data = snapshot.docs.map(doc => doc.data())
      setCitas(data)
    }
    fetchCitas()
  }, [])

  const handleSubmit = async () => {
    if (!nombre || !telefono || !email || !servicio || !sucursal || !fecha || !hora || !aceptaPoliticas) {
      toast.error("Por favor completa todos los campos.")
      return
    }

    const fechaSeleccionada = Timestamp.fromDate(fecha)

    const profesionalAsignado = profesional === "Sin preferencia"
      ? obtenerProfesionalDisponible(fecha, hora)
      : profesional

    if (!profesionalAsignado) {
      toast.error("No hay profesionales disponibles en este horario.")
      return
    }

    const citasExistentes = citas.filter(
      (c) =>
        c.fecha?.toDate &&
        isSameDay(c.fecha.toDate(), fecha) &&
        c.hora === hora &&
        c.profesional === profesionalAsignado
    )

    if (citasExistentes.length >= 1) {
      toast.error("Este horario ya está reservado.")
      return
    }

    const totalCitasPorProfesional = citas.filter(
      (c) =>
        c.fecha?.toDate &&
        isSameDay(c.fecha.toDate(), fecha) &&
        c.profesional === profesionalAsignado
    )

    if (totalCitasPorProfesional.length >= 4) {
      toast.error("Este profesional ya tiene 4 citas este día.")
      return
    }

    await addDoc(collection(db, "citas"), {
      nombre,
      telefono,
      email,
      servicio,
      sucursal,
      profesional: profesionalAsignado,
      fecha: fechaSeleccionada,
      hora,
      aceptaPoliticas: true,
      createdAt: Timestamp.now(),
    })

    toast.success("Tu cita ha sido registrada correctamente 🎉")
    router.push("/gracias")
  }

  const obtenerProfesionalDisponible = (fecha: Date, hora: string) => {
    const disponibles = profesionales.filter((p) => {
      if (p === "Sin preferencia") return false
      const citasDeEseDia = citas.filter(
        (c) =>
          c.fecha?.toDate &&
          isSameDay(c.fecha.toDate(), fecha) &&
          c.profesional === p
      )

      const citasMismaHora = citasDeEseDia.filter((c) => c.hora === hora)

      return citasDeEseDia.length < 4 && citasMismaHora.length === 0
    })

    return disponibles[0] || null
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Reserva tu cita</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Nombre completo</Label>
          <Input value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div>
          <Label>Teléfono</Label>
          <Input value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        </div>
        <div>
          <Label>Correo electrónico</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label>Servicio</Label>
          <Select value={servicio} onValueChange={setServicio}>
            <SelectTrigger>
              <SelectValue>{servicio || "Selecciona un servicio"}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {servicios.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Profesional</Label>
          <Select value={profesional} onValueChange={setProfesional}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una profesional" />
            </SelectTrigger>
            <SelectContent>
              {profesionales.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Sucursal</Label>
          <Select value={sucursal} onValueChange={setSucursal}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una sucursal" />
            </SelectTrigger>
            <SelectContent>
              {sucursales.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Fecha</Label>
          <DatePicker date={fecha ?? undefined} onChange={setFecha} />
        </div>
        <div>
          <Label>Hora</Label>
          <Select value={hora} onValueChange={setHora}>
            <SelectTrigger><SelectValue placeholder="Selecciona una hora" /></SelectTrigger>
            <SelectContent>
              {horasDisponibles.map((h) => (
                <SelectItem key={h} value={h}>{h}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ModalPoliticas
        checked={aceptaPoliticas}
        onCheckChange={setAceptaPoliticas}
      />

      <Button className="w-full mt-4" onClick={handleSubmit}>
        Reservar cita
      </Button>
    </div>
  )
}