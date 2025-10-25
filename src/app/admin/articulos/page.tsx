"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Plus, LayoutGrid, TableIcon } from "lucide-react"
import { adminService, type AdminArticle } from "@/lib/admin-service"
import { ArticlesTable } from "@/components/admin/ArticlesTable"
import { ArticlesGrid } from "@/components/admin/ArticlesGrid"

export default function ArticulosAdminPage() {
  const router = useRouter()
  const [articles, setArticles] = useState<AdminArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")

  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = async () => {
    try {
      setLoading(true)
      const data = await adminService.getArticles()
      setArticles(data)
    } catch (error) {
      console.error('Error loading articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (id: string) => {
    router.push(`/admin/articulos/editar/${id}`)
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este artículo?")) {
      try {
        await adminService.deleteArticle(id)
        setArticles(articles.filter((a) => a.id !== id))
      } catch (error) {
        console.error('Error deleting article:', error)
        alert('Error al eliminar el artículo')
      }
    }
  }

  const handleCreate = () => {
    router.push("/admin/articulos/crear")
  }

  return (
    <>
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Articulos</h1>
            <p className="text-muted-foreground mt-1">Gestiona los artículos de la revista</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("table")}
            >
              <TableIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button className="gap-2" onClick={handleCreate}>
              <Plus className="h-4 w-4" />
              Crear Articulo
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-500">Cargando artículos...</div>
          </div>
        ) : (
          <>
            {viewMode === "table" ? (
              <ArticlesTable articles={articles} onEdit={handleEdit} onDelete={handleDelete} />
            ) : (
              <ArticlesGrid articles={articles} onEdit={handleEdit} onDelete={handleDelete} />
            )}
          </>
        )}
      </div>
    </>
  )
}
