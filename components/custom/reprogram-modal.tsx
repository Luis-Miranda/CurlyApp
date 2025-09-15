"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Timestamp, doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Appointment } from "../../app/types/appointment"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import DatePicker  from "@/components/custom/date-picker"
import TimePicker from "@/components/custom/time-picker"
import { toast } from "sonner"

interface Props {
  appointment: Appointment
  onClose: () => void
}

export default function ReprogramModal({ appointment, onClose }: Props) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState("")
  const [loading, setLoading] = useState(false)

  // Prefill values with existing appointment data
  useEffect(() => {
    if (appointment?.timestamp) {
      const fecha = appointment.timestamp.toDate()
      setDate(fecha)
      setTime(format(fecha, "HH:mm"))
    }
  }, [appointment])

  const handleSave = async () => {
    if (!date || !time) {
      toast.error("Selecciona fecha y hora")
      return
    }

    const [hours, minutes] = time.split(":").map(Number)
    const nuevaFecha = new Date(date)
    nuevaFecha.setHours(hours)
    nuevaFecha.setMinutes(minutes)
    nuevaFecha.setSeconds(0)

    setLoading(true)

    try {
      await updateDoc(doc(db, "citas", appointment.id), {
        timestamp: Timestamp.fromDate(nuevaFecha),
        updatedAt: new Date(),
        status: "reprogramada"
      })

      toast.success("Cita reprogramada ✅")
      onClose()
    } catch (error) {
      console.error(error)
      toast.error("Error al reprogramar la cita")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reprogramar cita</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <DatePicker date={date} onChange={setDate} />

          <TimePicker time={time} setTime={setTime} />

          <Button onClick={handleSave} disabled={loading}>
            Guardar cambios
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}