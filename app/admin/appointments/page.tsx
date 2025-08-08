"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { format } from "date-fns"
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

type FireFecha = any // Timestamp | Date | string | undefined

interface Cita {
  id: string
  nombre: string
  servicio: string
  sucursal: string
  profesional: string
  fecha: Date | null
  hora: string
}

const sucursales = ["Av. Miguel Angel de Quevedo 520a"]
const profesionales = ["Key", "Coco", "Mali", "Con", "Mayra", "Moni", "Karla"]
const servicios = ["Color", "Corte", "Curly Love", "Curly Detox"]

function toDateSafe(fecha: FireFecha): Date | null {
  if (!fecha) return null
  if (typeof fecha?.toDate === "function") return fecha.toDate()
  if (fecha instanceof Date) return fecha
  if (typeof fecha === "string") {
    const d = new Date(fecha)
    return isNaN(d.getTime()) ? null : d
  }
  return null
}

export default function AppointmentsPage() {
  const [citas, setCitas] = useState<Cita[]>([])
  const [filtroSucursal, setFiltroSucursal] = useState("")
  const [filtroProfesional, setFiltroProfesional] = useState("")
  const [filtroServicio, setFiltroServicio] = useState("")
  const [userRole, setUserRole] = useState("admin") // TODO: reemplazar por el rol real del usuario

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const snapshot = await getDocs(collection(db, "citas"))
        const data: Cita[] = snapshot.docs.map((docSnap) => {
          const d = docSnap.data() as any
          return {
            id: docSnap.id,
            nombre: d.nombre ?? "",
            servicio: d.servicio ?? "",
            sucursal: d.sucursal ?? "",
            profesional: d.profesional ?? d.colaboradora ?? "",
            fecha: toDateSafe(d.fecha as FireFecha),
            hora: d.hora ?? "",
          }
        })
        setCitas(data)
      } catch (error) {
        console.error("Error al obtener citas:", error)
      }
    }

    fetchCitas()
  }, [])

  const citasFiltradas = citas.filter((cita) =>
    (!filtroSucursal || cita.sucursal === filtroSucursal) &&
    (!filtroProfesional || cita.profesional === filtroProfesional) &&
    (!filtroServicio || cita.servicio === filtroServicio)
  )

  const cancelarCita = async (id: string) => {
    if (!confirm("¿Estás seguro de cancelar esta cita?")) return
    try {
      await deleteDoc(doc(db, "citas", id))
      setCitas((prev) => prev.filter((c) => c.id !== id))
    } catch (error) {
      console.error("Error al cancelar cita:", error)
    }
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Citas agendadas</h1>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select value={filtroSucursal} onValueChange={setFiltroSucursal}>
          <SelectTrigger><SelectValue placeholder="Filtrar por sucursal" /></SelectTrigger>
          <SelectContent>
            {sucursales.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
          </SelectContent>
        </Select>

        <Select value={filtroProfesional} onValueChange={setFiltroProfesional}>
          <SelectTrigger><SelectValue placeholder="Filtrar por profesional" /></SelectTrigger>
          <SelectContent>
            {profesionales.map((p) => (<SelectItem key={p} value={p}>{p}</SelectItem>))}
          </SelectContent>
        </Select>

        <Select value={filtroServicio} onValueChange={setFiltroServicio}>
          <SelectTrigger><SelectValue placeholder="Filtrar por servicio" /></SelectTrigger>
          <SelectContent>
            {servicios.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Cliente</th>
              <th className="border px-4 py-2 text-left">Servicio</th>
              <th className="border px-4 py-2 text-left">Profesional</th>
              <th className="border px-4 py-2 text-left">Sucursal</th>
              <th className="border px-4 py-2 text-left">Fecha</th>
              <th className="border px-4 py-2 text-left">Hora</th>
              {userRole === "admin" && <th className="border px-4 py-2">Acción</th>}
            </tr>
          </thead>
          <tbody>
            {citasFiltradas.map((cita) => (
              <tr key={cita.id}>
                <td className="border px-4 py-2">{cita.nombre || "—"}</td>
                <td className="border px-4 py-2">{cita.servicio || "—"}</td>
                <td className="border px-4 py-2">{cita.profesional || "—"}</td>
                <td className="border px-4 py-2">{cita.sucursal || "—"}</td>
                <td className="border px-4 py-2">
                  {cita.fecha instanceof Date && !isNaN(cita.fecha.getTime())
                    ? format(cita.fecha, "dd/MM/yyyy")
                    : "—"}
                </td>
                <td className="border px-4 py-2">{cita.hora || "—"}</td>
                {userRole === "admin" && (
                  <td className="border px-4 py-2 text-center">
                    <Button
                      variant="destructive"
                      onClick={() => cancelarCita(cita.id)}
                    >
                      Cancelar
                    </Button>
                  </td>
                )}
              </tr>
            ))}
            {citasFiltradas.length === 0 && (
              <tr>
                <td colSpan={userRole === "admin" ? 7 : 6} className="text-center py-6 text-muted-foreground">
                  No hay citas con estos filtros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
