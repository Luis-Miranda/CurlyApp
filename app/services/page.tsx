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
    image: "/images/services/corte-esencial.jpg", /* Imágen 2A a 3B */
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
    image: "/images/services/mini-rizos.jpg", /* Imágen 2A-3C */
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
    image: "/images/services/rizos-masculinos.jpg", /* Imágen 2A-3C */
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
    image: "/images/services/pixie-touch.jpg ", /* Imágen 2A-3C */
    price: "$750",
    duration: 120
  },
{
    id: 5,
    title: "Retoque Curly (1hr)",
    category: "Seguimiento",
    description: "Aplica únicamente para cabellos atendidos en Maravilla Curly en los últimos 4 meses, No aplica para cabello XL o AFRO.",
    fullDescription:
      "antes corte de seguimiento:Aplica únicamente para cabellos atendidos en Maravilla Curly en los últimos 4 meses, No aplica para cabello XL o AFRO. Para corroborar las medidas de tu cabello nos puedes mandar mensaje a WhatsApp antes de agendar tu servicio. Incluye Ajustes de temporada al diagnóstico anterior, corte en seco, lavado, acondicionado sencillo, estilizado express SIN cepillo y secado. En caso de exceder los 4 meses, o haber cortado en otro lugar previamente su cita será cancelada sin derecho a reembolso. Tolerancia máxima de 5 minutos.  Costo de la versión VIP $800 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/images/services/retoque-curly.jpg", /* Imágen 2A-3C */
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
    image: "/images/services/consulta-curly.jpg", /* Imágen 2A-3C */
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
    image: "/images/services/rizos-con-ciencia2.jpg", /* Imágen 2A-3C */
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
    image: "/images/services/rizos-con-ciencia.jpg", /* Imágen XL */
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
    image: "/images/services/rizos-con-ciencia1.jpg", /* Imágen Afro*/
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
    image: "/images/services/corte-esencial.jpg", /* Falta*/
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
    image: "/images/services/baño-vapor.jpg", /* Imágen Tratamientos*/
    price: "$1900",
    duration: 120
  },
  {
    id: 12,
    title: "Curly Makeover",
    category: "Paquete",
    description: "El favorito de las Influencers.",
    fullDescription:
      "(antes paq influencer) El favorito de las influencers: INCLUYE ASESORIA: Diagnostico dermocapilar con microscopio y estudio de la hebra con explicaciones sobre características y necesidades, así como ingredientes recomendados y a evitar en la lectura de etiquetas de productos. armado de rutina para mantenimiento en casa. CORTE: Corte en seco según tus gustos y tipo de rizo u onda, limpieza profunda en cuero cabelludo y hebra para retirar saturación. TRATAMIENTO DE VAPOR: Aplicación de productos libres de ingredientes insolubles en agua, de acuerdo a las necesidades especificas, Estilizado guiado paso a paso. FORMATO INFORMATIVO cabellos de largo y densidad regular, Para corroborar las medidas de tu cabello nos puedes mandar mensaje a WhatsApp antes de agendar tu servicio.  Costo de la versión VIP $3600 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/images/services/curly-make-over.jpg", /* Imágen Influencers*/
    price: "$3400",
    duration: 120
  },
  {
    id: 13,
    title: "Revive tu Rizo",
    category: "Paquete",
    description: "Recuperación de Rizos, cabellos de largo y densidad regular.",
    fullDescription:
      "(antes recuperación de rizos) cabellos de largo y densidad regular, Para corroborar las medidas de tu cabello nos puedes mandar mensaje a WhatsApp antes de agendar tu servicio.Incluye diagnóstico dermo capilar con microscopio, ajustes en la rutina de productos con receta, corte en seco, limpieza profunda, tratamiento de micro mist y estilizado guiado paso a paso.  Costo de la versión VIP $2800 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/images/services/revive-tu-rizo.jpg", /* Imágen largo y densidad regular*/
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
    image: "/images/services/2A-3C.jpg", /* falta*/
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
    image: "/images/services/corte-esencial.jpg", /* falta*/
    price: "$1100",
    duration: 120
  },
  {
    id: 16,
    title: "Hidratación & Pausa",
    category: "Paquete",
    description: "Hidratación sencilla, lavado aromático, estilizado, bebida y galleta.",
    fullDescription:
      "Hidratación  sencilla + lavado aromático + estilizado + bebida + galleta. Incluye diagnóstico dermocapilar, ajustes de rutina con receta de productos, limpieza profunda, estilizado guiado paso a paso  Costo de la versión VIP $2100 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/images/services/corte-esencial.jpg", /* falta*/
    price: "$1800",
    duration: 120
  },
  {
    id: 17,
    title: "Rizos Full Ritual",
    category: "Paquete",
    description: "Curly makeover, stuling class",
    fullDescription:
      "Curly makeover + styling class + lunch saludable completo.   Costo de la versión VIP $3300 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/images/services/Rizos3.jpg", /* Imágen 2A-3B*/
    price: "$3000",
    duration: 150
  },
  {
    id: 18,
    title: "Consulta con Hidratación",
    category: "Paquete",
    description: "Diagnostico dermocapilar con microscopio, evaluación,limpieza profunda, Hidratación sencilla.",
    fullDescription:
      "Incluye Diagnostico dermocapilar con microscopio, evaluación y explicación de las caracteristicas principales de la hebra, balance de proteinas, emolientes e hidratantes, tips de identificación de ingredientes en etiquetas, receta con ajustes en la rutina de productos. limpieza profunda, Hidratación Sencilla y estilizado sencillo.   Costo de la versión VIP $1650 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/images/services/corte-esencial.jpg", /* Falta*/
    price: "$1400",
    duration: 60
  },
  {
    id: 20,
    title: "Rizos masculinos hidratados",
    category: "Paquete",
    description: "Corte e hidratación, Válido para largo hasta la oreja como máximo.",
    fullDescription:
      "(antes corte + hidratación) Válido para largo hasta la oreja como máximo, se realiza con tijera. Incluye Diagnostico dermocapilar, receta con ajustes en la rutina de productos, corte en seco,  limpieza profunda, Hidratación Sencilla y estilizado guíado por pasos.   Costo de la versión VIP desde $1020 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/images/services/Rizos-masculinos-3.jpg", /* Imágen 2A-3B*/
    price: "$850",
    duration: 90
  },
  {
    id: 21,
    title: "Rizos masculinos con ciencia.",
    category: "Paquete",
    description: "Asesoría y corte, Válido para largo hasta la oreja como máximo.",
    fullDescription:
      "(antes asesoría con corte) cabellos de largo hasta la oreja maximo..Incluye Diagnostico dermocapilar con microscopio, evaluación y explicación de las caracteristicas principales de la hebra, balance de proteinas, emolientes e hidratantes, tips de identificación de ingredientes en etiquetas, receta con ajustes en la rutina de productos, corte en seco, limpieza profunda,acondicionado Sencillo y estilizado guíado por pasos.   Costo de la versión VIP desde $1440 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/images/services/rizos-masculinos-2.jpg", /* Imágen 2A-3B*/
    price: "$1200",
    duration: 90
  },
  {
    id: 22,
    title: "Mantenimiento Rizos Masculinos.",
    category: "Paquete",
    description: "Corte de caballero con tijera, Válido para largo hasta la oreja como máximo.",
    fullDescription:
      "(antes corte de caballero) Válido para largo hasta la oreja como máximo, se realiza con tijera. Incluye Diagnostico dermocapilar, receta con ajustes en la rutina de productos, corte en seco,  limpieza profunda, acondicionado sencillo, ampolleta revitalizante y estilizado guíado por pasos  Costo de la versión VIP desde $960 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/images/services/rizos-masculinos.jpg", /* Imágen 2A-3B*/
    price: "$800",
    duration: 90
  },
  {
    id: 23,
    title: "Corte Escencial XL.",
    category: "Cabello XL",
    description: "Corte de rizos/ondas XL, cabello abundante con un largo de los codos hacia bajo.",
    fullDescription:
      "(antes corte de rizos/ondas xl) Cabello abundante con un largo de los codos hacia abajo.: Para corroborar las medidas de tu cabello nos puedes mandar mensaje a WhatsApp antes de agendar tu servicio.Incluye diagnóstico dermocapilar, ajustes de rutina con receta, corte en seco, limpieza profunda y estilizado guiado paso a paso.  Costo de la versión VIP desde $1500 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/images/services/Xl.jpg", /* Imágen XL*/
    price: "$1260",
    duration: 180
  },
  {
    id: 24,
    title: "Corte Afrorizo Poderoso",
    category: "Cabello Afro",
    description: "Texturas Afrodescendientes 3C a 4.",
    fullDescription:
      "Texturas Afrodescendientes (3c a patrones 4)  Incluye Diagnostico dermocapilar, receta con ajustes en la rutina de productos, corte en seco limpieza profunda, estilizado (definición + secado) guiado por pasos el precio puede aumentar dependiendo de la densidad, largo y porosidad  Costo de la versión VIP desde $2000 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/images/services/afrorizo-poderoso.jpg", /* Imágen Afro*/
    price: "$1800",
    duration: 240
  },
  {
    id: 25,
    title: "Afro Glow",
    category: "Cabello Afro",
    description: "Patrones 3C a 4, Influencer Afro.",
    fullDescription:
      "PATRONES 3C-4 (antes paq influencer afro) INCLUYE ASESORIA: Diagnostico dermocapilar con microscopio y estudio de la hebra con explicaciones sobre características y necesidades, así como ingredientes recomendados y a evitar en la lectura de etiquetas de productos. armado de rutina para mantenimiento en casa. CORTE: Corte en seco según tus gustos y tipo de rizo u onda, limpieza profunda en cuero cabelludo y hebra para retirar saturación. TRATAMIENTO DE VAPOR: Aplicación de productos libres de ingredientes insolubles en agua, de acuerdo a las necesidades especificas, Estilizado guiado paso a paso. FORMATO INFORMATIVO cabellos de largo y densidad regular, Para corroborar las medidas de tu cabello nos puedes mandar mensaje a WhatsApp antes de agendar tu servicio. el precio puede aumentar dependiendo de la densidad y largo Costo de la versión VIP desde $3900 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/images/services/afro-glow.jpg", /* Imágen Afro*/
    price: "$3280",
    duration: 240
  },
  {
    id: 26,
    title: "Revive tu Rizo XL",
    category: "Cabello XL",
    description: "Recuperación de rizos XL, cabello abundante con un largo de los codos hacia abajo.",
    fullDescription:
      "(antes recuperación de rizos XL) Cabello abundante con un largo de los codos hacia abajo.Para corroborar las medidas de tu cabello nos puedes mandar mensaje a WhatsApp antes de agendar tu servicio. Incluye diagnóstico dermocapilar con microscopio, corte en seco, limpieza profunda, tratamiento de vapor ozono y estilizado guiado paso a paso. Costo de la versión VIP desde $3100 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/images/services/revive-tu-rizo-xl.jpg", /* Imágen XL*/
    price: "$2750",
    duration: 180
  },
{
    id: 27,
    title: "Baño de vapor XL",
    category: "Cabello XL",
    description: "Diagnostico, limpieza, tratamiento de vapor con ozono, cabello abundante con un largo de los codos hacia abajo.",
    fullDescription:
      "Cabello abundante con un largo de los codos hacia abajo.  Para corroborar las medidas de tu cabello nos puedes mandar mensaje a WhatsApp antes de agenda tu servicio. Incluye Diagnostico dermocapilar, receta con ajustes en la rutina de productos, limpieza profunda, tratamiento de vapor con ozono y estilizado guíado por pasos. Costo de la versión VIP desde $2550 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/images/services/baño-vapor.jpg", /* Imágen XL*/
    price: "$2150",
    duration: 180
  },
  {
    id: 28,
    title: "Baño de vapor Afro",
    category: "Cabello Afro",
    description: "Diagnostico, limpieza, tratamiento de vapor con ozono, definición con secado, cabello afrodesenciente 3C-4A.",
    fullDescription:
      "Cabello 3c-4a afrodescendiente, Incluye Diagnostico dermocapilar, receta con ajustes en la rutina de productos, limpieza profunda, tratamiento de vapor con ozono y  definición con secado incluido, guiado paso a paso. para dudas en la textura favor de comunicarse a WhatsApp.  Costo de la versión VIP desde $2700 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/images/services/baño-vapor2.jpg", /* Imágen Afro*/
    price: "$2300",
    duration: 240
  },
  {
    id: 29,
    title: "Curly Makeover XL",
    category: "Cabello XL",
    description: "El favorito de las influencesr XL.",
    fullDescription:
      "(antes paq influencer xl) El favorito de las influencers: INCLUYE ASESORIA: Diagnostico dermocapilar con microscopio y estudio de la hebra con explicaciones sobre características y necesidades, así como ingredientes recomendados y a evitar en la lectura de etiquetas de productos. armado de rutina para mantenimiento en casa. CORTE: Corte en seco según tus gustos y tipo de rizo u onda, limpieza profunda en cuero cabelludo y hebra para retirar saturación. TRATAMIENTO DE VAPOR: Aplicación de productos libres de ingredientes insolubles en agua, de acuerdo a las necesidades especificas, Estilizado guiado paso a paso. FORMATO INFORMATIVO.   Costo de la versión VIP desde $4000 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/images/services/Rizos3.jpg", /* Imágen XL*/
    price: "$3550",
    duration: 180
  },
  {
    id: 30,
    title: "Rizos Hidratados XL",
    category: "Cabello XL",
    description: "Diagnostico, limpieza profunda, Hidratación sencilla, Cabello abundante con un largo de los codos hacia abajo.",
    fullDescription:
      "Cabello abundante con un largo de los codos hacia abajo. Para corroborar las medidas de tu cabello nos puedes mandar mensaje a WhatsApp antes de agenda tu servicio: Incluye Diagnostico dermocapilar, receta con ajustes en la rutina de productos, limpieza profunda, Hidratación Sencilla y estilizado guíado por pasos. Costo de la versión VIP desde $1500 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/images/services/2A-3C.jpg", /* Imágen XL*/
    price: "$1260",
    duration: 120
  },
{
    id: 31,
    title: "Definición Curly",
    category: "Estilizado",
    description: "Diagnostico, limpieza profunda, estilizado, el costo puede aumentar dependiendo de la densidad y el largo del cabello.",
    fullDescription:
      "(estilizado) Incluye Diagnostico dermocapilar, receta con ajustes en la rutina de productos, limpieza profunda, estilizado (definición + secado) PRECIO DESDE $600 PUEDE AUMENTAR DEPENDIENDO DE LA DENSIDAD Y LARGO DEL CABELLO. +$100 densidad media +$300 densidad alta  +$350 XL.  Costo de la versión VIP desde $820 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/images/services/definición-curly.jpg", /* Imágen Estilizado*/
    price: "Desde $820",
    duration: 60
  },
{
    id: 32,
    title: "Estilízate",
    category: "Estilizado",
    description: "Limpieza profunda y clases de estilizado personalizada",
    fullDescription:
      "Incluye ajustes básicos de rutina sin receta, limpieza profunda, clase de estilizado personalizada, puedes traer tus propias herramientas. Costo de la versión VIP desde $720 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/images/services/estilízate-xl.jpg", /* Imágen Estilizado*/
    price: "Desde $600",
    duration: 60
  },
  {
    id: 33,
    title: "Estilízate XL",
    category: "Estilizado",
    description: "Limpieza profunda y clases de estilizado personalizada",
    fullDescription:
      "Incluye ajustes básicos de rutina sin receta, limpieza profunda, clase de estilizado personalizada, puedes traer tus propias herramientas. Costo de la versión VIP desde $880 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/images/services/estilízate-xl.jpg", /* Imágen XL*/
    price: "$750",
    duration: 120
  },
  {
    id: 34,
    title: "Estilízate Afro",
    category: "Estilizado",
    description: "Limpieza profunda y clases de estilizado personalizada",
    fullDescription:
      "Incluye ajustes básicos de rutina sin receta, limpieza profunda, clase de estilizado personalizada, puedes traer tus propias herramientas. Costo de la versión VIP desde $1100 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/images/services/estilízate-xl.jpg", /* Imágen Afro*/
    price: "$900",
    duration: 90
  },
  {
    id: 35,
    title: "Rizos de Gala",
    category: "Estilizado",
    description: "Peinados pensados para brillar, este servicio está diseñado para acompañarte en eventos.",
    fullDescription:
      "Peinados pensados para brillar. Desde semi recogidos románticos hasta estilos con trenzas o volumen, este servicio está diseñado para acompañarte en eventos, bodas, sesiones de fotos o días especiales. El precio varía según la complejidad del peinado, longitud y densidad del cabello, se requiere foto previa de referencia. Costo de la versión VIP desde $850 mxn.",
    requirements: "Acudir con el cabello limpio y seco, sin productos pesados. Traer productos que usas actualmente si es posible.",
    image: "/images/services/rizos-de-gala2.jpg", /* Imágen Afro*/
    price: "desde $850",
    duration: 60
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
