import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Maravilla Curly - Experta en Cuidado y Estilizado del Cabello Rizado",
  description:
    "Celebrando la belleza natural de tus rizos con un cuidado experto, técnicas especializadas y un peinado personalizado. Reserva la transformación de tus rizos hoy.",
  keywords: "Cabello rizado, chinos, curly, salón de cabello, corte de cabello curly, estilizado de cabello, CDMX Salón, especialista en curly",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
