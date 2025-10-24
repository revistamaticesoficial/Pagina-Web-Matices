"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Plus, LayoutGrid, TableIcon } from "lucide-react"
import { mockBenefits, type Benefit } from "@/data/mock-data"
import { BenefitsTable } from "@/components/admin/BenefitsTable"
import { BenefitsGrid } from "@/components/admin/BenefitsGrid"
import { BenefitModal } from "@/components/admin/BenefitModal"

export default function BeneficiosPage() {
  const [benefits, setBenefits] = useState<Benefit[]>(mockBenefits)
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEdit = (benefit: Benefit) => {
    setSelectedBenefit(benefit)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este beneficio?")) {
      setBenefits(benefits.filter((b) => b.id !== id))
    }
  }

  const handleSave = (benefitData: Partial<Benefit>) => {
    if (selectedBenefit) {
      setBenefits(benefits.map((b) => (b.id === selectedBenefit.id ? { ...b, ...benefitData } : b)))
    } else {
      const newBenefit: Benefit = {
        id: String(Date.now()),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        comercio_id: null,
        quantity_redeemed: 0,
        banner_url: null,
        ...benefitData,
      } as Benefit
      setBenefits([...benefits, newBenefit])
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

        {viewMode === "table" ? (
          <BenefitsTable benefits={benefits} onEdit={handleEdit} onDelete={handleDelete} />
        ) : (
          <BenefitsGrid benefits={benefits} onEdit={handleEdit} onDelete={handleDelete} />
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
