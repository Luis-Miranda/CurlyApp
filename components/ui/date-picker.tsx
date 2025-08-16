'use client'

import * as React from 'react'
import { format } from 'date-fns'
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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
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
          fromYear={1940}
          toYear={new Date().getFullYear()}
        />
      </PopoverContent>
    </Popover>
  )
}