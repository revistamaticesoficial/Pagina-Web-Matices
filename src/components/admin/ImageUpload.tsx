"use client"

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react'
import { storageService } from '@/lib/storage-service'

// Función helper para detectar si es video basado en la extensión
const isVideo = (url: string | null | undefined): boolean => {
  if (!url) return false;
  const urlLower = url.toLowerCase();
  return urlLower.endsWith('.mp4');
};

interface ImageUploadProps {
  currentImage?: string
  onImageChange: (url: string | null) => void
  bucket?: string
  path?: string
}

export function ImageUpload({ currentImage, onImageChange, bucket, path }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Mostrar información del archivo en consola para debugging
    const fileSizeMB = storageService.getFileSizeMB(file)
    const fileSizeKB = file.size / 1024
    console.log('Archivo seleccionado:', {
      nombre: file.name,
      tipo: file.type,
      tamaño_bytes: file.size,
      tamaño_KB: fileSizeKB.toFixed(2),
      tamaño_MB: fileSizeMB.toFixed(2)
    })

    // Validar que es una imagen o video
    if (!storageService.isValidMediaFile(file)) {
      setError('Por favor selecciona una imagen válida (JPG, PNG, GIF, WEBP) o video (MP4)')
      return
    }

    // Validar tamaño (max 50MB)
    if (fileSizeMB > 50) {
      const fileType = storageService.isVideoFile(file) ? 'video' : 'imagen'
      setError(`El ${fileType} no debe superar los 50MB. Tamaño actual: ${fileSizeMB.toFixed(2)}MB`)
      return
    }

    setError(null)
    setUploading(true)

    try {
      const fileType = storageService.isVideoFile(file) ? 'video' : 'imagen'
      console.log(`Intentando subir ${fileType} al bucket: ${bucket || 'articles'}`)
      const result = await storageService.uploadImage(file, bucket, path)
      
      if (result) {
        console.log(`${fileType.charAt(0).toUpperCase() + fileType.slice(1)} subido exitosamente:`, result.url)
        onImageChange(result.url)
        setError(null)
      } else {
        console.error('No se recibió resultado de la subida')
        setError(`Error al subir el ${fileType}`)
      }
    } catch (err: any) {
      console.error('Error uploading file:', err)
      console.error('Detalles del error:', {
        message: err?.message,
        statusCode: err?.statusCode,
        error: err?.error,
        code: err?.code
      })
      const fileType = storageService.isVideoFile(file) ? 'video' : 'imagen'
      const errorMessage = err?.message || err?.error?.message || `Error desconocido al subir el ${fileType}`
      setError(`Error al subir el ${fileType}: ${errorMessage}`)
    } finally {
      setUploading(false)
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = () => {
    onImageChange(null)
  }

  return (
    <div className="space-y-4">
      {currentImage && (
        <div className="relative w-full h-64 rounded-lg border overflow-hidden">
          {isVideo(currentImage) ? (
            <video
              src={currentImage}
              className="w-full h-full object-cover"
              controls
              muted
              loop
            />
          ) : (
            <Image
              src={currentImage}
              alt="Preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 512px"
            />
          )}
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp,video/mp4"
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full"        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Subiendo...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              {currentImage ? (isVideo(currentImage) ? 'Cambiar video' : 'Cambiar imagen') : 'Subir imagen o video'}
            </>
          )}
        </Button>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <p className="text-xs text-muted-foreground">
        Máximo 50MB. Formatos: JPG, PNG, GIF, WEBP, MP4
      </p>
    </div>
  )
}

