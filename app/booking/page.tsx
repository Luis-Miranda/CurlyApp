// booking/page.tsx (actualizado)

'use client'

import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'

// UI
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import DatePicker from '@/components/custom/date-picker'
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from '@/components/ui/select'
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogTitle, AlertDialogCancel
} from '@/components/ui/alert-dialog'

// Datos y constantes
const profesionalesVIP = ['Keyla', 'Maravilla Curly']
const profesionalesClasico = ['Coco', 'Cintia', 'Mayra', 'Karen', 'Vane', 'Karla', 'Mony']

const horariosDisponibles = [
  '10:00', '11:00', '12:00', '13:00',
  '15:00', '16:00', '17:00', '18:00'
]

const servicios = [
  'Corte Esencial',
  'Mini Rizos',
  'Rizos Masculinos',
  'Pixie Touch (45 días)',
  'Retoque Curly (1hr)',
  'Consulta Curly',
  'Rizos con Ciencia',
  'Rizos con Ciencia XL',
  'Afro con Ciencia',
  'Rizos Hidratados',
  'Baño de Vapor',
  'Curly Makeover',
  'Revive tu Rizo',
  'Relax and Restore',
  'Rizos y café',
  'Hidratación & Pausa',
  'Rizos Full Ritual',
  'Consulta con Hidratación',
  'Rizos masculinos hidratados',
  'Rizos masculinos con ciencia',
  'Mantenimineto Rizos Masculinos',
  'Corte Escencial XL',
  'Corte Afrorizo Poderoso',
  'Afro Glow',
  'Revive tu Rizo XL',
  'Baño de vapor XL',
  'Baño de vapor Afro',
  'Curly Makeover XL',
  'Rizos Hidratados XL',
  'Definición Curly',
  'Estilízate',
  'Estilízate XL',
  'Estilízate Afro',
  'Rizos de Gala',
  'Retoque de tinte'
]

const duracionesPorServicio: Record<string, number> = {
  'Corte Esencial': 120,
  'Mini Rizos': 120,
  'Rizos Masculinos': 90,
  'Pixie Touch (45 días)': 120,
  'Retoque Curly (1hr)': 60,
  'Consulta Curly': 60,
  'Rizos con Ciencia': 120,
  'Rizos con Ciencia XL': 180,
  'Afro con Ciencia': 240,
  'Rizos Hidratados': 120,
  'Baño de Vapor': 120,
  'Curly Makeover': 120,
  'Revive tu Rizo': 120,
  'Relax and Restore': 120,
  'Rizos y café': 120,
  'Hidratación & Pausa': 120,
  'Rizos Full Ritual': 150,
  'Consulta con Hidratación': 60,
  'Rizos masculinos hidratados': 90,
  'Rizos masculinos con ciencia': 90,
  'Mantenimineto Rizos Masculinos': 90,
  'Corte Escencial XL': 180,
  'Corte Afrorizo Poderoso': 240,
  'Afro Glow': 240,
  'Revive tu Rizo XL': 180,
  'Baño de vapor XL': 180,
  'Baño de vapor Afro': 240,
  'Curly Makeover XL': 180,
  'Rizos Hidratados XL': 120,
  'Definición Curly': 60,
  'Estilízate': 60,
  'Estilízate XL': 120,
  'Estilízate Afro': 90,
  'Rizos de Gala': 60,
  'Retoque de tinte': 120
}

const obtenerBloques = (duracionMin: number): number => Math.ceil(duracionMin / 60)

const esHorarioDisponible = (hora: string, ocupados: string[], bloques: number): boolean => {
  const startIndex = horariosDisponibles.indexOf(hora)
  if (startIndex === -1) return false
  for (let i = 0; i < bloques; i++) {
    const bloque = horariosDisponibles[startIndex + i]
    if (!bloque || ocupados.includes(bloque)) return false
  }
  return true
}

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [tipoServicio, setTipoServicio] = useState('')
  const [profesional, setProfesional] = useState('')
  const [fecha, setFecha] = useState<Date | undefined>(undefined)
  const [hora, setHora] = useState('')
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [sucursal, setSucursal] = useState('')
  const [servicio, setServicio] = useState('')
  const [notas, setNotas] = useState('')
  const [aceptoPoliticas, setAceptoPoliticas] = useState(false)
  const [showPoliticasModal, setShowPoliticasModal] = useState(false)

  const profesionales = tipoServicio === 'VIP' ? profesionalesVIP : tipoServicio === 'Clásico' ? profesionalesClasico : []

  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([])
  const [enabledMonths, setEnabledMonths] = useState<string[]>([])
  const [blockedDaysProfesional, setBlockedDaysProfesional] = useState<Record<string, number[]>>({})
  const [blockedDatesProfesional, setBlockedDatesProfesional] = useState<Record<string, string[]>>({})

  useEffect(() => {
    const servicioDesdeURL = searchParams.get('servicio')
    if (servicioDesdeURL && servicio === '') setServicio(servicioDesdeURL)
  }, [searchParams, servicio])

  useEffect(() => {
    const fetchEnabledMonths = async () => {
      const snapshot = await getDocs(collection(db, 'enabledBookingMonths'))
      const meses = snapshot.docs.map(doc => doc.id)
      setEnabledMonths(meses)
    }
    fetchEnabledMonths()
  }, [])

  useEffect(() => {
    const fetchBlocked = async () => {
      const snapshot = await getDocs(collection(db, 'blockedDaysByProfessional'))
      const daysData: Record<string, number[]> = {}
      const datesData: Record<string, string[]> = {}
      snapshot.forEach(doc => {
        const data = doc.data()
        daysData[doc.id] = data.blockedWeekDays || []
        datesData[doc.id] = data.blockedDates || []
      })
      setBlockedDaysProfesional(daysData)
      setBlockedDatesProfesional(datesData)
    }
    fetchBlocked()
  }, [])

  useEffect(() => {
    const obtenerHorariosOcupados = async () => {
      if (fecha && profesional && servicio) {
        const q = query(
          collection(db, 'citas'),
          where('fecha', '==', format(fecha, 'yyyy-MM-dd')),
          where('profesional', '==', profesional)
        )
        const snapshot = await getDocs(q)

        const ocupados: string[] = []
        snapshot.docs.forEach(doc => {
          const horaInicio = doc.data().hora
          const bloquesCita = obtenerBloques(duracionesPorServicio[doc.data().servicio] || 60)
          const indexInicio = horariosDisponibles.indexOf(horaInicio)
          for (let i = 0; i < bloquesCita; i++) {
            const bloque = horariosDisponibles[indexInicio + i]
            if (bloque) ocupados.push(bloque)
          }
        })
        setHorariosOcupados(ocupados)
      } else {
        setHorariosOcupados([])
      }
    }
    obtenerHorariosOcupados()
  }, [fecha, profesional, servicio])

  const isDateBlocked = (date: Date): boolean => {
    if (!profesional) return false
    const blockedDays = blockedDaysProfesional[profesional] || []
    const blockedDates = blockedDatesProfesional[profesional] || []
    const formatted = format(date, 'yyyy-MM-dd')
    return blockedDays.includes(date.getDay()) || blockedDates.includes(formatted)
  }

  const handleSubmit = async () => {
    if (!aceptoPoliticas) {
      setShowPoliticasModal(true)
      return
    }

    if (!tipoServicio || !profesional || !fecha || !hora || !nombre || !email || !telefono || !sucursal || !servicio) {
      toast.error('Completa todos los campos obligatorios')
      return
    }

    if (fecha.getDay() === 0) {
      toast.error('No se puede reservar en domingo')
      return
    }

    if (isDateBlocked(fecha)) {
      toast.error(`La profesional seleccionada no labora el día elegido.`)
      return
    }

    const duracion = duracionesPorServicio[servicio] || 60
    const formattedDate = format(fecha, 'yyyy-MM-dd')

    const appointmentData = {
      tipoServicio,
      profesional,
      fecha: formattedDate,
      hora,
      nombre,
      email,
      telefono,
      sucursal,
      servicio,
      duracion, // ✅ duración incluida
      notas: notas || 'Sin notas',
      aceptoPoliticas: true,
      status: 'pendiente',
      createdAt: Timestamp.now()
    }

    try {
      localStorage.setItem('pendingAppointment', JSON.stringify(appointmentData))

      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nombre, email, date: formattedDate, time: hora })
      })

      const data = await res.json()
      if (data?.sessionUrl) {
        window.location.href = data.sessionUrl
      } else {
        toast.error('No se pudo redirigir a Stripe')
      }
    } catch (err) {
      console.error(err)
      toast.error('Hubo un error al iniciar el pago')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Reserva tu cita</h2>

      {/* Formulario */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Tipo de servicio</Label>
          <Select value={tipoServicio} onValueChange={setTipoServicio}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona tipo de servicio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="VIP">VIP</SelectItem>
              <SelectItem value="Clásico">Clásico</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Profesional</Label>
          <Select value={profesional} onValueChange={setProfesional} disabled={!tipoServicio}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una profesional" />
            </SelectTrigger>
            <SelectContent>
              {profesionales.map(p => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Fecha</Label>
          <DatePicker
            date={fecha}
            onChange={setFecha}
            enabledMonths={enabledMonths}
          />
        </div>

        <div>
          <Label>Hora</Label>
          <Select
            value={hora}
            onValueChange={setHora}
            disabled={
              !fecha || !profesional || isDateBlocked(fecha)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una hora" />
            </SelectTrigger>
            <SelectContent>
              {horariosDisponibles
                .filter(h => esHorarioDisponible(h, horariosOcupados, obtenerBloques(duracionesPorServicio[servicio] || 60)))
                .map(h => (
                  <SelectItem key={h} value={h}>{h}</SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div><Label>Nombre</Label><Input value={nombre} onChange={e => setNombre(e.target.value)} /></div>
        <div><Label>Correo electrónico</Label><Input value={email} onChange={e => setEmail(e.target.value)} /></div>
        <div><Label>Teléfono</Label><Input value={telefono} onChange={e => setTelefono(e.target.value)} /></div>

        <div>
          <Label>Sucursal</Label>
          <Select value={sucursal} onValueChange={setSucursal}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona la sucursal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Av. Miguel Ángel de Quevedo 520a">
                Av. Miguel Ángel de Quevedo 520a
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Servicio</Label>
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
        </div>

        <div>
          <Label>Notas</Label>
          <Input value={notas} onChange={e => setNotas(e.target.value)} placeholder="Opcional" />
        </div>
      </div>

      {/* Políticas */}
      <div className="flex items-center space-x-2 mt-6">
        <Checkbox
          id="politicas"
          checked={aceptoPoliticas}
          onCheckedChange={() => setAceptoPoliticas(!aceptoPoliticas)}
        />
        <Label htmlFor="politicas" className="text-sm">
          Acepto las{' '}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="text-blue-600 underline hover:text-blue-800 transition">políticas de reserva</button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
              <AlertDialogHeader>
                <AlertDialogTitle>Políticas de Reserva y Cancelación</AlertDialogTitle>
              </AlertDialogHeader>
              <div className="space-y-3 text-sm text-muted-foreground py-2">
                <p>⏰ <strong>Tolerancia:</strong> Máximo 20 minutos. Luego se cancela sin reembolso.</p>
                <p>🔁 <strong>Reagendar:</strong> Al menos 48h de anticipación vía WhatsApp.</p>
                <p>❌ <strong>Cancelaciones:</strong> No hay reembolsos.</p>
                <p>💳 <strong>Anticipo:</strong> Obligatorio para confirmar.</p>
                <p>📍 <strong>Sucursal:</strong> Aplica solo a la elegida.</p>
                <p>👩‍🔬 <strong>Profesionales:</strong> Puede haber cambios según disponibilidad.</p>
              </div>
              <div className="flex justify-end pt-4">
                <AlertDialogCancel asChild>
                  <Button variant="outline">Cerrar</Button>
                </AlertDialogCancel>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </Label>
      </div>

      <div className="flex justify-center mt-6">
        <Button onClick={handleSubmit}>Pagar anticipo y agendar</Button>
      </div>

      <AlertDialog open={showPoliticasModal} onOpenChange={setShowPoliticasModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>❗ Acepta las políticas de reserva</AlertDialogTitle>
          </AlertDialogHeader>
          <p className="text-sm text-muted-foreground">
            Para continuar con la cita, es necesario aceptar las políticas de reserva.
          </p>
          <div className="flex justify-end pt-4">
            <Button onClick={() => setShowPoliticasModal(false)}>Entendido</Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}