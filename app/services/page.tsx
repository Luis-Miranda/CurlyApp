import { ServiceCard } from "@/components/service-card"
import type { Service } from "@/types/service"

const services = [
  {
    id: 1,
    title: "Asesoría capilar",
    description: "Evaluamos tu tipo de rizo y te orientamos con productos y técnicas personalizadas.",
    fullDescription:
      "La asesoría capilar incluye una evaluación de tu tipo de rizo, porosidad, densidad y estado actual del cabello. Recibirás recomendaciones de productos, rutinas y cuidados personalizados para iniciar o mejorar tu rutina capilar.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/placeholder.svg?height=300&width=400",
    price: "Por definir",
    duration: 60,
  },
  {
    id: 2,
    title: "Definición de rizos",
    description: "Realzamos tus rizos con técnicas y productos ideales para tu tipo de cabello.",
    fullDescription:
      "Este servicio incluye lavado, acondicionamiento y aplicación de productos profesionales para definir tus rizos. Usamos técnicas como scrunch, fitagem o raking según tu necesidad, finalizando con secado con difusor.",
    requirements: "Ven con tu cabello limpio o sin enredos. Evita productos pesados los días previos.",
    image: "/placeholder.svg?height=300&width=400",
    price: "Por definir",
    duration: 60,
  },
  {
    id: 3,
    title: "Corte rizado en seco",
    description: "Corte especializado en seco para resaltar la forma natural de tus rizos.",
    fullDescription:
      "Realizamos un corte personalizado en seco, respetando la forma natural de tu patrón de rizo. Se adapta a tu estilo y necesidades, mejorando volumen, forma y definición.",
    requirements: "Acude con el cabello seco, limpio y definido (sin estar recogido ni amarrado).",
    image: "/placeholder.svg?height=300&width=400",
    price: "Por definir",
    duration: 60,
  },
  {
    id: 4,
    title: "Hidratación profunda",
    description: "Tratamiento nutritivo que devuelve suavidad, brillo y manejabilidad a tus rizos.",
    fullDescription:
      "Incluye limpieza suave, mascarilla hidratante profesional con calor o vapor para mayor penetración y finalizado con productos adecuados a tu tipo de rizo.",
    requirements: "Cabello limpio o sin residuos. Evita cremas o aceites el día del servicio.",
    image: "/placeholder.svg?height=300&width=400",
    price: "Por definir",
    duration: 60,
  },
  {
    id: 5,
    title: "Coloración para rizos",
    description: "Servicio de color (tinte o fantasía) respetando la salud del rizo.",
    fullDescription:
      "Incluye diagnóstico previo, selección del tono, aplicación de color, tratamiento post-color y definición. Utilizamos productos libres de sulfatos y siliconas para proteger tu patrón de rizo.",
    requirements: "Consulta previa para valoración. Ven con el cabello limpio, sin productos grasos.",
    image: "/placeholder.svg?height=300&width=400",
    price: "Por definir",
    duration: 90,
  },
  {
    id: 6,
    title: "Peinados para rizos",
    description: "Peinados con y sin trenzas que realzan tu estilo respetando tus rizos.",
    fullDescription:
      "Ofrecemos peinados recogidos, semi recogidos o sueltos que destacan tu textura natural. Opcional uso de trenzas decorativas. Ideal para eventos especiales o sesiones de fotos.",
    requirements: "Cabello limpio y desenredado. Traer inspiración o estilo deseado.",
    image: "/placeholder.svg?height=300&width=400",
    price: "Por definir",
    duration: 60,
  },
  {
    id: 7,
    title: "Servicio infantil (niñas y niños)",
    description: "Atención especial para pequeños con rizos, con enfoque lúdico y gentil.",
    fullDescription:
      "Incluye lavado suave, desenredado con técnicas sin dolor, definición o peinado básico. Orientamos a los padres sobre cuidados y productos adecuados.",
    requirements: "Cabello limpio, evitar nudos muy fuertes. Acompañamiento de un adulto obligatorio.",
    image: "/placeholder.svg?height=300&width=400",
    price: "Por definir",
    duration: 60,
  },
]



export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Nuestros Servicios</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Servicios especializados diseñados para celebrar y realzar sus rizos naturales
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}
 
