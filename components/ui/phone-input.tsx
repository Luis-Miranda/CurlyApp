import { Input } from "@/components/ui/input"
import { useState } from "react"

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
}

const ladas = ["+52", "+1", "+54", "+57", "+34", "+51"]

export function PhoneInput({ value, onChange }: PhoneInputProps) {
  const [lada, setLada] = useState("+52")

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "")
    onChange(`${lada}${onlyNumbers}`)
  }

  const handleLadaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLada = e.target.value
    setLada(newLada)
    const onlyNumbers = value.replace(/^\+\d+/, "").replace(/\D/g, "")
    onChange(`${newLada}${onlyNumbers}`)
  }

  const phoneWithoutLada = value.replace(/^\+\d+/, "")

  return (
    <div className="flex gap-2 items-center">
      <select
        value={lada}
        onChange={handleLadaChange}
        className="border rounded px-2 py-1 text-sm bg-white"
      >
        {ladas.map(code => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
      <Input
        type="tel"
        value={phoneWithoutLada}
        onChange={handlePhoneChange}
        placeholder="Teléfono"
        className="flex-1"
      />
    </div>
  )
}