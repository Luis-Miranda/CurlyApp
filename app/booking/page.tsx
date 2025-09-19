'use client'

import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
  addDoc
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { format } from 'date-fns'
import { useSearchParams } from 'next/navigation'

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
  AlertDialog, AlertDialogContent,
  AlertDialogHeader, AlertDialogTitle, AlertDialogCancel
} from '@/components/ui/alert-dialog'

// Profesionales
const profesionalesVIP = ['Keyla']
const profesionalesClasico = ['Coco', 'Cintia', 'Mayra', 'Karen', 'Vane', 'Karla', 'Mony']

// Horarios base
const horariosDisponibles = [
  '10:00', '11:00', '12:00', '13:00',
  '15:00', '16:00', '17:00', '18:00'
]

// Duraciones por servicio
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
  'Rizos de Gala': 60
}

const obtenerBloques = (duracionMin: number): number => Math.ceil(duracionMin / 60)

const dentroDeHorarioComida = (inicio: Date, fin: Date) => {
  const comidaInicio = new Date(inicio); comidaInicio.setHours(14, 0, 0, 0)
  const comidaFin = new Date(inicio); comidaFin.setHours(15, 0, 0, 0)
  return inicio < comidaFin && fin > comidaInicio
}
const cruzaDespuesDeSiete = (fin: Date) => fin.getHours() >= 19

export default function BookingPage() {
  const searchParams = useSearchParams()

  // --- Estados del formulario ---
  const [tipoServicio, setTipoServicio] = useState('')
  const [profesional, setProfesional] = useState('')
  const [fecha, setFecha] = useState<Date | undefined>()
  const [hora, setHora] = useState('')
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [sucursal, setSucursal] = useState('')
  const [servicio, setServicio] = useState('')
  const [notas, setNotas] = useState('')
  const [aceptoPoliticas, setAceptoPoliticas] = useState(false)

  // --- Estados de control ---
  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([])
  const [enabledMonths, setEnabledMonths] = useState<string[]>([])
  const [blockedDates, setBlockedDates] = useState<string[]>([])
  const [blockedWeekDays, setBlockedWeekDays] = useState<number[]>([])

  const [modalError, setModalError] = useState<{ open: boolean, mensaje: string }>({ open: false, mensaje: '' })
  const [modalPoliticas, setModalPoliticas] = useState(false)

  const profesionales = tipoServicio === 'VIP'
    ? profesionalesVIP
    : tipoServicio === 'Clásico'
      ? profesionalesClasico
      : []

  // Prellenar servicio desde URL
  useEffect(() => {
    const servicioDesdeURL = searchParams.get('servicio')
    if (servicioDesdeURL && servicio === '') setServicio(servicioDesdeURL)
  }, [searchParams, servicio])

  // Meses habilitados
  useEffect(() => {
    const fetchEnabledMonths = async () => {
      const snapshot = await getDocs(collection(db, 'enabledBookingMonths'))
      const meses = snapshot.docs.map(doc => doc.id)
      setEnabledMonths(meses)
    }
    fetchEnabledMonths()
  }, [])

  // Bloqueos por profesional
  useEffect(() => {
    const fetchBlocked = async () => {
      if (!profesional) return
      const snapshot = await getDocs(collection(db, 'blockedDaysByProfessional'))
      snapshot.docs.forEach(doc => {
        if (doc.id === profesional) {
          setBlockedDates(doc.data().blockedDates || [])
          setBlockedWeekDays(doc.data().blockedWeekDays || [])
        }
      })
    }
    fetchBlocked()
  }, [profesional])

  // Horarios ocupados en Firestore
  useEffect(() => {
    const obtenerHorariosOcupados = async () => {
      if (fecha && profesional && servicio) {
        const formattedDate = format(fecha, 'yyyy-MM-dd')
        try {
          const q = query(
            collection(db, 'citas'),
            where('date', '==', formattedDate),
            where('professional', '==', profesional)
          )
          const snapshot = await getDocs(q)
          const ocupados: string[] = []
          snapshot.docs.forEach(doc => {
            const d = doc.data()
            const horaInicio = d.time
            const servicioDoc = Array.isArray(d.service) ? d.service[0] : d.service
            const duracion = duracionesPorServicio[servicioDoc] || d.duration || 60
            const indexInicio = horariosDisponibles.indexOf(horaInicio)
            for (let i = 0; i < obtenerBloques(duracion); i++) {
              const bloque = horariosDisponibles[indexInicio + i]
              if (bloque) ocupados.push(bloque)
            }
          })
          setHorariosOcupados(Array.from(new Set(ocupados)))
        } catch (err) {
          console.error('Error al obtener horarios ocupados', err)
          setHorariosOcupados([])
        }
      } else {
        setHorariosOcupados([])
      }
    }
    obtenerHorariosOcupados()
  }, [fecha, profesional, servicio])

  const esHorarioDisponible = (hora: string): boolean => {
    if (!fecha || !servicio) return false
    const duracion = duracionesPorServicio[servicio] || 60
    const [h, m] = hora.split(':').map(Number)
    const inicio = new Date(fecha); inicio.setHours(h, m, 0, 0)
    const fin = new Date(inicio.getTime() + duracion * 60000)

    if (dentroDeHorarioComida(inicio, fin)) return false
    if (cruzaDespuesDeSiete(fin)) return false
    if (blockedWeekDays.includes(inicio.getDay())) return false
    if (blockedDates.includes(format(inicio, 'yyyy-MM-dd'))) return false

    return !horariosOcupados.includes(hora)
  }

  // --- Submit ---
  const handleSubmit = async () => {
    if (!aceptoPoliticas) {
      setModalPoliticas(true)
      return
    }
    if (!tipoServicio || !profesional || !fecha || !hora || !nombre || !email || !telefono || !sucursal || !servicio) {
      setModalError({ open: true, mensaje: '⚠️ Faltan datos obligatorios para reservar.' })
      return
    }
    if (tipoServicio === 'VIP' && !profesionalesVIP.includes(profesional)) {
      setModalError({ open: true, mensaje: '❌ Solo Keyla puede atender servicios VIP.' })
      return
    }
    if (tipoServicio === 'Clásico' && profesionalesVIP.includes(profesional)) {
      setModalError({ open: true, mensaje: '❌ Los servicios Clásicos no pueden ser atendidos por Keyla.' })
      return
    }

    const formattedDate = format(fecha, 'yyyy-MM-dd')
    const duracion = duracionesPorServicio[servicio] || 60
    const [h, m] = hora.split(':').map(Number)
    const inicio = new Date(fecha); inicio.setHours(h, m, 0, 0)
    const fin = new Date(inicio.getTime() + duracion * 60000)

    if (dentroDeHorarioComida(inicio, fin)) {
      setModalError({ open: true, mensaje: '🍽️ No se pueden reservar citas entre 2:00 pm y 3:00 pm.' })
      return
    }
    if (cruzaDespuesDeSiete(fin)) {
      setModalError({ open: true, mensaje: '⏰ No se permiten citas que terminen después de las 7:00 pm.' })
      return
    }
    if (horariosOcupados.includes(hora)) {
      setModalError({ open: true, mensaje: '❌ Ese horario ya está ocupado, elige otro.' })
      return
    }
    if (blockedWeekDays.includes(inicio.getDay()) || blockedDates.includes(formattedDate)) {
      setModalError({ open: true, mensaje: '🚫 Ese día está bloqueado para esta profesional.' })
      return
    }

    const appointmentData = {
      type: tipoServicio,
      professional: profesional,
      date: formattedDate,
      time: hora,
      name: nombre,
      email,
      phone: telefono,
      branch: sucursal,
      service: [servicio],
      notes: notas || 'Sin notas',
      duration: duracion,
      status: 'por confirmar',
      createdAt: Timestamp.now()
    }

    // Dentro de handleSubmit (después de addDoc)
    try {
      // 1️⃣ Guardar en Firestore
      const docRef = await addDoc(collection(db, 'citas'), appointmentData)
      console.log('📄 Cita creada con ID:', docRef.id)

      // 2️⃣ Enviar correo con Resend
      await fetch('/api/send-confirmation-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: nombre,
          date: formattedDate,
          time: hora,
          professional: profesional,
          branch: sucursal,
          service: [servicio],
        }),
      })

      // 3️⃣ Redirigir a Stripe
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nombre,
          email,
          date: formattedDate,
          time: hora,
          appointmentId: docRef.id
        })
      })
      const data = await res.json()
      if (data?.sessionUrl) {
        window.location.href = data.sessionUrl
      } else {
        setModalError({ open: true, mensaje: '⚠️ Error al redirigir a Stripe.' })
      }
    } catch (err) {
      console.error(err)
      setModalError({ open: true, mensaje: '❌ Hubo un error al iniciar el pago.' })
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Reserva tu cita</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tipo de servicio */}
        <div>
          <Label>Tipo de servicio</Label>
          <Select value={tipoServicio} onValueChange={setTipoServicio}>
            <SelectTrigger><SelectValue placeholder="Selecciona tipo" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="VIP">VIP</SelectItem>
              <SelectItem value="Clásico">Clásico</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Profesional */}
        <div>
          <Label>Profesional</Label>
          <Select value={profesional} onValueChange={setProfesional} disabled={!tipoServicio}>
            <SelectTrigger><SelectValue placeholder="Profesional" /></SelectTrigger>
            <SelectContent>
              {profesionales.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Fecha */}
        <div>
          <Label>Fecha</Label>
          <DatePicker
            date={fecha}
            onChange={setFecha}
            enabledMonths={enabledMonths}
            blockedDates={blockedDates}
            blockedWeekDays={blockedWeekDays}
          />
        </div>

        {/* Hora */}
        <div>
          <Label>Hora</Label>
          <Select value={hora} onValueChange={setHora} disabled={!fecha || !profesional}>
            <SelectTrigger><SelectValue placeholder="Hora" /></SelectTrigger>
            <SelectContent>
              {horariosDisponibles.filter(h => esHorarioDisponible(h)).map(h => (
                <SelectItem key={h} value={h}>{h}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div><Label>Nombre</Label><Input value={nombre} onChange={e => setNombre(e.target.value)} /></div>
        <div><Label>Correo</Label><Input value={email} onChange={e => setEmail(e.target.value)} /></div>
        <div><Label>Teléfono</Label><Input value={telefono} onChange={e => setTelefono(e.target.value)} /></div>

        {/* Sucursal */}
        <div>
          <Label>Sucursal</Label>
          <Select value={sucursal} onValueChange={setSucursal}>
            <SelectTrigger><SelectValue placeholder="Selecciona sucursal" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Av. Miguel Ángel de Quevedo 520a,Santa Catarina Coyoacan, CDMX, México">
                Av. Miguel Ángel de Quevedo 520a
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Servicio */}
        <div>
          <Label>Servicio</Label>
          <Select value={servicio} onValueChange={setServicio}>
            <SelectTrigger><SelectValue placeholder="Servicio" /></SelectTrigger>
            <SelectContent>
              {Object.keys(duracionesPorServicio).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
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
          Acepto las políticas de reserva
        </Label>
      </div>

      <div className="flex justify-center mt-6">
        <Button onClick={handleSubmit}>Pagar anticipo y agendar</Button>
      </div>

      {/* Modal de error */}
      <AlertDialog open={modalError.open} onOpenChange={(open) => setModalError({ ...modalError, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{modalError.mensaje}</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex justify-end pt-4">
            <AlertDialogCancel asChild><Button variant="outline">Cerrar</Button></AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialog>




      {/* Modal si no aceptó políticas */}
      <AlertDialog open={modalPoliticas} onOpenChange={setModalPoliticas}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>❗ Acepta las políticas de reserva</AlertDialogTitle>
          </AlertDialogHeader>
          <p className="text-sm text-muted-foreground">
            Para continuar con la cita, es necesario aceptar las políticas de reserva.
          </p>
          <div className="flex justify-end pt-4">
            <Button onClick={() => setModalPoliticas(false)}>Entendido</Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}