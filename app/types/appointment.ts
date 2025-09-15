import { Timestamp } from "firebase/firestore"

export type AppointmentStatus = "activa" | "cancelada" | "reprogramada"
export type AppointmentType = "clásico" | "VIP"

export type Appointment = {
  id: string
  name: string
  email: string
  phone: string
  service: string
  branch: string
  professional?: string
  notes?: string
  status: "pendiente" | "confirmada" | "completada" | "cancelada"
  type: "VIP" | "Clásico"
  timestamp: Timestamp 
}