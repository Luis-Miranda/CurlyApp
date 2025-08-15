"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { AutoCompleteEmail } from "@/components/ui/auto-complete-email"
import { DatePicker } from "@/components/ui/date-picker"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"

export default function NewClientPage() {
  const router = useRouter()

  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [telefono, setTelefono] = useState<string | undefined>()
  const [cumpleanos, setCumpleanos] = useState<Date | undefined>()
  const [ciudad, setCiudad] = useState("")
  const [municipio, setMunicipio] = useState("")
  const [diagnostico, setDiagnostico] = useState("")

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "clientes"), {
        nombre,
        correo,
        telefono,
        cumpleanos: cumpleanos ? Timestamp.fromDate(cumpleanos) : null,
        ciudad,
        municipio,
        diagnosticos: [
          {
            fecha: Timestamp.now(),
            texto: diagnostico,
          },
        ],
        creadoEn: Timestamp.now(),
      })
      router.push("/admin/clients")
    } catch (error) {
      console.error("Error al guardar cliente:", error)
      alert("Ocurrió un error al guardar el cliente")
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 p-6">
      <h1 className="text-2xl font-bold">Nuevo cliente</h1>

      <Input placeholder="Nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} />

      <AutoCompleteEmail value={correo} onChange={setCorreo} />

      <PhoneInput
        defaultCountry="MX"
        value={telefono}
        onChange={setTelefono}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm w-full"
      />

      <DatePicker
        date={cumpleanos}
        setDate={setCumpleanos}
        placeholder="Fecha de nacimiento"
      />

      <Input placeholder="Ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />

      <Input placeholder="Municipio" value={municipio} onChange={(e) => setMunicipio(e.target.value)} />

      <Textarea
        placeholder="Primer diagnóstico clínico"
        value={diagnostico}
        onChange={(e) => setDiagnostico(e.target.value)}
        className="min-h-[160px]"
      />

      <Button onClick={handleSubmit} className="w-full">Guardar cliente</Button>
    </div>
  )
}