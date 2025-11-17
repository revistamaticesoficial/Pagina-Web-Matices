"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArticleEditor } from "@/components/admin/ArticleEditor"
import { adminService, type AdminArticle } from "@/lib/admin-service"
import { Loader2 } from "lucide-react"

export default function EditarArticuloPage() {
  const router = useRouter()
  const params = useParams()
  const articleId = params.id as string
  const [article, setArticle] = useState<AdminArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadArticle()
  }, [articleId])

  const loadArticle = async () => {
    try {
      setLoading(true)
      const data = await adminService.getArticleById(articleId)
      if (!data) {
        setError('Artículo no encontrado')
      } else {
        setArticle(data)
      }
    } catch (err) {
      console.error('Error loading article:', err)
      setError('Error al cargar el artículo')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: any) => {
    try {
      // Validaciones básicas
      if (!data.title || data.title.trim() === '') {
        alert('El título es requerido')
        return
      }

      if (!data.content || data.content.trim() === '') {
        alert('El contenido es requerido')
        return
      }

      // Generar slug automáticamente si no existe
      const slug = data.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      const updateData = {
        title: data.title.trim(),
        slug: slug,
        content: data.content.trim(),
        excerpt: data.excerpt?.trim() || null,
        category: data.category || 'NOTICIAS',
        tags: data.tags && data.tags.length > 0 ? data.tags : null,
        is_published: data.isPublished || false,
        published_at: data.isPublished && !article?.is_published ? new Date().toISOString() : article?.published_at,
        featured_image_url: data.featured_image_url || null,
        read_time: Math.ceil(data.content.trim().split(' ').length / 200),
        author: data.author?.trim() || null,
      }

      console.log('Updating article with data:', updateData)

      await adminService.updateArticle(articleId, updateData)

      alert("Artículo actualizado exitosamente!")
      router.push("/admin/articulos")
    } catch (err: any) {
      console.error('Error updating article:', err)
      const errorMessage = err?.message || 'Error al actualizar el artículo'
      alert(`Error: ${errorMessage}`)
    }
  }

  const handleCancel = () => {
    router.push("/admin/articulos")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-[#005B82]" />
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error || 'Artículo no encontrado'}</p>
          <button
            onClick={() => router.push('/admin/articulos')}
            className="px-4 py-2 bg-[#005B82] text-white rounded-lg hover:bg-[#003C56]"
          >
            Volver a artículos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Editar artículo</h1>
        <p className="text-muted-foreground mt-1">Modifica el contenido de tu artículo</p>
      </div>

      <ArticleEditor
        initialData={{
          title: article.title,
          excerpt: article.excerpt || '',
          content: article.content,
          category: article.category,
          tags: article.tags || [],
          isPublished: article.is_published,
          featuredImage: article.featured_image_url || '',
          author: (article as any).author || '',
        }}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  )
}
