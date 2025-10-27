"use client"

import { useState } from "react"
import type { AdminBenefit } from "@/lib/admin-service"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/Badge"
import { Edit, Trash2, Search } from "lucide-react"

interface BenefitsTableProps {
  benefits: AdminBenefit[]
  onEdit: (benefit: AdminBenefit) => void
  onDelete: (id: string) => void
}

export function BenefitsTable({ benefits, onEdit, onDelete }: BenefitsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBenefits = benefits.filter((benefit) => benefit.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const getBenefitTypeLabel = (type: string | null) => {
    const types: Record<string, string> = {
      discount: "Descuento",
      promotion: "Promoción",
      gift: "Regalo",
    }
    return type ? types[type] || type : "-"
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar beneficios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Canjeados</TableHead>
              <TableHead>Vigencia</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBenefits.map((benefit) => (
              <TableRow key={benefit.id}>
                <TableCell className="font-medium">{benefit.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{getBenefitTypeLabel(benefit.type)}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-muted-foreground">-</span>
                </TableCell>
                <TableCell>
                  {(benefit.redemptions_count || 0)} / {benefit.quantity}
                </TableCell>
                <TableCell className="text-sm">
                  {benefit.valid_from ? new Date(benefit.valid_from).toLocaleDateString() : "Sin fecha"} -{" "}
                  {benefit.valid_to ? new Date(benefit.valid_to).toLocaleDateString() : "∞"}
                </TableCell>
                <TableCell>
                  <Badge variant="default">
                    Activo
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(benefit)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(benefit.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
