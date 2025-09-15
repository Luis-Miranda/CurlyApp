"use client"

import { ServiceCard } from "@/components/service-card"
import { Service } from "../types/service"
import TikTokFloatingButton from "@/components/tiktok-floating-button"

const services = [
  {
    id: 1,
    title: "Corte Esencial",
    category: "Corte",
    description: "Para cabello con largo hasta media espalda, texturas onduladas o rizadas únicamente (2A a 3B).",
    fullDescription:
      "(antes corte de rizos/ondas) Para cabello con largo hasta media espalda, texturas onduladas o rizadas únicamente (2A a 3B). Para corroborar las medidas de tu cabello nos puedes mandar mensaje a WhatsApp antes de agendar tu servicio. Incluye diagnóstico dermocapilar, ajustes de rutina con receta de productos, corte en seco, limpieza profunda, estilizado guiado paso a paso. Costo de la versión VIP $1200 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/placeholder.svg?height=300&width=400", /* Imágen 2A a 3B */
    price: "$1000",
    duration: 120
  },
  {
    id: 2,
    title: "Mini Rizos",
    category: "Corte",
    description: "A partir de 3 a 12 años en texturas onduladas y rizadas (2A-3C)",
    fullDescription:
      "( antes corte infantil) A partir de 3 a 12 años en texturas onduladas y rizadas ( 2a-3c ): Incluye Diagnóstico dermocapilar, receta con ajustes en la rutina de productos ,corte en seco, limpieza profunda, acondicionado sencillo, clase de estilizado y accesorio de regalo. Costo de la versión VIP $840 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/placeholder.svg?height=300&width=400", /* Imágen 2A-3C */
    price: "$700",
    duration: 120
  },
  {
    id: 3,
    title: "Rizos Masculinos",
    category: "Corte",
    description: "Válido para largo hasta la oreja como máximo, se realiza con tijera.",
    fullDescription:
      "(antes corte de caballero) Válido para largo hasta la oreja como máximo, se realiza con tijera. Incluye Diagnostico dermocapilar, receta con ajustes en la rutina de productos, corte en seco,  limpieza profunda, acondicionado sencillo y estilizado guíado por pasos. Costo de la versión VIP $720 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/placeholder.svg?height=300&width=400", /* Imágen 2A-3C */
    price: "$600",
    duration: 90
  },
  {
    id: 4,
    title: "Pixie Touch (45 días)",
    category: "Seguimiento",
    description: "Corte  de seguimiento para cortes arriba de la oreja no mayor a 6 semanas desde el ultimo corte en maravilla curly.",
    fullDescription:
      "(seguimiento pixie) Corte  de seguimiento para cortes arriba de la oreja no mayor a 6 semanas desde el ultimo corte en maravilla curly (longitud de cabello que no supere la oreja), incluye diagnostico dermocapilar, ajustes de rutina, corte, limpieza profunda, estilizado guiado.  Costo de la versión VIP $800 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/placeholder.svg?height=300&width=400", /* Imágen 2A-3C */
    price: "$750",
    duration: 120
  },
{
    id: 5,
    title: "Retoque Curly (1 hr)",
    category: "Seguimiento",
    description: "Aplica únicamente para cabellos atendidos en Maravilla Curly en los últimos 4 meses, No aplica para cabello XL o AFRO.",
    fullDescription:
      "antes corte de seguimiento:Aplica únicamente para cabellos atendidos en Maravilla Curly en los últimos 4 meses, No aplica para cabello XL o AFRO. Para corroborar las medidas de tu cabello nos puedes mandar mensaje a WhatsApp antes de agendar tu servicio. Incluye Ajustes de temporada al diagnóstico anterior, corte en seco, lavado, acondicionado sencillo, estilizado express SIN cepillo y secado. En caso de exceder los 4 meses, o haber cortado en otro lugar previamente su cita será cancelada sin derecho a reembolso. Tolerancia máxima de 5 minutos.  Costo de la versión VIP $800 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/placeholder.svg?height=300&width=400", /* Imágen 2A-3C */
    price: "$700",
    duration: 60
  },
  {
    id: 6,
    title: "Consulta Curly",
    category: "Asesoría",
    description: "Diagnostico dermocapilar con microscopio, evaluación y explicación de las caracteristicas principales de la hebra.",
    fullDescription:
      "(antes asesoría) Incluye Diagnostico dermocapilar con microscopio, evaluación y explicación de las caracteristicas principales de la hebra, balance de proteinas, emolientes e hidratantes, tips de identificación de ingredientes en etiquetas, receta con ajustes en la rutina de productos. Costo de la versión VIP $820 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/placeholder.svg?height=300&width=400", /* Imágen 2A-3C */
    price: "$690",
    duration: 60
  },
  {
    id: 7,
    title: "Rizos con Ciencia",
    category: "Paquete",
    description: "Asesoría con corte, cabellos de largo y densidad regular.",
    fullDescription:
      "(antes asesoría con corte) cabellos de largo y densidad regular, Para corroborar las medidas de tu cabello nos puedes mandar mensaje a WhatsApp antes de agendar tu servicio.Incluye Diagnostico dermocapilar con microscopio, evaluación y explicación de las caracteristicas principales de la hebra, balance de proteinas, emolientes e hidratantes, tips de identificación de ingredientes en etiquetas, receta con ajustes en la rutina de productos, corte en seco, limpieza profunda,acondicionado Sencillo y estilizado guíado por pasos. Costo de la versión VIP $1800 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/placeholder.svg?height=300&width=400", /* Imágen 2A-3C */
    price: "$1520",
    duration: 120
  },
  {
    id: 8,
    title: "Rizos con Ciencia XL",
    category: "Cabello XL",
    description: "Asesoría con corte, cabello abundante con un largo de los codos hacia abajo.",
    fullDescription:
      "(antes asesoria con corte xl) Cabello abundante con un largo de los codos hacia abajo. Para corroborar las medidas de tu cabello nos puedes mandar mensaje a WhatsApp antes de agendar tu servicio. Incluye Diagnostico dermocapilar con microscopio, evaluación y explicación de las caracteristicas principales de la hebra, balance de proteinas, emolientes e hidratantes, tips de identificación de ingredientes en etiquetas, receta con ajustes en la rutina de productos, corte en seco, limpieza profunda,acondicionado Sencillo y estilizado guíado por pasos.  Costo de la versión VIP $2040 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/placeholder.svg?height=300&width=400", /* Imágen XL */
    price: "$1770",
    duration: 180
  },
  {
    id: 9,
    title: "Afro con Ciencia",
    category: "Cabello Afro",
    description: "Asesoría con corte, cabello textura 3C a 4.",
    fullDescription:
      "(antes asesoria con corte ) Cabello textura 3c a 4 Para corroborar textura nos puedes mandar mensaje a WhatsApp antes de agendar tu servicio. Incluye Diagnostico dermocapilar con microscopio, evaluación y explicación de las caracteristicas principales de la hebra, balance de proteinas, emolientes e hidratantes, tips de identificación de ingredientes en etiquetas, receta con ajustes en la rutina de productos, corte en seco, limpieza profunda,acondicionado Sencillo y estilizado guíado por pasos.  Costo de la versión VIP $2240 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/placeholder.svg?height=300&width=400", /* Imágen Afro*/
    price: "$1970",
    duration: 240
  },
  {
    id: 10,
    title: "Rizos Hidratados",
    category: "Tratamientos",
    description: "Diagnostico, limpieza, Hidratación Sencilla.",
    fullDescription:
      "Incluye Diagnostico dermocapilar, receta con ajustes en la rutina de productos, limpieza profunda, Hidratación Sencilla y estilizado guíado por pasos. Costo de la versión VIP $1200 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/placeholder.svg?height=300&width=400", /* Imágen Tratamientos*/
    price: "$1000",
    duration: 120
  },
  {
    id: 11,
    title: "Baño de Vapor",
    category: "Tratamientos",
    description: "Diagnostico, limpieza profunda, tratamiento de micro mist con ozono.",
    fullDescription:
      "Incluye Diagnostico dermocapilar, receta con ajustes en la rutina de productos, limpieza profunda, tratamiento de micro mist con ozono y estilizado guíado por pasos. Costo de la versión VIP $2250 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/placeholder.svg?height=300&width=400", /* Imágen Tratamientos*/
    price: "$1900",
    duration: 120
  },
  {
    id: 12,
    title: "Curly Makeover",
    category: "Paquete",
    description: "El favorito de las Influencers.",
    fullDescription:
      "(antes paq influencer) El favorito de las influencers: INCLUYE ASESORIA: Diagnostico dermocapilar con microscopio y estudio de la hebra con explicaciones sobre características y necesidades, así como ingredientes recomendados y a evitar en la lectura de etiquetas de productos. armado de rutina para mantenimiento en casa. CORTE: Corte en seco según tus gustos y tipo de rizo u onda, limpieza profunda en cuero cabelludo y hebra para retirar saturación. TRATAMIENTO DE VAPOR: Aplicación de productos libres de ingredientes insolubles en agua, de acuerdo a las necesidades especificas, Estilizado guiado paso a paso. FORMATO INFORMATIVO cabellos de largo y densidad regular, Para corroborar las medidas de tu cabello nos puedes mandar mensaje a WhatsApp antes de agendar tu servicio.  Costo de la versión VIP $3400 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/placeholder.svg?height=300&width=400", /* Imágen Influencers*/
    price: "$3400",
    duration: 120
  },
  {
    id: 13,
    title: "Revive tu rizo",
    category: "Paquete",
    description: "Recuperación de Rizos, cabellos de largo y densidad regular.",
    fullDescription:
      "(antes recuperación de rizos) cabellos de largo y densidad regular, Para corroborar las medidas de tu cabello nos puedes mandar mensaje a WhatsApp antes de agendar tu servicio.Incluye diagnóstico dermo capilar con microscopio, ajustes en la rutina de productos con receta, corte en seco, limpieza profunda, tratamiento de micro mist y estilizado guiado paso a paso.  Costo de la versión VIP $2800 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/placeholder.svg?height=300&width=400", /* Imágen largo y densidad regular*/
    price: "$2400",
    duration: 120
  },
  {
    id: 14,
    title: "Relax and Restore",
    category: "Paquete",
    description: "Tratamiento de vapor con aroma terapia.",
    fullDescription:
      "Tratamiento de vapor con aroma terapia, lavado en silla masajeadora, masaje de cabeza y manos guiado por técnicas de fisioterapia, estilizado suave con un momento para respirar. Costo de la versión VIP $3000 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/placeholder.svg?height=300&width=400", /* Imágen largo y densidad regular*/
    price: "$2500",
    duration: 120
  },
  {
    id: 15,
    title: "Rizos y café",
    category: "Paquete",
    description: "Corte oara cabello con largo hasta media espalda (2A-3B).",
    fullDescription:
      "Corte Para cabello con largo hasta media espalda, texturas onduladas o rizadas únicamente (2A a 3B). Para corroborar las medidas de tu cabello nos puedes mandar mensaje a WhatsApp antes de agendar tu servicio. Incluye diagnóstico dermocapilar, ajustes de rutina con receta de productos, corte en seco, limpieza profunda, estilizado guiado paso a paso + bebida a elegir + snack artesanal. Costo de la versión VIP $1300 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/placeholder.svg?height=300&width=400", /* Imágen 2A-3B*/
    price: "$1100",
    duration: 120
  },
  {
    id: 16,
    title: "Hidratación y Pausa",
    category: "Paquete",
    description: "Corte oara cabello con largo hasta media espalda (2A-3B).",
    fullDescription:
      "Corte Para cabello con largo hasta media espalda, texturas onduladas o rizadas únicamente (2A a 3B). Para corroborar las medidas de tu cabello nos puedes mandar mensaje a WhatsApp antes de agendar tu servicio. Incluye diagnóstico dermocapilar, ajustes de rutina con receta de productos, corte en seco, limpieza profunda, estilizado guiado paso a paso + bebida a elegir + snack artesanal. Costo de la versión VIP $1300 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/placeholder.svg?height=300&width=400", /* Imágen 2A-3B*/
    price: "$1100",
    duration: 120
  },

]



export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Nuestros Servicios</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Servicios especializados diseñados para celebrar y realzar sus rizos naturales, contamos con dos versiones en todos nuestros servicios, versión clásica y versión VIP.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      <br />
      <br />
      <p className="text-2xs text-muted-foreground max-w-2xl mx-auto">Todos nuestros servicios se encuentran en moneda nacional $MXN <br />Pregunta por nuestro Servicio Curly Color solamente en recepción.<br />Para corroborar las medidas de tu cabello nos puedes mandar mensaje a WhatsApp antes de agendar tu servicio. Consulta el precio VIP en la descripción Completa.</p>
      <TikTokFloatingButton />
    </div>
  )
}
