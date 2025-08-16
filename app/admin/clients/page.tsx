"use client"

import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Cliente = {
  id: string
  nombre?: string
  correo?: string
  telefono?: string
  ciudad?: string
}

export default function ClientsPage() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [busqueda, setBusqueda] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "clientes"),
      (snapshot) => {
        const datos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Cliente[]

        const ordenados = datos.sort((a, b) =>
          (a.nombre ?? "").localeCompare(b.nombre ?? "")
        )
        setClientes(ordenados)
        setIsLoading(false)
        setError(null)
      },
      (err) => {
        console.error("Error al obtener clientes:", err)
        setError("No se pudo cargar la lista de clientes. Intenta más tarde.")
        setIsLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.correo?.toLowerCase().includes(busqueda.toLowerCase())
  )

  if (isLoading) return <p className="p-4">Cargando clientes...</p>
  if (error) return <p className="p-4 text-red-600">{error}</p>

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Clientes</h1>

      <div className="flex items-center gap-4">
        <Input
          type="text"
          placeholder="Buscar por nombre o correo"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="max-w-md"
        />
        <Link href="/admin/clients/new">
          <Button>Nuevo Cliente</Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border mt-4">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Correo</th>
              <th className="p-2 border">Teléfono</th>
              <th className="p-2 border">Ciudad</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map((cliente) => (
              <tr key={cliente.id} className="hover:bg-gray-50">
                <td className="p-2 border">{cliente.nombre}</td>
                <td className="p-2 border">{cliente.correo}</td>
                <td className="p-2 border">{cliente.telefono}</td>
                <td className="p-2 border">{cliente.ciudad}</td>
                <td className="p-2 border">
                  <Link href={`/admin/clients/${cliente.id}`}>
                    <Button variant="outline" size="sm">Ver</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {clientesFiltrados.length === 0 && (
          <p className="mt-4 text-gray-500">No se encontraron clientes.</p>
        )}
      </div>
    </div>
  )
}