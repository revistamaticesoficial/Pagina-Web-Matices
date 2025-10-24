"use client"

import { useRouter } from "next/navigation"
import { ArticleEditor } from "@/components/admin/ArticleEditor"

export default function CrearArticuloPage() {
  const router = useRouter()

  const handleSave = (data: any) => {
    console.log("[v0] Saving new article:", data)
    // Here you would save to your database
    alert("Artículo guardado exitosamente!")
    router.push("/admin/articulos")
  }

  const handleCancel = () => {
    router.push("/admin/articulos")
  }

  return (
    <>
      <div className="p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Crear nuevo articulo</h1>
          <p className="text-muted-foreground mt-1">Escribe y publica un nuevo artículo para la revista</p>
        </div>

        <ArticleEditor onSave={handleSave} onCancel={handleCancel} />
      </div>
    </>
  )
}
