import { ServiceCard } from "@/components/service-card"

const services = [
  {
    id: 1,
    title: "Curly Cut & Style",
    description: "Specialized cutting technique for curly hair that enhances your natural curl pattern.",
    image: "/placeholder.svg?height=300&width=400",
    fullDescription:
      "Our signature curly cut is designed specifically for your unique curl pattern. We use advanced cutting techniques that work with your hair's natural texture, creating shape and movement while reducing bulk. The service includes a thorough consultation, wash with curl-specific products, precision cutting, and styling with professional curl-enhancing products.",
    requirements:
      "Please come with clean, dry hair. Avoid using heavy products 24 hours before your appointment. Bring reference photos if you have a specific style in mind.",
    price: "$85",
  },
  {
    id: 2,
    title: "Deep Conditioning Treatment",
    description: "Intensive moisture treatment to restore and strengthen damaged curls.",
    image: "/placeholder.svg?height=300&width=400",
    fullDescription:
      "Our deep conditioning treatment is a luxurious experience that penetrates deep into the hair shaft to restore moisture, elasticity, and shine. We use premium products specifically formulated for curly hair, including protein treatments when needed. The process includes scalp massage, steam treatment, and a customized mask based on your hair's specific needs.",
    requirements:
      "Come with freshly washed hair. Avoid using any leave-in products on the day of treatment. Allow 90 minutes for the full service.",
    price: "$65",
  },
  {
    id: 3,
    title: "Curl Refresh & Style",
    description: "Perfect for maintaining your curls between wash days with professional styling.",
    image: "/placeholder.svg?height=300&width=400",
    fullDescription:
      "Ideal for refreshing your curls between wash days or for special occasions. This service includes gentle cleansing with co-wash or low-poo, curl reactivation with professional products, and expert styling techniques to bring your curls back to life. We'll also teach you maintenance techniques to extend your style at home.",
    requirements:
      "Hair should be at least 2-3 days post-wash for best results. Bring any products you currently use at home for consultation.",
    price: "$45",
  },
  {
    id: 4,
    title: "Curly Hair Consultation",
    description: "Comprehensive analysis and personalized care plan for your unique curl journey.",
    image: "/placeholder.svg?height=300&width=400",
    fullDescription:
      "A detailed consultation where we analyze your hair's porosity, curl pattern, density, and current condition. We'll discuss your hair goals, lifestyle, and create a personalized care routine. This includes product recommendations, styling techniques, and a maintenance schedule tailored specifically for you.",
    requirements:
      "Come with your hair in its natural state (no styling products). Bring any current products you use and be prepared to discuss your hair history and goals.",
    price: "$35",
  },
  {
    id: 5,
    title: "Bridal Curly Styling",
    description: "Special occasion styling for your perfect wedding day look.",
    image: "/placeholder.svg?height=300&width=400",
    fullDescription:
      "Create the perfect bridal look that celebrates your natural curls. This premium service includes a pre-wedding consultation, trial run, and the wedding day styling. We work with your vision to create a style that photographs beautifully and lasts throughout your special day. Includes touch-up kit for your wedding party.",
    requirements:
      "Schedule a trial run 2-4 weeks before your wedding. Bring inspiration photos and details about your dress and venue. Book 3-6 months in advance.",
    price: "$150",
  },
  {
    id: 6,
    title: "Curl Training Session",
    description: "Learn professional techniques to style and maintain your curls at home.",
    image: "/placeholder.svg?height=300&width=400",
    fullDescription:
      "A hands-on educational session where you'll learn professional styling techniques, product application methods, and maintenance routines. We'll work with your hair to demonstrate techniques like plopping, scrunching, and diffusing. You'll leave with confidence and the knowledge to recreate salon-quality results at home.",
    requirements:
      "Come with clean, damp hair. Bring your current styling products and tools. Wear comfortable clothing that you don't mind getting slightly damp.",
    price: "$75",
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
