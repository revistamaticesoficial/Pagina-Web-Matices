"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Plus, LayoutGrid, TableIcon } from "lucide-react"
import { adminService, type AdminComercio } from "@/lib/admin-service"
import { ComerciosTable } from "@/components/admin/ComerciosTable"
import { ComerciosGrid } from "@/components/admin/ComerciosGrid"
import { ComercioModal } from "@/components/admin/ComercioModal"

export default function ComerciosPage() {
  const [comercios, setComercios] = useState<AdminComercio[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")
  const [selectedComercio, setSelectedComercio] = useState<AdminComercio | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    loadComercios()
  }, [])

  const loadComercios = async () => {
    try {
      setLoading(true)
      const data = await adminService.getComercios()
      setComercios(data)
    } catch (error) {
      console.error('Error loading comercios:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (comercio: AdminComercio) => {
    setSelectedComercio(comercio)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este comercio?")) {
      try {
        await adminService.deleteComercio(id)
        setComercios(comercios.filter((c) => c.id !== id))
      } catch (error) {
        console.error('Error deleting comercio:', error)
        alert('Error al eliminar el comercio')
      }
    }
  }

  const handleSave = async (comercioData: Partial<AdminComercio>) => {
    try {
      if (selectedComercio) {
        // Edit existing
        const updated = await adminService.updateComercio(selectedComercio.id, comercioData)
        setComercios(comercios.map((c) => (c.id === selectedComercio.id ? updated : c)))
      } else {
        // Create new
        const newComercio = await adminService.createComercio(comercioData)
        setComercios([newComercio, ...comercios])
      }
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error saving comercio:', error)
      alert('Error al guardar el comercio')
    }
  }

  const handleAddNew = () => {
    setSelectedComercio(null)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Clientes</h1>
            <p className="text-muted-foreground mt-1">Gestiona los comercios asociados a la revista</p>
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
              Agregar Cliente
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-500">Cargando comercios...</div>
          </div>
        ) : (
          <>
            {viewMode === "table" ? (
              <ComerciosTable comercios={comercios} onEdit={handleEdit} onDelete={handleDelete} />
            ) : (
              <ComerciosGrid comercios={comercios} onEdit={handleEdit} onDelete={handleDelete} />
            )}
          </>
        )}

        <ComercioModal
          comercio={selectedComercio}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      </div>
    </>
  )
}
