// components/ui/date-picker.tsx
"use client"

import { CalendarIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { format, isBefore, startOfDay } from "date-fns"
import { es } from "date-fns/locale"
import { useEffect, useState } from "react"
import { getDocs, collection } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface DatePickerProps {
  date?: Date
  onChange: (date: Date | undefined) => void
  blockedDays?: string[] // formato "yyyy-MM-dd"
  blockedWeekDays?: number[] // [0-6] para domingos, lunes, etc.
}

export function DatePicker({
  date,
  onChange,
  blockedDays = [],
  blockedWeekDays = [],
}: DatePickerProps) {
  const [enabledMonths, setEnabledMonths] = useState<string[]>([])

  useEffect(() => {
    const fetchEnabledMonths = async () => {
      const snapshot = await getDocs(collection(db, "enabledBookingMonths"))
      const meses: string[] = []

      snapshot.forEach((doc) => {
        if (doc.data().enabled) {
          meses.push(doc.id) // "2025-09"
        }
      })

      setEnabledMonths(meses)
    }

    fetchEnabledMonths()
  }, [])

  const isDateDisabled = (date: Date) => {
    const formattedDay = format(date, "yyyy-MM-dd")
    const formattedMonth = format(date, "yyyy-MM")
    const isPast = isBefore(startOfDay(date), startOfDay(new Date()))

    return (
      isPast ||
      blockedDays.includes(formattedDay) ||
      blockedWeekDays.includes(date.getDay()) ||
      !enabledMonths.includes(formattedMonth)
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="w-full justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onChange}
          disabled={isDateDisabled}
          initialFocus
          locale={es}
        />
      </PopoverContent>
    </Popover>
  )
}