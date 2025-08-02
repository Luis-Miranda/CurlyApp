import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Maravilla Curly Salon"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Maravilla
          <span className="block text-4xl md:text-6xl text-yellow-400">Curly</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Celebrando la belleza natural de tus rizos con un cuidado experto, técnicas especializadas y un peinado personalizado
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-6" asChild>
            <Link href="/booking">Agenda una Cita</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 bg-white/10 border-white text-white hover:bg-white hover:text-black"
            asChild
          >
            <Link href="/services">Nuestros Servicios</Link>
          </Button>
        </div>

        <div className="mt-12 flex justify-center items-center gap-8 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold">500+</div>
            <div className="text-white/80">Clientes Satisfechos</div>
          </div>
          <div className="w-px h-12 bg-white/30" />
          <div className="text-center">
            <div className="text-2xl font-bold">5★</div>
            <div className="text-white/80">Calificación Promedio</div>
          </div>
          <div className="w-px h-12 bg-white/30" />
          <div className="text-center">
            <div className="text-2xl font-bold">3+</div>
            <div className="text-white/80">Años de Experiencia</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
