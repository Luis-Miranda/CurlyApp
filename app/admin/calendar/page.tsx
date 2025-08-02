"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/lib/firebase"
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore"

export default function AdminCalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [blockedDates, setBlockedDates] = useState<{ id: string; date: string }[]>([])

  useEffect(() => {
    const fetchBlocked = async () => {
      const snapshot = await getDocs(collection(db, "bloqueos"))
      const dates = snapshot.docs.map((doc) => ({
        id: doc.id,
        date: format(doc.data().fecha.toDate(), "yyyy-MM-dd"),
      }))
      setBlockedDates(dates)
    }
    fetchBlocked()
  }, [])

  const isAlreadyBlocked = (date: Date) => {
    const formatted = format(date, "yyyy-MM-dd")
    return blockedDates.some((d) => d.date === formatted)
  }

  const handleBlockDate = async () => {
    if (!selectedDate || isAlreadyBlocked(selectedDate)) return
    const docRef = await addDoc(collection(db, "bloqueos"), {
      fecha: Timestamp.fromDate(selectedDate),
    })
    setBlockedDates((prev) => [
      ...prev,
      { id: docRef.id, date: format(selectedDate, "yyyy-MM-dd") },
    ])
    setSelectedDate(undefined)
  }

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "bloqueos", id))
    setBlockedDates((prev) => prev.filter((d) => d.id !== id))
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Block Dates Globally</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiers={{
              blocked: (date) =>
                blockedDates.some((d) => d.date === format(date, "yyyy-MM-dd")),
            }}
            modifiersClassNames={{
              blocked: "bg-red-500 text-white rounded-md hover:bg-red-600",
            }}
          />
          <Button onClick={handleBlockDate} disabled={!selectedDate || isAlreadyBlocked(selectedDate)}>
            {selectedDate ? "Block this date" : "Select a date"}
          </Button>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Currently Blocked Dates</h2>
            {blockedDates.length === 0 && <p className="text-muted-foreground">No blocked days.</p>}
            {blockedDates.map(({ id, date }) => (
              <div
                key={id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>{date}</span>
                <Button variant="destructive" onClick={() => handleDelete(id)}>
                  Eliminar
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
