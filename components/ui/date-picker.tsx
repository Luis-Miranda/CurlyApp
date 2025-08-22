'use client'

import * as React from 'react'
import { addMonths, format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from './button'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Calendar } from './calendar'

export interface DatePickerProps {
  date?: Date
  onChange: (date: Date | undefined) => void
  placeholder?: string
}

export function DatePicker({ date, onChange, placeholder }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const today = new Date()
  const maxDate = addMonths(today, 3) // Más seguro que setMonth

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'dd/MM/yyyy') : placeholder || 'Selecciona una fecha'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            onChange(selectedDate)
            setOpen(false)
          }}
          initialFocus
          captionLayout="dropdown"
          fromYear={today.getFullYear()}
          toYear={maxDate.getFullYear()}
          disabled={(date) => {
            return (
              date < today ||         // fechas pasadas
              date > maxDate ||       // más de 3 meses
              date.getDay() === 0     // domingos
            )
          }}
        />
      </PopoverContent>
    </Popover>
  )
}