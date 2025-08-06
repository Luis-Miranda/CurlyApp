"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"

const tiktokVideos = [
  {
    id: 1,
    url: "https://www.tiktok.com/embed/v2/7520383672827038983",
    title: "Transformación 1",
  },
  {
    id: 2,
    url: "https://www.tiktok.com/embed/v2/7474669072278490423",
    title: "Transformación 2",
  },
  {
    id: 3,
    url: "https://www.tiktok.com/embed/v2/7520655408386673928",
    title: "Transformación 3",
  },
]

export function TikTokCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tiktokVideos.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + tiktokVideos.length) % tiktokVideos.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % tiktokVideos.length)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Síguenos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Inspírate con nuestras últimas transformaciones, tutoriales y consejos para rizos en TikTok
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Controles */}
          <div className="flex justify-center items-center gap-4 mb-6">
            <Button variant="outline" size="icon" onClick={goToPrevious} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon" onClick={toggleAutoPlay} className="rounded-full">
              {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>

            <Button variant="outline" size="icon" onClick={goToNext} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Carrusel de videos */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {tiktokVideos.map((video) => (
                <div key={video.id} className="w-full flex-shrink-0 px-2">
                  <div className="aspect-[9/16] max-h-[600px] mx-auto rounded-2xl overflow-hidden">
                    <iframe
                      src={video.url}
                      allowFullScreen
                      width="100%"
                      height="600"
                      className="w-full h-full border-none rounded-2xl"
                      title={video.title}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-6">
            {tiktokVideos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button asChild size="lg" className="gap-2">
            <a
              href="https://www.tiktok.com/@maravillacurlyexperience"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
              Ver más en TikTok
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
