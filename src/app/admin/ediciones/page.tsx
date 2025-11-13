"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Plus, LayoutGrid, TableIcon } from "lucide-react"
import { adminService, type AdminEdition } from "@/lib/admin-service"
import { EditionsTable } from "@/components/admin/EditionsTable"
import { EditionsGrid } from "@/components/admin/EditionsGrid"
import { EditionModal } from "@/components/admin/EditionModal"

export default function EdicionesPage() {
  const [editions, setEditions] = useState<AdminEdition[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid")
  const [selectedEdition, setSelectedEdition] = useState<AdminEdition | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    loadEditions()
  }, [])

  const loadEditions = async () => {
    try {
      setLoading(true)
      const data = await adminService.getEditions()
      setEditions(data)
    } catch (error) {
      console.error('Error loading editions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (edition: AdminEdition) => {
    setSelectedEdition(edition)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta edición?")) {
      try {
        await adminService.deleteEdition(id)
        setEditions(editions.filter((e) => e.id !== id))
      } catch (error) {
        console.error('Error deleting edition:', error)
        alert('Error al eliminar la edición')
      }
    }
  }

  const handleSave = async (editionData: Partial<AdminEdition>) => {
    try {
      if (selectedEdition) {
        const updated = await adminService.updateEdition(selectedEdition.id, editionData)
        setEditions(editions.map((e) => (e.id === selectedEdition.id ? updated : e)))
      } else {
        const newEdition = await adminService.createEdition(editionData)
        setEditions([newEdition, ...editions])
      }
      setIsModalOpen(false)
      setSelectedEdition(null)
      // Recargar ediciones para asegurar que todo está sincronizado
      await loadEditions()
    } catch (error) {
      console.error('Error saving edition:', error)
      const errorMessage = error instanceof Error ? error.message : 'Error al guardar la edición'
      alert(errorMessage)
    }
  }

  const handleAddNew = () => {
    setSelectedEdition(null)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Ediciones</h1>
            <p className="text-muted-foreground mt-1">Gestiona las ediciones de la revista</p>
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
            <Button className="gap-2" onClick={handleAddNew}>
              <Plus className="h-4 w-4" />
              Nueva Edición
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005B82] mb-4"></div>
            <div className="text-gray-500">Cargando ediciones...</div>
          </div>
        ) : (
          <>
            {viewMode === "table" ? (
              <EditionsTable
                editions={editions}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ) : (
              <EditionsGrid
                editions={editions}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </>
        )}

        <EditionModal
          edition={selectedEdition}
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedEdition(null)
          }}
          onSave={handleSave}
        />
      </div>
    </>
  )
}
