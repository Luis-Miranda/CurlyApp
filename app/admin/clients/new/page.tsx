"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { addDoc, collection, Timestamp } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "@/lib/firebase"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { DatePickerSinRestricciones } from "@/components/ui/DatePickerSinRestricciones"

export default function NewClientPage() {
  const router = useRouter()
  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [telefono, setTelefono] = useState("")
  const [ciudad, setCiudad] = useState("")
  const [municipio, setMunicipio] = useState("")
  const [cumpleaños, setCumpleaños] = useState<Date | undefined>(undefined)
  const [diagnostico, setDiagnostico] = useState("")
  const [fotos, setFotos] = useState<File[]>([])
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFotos(Array.from(e.target.files))
    }
  }

  const handleSubmit = async () => {
    if (!nombre || !correo) {
      toast.error("Nombre y correo son obligatorios")
      return
    }

    try {
      setLoading(true)

      // Subimos primero las fotos
      const urls: string[] = []
      for (const foto of fotos) {
        const fileName = `${nombre.replace(/\s/g, "_")}_${Date.now()}_${foto.name}`
        const imageRef = ref(storage, `fotos_clientes/${fileName}`)
        const snapshot = await uploadBytes(imageRef, foto)
        const url = await getDownloadURL(snapshot.ref)
        urls.push(url)
      }

      // Creamos el documento del cliente
      await addDoc(collection(db, "clientes"), {
        nombre,
        correo,
        telefono,
        ciudad,
        municipio,
        cumpleaños: cumpleaños ? Timestamp.fromDate(cumpleaños) : null,
        diagnostico,
        fotos: urls,
        creado: Timestamp.now(),
      })

      toast.success("Cliente creado exitosamente")
      router.push("/admin/clients")
    } catch (error: any) {
      console.error("Error al crear cliente:", error)
      toast.error("Error al crear cliente. Revisa la consola.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Nuevo Cliente</h1>

      <div className="space-y-4">
        <Label>Nombre</Label>
        <Input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre completo" />

        <Label>Correo electrónico</Label>
        <Input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="correo@ejemplo.com"
        />

        <Label>Teléfono</Label>
        <Input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="55 1234 5678" />

        <Label>Ciudad</Label>
        <Input value={ciudad} onChange={(e) => setCiudad(e.target.value)} placeholder="Ciudad" />

        <Label>Municipio</Label>
        <Input value={municipio} onChange={(e) => setMunicipio(e.target.value)} placeholder="Municipio" />

        <Label>Fecha de cumpleaños</Label>
        <DatePickerSinRestricciones date={cumpleaños} onChange={setCumpleaños} />

        <Label>Diagnóstico inicial</Label>
        <Textarea
          rows={4}
          value={diagnostico}
          onChange={(e) => setDiagnostico(e.target.value)}
          placeholder="Descripción clínica inicial"
        />

        <Label>Fotos del cliente</Label>
        <Input type="file" accept="image/*" multiple onChange={handleFileChange} />
      </div>

      <Button onClick={handleSubmit} disabled={loading} className="w-full">
        {loading ? "Creando..." : "Crear cliente"}
      </Button>
    </div>
  )
}