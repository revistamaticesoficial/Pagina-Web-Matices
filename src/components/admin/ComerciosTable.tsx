"use client"

import { useState } from "react"
import type { Comercio } from "@/data/mock-data"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/Badge"
import { Edit, Trash2, Search } from "lucide-react"

interface ComerciosTableProps {
  comercios: Comercio[]
  onEdit: (comercio: Comercio) => void
  onDelete: (id: string) => void
}

export function ComerciosTable({ comercios, onEdit, onDelete }: ComerciosTableProps) {
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

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Dirección</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComercios.map((comercio) => (
              <TableRow key={comercio.id}>
                <TableCell>
                  <img
                    src={comercio.logo_url || "/placeholder.svg?height=40&width=40"}
                    alt={comercio.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{comercio.name}</TableCell>
                <TableCell>{comercio.category || "-"}</TableCell>
                <TableCell className="max-w-[200px] truncate">{comercio.direction || "-"}</TableCell>
                <TableCell>{comercio.phone || "-"}</TableCell>
                <TableCell>
                  <Badge variant={comercio.isActive ? "default" : "secondary"}>
                    {comercio.isActive ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(comercio)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(comercio.id)}>
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
