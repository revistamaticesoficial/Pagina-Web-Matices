"use client"

import { useState } from "react"
import type { Comercio } from "@/data/mock-data"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card"
import { Edit, Trash2, Search, Phone, Mail, Globe } from "lucide-react"

interface ComerciosGridProps {
  comercios: Comercio[]
  onEdit: (comercio: Comercio) => void
  onDelete: (id: string) => void
}

export function ComerciosGrid({ comercios, onEdit, onDelete }: ComerciosGridProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredComercios = comercios.filter(
    (comercio) =>
      comercio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comercio.category?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredComercios.map((comercio) => (
          <Card key={comercio.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <img
                  src={comercio.banners_url?.[0] || "/placeholder.svg?height=200&width=400"}
                  alt={comercio.name}
                  className="h-full w-full object-cover"
                />
                <Badge variant={comercio.isActive ? "default" : "secondary"} className="absolute right-2 top-2">
                  {comercio.isActive ? "Activo" : "Inactivo"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="mb-3 flex items-start gap-3">
                <img
                  src={comercio.logo_url || "/placeholder.svg?height=60&width=60"}
                  alt={comercio.name}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{comercio.name}</h3>
                  {comercio.category && (
                    <Badge variant="outline" className="mt-1">
                      {comercio.category}
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {comercio.description || "Sin descripción"}
              </p>
              <div className="space-y-1 text-sm">
                {comercio.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    <span>{comercio.phone}</span>
                  </div>
                )}
                {comercio.contact_email && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{comercio.contact_email}</span>
                  </div>
                )}
                {comercio.web_url && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="h-3 w-3" />
                    <span className="truncate">{comercio.web_url}</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 border-t p-4">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={() => onEdit(comercio)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <Button variant="outline" size="sm" onClick={() => onDelete(comercio.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
