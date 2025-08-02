"use client"

import { useEffect, useState } from "react"
import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

const servicios = ["Definición", "Color", "Tratamiento", "Corte"]
const sucursales = ["Portales", "División del Norte"]
const colaboradoras = ["Key", "Coco", "Mali", "Con", "Mayra", "Moni", "Karla"]

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedHour, setSelectedHour] = useState("")
  const [nombre, setNombre] = useState("")
  const [telefono, setTelefono] = useState("")
  const [servicio, setServicio] = useState("")
  const [sucursal, setSucursal] = useState("")
  const [colaboradora, setColaboradora] = useState("")
  const [colaboradorasDisponibles, setColaboradorasDisponibles] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const horasDisponibles = ["10:00", "11:00", "12:00", "13:00", "15:00", "16:00", "17:00", "18:00"]

  useEffect(() => {
  const obtenerColaboradoras = async () => {
    if (!selectedDate || !sucursal) return;

    const snapshot = await getDocs(collection(db, "citas"));
    const fechaStr = format(selectedDate, "yyyy-MM-dd");

    const citasDelDia = snapshot.docs
      .map((doc) => doc.data())
      .filter(
        (cita) =>
          cita.fecha &&
          format(cita.fecha, "yyyy-MM-dd") === fechaStr
      );

    const colaboradorasAsignadas = new Set<string>();

    citasDelDia.forEach((cita) => {
      if (
        cita.sucursal &&
        cita.colaboradora &&
        cita.sucursal !== sucursal
      ) {
        colaboradorasAsignadas.add(cita.colaboradora);
      }
    });

    const libres = colaboradoras.filter(
      (colab) => !colaboradorasAsignadas.has(colab)
    );

    setColaboradorasDisponibles(libres);
  };

  obtenerColaboradoras();
}, [selectedDate, sucursal]);


  const handleSubmit = async () => {
    if (!nombre || !telefono || !servicio || !sucursal || !selectedDate || !selectedHour) {
      toast.error("Por favor completa todos los campos")
      return
    }

    setIsLoading(true)

    const fechaCompleta = new Date(selectedDate)
    const [hora, minutos] = selectedHour.split(":")
    fechaCompleta.setHours(Number(hora))
    fechaCompleta.setMinutes(Number(minutos))

    const snapshot = await getDocs(collection(db, "citas"))
    const citas = snapshot.docs.map(doc => doc.data())
    const citasExistentes = citas.filter(
      cita =>
        cita.colaboradora === colaboradora &&
        format(cita.fecha.toDate(), "yyyy-MM-dd") === format(fechaCompleta, "yyyy-MM-dd")
    )

    if (citasExistentes.length >= 4) {
      toast.error("La colaboradora ya tiene 4 citas ese día.")
      setIsLoading(false)
      return
    }

    await addDoc(collection(db, "citas"), {
      nombre,
      telefono,
      servicio,
      sucursal,
      colaboradora: colaboradora || "Automático",
      fecha: Timestamp.fromDate(fechaCompleta),
    })

    toast.success("Cita agendada exitosamente")
    setIsLoading(false)
    setNombre("")
    setTelefono("")
    setServicio("")
    setSucursal("")
    setColaboradora("")
    setSelectedDate(undefined)
    setSelectedHour("")
  }

  return (
    <div className="max-w-xl mx-auto space-y-4 px-4">
      <h1 className="text-2xl font-bold text-center my-4">Agenda tu cita</h1>
      <Select value={servicio} onValueChange={setServicio}>
        <SelectTrigger>
          <SelectValue placeholder="Selecciona un servicio" />
        </SelectTrigger>
        <SelectContent>
          {servicios.map(serv => (
            <SelectItem key={serv} value={serv}>
              {serv}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sucursal} onValueChange={setSucursal}>
        <SelectTrigger>
          <SelectValue placeholder="Selecciona una sucursal" />
        </SelectTrigger>
        <SelectContent>
          {sucursales.map(suc => (
            <SelectItem key={suc} value={suc}>
              {suc}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {sucursal && (
        <Select value={colaboradora} onValueChange={setColaboradora}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una colaboradora (opcional)" />
          </SelectTrigger>
          <SelectContent>
            {colaboradorasDisponibles.map(c => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        disabled={(date) => date < new Date()}
      />

      <Select value={selectedHour} onValueChange={setSelectedHour}>
        <SelectTrigger>
          <SelectValue placeholder="Selecciona una hora" />
        </SelectTrigger>
        <SelectContent>
          {horasDisponibles.map(hora => (
            <SelectItem key={hora} value={hora}>
              {hora}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <Input
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
      <Button className="w-full" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Agendando..." : "Agendar cita"}
      </Button>
    </div>
  )
}
