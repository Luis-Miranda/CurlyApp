"use client"

import { useEffect, useState } from "react"

export default function AdminDashboardPage() {
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    const timeGreeting =
      hour < 12 ? "Buen día" : hour < 18 ? "Buenas tardes" : "Buenas noches"
    setGreeting(`${timeGreeting}, Maravilla 🌟`)
  }, [])

  return (
    <div className="space-y-6">
      <div className="text-2xl font-bold">{greeting}</div>
      {/* Aquí puedes añadir las tarjetas resumen por día y colaboradora */}
    </div>
  )
}
