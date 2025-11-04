"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Plus, LayoutGrid, TableIcon } from "lucide-react"
import { adminService, type AdminBenefit } from "@/lib/admin-service"
import { BenefitsTable } from "@/components/admin/BenefitsTable"
import { BenefitsGrid } from "@/components/admin/BenefitsGrid"
import { BenefitModal } from "@/components/admin/BenefitModal"

export default function BeneficiosPage() {
  const [benefits, setBenefits] = useState<AdminBenefit[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")
  const [selectedBenefit, setSelectedBenefit] = useState<AdminBenefit | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    loadBenefits()
  }, [])

  const loadBenefits = async () => {
    try {
      setLoading(true)
      const data = await adminService.getBenefits()
      setBenefits(data)
    } catch (error) {
      console.error('Error loading benefits:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (benefit: AdminBenefit) => {
    setSelectedBenefit(benefit)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este beneficio?")) {
      try {
        await adminService.deleteBenefit(id)
        setBenefits(benefits.filter((b) => b.id !== id))
      } catch (error) {
        console.error('Error deleting benefit:', error)
        alert('Error al eliminar el beneficio')
      }
    }
  }

  const handleSave = async (benefitData: Partial<AdminBenefit>) => {
    try {
      if (selectedBenefit) {
        const updated = await adminService.updateBenefit(selectedBenefit.id, benefitData)
        setBenefits(benefits.map((b) => (b.id === selectedBenefit.id ? updated : b)))
      } else {
        const newBenefit = await adminService.createBenefit(benefitData)
        setBenefits([newBenefit, ...benefits])
      }
      setIsModalOpen(false)
      setSelectedBenefit(null)
      // Recargar beneficios para asegurar que todo está sincronizado
      await loadBenefits()
    } catch (error) {
      console.error('Error saving benefit:', error)
      const errorMessage = error instanceof Error ? error.message : 'Error al guardar el beneficio'
      alert(errorMessage)
    }
  }

  const handleAddNew = () => {
    setSelectedBenefit(null)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Beneficios</h1>
            <p className="text-muted-foreground mt-1">Gestiona los beneficios y promociones para los lectores</p>
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
              Agregar Beneficio
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005B82] mb-4"></div>
            <div className="text-gray-500">Cargando beneficios...</div>
          </div>
        ) : (
          <>
            {viewMode === "table" ? (
              <BenefitsTable benefits={benefits} onEdit={handleEdit} onDelete={handleDelete} />
            ) : (
              <BenefitsGrid benefits={benefits} onEdit={handleEdit} onDelete={handleDelete} />
            )}
          </>
        )}

        <BenefitModal
          benefit={selectedBenefit}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      </div>
    </>
  )
}
