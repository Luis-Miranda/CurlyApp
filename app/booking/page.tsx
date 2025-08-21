"use client"
import { useEffect } from "react"

export default function BookingPage() {
  useEffect(() => {
    const head = document.querySelector("head")
    if (!document.querySelector("#calendly-script")) {
      const script = document.createElement("script")
      script.id = "calendly-script"
      script.src = "https://assets.calendly.com/assets/external/widget.js"
      script.async = true
      head?.appendChild(script)
    }
  }, [])

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Reservar Cita</h1>
      <div
        className="min-h-[800px]"
        id="calendly-widget"
        dangerouslySetInnerHTML={{
          __html: `<div class="calendly-inline-widget" data-url="https://calendly.com/maravillacurlyexp" style="min-width:320px;height:800px;"></div>`
        }}
      />
    </div>
    
  )
}
