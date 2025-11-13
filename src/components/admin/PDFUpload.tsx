"use client"

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Upload, X, FileText, Loader2 } from 'lucide-react'
import { storageService } from '@/lib/storage-service'
import { supabase } from '@/lib/supabase'

interface PDFUploadProps {
  currentPDF?: string
  onPDFChange: (url: string | null, filename: string | null) => void
  bucket?: string
  path?: string
}

export function PDFUpload({ currentPDF, onPDFChange, bucket = 'editions', path }: PDFUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filename, setFilename] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar que es un PDF
    if (file.type !== 'application/pdf') {
      setError('Por favor selecciona un archivo PDF válido')
      return
    }

    // Validar tamaño (max 100MB para PDFs)
    const fileSizeMB = storageService.getFileSizeMB(file)
    if (fileSizeMB > 100) {
      setError(`El PDF no debe superar los 100MB. Tamaño actual: ${fileSizeMB.toFixed(2)}MB`)
      return
    }

    setError(null)
    setUploading(true)

    try {
      // Verificar que el bucket existe
      await storageService.ensureBucketExists(bucket)

      // Generar nombre único para el archivo
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = path ? `${path}/${fileName}` : fileName

      // Subir archivo
      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        throw new Error(uploadError.message || 'Error al subir el PDF')
      }

      if (!data) {
        throw new Error('No se recibió respuesta del servidor')
      }

      // Obtener URL pública
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path)

      if (!urlData?.publicUrl) {
        throw new Error('No se pudo obtener la URL pública del archivo')
      }

      setFilename(file.name)
      onPDFChange(urlData.publicUrl, file.name)
      setError(null)
    } catch (err: any) {
      console.error('Error uploading PDF:', err)
      setError(err?.message || 'Error al subir el PDF')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = () => {
    onPDFChange(null, null)
    setFilename(null)
  }

  return (
    <div className="space-y-4">
      {currentPDF && (
        <div className="relative p-4 border rounded-lg bg-gray-50">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-red-600" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {filename || 'PDF subido'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {currentPDF}
              </p>
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileSelect}
          className="hidden"
          id="pdf-upload"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Subiendo PDF...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              {currentPDF ? 'Cambiar PDF' : 'Subir PDF'}
            </>
          )}
        </Button>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <p className="text-xs text-muted-foreground">
        Máximo 100MB. Formato: PDF
      </p>
    </div>
  )
}

