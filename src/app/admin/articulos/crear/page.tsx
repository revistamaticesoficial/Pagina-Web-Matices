"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArticleEditor } from "@/components/admin/ArticleEditor"
import { adminService } from "@/lib/admin-service"
import { Loader2 } from "lucide-react"

export default function CrearArticuloPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const handleSave = async (data: any) => {
    console.log('[handleSave] Starting save process...')
    console.log('[handleSave] Received data:', data)
    
    try {
      setSaving(true)
      
      // Validaciones básicas
      if (!data.title || data.title.trim() === '') {
        alert('El título es requerido')
        setSaving(false)
        return
      }

      if (!data.content || data.content.trim() === '') {
        alert('El contenido es requerido')
        setSaving(false)
        return
      }

      // Generar slug automáticamente desde el título
      const slug = data.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      const articleData = {
        title: data.title.trim(),
        slug: slug,
        content: data.content.trim(),
        excerpt: data.excerpt?.trim() || null,
        category: data.category || 'NOTICIAS',
        tags: data.tags && data.tags.length > 0 ? data.tags : null,
        is_published: data.isPublished || false,
        published_at: data.isPublished ? new Date().toISOString() : null,
        featured_image_url: data.featured_image_url || null,
        read_time: Math.ceil(data.content.trim().split(' ').length / 200),
        author_name: 'Redacción Matices', // Por ahora fijo
        is_premium: false,
        is_featured: false,
      }

      console.log('[handleSave] Article data prepared:', articleData)
      console.log('[handleSave] Calling adminService.createArticle...')

      const result = await adminService.createArticle(articleData)
      
      console.log('[handleSave] Article created successfully:', result)

      alert("Artículo guardado exitosamente!")
      router.push("/admin/articulos")
    } catch (err: any) {
      console.error('[handleSave] Error creating article:', err)
      console.error('[handleSave] Error details:', JSON.stringify(err, null, 2))
      const errorMessage = err?.message || err?.code || 'Error al guardar el artículo'
      alert(`Error: ${errorMessage}`)
      setSaving(false)
    }
  }

  const handleCancel = () => {
    router.push("/admin/articulos")
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Crear nuevo artículo</h1>
        <p className="text-muted-foreground mt-1">Escribe y publica un nuevo artículo para la revista</p>
      </div>

      {saving && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-[#005B82]" />
            <p className="text-gray-600">Guardando artículo...</p>
          </div>
        </div>
      )}

      <ArticleEditor onSave={handleSave} onCancel={handleCancel} />
    </div>
  )
}
