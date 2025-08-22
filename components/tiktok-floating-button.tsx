"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function TikTokFloatingButton() {
  const [open, setOpen] = useState(false)

  // Previene el scroll cuando el modal está abierto (opcional)
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={cn(
            "fixed z-50 bottom-6 right-6 md:bottom-8 md:right-8",
            "bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-4 rounded-full shadow-lg",
          )}
        >
          ✨ No sabes que servicio escoger
        </button>
      </DialogTrigger>

      <DialogContent
  className="max-w-2xl w-full rounded-lg overflow-hidden p-0 bg-black/90 backdrop-blur-lg border border-yellow-400"
  onInteractOutside={() => setOpen(false)}
>
  {/* ✅ FIX accesibilidad Radix */}
  <DialogTitle className="sr-only">Video de TikTok</DialogTitle>

  <button
    onClick={() => setOpen(false)}
    className="absolute top-2 right-2 z-50 p-2 text-white hover:text-yellow-400 transition md:top-3 md:right-3"
  >
    <X className="h-6 w-6 md:h-8 md:w-8" />
  </button>

  <div className="relative w-full h-[80vh] max-w-[420px] mx-auto">
    <iframe
      src="https://www.tiktok.com/embed/v2/7474669072278490423"
      allow="autoplay; encrypted-media"
      allowFullScreen
      className="w-full h-full border-none"
    />
  </div>
</DialogContent>
    </Dialog>
  )
}