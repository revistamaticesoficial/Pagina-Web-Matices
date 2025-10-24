"use client"

import { useRouter, useParams } from "next/navigation"
import { ArticleEditor } from "@/components/admin/ArticleEditor"
import { mockArticles } from "@/data/mock-data"

export default function EditarArticuloPage() {
  const router = useRouter()
  const params = useParams()
  const articleId = params.id as string

  const article = mockArticles.find((a) => a.id === articleId)

  if (!article) {
    return (
      <>
        <div className="p-8">
          <p>Artículo no encontrado</p>
        </div>
      </>
    )
  }

  const handleSave = (data: any) => {
    console.log("[v0] Updating article:", articleId, data)
    // Here you would update in your database
    alert("Artículo actualizado exitosamente!")
    router.push("/admin/articulos")
  }

  const handleCancel = () => {
    router.push("/admin/articulos")
  }

  return (
    <>
      <div className="p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Editar articulo</h1>
          <p className="text-muted-foreground mt-1">Modifica el contenido de tu artículo</p>
        </div>

        <ArticleEditor
          initialData={{
            title: article.title,
            excerpt: article.excerpt,
            content: article.content,
            category: article.category,
            tags: article.tags,
            isPublished: article.isPublished,
          }}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </>
  )
}
