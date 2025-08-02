"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import Image from "next/image"

// Mock TikTok videos data
const mockTikTokVideos = [
  {
    id: 1,
    thumbnail: "/placeholder.svg?height=600&width=400",
    title: "Amazing Curly Hair Transformation",
    views: "125K",
    likes: "8.2K",
  },
  {
    id: 2,
    thumbnail: "/placeholder.svg?height=600&width=400",
    title: "Quick Curl Refresh Tutorial",
    views: "89K",
    likes: "5.7K",
  },
  {
    id: 3,
    thumbnail: "/placeholder.svg?height=600&width=400",
    title: "My Favorite Curl Products",
    views: "156K",
    likes: "12.1K",
  },
  {
    id: 4,
    thumbnail: "/placeholder.svg?height=600&width=400",
    title: "Curly Cut Technique Revealed",
    views: "203K",
    likes: "15.8K",
  },
  {
    id: 5,
    thumbnail: "/placeholder.svg?height=600&width=400",
    title: "Perfect Wash Day Routine",
    views: "178K",
    likes: "11.3K",
  },
]

export function TikTokCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockTikTokVideos.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + mockTikTokVideos.length) % mockTikTokVideos.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mockTikTokVideos.length)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Siguenos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Inspírate con nuestras últimas transformaciones, tutoriales y consejos para rizos en TikTok
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Carousel Controls */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <Button variant="outline" size="icon" onClick={goToPrevious} className="rounded-full bg-transparent">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon" onClick={toggleAutoPlay} className="rounded-full bg-transparent">
              {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>

            <Button variant="outline" size="icon" onClick={goToNext} className="rounded-full bg-transparent">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Carousel */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {mockTikTokVideos.map((video) => (
                <div key={video.id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
                    {/* Featured Video (Center) */}
                    <div className="md:col-span-1 lg:col-span-3 lg:col-start-2">
                      <div className="relative group cursor-pointer">
                        <div className="aspect-[9/16] max-h-[600px] mx-auto relative overflow-hidden rounded-2xl bg-black">
                          <Image
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Play className="h-6 w-6 text-black ml-1" />
                            </div>
                          </div>

                          {/* Video Info */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                            <h3 className="font-semibold mb-2">{video.title}</h3>
                            <div className="flex items-center gap-4 text-sm">
                              <span>{video.views} views</span>
                              <span>{video.likes} likes</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {mockTikTokVideos.map((_, index) => (
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
            <a href="https://tiktok.com/@maravillacurly" target="_blank" rel="noopener noreferrer">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
              Follow @MaravillaCurly
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
