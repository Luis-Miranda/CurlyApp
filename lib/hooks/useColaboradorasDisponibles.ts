import { useEffect, useState } from "react"
import { collection, getDocs, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { format } from "date-fns"

const TODAS_COLABORADORAS = ["Key", "Coco", "Mali", "Con", "Mayra", "Moni", "Karla"]

export function useColaboradorasDisponibles(fecha: Date | undefined, sucursal: string) {
  const [disponibles, setDisponibles] = useState<string[]>([])

  useEffect(() => {
    const obtenerColaboradoras = async () => {
      if (!fecha || !sucursal) return

      const snapshot = await getDocs(collection(db, "citas"))
      const fechaStr = format(fecha, "yyyy-MM-dd")

      const citasDelDia = snapshot.docs
        .map(doc => doc.data())
        .filter((cita) => format(cita.fecha.toDate(), "yyyy-MM-dd") === fechaStr)

      const colaboradorasAsignadas = new Set<string>()

      citasDelDia.forEach(cita => {
        if (cita.sucursal && cita.colaboradora) {
          if (cita.sucursal !== sucursal) {
            colaboradorasAsignadas.add(cita.colaboradora)
          }
        }
      })

      const libres = TODAS_COLABORADORAS.filter(
        (colab) => !colaboradorasAsignadas.has(colab)
      )

      setDisponibles(libres)
    }

    obtenerColaboradoras()
  }, [fecha, sucursal])

  return disponibles
}
