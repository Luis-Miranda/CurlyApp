// app/admin/calendar/blocked-professionals/page.tsx

"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const professionals = [
  "Keyla",
  "Coco",
  "Cintia",
  "Mayra",
  "Karen",
  "Vane",
  "Karla",
  "Mony",
  "Maravilla Curly",
];

const weekDays = [
  { label: "Domingo", value: 0 },
  { label: "Lunes", value: 1 },
  { label: "Martes", value: 2 },
  { label: "Miércoles", value: 3 },
  { label: "Jueves", value: 4 },
  { label: "Viernes", value: 5 },
  { label: "Sábado", value: 6 },
];

export default function BlockedProfessionalsPage() {
  const [blockedDays, setBlockedDays] = useState<Record<string, number[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlocked = async () => {
      const querySnapshot = await getDocs(collection(db, "blockedDaysByProfessional"));
      const data: Record<string, number[]> = {};
      querySnapshot.forEach((doc) => {
        data[doc.id] = doc.data().blockedWeekDays || [];
      });
      setBlockedDays(data);
      setLoading(false);
    };
    fetchBlocked();
  }, []);

  const toggleDay = (name: string, day: number) => {
    setBlockedDays((prev) => {
      const days = prev[name] || [];
      const newDays = days.includes(day)
        ? days.filter((d) => d !== day)
        : [...days, day];
      return { ...prev, [name]: newDays };
    });
  };

  const saveChanges = async () => {
    try {
      await Promise.all(
        Object.entries(blockedDays).map(([name, days]) =>
          setDoc(doc(db, "blockedDaysByProfessional", name), {
            name,
            blockedWeekDays: days,
          })
        )
      );
      toast.success("Días bloqueados actualizados correctamente ✅");
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al guardar los cambios");
    }
  };

  if (loading) return <p className="p-4">Cargando...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Bloquear días por profesional</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {professionals.map((name) => (
          <Card key={name}>
            <CardHeader>
              <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {weekDays.map((day) => (
                <div key={day.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${name}-${day.value}`}
                    checked={blockedDays[name]?.includes(day.value) || false}
                    onCheckedChange={() => toggleDay(name, day.value)}
                  />
                  <label htmlFor={`${name}-${day.value}`}>{day.label}</label>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      <Button onClick={saveChanges} className="mt-6 w-full md:w-auto">
        Guardar cambios
      </Button>
    </div>
  );
}