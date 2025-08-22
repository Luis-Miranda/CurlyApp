"use client"

import { ServiceCard } from "@/components/service-card"
import { Service } from "../types/service"
import TikTokFloatingButton from "@/components/tiktok-floating-button"

const services = [
  {
    id: 5,
    title: "Toque Curly",
    description: "Ajustes de temporada al diagnóstico anterior, corte en seco, lavado, acondicionado sencillo, estilizado express SIN cepillo y secado.",
    fullDescription:
      "antes corte de seguimiento:Aplica únicamente para cabellos atendidos en Maravilla Curly en los últimos 4 meses, No aplica para cabello XL o AFRO. Para corroborar las medidas de tu cabello nos puedes mandar mensaje a WhatsApp antes de agendar tu servicio. Incluye Ajustes de temporada al diagnóstico anterior, corte en seco, lavado, acondicionado sencillo, estilizado express SIN cepillo y secado.  En caso de exceder los 4 meses, o haber cortado en otro lugar previamente su cita será cancelada sin derecho a reembolso. Tolerancia máxima de 5 minutos.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/placeholder.svg?height=300&width=400",
    price: "$700",
    duration: 60,
    calendlyUrl: "https://calendly.com/maravillacurlyexp/toque-curly"
  },
  {
    id: 26,
    title: "Curly Makeover XL/AFRO",
    description: "El favorito de las influencers: Incluye asesoría, Corte, Tratamiento de Vapor y estilizado guiado paso a paso.",
    fullDescription:
      "El favorito de las influencers:INCLUYE ASESORIA: Diagnostico dermocapilar con microscopio y estudio de la hebra con explicaciones sobre características y necesidades, así como ingredientes recomendados y a evitar en la lectura de etiquetas de productos. armado de rutina para mantenimiento en casa. CORTE: Corte en seco según tus gustos y tipo de rizo u onda, limpieza profunda en cuero cabelludo y hebra para retirar saturación. TRATAMIENTO DE VAPOR: Aplicación de productos libres de ingredientes insolubles en agua, de acuerdo a las necesidades especificas, Estilizado guiado paso a paso.",
    requirements: "Ven con tu cabello limpio o sin enredos. Evita productos pesados los días previos.",
    image: "/placeholder.svg?height=300&width=400",
    price: "$3,550",
    duration: 180,
    calendlyUrl: "https://calendly.com/maravillacurlyexp/curly-makeover-xl-afro"
  },
  {
    id: 6,
    title: "Consulta Curly",
    description: "Diagnostico dermocapilar con microscopio, evaluación y explicación de las caracteristicas principales de la hebra.",
    fullDescription:
      "(antes asesoría) Incluye Diagnostico dermocapilar con microscopio, evaluación y explicación de las caracteristicas principales de la hebra, balance de proteinas, emolientes e hidratantes, tips de identificación de ingredientes en etiquetas, receta con ajustes en la rutina de productos",
    requirements: "Acude con el cabello seco, limpio y definido (sin estar recogido ni amarrado).",
    image: "/placeholder.svg?height=300&width=400",
    price: "$690",
    duration: 60,
    calendlyUrl: "https://calendly.com/maravillacurlyexp/consulta-curly"
  },
  {
    id: 13,
    title: "Relax and restore",
    description: "Tratamiento de vapor con aroma terapia, guiado por técnicas de fisioterapia.",
    fullDescription:
      "Tratamiento de vapor con aroma terapia, lavado en silla masajeadora, masaje de cabeza y manos guiado por técnicas de fisioterapia, estilizado suave con un momento para respirar.",
    requirements: "Cabello limpio o sin residuos. Evita cremas o aceites el día del servicio.",
    image: "/placeholder.svg?height=300&width=400",
    price: " $2,500",
    duration: 120,
    calendlyUrl: "https://calendly.com/maravillacurlyexp/relax-and-restore"
  },
  {
    id: 11,
    title: "Curly Makeover",
    description: "El favorito de las influencers: Incluye asesoría, Corte, Tratamiento de Vapor y estilizado guiado paso a paso.",
    fullDescription:
      "El favorito de las influencers: INCLUYE ASESORIA: Diagnostico dermocapilar con microscopio y estudio de la hebra con explicaciones sobre características y necesidades, así como ingredientes recomendados y a evitar en la lectura de etiquetas de productos. armado de rutina para mantenimiento en casa. CORTE: Corte en seco según tus gustos y tipo de rizo u onda, limpieza profunda en cuero cabelludo y hebra para retirar saturación. TRATAMIENTO DE VAPOR: Aplicación de productos libres de ingredientes insolubles en agua, de acuerdo a las necesidades especificas, Estilizado guiado paso a paso. FORMATO INFORMATIVO cabellos de largo y densidad regular, Para corroborar las medidas de tu cabello nos puedes mandar mensaje a WhatsApp antes de agendar tu servicio.",
    requirements: "Consulta previa para valoración. Ven con el cabello limpio, sin productos grasos.",
    image: "/placeholder.svg?height=300&width=400",
    price: "$3,000",
    duration: 120,
    calendlyUrl: "https://calendly.com/maravillacurlyexp/curly-makeover"
  },
  {
    id: 12,
    title: "Revive tu rizo",
    description: "Diagnóstico dermo capilar con microscopio, ajustes en la rutina de productos con receta, corte en seco, limpieza, tratamiento de vapor y estilizado.",
    fullDescription:
      "(antes recuperación de rizos) cabellos de largo y densidad regular, Para corroborar las medidas de tu cabello nos puedes mandar mensaje a WhatsApp antes de agendar tu servicio.Incluye diagnóstico dermo capilar con microscopio, ajustes en la rutina de productos con receta, corte en seco, limpieza profunda, tratamiento de vapor con ozono y estilizado guiado paso a paso.",
    requirements: "Cabello limpio y desenredado. Traer inspiración o estilo deseado.",
    image: "/placeholder.svg?height=300&width=400",
    price: "$2,400",
    duration: 120,
    calendlyUrl: "https://calendly.com/maravillacurlyexp/revive-tu-rizo"
  },
  {
    id: 25,
    title: "Baño de vapor Afro",
    description: "Especial para 3c-4a, diagnostico dermocapilar, rutina de productos, limpiezaprofunda, tratamiento de vapor, definición con secado.",
    fullDescription:
      "Cabello 3c-4a afrodescendiente, Incluye Diagnostico dermocapilar, receta con ajustes en la rutina de productos, limpieza profunda, tratamiento de vapor con ozono y  definición con secado incluido, guiado paso a paso.para dudas en la textura favor de comunicarse a WhatsApp.",
    requirements: "Cabello limpio, evitar nudos muy fuertes. Acompañamiento de un adulto obligatorio.",
    image: "/placeholder.svg?height=300&width=400",
    price: "$2,300",
    duration: 240,
    calendlyUrl: "https://calendly.com/maravillacurlyexp/bano-de-vapor-afro"
  },
{
    id: 24,
    title: "Baño de vapor XL",
    description: "Cabello abundante con un largo de los codos hacia abajo, disgnostico dermocapilar, ajuste de rutina, limpieza profunda, tratamiento de vapor.",
    fullDescription:
      "Cabello abundante con un largo de los codos hacia abajo.  Para corroborar las medidas de tu cabello nos puedes mandar mensaje a WhatsApp antes de agenda tu servicio. Incluye Diagnostico dermocapilar, receta con ajustes en la rutina de productos, limpieza profunda, tratamiento de vapor con ozono y estilizado guíado por pasos.",
    requirements: "Cabello limpio, evitar nudos muy fuertes. Acompañamiento de un adulto obligatorio.",
    image: "/placeholder.svg?height=300&width=400",
    price: "$2,150",
    duration: 180,
    calendlyUrl: "https://calendly.com/maravillacurlyexp/bano-de-vapor-xl"
  },
  {
    id: 27,
    title: "Rizos Hidratados XL",
    description: "Cabello abundante con un largo de los codos hacia abajo, disgnostico dermocapilar, ajuste de rutina, limpieza profunda, tratamiento de vapor.",
    fullDescription:
      "Cabello abundante con un largo de los codos hacia abajo. Para corroborar las medidas de tu cabello nos puedes mandar mensaje a WhatsApp antes de agenda tu servicio: Incluye Diagnostico dermocapilar, receta con ajustes en la rutina de productos, limpieza profunda, Hidratación Sencilla y estilizado guíado por pasos.",
    requirements: "Cabello limpio, evitar nudos muy fuertes. Acompañamiento de un adulto obligatorio.",
    image: "/placeholder.svg?height=300&width=400",
    price: "$1,260",
    duration: 120,
    calendlyUrl: "https://calendly.com/maravillacurlyexp/rizos-hidratados-xl"
  },
  {
    id: 9,
    title: "Rizos Hidratados",
    description: "Diagnostico dermocapilar, receta con ajuste de rutina, limpieza profunda, Hidratación sencilla y estilizado guíado por pasos",
    fullDescription:
      "Incluye Diagnostico dermocapilar, receta con ajustes en la rutina de productos, limpieza profunda, Hidratación Sencilla y estilizado guíado por pasos.",
    requirements: "Cabello limpio, evitar nudos muy fuertes. Acompañamiento de un adulto obligatorio.",
    image: "/placeholder.svg?height=300&width=400",
    price: "$1,000",
    duration: 120,
    calendlyUrl: "https://calendly.com/maravillacurlyexp/rizos-hidratados"
  },
  {
    id: 10,
    title: "Baño de Vapor",
    description: "Diagnostico dermocapilar, receta con ajuste de rutina, limpieza profunda, tratamiento de vapor y estilizado guíado por pasos",
    fullDescription:
      "Incluye Diagnostico dermocapilar, receta con ajustes en la rutina de productos, limpieza profunda, tratamiento de vapor con ozono y estilizado guíado por pasos.",
    requirements: "Cabello limpio, evitar nudos muy fuertes. Acompañamiento de un adulto obligatorio.",
    image: "/placeholder.svg?height=300&width=400",
    price: "$1,900",
    duration: 120,
    calendlyUrl: "https://calendly.com/maravillacurlyexp/nueva-reunion"
  },
  {
    id: 28,
    title: "Definición Curly",
    description: "Diagnostico dermocapilar, receta con ajuste de rutina, limpieza profunda, tratamiento de vapor y estilizado guíado por pasos",
    fullDescription:
      "(estilizado) Incluye Diagnostico dermocapilar, receta con ajustes en la rutina de productos, limpieza profunda, estilizado (definición + secado) PRECIO DESDE $600 PUEDE AUMENTAR DEPENDIENDO DE LA DENSIDAD Y LARGO DEL CABELLO. +$100 densidad medi+$300 densidad alta  +$350 XL",
    requirements: "Cabello limpio, evitar nudos muy fuertes. Acompañamiento de un adulto obligatorio.",
    image: "/placeholder.svg?height=300&width=400",
    price: "$690 +",
    duration: 60,
    calendlyUrl: "https://calendly.com/maravillacurlyexp/nueva-reunion"
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
      <p className="text-2xs text-muted-foreground max-w-2xl mx-auto">Todos nuestros servicios se encuentran en moneda nacional $MXN <br />Pregunta por nuestro Servicio Curly Color solamente en recepción. <br />Para corroborar las medidas de tu cabello nos puedes mandar mensaje a WhatsApp antes de agendar tu servicio.</p>
      <TikTokFloatingButton />
    </div>
  )
}
 