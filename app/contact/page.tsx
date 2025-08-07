import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contactanos</h1>
        <p className="text-lg text-muted-foreground">Ponte en contacto para programar la transformación de tu cabello rizado</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Ubicación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Av. Miguel Ángel de Quevedo 520a 
                <br />
                Santa Catarina Coyoacan
                <br />
                CDMX, México  
              </p>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Map Integration Coming Soon</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Horarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Lunes - Viernes</span>
                  <span>10:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabados</span>
                  <span>10:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingos</span>
                  <span className="text-muted-foreground">Cerrado</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Methods */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contactanos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Teléfono</p>
                  <Link href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                    (+52) 55 1398 4809
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <Link
                    href="mailto:hello@maravillacurly.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    hello@maravillacurly.com
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sigue Nuestras Redes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button variant="outline" size="icon" asChild>
                  <Link href="https://tiktok.com/@maravillacurly" target="_blank">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link href="https://instagram.com/maravillacurly" target="_blank">
                    <Instagram className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                ¡Síguenos para obtener inspiración diaria para rizos, consejos y contenido detrás de escena!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>List@ para agendar?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Programe su cita en línea o llámenos. No podemos esperar para ayudarte a abrazar tu hermosos ¡Rizos!
              </p>
              <Button asChild className="w-full">
                <Link href="/booking">Agenda Ahora</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
