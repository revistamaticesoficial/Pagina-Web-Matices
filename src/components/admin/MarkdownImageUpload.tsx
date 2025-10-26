"use client"

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Upload, Loader2, ImageIcon } from 'lucide-react'
import { storageService } from '@/lib/storage-service'

interface MarkdownImageUploadProps {
  onImageInsert: (markdownText: string) => void
}

export function MarkdownImageUpload({ onImageInsert }: MarkdownImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar que es una imagen
    if (!storageService.isValidImageFile(file)) {
      setError('Por favor selecciona una imagen válida (JPG, PNG, GIF, WEBP)')
      return
    }

    // Validar tamaño (max 5MB)
    if (storageService.getFileSizeMB(file) > 5) {
      setError('La imagen no debe superar los 5MB')
      return
    }

    setError(null)
    setUploading(true)

    try {
      const result = await storageService.uploadImage(file, 'articles', 'content-images')
      
      if (result) {
        // Insertar Markdown con la URL de la imagen
        const markdownText = `![${file.name}](${result.url})`
        onImageInsert(markdownText)
      } else {
        setError('Error al subir la imagen')
      }
    } catch (err) {
      console.error('Error uploading image:', err)
      setError('Error al subir la imagen')
    } finally {
      setUploading(false)
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleFileSelect}
        className="hidden"
        id="markdown-image-upload"
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        title="Subir imagen"
      >
        {uploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ImageIcon className="h-4 w-4" />
        )}
      </Button>
      {error && (
        <span className="absolute top-full left-0 text-xs text-red-600 mt-1">
          {error}
        </span>
      )}
    </div>
  )
}

