import { Service } from "../types/service"

export const services: Service[] = [
  {
    id: 1,
    title: "Curly Cut & Style",
    description: "Técnica especializada de corte para resaltar tu patrón natural de rizos.",
    fullDescription:
      "Nuestro corte curly está diseñado específicamente para tu patrón de rizos. Utilizamos técnicas avanzadas que respetan la textura natural, dando forma y movimiento mientras reducimos el volumen innecesario.",
    requirements:
      "Ven con el cabello limpio y seco, sin productos pesados aplicados. Si tienes un estilo en mente, trae fotos de referencia.",
    image: "/images/services/curly-cut.jpg",
    price: "$85",
    duration: 90,
  },
  {
    id: 2,
    title: "Deep Conditioning Treatment",
    description: "Tratamiento intensivo para hidratar y fortalecer rizos dañados.",
    fullDescription:
      "Este tratamiento penetra profundamente para restaurar hidratación, elasticidad y brillo. Incluye masaje, vapor y mascarilla personalizada.",
    requirements:
      "Llega con el cabello recién lavado y sin productos. Considera 90 minutos para este servicio.",
    image: "/images/services/deep-conditioning.jpg",
    price: "$65",
    duration: 75,
  },
  {
    id: 3,
    title: "Curl Refresh & Style",
    description: "Ideal para mantener tus rizos entre lavados o eventos especiales.",
    fullDescription:
      "Incluye limpieza suave, activación de rizos y estilizado profesional. También te enseñamos técnicas para extender el estilo en casa.",
    requirements:
      "El cabello debe tener al menos 2-3 días desde su último lavado. Puedes traer tus productos habituales.",
    image: "/images/services/refresh-style.jpg",
    price: "$45",
    duration: 60,
  },
  {
    id: 4,
    title: "Curly Hair Consultation",
    description: "Análisis detallado de tu cabello y plan personalizado para tu rutina.",
    fullDescription:
      "Analizamos porosidad, patrón de rizo, densidad y condición actual. Creamos un plan de productos, técnicas y mantenimiento.",
    requirements:
      "Llega con tu cabello en su estado natural, sin estilizado. Trae los productos que usas actualmente.",
    image: "/images/services/consultation.jpg",
    price: "$35",
    duration: 45,
  },
  {
    id: 5,
    title: "Bridal Curly Styling",
    description: "Peinado de rizos para bodas u ocasiones especiales.",
    fullDescription:
      "Incluye consulta, prueba previa y peinado el día de tu boda. Creamos un look duradero, fotogénico y fiel a tu estilo.",
    requirements:
      "Agenda la prueba con 2-4 semanas de anticipación. Trae inspiración y detalles del vestido/lugar. Reserva con 3-6 meses de anticipación.",
    image: "/images/services/bridal.jpg",
    price: "$150",
    duration: 120,
  },
  {
    id: 6,
    title: "Curl Training Session",
    description: "Aprende a cuidar y estilizar tus rizos como un profesional.",
    fullDescription:
      "Clase práctica con técnicas de aplicación de productos, estilizado y mantenimiento. Aprenderás métodos como plopping, scrunching y difusor.",
    requirements:
      "Llega con el cabello limpio y húmedo. Trae tus productos y herramientas. Usa ropa cómoda.",
    image: "/images/services/curl-training.jpg",
    price: "$75",
    duration: 90,
  },
]