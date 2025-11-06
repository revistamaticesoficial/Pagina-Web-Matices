"use client"

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react'
import { storageService } from '@/lib/storage-service'

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

    // Validar que es una imagen
    if (!storageService.isValidImageFile(file)) {
      setError('Por favor selecciona una imagen válida (JPG, PNG, GIF, WEBP)')
      return
    }

    // Validar tamaño (max 50MB)
    if (fileSizeMB > 50) {
      setError(`La imagen no debe superar los 50MB. Tamaño actual: ${fileSizeMB.toFixed(2)}MB`)
      return
    }

    setError(null)
    setUploading(true)

    try {
      console.log(`Intentando subir imagen al bucket: ${bucket || 'articles'}`)
      const result = await storageService.uploadImage(file, bucket, path)
      
      if (result) {
        console.log('Imagen subida exitosamente:', result.url)
        onImageChange(result.url)
        setError(null)
      } else {
        console.error('No se recibió resultado de la subida')
        setError('Error al subir la imagen')
      }
    } catch (err: any) {
      console.error('Error uploading image:', err)
      console.error('Detalles del error:', {
        message: err?.message,
        statusCode: err?.statusCode,
        error: err?.error,
        code: err?.code
      })
      const errorMessage = err?.message || err?.error?.message || 'Error desconocido al subir la imagen'
      setError(`Error al subir la imagen: ${errorMessage}`)
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
        <div className="relative">
          <img
            src={currentImage}
            alt="Preview"
            className="w-full h-64 object-cover rounded-lg border"
          />
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
          accept="image/jpeg,image/png,image/gif,image/webp"
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
              {currentImage ? 'Cambiar imagen' : 'Subir imagen'}
            </>
          )}
        </Button>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <p className="text-xs text-muted-foreground">
        Máximo 50MB. Formatos: JPG, PNG, GIF, WEBP
      </p>
    </div>
  )
}

