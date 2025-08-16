// components/ui/ImageUpload.tsx
"use client"

import { useRef, useState } from "react"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "@/lib/firebase"
import { v4 as uuidv4 } from "uuid"

interface Props {
  clientId: string
  onUploadComplete: (urls: string[]) => void
}

export default function ImageUpload({ clientId, onUploadComplete }: Props) {
  const [files, setFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    setFiles(selectedFiles)
    setPreviewUrls(selectedFiles.map(file => URL.createObjectURL(file)))
  }

  const handleUpload = async () => {
    const urls: string[] = []

    for (const file of files) {
      const fileRef = ref(storage, `clientes/${clientId}/${uuidv4()}`)
      await uploadBytes(fileRef, file)
      const url = await getDownloadURL(fileRef)
      urls.push(url)
    }

    onUploadComplete(urls)
    setFiles([])
    setPreviewUrls([])
  }

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        className="bg-black text-white px-4 py-2 rounded"
        onClick={() => inputRef.current?.click()}
      >
        Seleccionar imágenes
      </button>
      {previewUrls.length > 0 && (
        <>
          <div className="flex flex-wrap gap-2">
            {previewUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                className="h-24 w-24 object-cover rounded border"
                alt={`preview-${index}`}
              />
            ))}
          </div>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleUpload}
          >
            Subir imágenes
          </button>
        </>
      )}
    </div>
  )
}