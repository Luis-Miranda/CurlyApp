"use client"

import * as React from "react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { TimePickerDemo } from "@/components/ui/time-picker-demo" // Asegúrate que esto exista

type TimePickerProps = {
  time: string
  setTime: React.Dispatch<React.SetStateAction<string>>
}

export default function TimePicker({ time, setTime }: TimePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[200px] justify-start text-left font-normal",
            !time && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {time ? time : "Selecciona hora"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <TimePickerDemo time={time} setTime={setTime} />
      </PopoverContent>
    </Popover>
  )
}