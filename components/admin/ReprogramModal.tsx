'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import DatePicker from "@/components/custom/date-picker"
import TimePicker from "@/components/custom/time-picker"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { toast } from "sonner"

interface ReprogramModalProps {
  appointment: {
    id: string
    date: string
    hour: string
  }
  onClose: () => void
}

export default function ReprogramModal({ appointment, onClose }: ReprogramModalProps) {
  const [newDate, setNewDate] = useState<Date | undefined>(undefined)
  const [newTime, setNewTime] = useState("")

  const handleSubmit = async () => {
    if (!newDate || !newTime) {
      toast.error("Debes seleccionar una nueva fecha y hora")
      return
    }

    const formattedDate = format(newDate, "yyyy-MM-dd")

    try {
      const apptRef = doc(db, "appointments", appointment.id)
      await updateDoc(apptRef, {
        date: formattedDate,
        hour: newTime,
        updatedAt: new Date(),
      })
      toast.success("Cita reprogramada exitosamente")
      onClose()
    } catch (err) {
      console.error("Error al reprogramar cita:", err)
      toast.error("Error al reprogramar la cita")
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Reprogramar cita</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Nueva fecha</label>
            <DatePicker date={newDate} onChange={setNewDate} />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Nueva hora</label>
            <TimePicker time={newTime} setTime={setNewTime} />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button onClick={handleSubmit}>Guardar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}