"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { doc, getDoc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Cliente {
  nombre: string
  correo: string
  telefono: string
  ciudad: string
  municipio: string
  cumpleanos: any
  creadoEn: any
  diagnosticos?: { texto: string; fecha: any }[]
}

export default function ClientePage() {
  const { id } = useParams()
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [nuevoDiagnostico, setNuevoDiagnostico] = useState("")
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  useEffect(() => {
    if (!id) return
    const fetchCliente = async () => {
      const docRef = doc(db, "clientes", id as string)
      const snap = await getDoc(docRef)
      if (snap.exists()) {
        setCliente(snap.data() as Cliente)
      }
    }
    fetchCliente()
  }, [id])

  const handleNuevoDiagnostico = () => {
    setMostrarFormulario(true)
  }

  const guardarDiagnostico = async () => {
    if (!nuevoDiagnostico.trim()) return
    const diagnostico = {
      texto: nuevoDiagnostico.trim(),
      fecha: Timestamp.now(),
    }
    const docRef = doc(db, "clientes", id as string)
    await updateDoc(docRef, {
      diagnosticos: arrayUnion(diagnostico),
    })
    setCliente((prev) =>
      prev
        ? {
            ...prev,
            diagnosticos: [...(prev.diagnosticos || []), diagnostico],
          }
        : prev
    )
    setNuevoDiagnostico("")
    setMostrarFormulario(false)
  }

  if (!cliente) return <p className="p-4">Cargando...</p>

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Perfil de {cliente.nombre}</h1>
      <div className="space-y-1 text-sm">
        <p>Correo: {cliente.correo}</p>
        <p>Teléfono: {cliente.telefono}</p>
        <p>
          Cumpleaños: {cliente.cumpleanos
            ? format(
                cliente.cumpleanos?.toDate?.() ||
                  new Date(cliente.cumpleanos),
                "dd/MM/yyyy"
              )
            : "-"}
        </p>
        <p>Ciudad: {cliente.ciudad}</p>
        <p>Municipio: {cliente.municipio}</p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Historial de diagnósticos</h2>
        {cliente.diagnosticos?.length ? (
          <ul className="list-disc pl-4">
            {cliente.diagnosticos.map((d, i) => (
              <li key={i}>
                <span className="font-medium">
                  {d.fecha?.toDate ? format(d.fecha.toDate(), "dd/MM/yyyy") : "Sin fecha"}:
                </span>{" "}
                {d.texto}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">Sin diagnósticos aún.</p>
        )}

        {!mostrarFormulario ? (
          <Button onClick={handleNuevoDiagnostico}>Añadir nuevo diagnóstico</Button>
        ) : (
          <div className="space-y-2">
            <Textarea
              value={nuevoDiagnostico}
              onChange={(e) => setNuevoDiagnostico(e.target.value)}
              placeholder="Escribe el diagnóstico aquí..."
              className="min-h-[120px]"
            />
            <Button onClick={guardarDiagnostico}>Guardar diagnóstico</Button>
          </div>
        )}
      </div>
    </div>
  )
}