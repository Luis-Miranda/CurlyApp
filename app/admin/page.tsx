"use client"

import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { format } from "date-fns"

interface Cita {
  id: string
  fecha: any
  hora?: any
  nombre: string
  servicio: string
  colaboradora: string
  sucursal: string
}

const colaboradoras = ["Key", "Coco", "Mali", "Con", "Mayra", "Moni", "Karla"]

export default function AdminDashboardPage() {
  const [citasFuturas, setCitasFuturas] = useState<Cita[]>([])

  // Saludo dinámico
  const getSaludo = () => {
    const hora = new Date().getHours()
    if (hora < 12) return "Buen día"
    if (hora < 19) return "Buenas tardes"
    return "Buenas noches"
  }

  const saludo = getSaludo()

  useEffect(() => {
    const obtenerCitas = async () => {
      const snapshot = await getDocs(collection(db, "citas"))
      const hoy = new Date()
      const futuras = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() } as Cita))
        .filter((cita) => {
          if (!cita.fecha?.toDate) return false
          return cita.fecha.toDate() >= hoy
        })
        .sort((a, b) => a.fecha.toDate().getTime() - b.fecha.toDate().getTime())

      setCitasFuturas(futuras)
    }

    obtenerCitas()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{saludo} Maravilla</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {colaboradoras.map((colab) => {
          const citasDeColab = citasFuturas.filter(
            (cita) => cita.colaboradora === colab
          )

          return (
            <div key={colab} className="bg-white rounded shadow p-4">
              <h2 className="text-xl font-semibold mb-2">{colab}</h2>
              {citasDeColab.length === 0 ? (
                <p className="text-gray-500">Sin citas futuras</p>
              ) : (
                <ul className="space-y-2">
                  {citasDeColab.map((cita) => (
                    <li key={cita.id} className="border p-2 rounded text-sm">
                      <strong>{format(cita.fecha.toDate(), "dd MMM yyyy")}</strong> - {cita.nombre} ({cita.servicio}) <br />
                      <span className="text-gray-500">{cita.sucursal}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
