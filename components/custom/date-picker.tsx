/* /components/custom/date-DayPicker.tsx */
'use client'

import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { es } from 'date-fns/locale'

interface DatePickerProps {
  date?: Date
  onChange?: (date: Date | undefined) => void
  enabledMonths?: string[]
  blockedDates?: string[]          // ['2025-09-22', '2025-09-30']
  blockedWeekDays?: number[]       // [1, 3] → lunes y miércoles
}

export default function DatePicker({ 
  date, 
  onChange, 
  enabledMonths, 
  blockedDates = [], 
  blockedWeekDays = [] 
}: DatePickerProps) {
  const today = new Date()
  const maxDate = new Date(today)
  maxDate.setMonth(today.getMonth() + 3)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: es }) : "Selecciona una fecha"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onChange}
          disabled={(day) => {
            const monthKey = format(day, "yyyy-MM")
            const dayKey = format(day, "yyyy-MM-dd")

            return (
              day < today || 
              day > maxDate || 
              !enabledMonths?.includes(monthKey) || 
              day.getDay() === 0 || 
              blockedWeekDays.includes(day.getDay()) || 
              blockedDates.includes(dayKey)
            )
          }}
          locale={es}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}