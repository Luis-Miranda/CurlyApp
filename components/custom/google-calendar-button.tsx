'use client'

import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

type Props = {
  name: string
  date: string // formato: yyyy-MM-dd
  time: string // formato: HH:mm
  location: string
}

export function GoogleCalendarButton({ name, date, time, location }: Props) {
  const handleAddToCalendar = () => {
    const startDateTime = new Date(`${date}T${time}:00`)
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000) // duración: 1 hora

    const formatForCalendar = (date: Date) =>
      format(date, "yyyyMMdd'T'HHmmss")

    const start = formatForCalendar(startDateTime)
    const end = formatForCalendar(endDateTime)

    const calendarUrl = new URL('https://www.google.com/calendar/render')
    calendarUrl.searchParams.set('action', 'TEMPLATE')
    calendarUrl.searchParams.set('text', `Cita Maravilla Curly con ${name}`)
    calendarUrl.searchParams.set('dates', `${start}/${end}`)
    calendarUrl.searchParams.set('location', location)
    calendarUrl.searchParams.set('details', 'Gracias por reservar en Maravilla Curly 💖')

    window.open(calendarUrl.toString(), '_blank')
  }

  return (
    <Button onClick={handleAddToCalendar} variant="outline" className="mt-4">
      Añadir a Google Calendar 📅
    </Button>
  )
}