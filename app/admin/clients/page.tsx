"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import Link from "next/link"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"

interface Cliente {
  id: string
  nombre: string
  correo: string
  telefono: string
  creadoEn?: Date
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([])

  useEffect(() => {
    const fetchClientes = async () => {
      const snapshot = await getDocs(collection(db, "clientes"))
      const data: Cliente[] = snapshot.docs.map((doc) => {
        const d = doc.data()
        return {
          id: doc.id,
          nombre: d.nombre ?? "",
          correo: d.correo ?? "",
          telefono: d.telefono ?? "",
          creadoEn: d.creadoEn?.toDate?.() ?? null,
        }
      })
      setClientes(data)
    }

    fetchClientes()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Clientes registrados</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Nombre</th>
              <th className="border px-4 py-2 text-left">Correo</th>
              <th className="border px-4 py-2 text-left">Teléfono</th>
              <th className="border px-4 py-2 text-left">Creado en</th>
              <th className="border px-4 py-2 text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td className="border px-4 py-2">{cliente.nombre}</td>
                <td className="border px-4 py-2">{cliente.correo}</td>
                <td className="border px-4 py-2">{cliente.telefono}</td>
                <td className="border px-4 py-2">
                  {cliente.creadoEn ? format(cliente.creadoEn, "dd/MM/yyyy") : "—"}
                </td>
                <td className="border px-4 py-2 text-center">
                  <Link href={`/admin/clients/${cliente.id}`}>
                    <Button variant="secondary">Ver perfil</Button>
                  </Link>
                </td>
              </tr>
            ))}
            {clientes.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-muted-foreground">
                  No hay clientes registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}