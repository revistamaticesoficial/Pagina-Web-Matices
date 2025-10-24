"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Plus, LayoutGrid, TableIcon } from "lucide-react"
import { mockComercios, type Comercio } from "@/data/mock-data"
import { ComerciosTable } from "@/components/admin/ComerciosTable"
import { ComerciosGrid } from "@/components/admin/ComerciosGrid"
import { ComercioModal } from "@/components/admin/ComercioModal"

export default function ComerciosPage() {
  const [comercios, setComercios] = useState<Comercio[]>(mockComercios)
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")
  const [selectedComercio, setSelectedComercio] = useState<Comercio | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEdit = (comercio: Comercio) => {
    setSelectedComercio(comercio)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este comercio?")) {
      setComercios(comercios.filter((c) => c.id !== id))
    }
  }

  const handleSave = (comercioData: Partial<Comercio>) => {
    if (selectedComercio) {
      // Edit existing
      setComercios(comercios.map((c) => (c.id === selectedComercio.id ? { ...c, ...comercioData } : c)))
    } else {
      // Create new
      const newComercio: Comercio = {
        id: String(Date.now()),
        created_at: new Date().toISOString(),
        owner_id: null,
        social_media: {},
        tags: null,
        logo_url: null,
        banners_url: null,
        schedules: null,
        ...comercioData,
      } as Comercio
      setComercios([...comercios, newComercio])
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

        {viewMode === "table" ? (
          <ComerciosTable comercios={comercios} onEdit={handleEdit} onDelete={handleDelete} />
        ) : (
          <ComerciosGrid comercios={comercios} onEdit={handleEdit} onDelete={handleDelete} />
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
