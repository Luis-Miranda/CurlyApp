"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface ModalPoliticasProps {
  checked: boolean
  onCheckChange: (checked: boolean) => void
}

export function ModalPoliticas({ checked, onCheckChange }: ModalPoliticasProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-start gap-2 text-sm">
      <Checkbox
        id="politicas"
        checked={checked}
        onCheckedChange={(val) => onCheckChange(!!val)}
      />
      <Label htmlFor="politicas" className="leading-snug">
        Acepto las{" "}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <span className="text-yellow-600 underline cursor-pointer">
              políticas de reserva
            </span>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white text-black">
            <DialogHeader>
              <DialogTitle className="text-2xl mb-4">
                Políticas de Reserva y Cancelaciones
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 text-sm leading-relaxed">
              <div>
                <h3 className="font-semibold mb-2">⏰ Tolerancia</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Se permite una tolerancia máxima de 20 minutos, sin excepciones.</li>
                  <li>Al minuto 21, la cita será cancelada sin derecho a reembolso.</li>
                  <li>Si llegas tarde a un paquete, solo se realizará el servicio disponible por tiempo.</li>
                  <li>Si tu especialista inicia el servicio con más de 15 minutos de retraso, obtendrás un 10% de descuento.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">🔁 Reagendar</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Puedes reagendar con al menos 48 horas de anticipación vía WhatsApp.</li>
                  <li>Si es por accidente o enfermedad, se debe mostrar comprobante para conservar el anticipo.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">📌 Importante</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>El pago del anticipo asegura tu lugar y debe realizarse al momento de agendar.</li>
                  <li>No se realizan reembolsos una vez confirmada la cita.</li>
                  <li>Revisar con anticipación las condiciones de tu servicio y recomendaciones previas.</li>
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Label>
    </div>
  )
}