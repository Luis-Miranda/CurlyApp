
'use client'

import { useEffect, useState } from "react"
import { collection, getDocs, updateDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useUser } from "@/lib/hooks/useUser"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

interface Appointment {
  id: string
  nombre: string
  email: string
  telefono: string
  fecha: string
  hora: string
  servicio: string
  sucursal: string
  profesional: string
  status: string
  notas?: string
}

const STATUS_COLORS: Record<Appointment["status"], string> = {
  pendiente: "text-orange-500",
  confirmada: "text-green-600",
  cancelada: "text-gray-500",
  reprogramada: "text-blue-600",
}

export default function AdminAppointmentsPage() {
  const { user } = useUser()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filterProfesional, setFilterProfesional] = useState("all")
  const [filterSucursal, setFilterSucursal] = useState("all")

  const fetchAppointments = async () => {
    const snapshot = await getDocs(collection(db, "citas"))
    const data = snapshot.docs.map(docSnap => ({
      ...docSnap.data(),
      id: docSnap.id,
    })) as Appointment[]
    setAppointments(data)
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  const handleConfirm = async (id: string) => {
    try {
      await updateDoc(doc(db, "citas", id), { status: "confirmada" })
      toast.success("Cita confirmada ✅")
      fetchAppointments()
    } catch (err) {
      console.error("Error al confirmar cita", err)
      toast.error("No se pudo confirmar la cita")
    }
  }

  const handleCancel = async (id: string) => {
    try {
      await updateDoc(doc(db, "citas", id), { status: "cancelada" })
      toast.success("Cita cancelada ❌")
      fetchAppointments()
    } catch (err) {
      console.error("Error al cancelar cita", err)
      toast.error("No se pudo cancelar la cita")
    }
  }

  const handleReprogram = async (id: string) => {
    try {
      await updateDoc(doc(db, "citas", id), { status: "reprogramada" })
      toast.success("Cita marcada como reprogramada 📅")
      fetchAppointments()
    } catch (err) {
      console.error("Error al reprogramar cita", err)
      toast.error("No se pudo reprogramar la cita")
    }
  }

  const filteredAppointments = appointments.filter(a =>
    (filterProfesional === "all" || a.profesional === filterProfesional) &&
    (filterSucursal === "all" || a.sucursal === filterSucursal)
  )

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Panel de Citas</h2>

      <div className="flex gap-4 mb-6 flex-wrap">
        <Select value={filterProfesional} onValueChange={setFilterProfesional}>
          <SelectTrigger className="w-52">
            <SelectValue placeholder="Filtrar por profesional" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {Array.from(new Set(appointments.map(a => a.profesional))).map((p, i) => (
              <SelectItem key={`${p}-${i}`} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterSucursal} onValueChange={setFilterSucursal}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Filtrar por sucursal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {Array.from(new Set(appointments.map(a => a.sucursal))).map((s, i) => (
              <SelectItem key={`${s}-${i}`} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Fecha</th>
              <th className="p-2">Hora</th>
              <th className="p-2">Cliente</th>
              <th className="p-2">Teléfono</th>
              <th className="p-2">Servicio</th>
              <th className="p-2">Profesional</th>
              <th className="p-2">Sucursal</th>
              <th className="p-2">Notas</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(appt => (
              <tr key={appt.id} className={appt.status === "cancelada" ? "bg-gray-100" : ""}>
                <td className="p-2">{appt.fecha}</td>
                <td className="p-2">{appt.hora}</td>
                <td className="p-2">{appt.nombre}</td>
                <td className="p-2">{appt.telefono}</td>
                <td className="p-2">{appt.servicio}</td>
                <td className="p-2">{appt.profesional}</td>
                <td className="p-2">{appt.sucursal}</td>
                <td className="p-2">{appt.notas || "-"}</td>
                <td className={`p-2 font-semibold ${STATUS_COLORS[appt.status]}`}>
                  {appt.status}
                </td>
                <td className="p-2 flex flex-col gap-1">
                  {user?.role === "admin" && appt.status === "pendiente" && (
                    <Button size="sm" variant="outline" onClick={() => handleConfirm(appt.id)}>
                      Confirmar
                    </Button>
                  )}
                  {user?.role === "admin" && appt.status !== "cancelada" && (
                    <Button size="sm" variant="destructive" onClick={() => handleCancel(appt.id)}>
                      Cancelar
                    </Button>
                  )}
                  {user?.role === "admin" && appt.status !== "reprogramada" && (
                    <Button size="sm" variant="outline" onClick={() => handleReprogram(appt.id)}>
                      Reprogramar
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
