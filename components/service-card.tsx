"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { CalendarIcon } from "lucide-react"

interface Service {
  id: number
  title: string
  category: string
  description: string
  image: string
  fullDescription: string
  requirements: string
  price: string
}

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  const handleReserveClick = () => {
    const nombreServicio = encodeURIComponent(service.title)
    router.push(`/booking?servicio=${nombreServicio}`)
  }

  return (
    <Card className="h-full flex flex-col group hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
          <Image
            src={service.image || "/placeholder.svg"}
            alt={service.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-white/90 text-black">
              {service.price}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-6">
        <CardTitle className="mb-3 text-xl">{service.title}</CardTitle>
        <p className="text-muted-foreground leading-relaxed">{service.category}</p> {/* Puede que se quite */}
        <p className="text-muted-foreground leading-relaxed">{service.description}</p>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex flex-col gap-3">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full bg-transparent">
              Descripción Completa
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{service.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {service.price}
                </Badge>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Descripción del servicio</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Previo a tu cita</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.requirements}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  className="flex-1"
                  onClick={handleReserveClick}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Agendar ahora
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  No por el momento
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button onClick={handleReserveClick} className="w-full">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Agendar este servicio
        </Button>
      </CardFooter>
    </Card>
  )
}