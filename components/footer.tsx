import Link from "next/link"
import { Instagram, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="font-bold text-2xl">
              Maravilla <span className="text-primary">Curly</span>
            </div>
            <p className="text-muted-foreground">
              Celebrando la belleza natural de tus rizos con un cuidado experto, técnicas especializadas y un peinado personalizado
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Maravilla Curly</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/services" className="block text-muted-foreground hover:text-primary transition-colors">
                Servicios
              </Link>
              <Link href="/booking" className="block text-muted-foreground hover:text-primary transition-colors">
                Agenda una Cita
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Contacto
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contacto</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <Link href="tel:+1234567890" className="hover:text-primary transition-colors">
                  (+52) 55 1398 4809
                </Link>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <Link href="mailto:hello@maravillacurly.com" className="hover:text-primary transition-colors">
                  hello@maravillacurly.com
                </Link>
              </div>
            </div>
          </div>

          {/* Social & Hours */}
          <div className="space-y-4">
            <h3 className="font-semibold">Follow Us</h3>
            <div className="flex gap-4">
              <Link
                href="https://tiktok.com/@maravillacurly"
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </Link>
              <Link
                href="https://instagram.com/maravillacurly"
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Lun-Vie: 10AM-7PM</p>
              <p>Sab: 10AM-7PM</p>
              <p>Dom: Cerrado</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Maravilla Curly.
          </p>
        </div>
      </div>
    </footer>
  )
}
