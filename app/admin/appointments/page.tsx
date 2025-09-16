'use client'

import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { parseISO, format, isSameDay, isSameWeek, isSameMonth } from 'date-fns'
import { useCurrentUserRole } from '@/lib/auth/useCurrentUserRole'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'

interface Cita {
  id: string
  nombre: string
  email: string
  telefono: string  /* Whatsapp */
  profesional: string
  sucursal: string
  tipoServicio: string
  servicio: string
  fecha: string
  hora: string
  duracion: number
  status: 'pendiente' | 'confirmada' | 'cancelada'
  notas?: string
  createdAt: Timestamp
}

export default function AdminAppointmentsPage() {
  const [citas, setCitas] = useState<Cita[]>([])
  const [filteredCitas, setFilteredCitas] = useState<Cita[]>([])
  const [filtros, setFiltros] = useState({
    profesional: '',
    sucursal: '',
    tipoServicio: '',
    status: '',
  })
  const { role } = useCurrentUserRole()

  useEffect(() => {
    const obtenerCitas = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'citas'))
        const data = snapshot.docs.map((doc) => {
          const d = doc.data()
          return {
            id: doc.id,
            nombre: d.name ?? '',
            email: d.email ?? '',
            telefono: d.phone ?? '',
            profesional: d.professional ?? '',
            sucursal: d.branch ?? '',
            tipoServicio: d.type ?? '',
            servicio: Array.isArray(d.service)
              ? d.service.join(', ')
              : d.service ?? '',
            fecha: d.date ?? '',
            hora: d.time ?? '',
            duracion: d.duration ?? 60,
            status: d.status ?? 'pendiente',
            notas: d.notes ?? d.notas ?? '',
            createdAt: d.createdAt ?? null,
          }
        }) as Cita[]
        setCitas(data)
        setFilteredCitas(data)
      } catch (error) {
        toast.error('Error al cargar las citas')
      }
    }

    obtenerCitas()
  }, [])

  useEffect(() => {
    const filtradas = citas.filter(cita => {
      return (
        (!filtros.profesional || cita.profesional === filtros.profesional) &&
        (!filtros.sucursal || cita.sucursal === filtros.sucursal) &&
        (!filtros.tipoServicio || cita.tipoServicio === filtros.tipoServicio) &&
        (!filtros.status || cita.status === filtros.status)
      )
    })
    setFilteredCitas(filtradas)
  }, [filtros, citas])

  const actualizarNotas = async (id: string, nuevasNotas: string) => {
    try {
      await updateDoc(doc(db, 'citas', id), { notas: nuevasNotas })
      setCitas(prev =>
        prev.map(c => (c.id === id ? { ...c, notas: nuevasNotas } : c))
      )
      toast.success('Notas actualizadas')
    } catch (err) {
      toast.error('Error al guardar las notas')
    }
  }

  const cancelarCita = async (id: string) => {
    try {
      await updateDoc(doc(db, 'citas', id), { status: 'cancelada' })
      setCitas(prev =>
        prev.map(c => (c.id === id ? { ...c, status: 'cancelada' } : c))
      )
      toast.success('Cita cancelada')
    } catch (err) {
      toast.error('Error al cancelar cita')
    }
  }

  const confirmarCita = async (id: string) => {
    try {
      await updateDoc(doc(db, 'citas', id), { status: 'confirmada' })
      setCitas(prev =>
        prev.map(c => (c.id === id ? { ...c, status: 'confirmada' } : c))
      )
      toast.success('Cita confirmada')
    } catch (err) {
      toast.error('Error al confirmar cita')
    }
  }

  const resumen = {
    hoy: filteredCitas.filter(c =>
      c.fecha ? isSameDay(parseISO(c.fecha), new Date()) : false
    ).length,
    semana: filteredCitas.filter(c =>
      c.fecha ? isSameWeek(parseISO(c.fecha), new Date(), { weekStartsOn: 1 }) : false
    ).length,
    mes: filteredCitas.filter(c =>
      c.fecha ? isSameMonth(parseISO(c.fecha), new Date()) : false
    ).length,
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Citas Programadas</h2>

      {/* Filtros */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Input
          placeholder="Profesional"
          onChange={e =>
            setFiltros({ ...filtros, profesional: e.target.value })
          }
        />
        <Input
          placeholder="Sucursal"
          onChange={e => setFiltros({ ...filtros, sucursal: e.target.value })}
        />
        <Select onValueChange={val => setFiltros({ ...filtros, tipoServicio: val })}>
          <SelectTrigger>
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="VIP">VIP</SelectItem>
            <SelectItem value="Clásico">Clásico</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={val => setFiltros({ ...filtros, status: val })}>
          <SelectTrigger>
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pendiente">Pendiente</SelectItem>
            <SelectItem value="confirmada">Confirmada</SelectItem>
            <SelectItem value="cancelada">Cancelada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Resumen */}
      <div className="flex gap-6 text-sm mb-4 font-medium">
        <p>📅 Hoy: {resumen.hoy}</p>
        <p>📆 Semana: {resumen.semana}</p>
        <p>🗓️ Mes: {resumen.mes}</p>
      </div>

      {/* Tabla (Desktop) */}
      <div className="hidden md:block">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Profesional</th>
              <th>Servicio</th>
              <th>Notas</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
  {filteredCitas.map(c => (
    <tr key={c.id} className={c.status === 'cancelada' ? 'text-muted-foreground' : ''}>
      <td>{c.fecha}</td>
      <td>{c.hora}</td>
      <td>{c.nombre}</td>
      <td>{c.telefono}</td>
      <td>{c.profesional}</td>
      <td>{c.servicio}</td>
      <td>
        <Textarea
          defaultValue={c.notas}
          className="min-h-[50px]"
          onBlur={e => actualizarNotas(c.id, e.target.value)}
        />
      </td>
      <td>{c.status}</td>
      <td className="flex flex-col gap-2">
        {(role === 'admin' || role === 'recepcionista') && (
          <>
            {c.status === 'pendiente' && (
              <Button
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={() => confirmarCita(c.id)}
              >
                Confirmar
              </Button>
            )}
            {c.status !== 'cancelada' && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => cancelarCita(c.id)}
              >
                Cancelar
              </Button>
            )}
          </>
        )}
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>

      {/* Tarjetas (Mobile) */}
      <div className="md:hidden space-y-4">
        {filteredCitas.map(c => (
          <Card key={c.id} className={c.status === 'cancelada' ? 'opacity-60' : ''}>
            <div className="p-4 space-y-1">
              <p><strong>Fecha:</strong> {c.fecha} {c.hora}</p>
              <p><strong>Duración:</strong> {c.duracion} min</p>
              <p><strong>Cliente:</strong> {c.nombre}</p>
              <p><strong>Profesional:</strong> {c.profesional}</p>
              <p><strong>Sucursal:</strong> {c.sucursal}</p>
              <p><strong>Servicio:</strong> {c.servicio}</p>
              <p><strong>Estado:</strong> {c.status}</p>
              <Textarea
                defaultValue={c.notas}
                className="min-h-[50px] mt-2"
                onBlur={e => actualizarNotas(c.id, e.target.value)}
              />
              {(role === 'admin' || role === 'recepcionista') && (
                <div className="flex gap-2 mt-3">
                  {c.status === 'pendiente' && (
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => confirmarCita(c.id)}
                    >
                      Confirmar
                    </Button>
                  )}
                  {c.status !== 'cancelada' && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => cancelarCita(c.id)}
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}