"use client"

import { useState } from "react"
import type { Benefit } from "@/data/mock-data"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card"
import { Edit, Trash2, Search, Calendar, Ticket } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface BenefitsGridProps {
  benefits: Benefit[]
  onEdit: (benefit: Benefit) => void
  onDelete: (id: string) => void
}

export function BenefitsGrid({ benefits, onEdit, onDelete }: BenefitsGridProps) {
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBenefits.map((benefit) => {
          const progress = (benefit.quantity_redeemed / benefit.quantity) * 100

          return (
            <Card key={benefit.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-40 w-full">
                  <img
                    src={benefit.banner_url || "/placeholder.svg?height=160&width=400&query=benefit"}
                    alt={benefit.title}
                    className="h-full w-full object-cover"
                  />
                  <Badge variant={benefit.isActive ? "default" : "secondary"} className="absolute right-2 top-2">
                    {benefit.isActive ? "Activo" : "Inactivo"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <Badge variant="outline">{getBenefitTypeLabel(benefit.type)}</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {benefit.description || "Sin descripción"}
                </p>
                {benefit.code && (
                  <div className="mb-3 flex items-center gap-2">
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                    <code className="rounded bg-muted px-2 py-1 text-sm font-mono">{benefit.code}</code>
                  </div>
                )}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Canjeados</span>
                    <span className="font-medium">
                      {benefit.quantity_redeemed} / {benefit.quantity}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Hasta {benefit.valid_to ? new Date(benefit.valid_to).toLocaleDateString() : "∞"}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 border-t p-4">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={() => onEdit(benefit)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDelete(benefit.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
