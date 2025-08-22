"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { format } from "date-fns"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useUserRole } from "@/hooks/useUserRole"

type FireFecha = any

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
const profesionales = ["Key", "Coco", "Mali", "Mayra", "Moni", "Karla"]
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
  const { role, loading } = useUserRole()

  useEffect(() => {
    const fetchCitas = async () => {
      const snapshot = await getDocs(collection(db, "citas"))
      const data: Cita[] = snapshot.docs.map((docSnap) => {
        const d = docSnap.data() as any
        return {
          id: docSnap.id,
          nombre: d.nombre ?? "",
          servicio: d.servicio ?? "",
          sucursal: d.sucursal ?? "",
          profesional: d.profesional ?? d.colaboradora ?? "",
          fecha: toDateSafe(d.fecha),
          hora: d.hora ?? ""
        }
      })
      setCitas(data)
    }
    fetchCitas()
  }, [])

  const citasFiltradas = citas.filter(
    (cita) =>
      (!filtroSucursal || cita.sucursal === filtroSucursal) &&
      (!filtroProfesional || cita.profesional === filtroProfesional) &&
      (!filtroServicio || cita.servicio === filtroServicio)
  )

  const cancelarCita = async (id: string) => {
    if (!confirm("¿Estás seguro de cancelar esta cita?")) return
    await deleteDoc(doc(db, "citas", id))
    setCitas((prev) => prev.filter((c) => c.id !== id))
  }

  if (loading) return <div className="p-8">Cargando...</div>

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Citas agendadas</h1>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select value={filtroSucursal} onValueChange={setFiltroSucursal}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por sucursal" />
          </SelectTrigger>
          <SelectContent>
            {sucursales.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filtroProfesional} onValueChange={setFiltroProfesional}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por profesional" />
          </SelectTrigger>
          <SelectContent>
            {profesionales.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filtroServicio} onValueChange={setFiltroServicio}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por servicio" />
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

      {/* Vista de tabla (Desktop) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Cliente</th>
              <th className="border px-4 py-2 text-left">Servicio</th>
              <th className="border px-4 py-2 text-left">Profesional</th>
              <th className="border px-4 py-2 text-left">Sucursal</th>
              <th className="border px-4 py-2 text-left">Fecha</th>
              <th className="border px-4 py-2 text-left">Hora</th>
              <th className="border px-4 py-2 text-center">Acción</th>
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
                  {cita.fecha ? format(cita.fecha, "dd/MM/yyyy") : "—"}
                </td>
                <td className="border px-4 py-2">{cita.hora || "—"}</td>
                <td className="border px-4 py-2 text-center">
                  {role === "admin" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => cancelarCita(cita.id)}
                    >
                      Cancelar
                    </Button>
                  )}
                </td>
              </tr>
            ))}
            {citasFiltradas.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-muted-foreground">
                  No hay citas con estos filtros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Vista de tarjetas (Mobile) */}
      <div className="md:hidden space-y-4">
        {citasFiltradas.map((cita) => (
          <details
            key={cita.id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <summary className="cursor-pointer font-semibold text-lg">
              {cita.nombre} – {cita.servicio}
            </summary>
            <div className="mt-3 text-sm text-muted-foreground space-y-1">
              <p><strong>Profesional:</strong> {cita.profesional}</p>
              <p><strong>Sucursal:</strong> {cita.sucursal}</p>
              <p>
                <strong>Fecha:</strong>{" "}
                {cita.fecha ? format(cita.fecha, "dd/MM/yyyy") : "—"}
              </p>
              <p><strong>Hora:</strong> {cita.hora}</p>
              {role === "admin" && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="mt-3"
                  onClick={() => cancelarCita(cita.id)}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </details>
        ))}
        {citasFiltradas.length === 0 && (
          <p className="text-center text-muted-foreground pt-4">
            No hay citas con estos filtros
          </p>
        )}
      </div>
    </div>
  )
}