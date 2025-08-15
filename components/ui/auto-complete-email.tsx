"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"

export function AutoCompleteEmail({
  value,
  onChange,
  className = "",
}: {
  value: string
  onChange: (value: string) => void
  className?: string
}) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const domains = ["gmail.com", "hotmail.com", "outlook.com", "icloud.com", "yahoo.com"]

  useEffect(() => {
    const [prefix, domain] = value.split("@")
    if (value.includes("@") && prefix) {
      const filtered = domains
        .filter((d) => d.startsWith(domain))
        .map((d) => `${prefix}@${d}`)
      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [value])

  const handleSelect = (selected: string) => {
    onChange(selected)
    setShowSuggestions(false)
  }

  return (
    <div className="relative">
      <Input
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
        autoComplete="off"
        placeholder="Correo electrónico"
      />

      {showSuggestions && (
        <div className="absolute z-10 w-full bg-white border border-gray-200 rounded shadow mt-1">
          {suggestions.map((s) => (
            <div
              key={s}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => handleSelect(s)}
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}