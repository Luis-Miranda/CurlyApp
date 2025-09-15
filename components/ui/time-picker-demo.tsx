"use client"

import { useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TimePickerDemoProps {
  time: string
  setTime: (time: string) => void
}

export function TimePickerDemo({ time, setTime }: TimePickerDemoProps) {
  // Opcional: generar horario de 10:00 a 19:00 en intervalos de 30 minutos
  const timeSlots = generateTimeSlots("10:00", "19:00", 30)

  return (
    <ScrollArea className="h-64 w-48 p-2">
      <ul className="space-y-1">
        {timeSlots.map((t) => (
          <li key={t}>
            <button
              onClick={() => setTime(t)}
              className={`w-full text-left px-3 py-1 rounded-md hover:bg-gray-100 ${
                time === t ? "bg-black text-white font-semibold" : ""
              }`}
            >
              {t}
            </button>
          </li>
        ))}
      </ul>
    </ScrollArea>
  )
}

// Utilidad para generar horarios
function generateTimeSlots(start: string, end: string, interval: number): string[] {
  const [startHour, startMin] = start.split(":").map(Number)
  const [endHour, endMin] = end.split(":").map(Number)
  const slots: string[] = []

  let currentHour = startHour
  let currentMinute = startMin

  while (
    currentHour < endHour ||
    (currentHour === endHour && currentMinute <= endMin)
  ) {
    const hour = String(currentHour).padStart(2, "0")
    const minute = String(currentMinute).padStart(2, "0")
    slots.push(`${hour}:${minute}`)

    currentMinute += interval
    if (currentMinute >= 60) {
      currentMinute -= 60
      currentHour += 1
    }
  }

  return slots
}