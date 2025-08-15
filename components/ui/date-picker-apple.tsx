"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as DayPicker } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"

interface Props {
  date: Date | undefined
  onChange: (date: Date | undefined) => void
  fromYear?: number
  toYear?: number
  placeholder?: string
}

export function DatePickerAppleStyle({
  date,
  onChange,
  fromYear = 1940,
  toYear = new Date().getFullYear(),
  placeholder = "Selecciona una fecha"
}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="w-full justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy") : <span className="text-muted-foreground">{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <DayPicker
          mode="single"
          selected={date}
          onSelect={onChange}
          captionLayout="dropdown"
          fromYear={fromYear}
          toYear={toYear}
          className="p-3"
        />
      </PopoverContent>
    </Popover>
  )
}