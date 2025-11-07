"use client"

import { useState } from "react"
import Image from "next/image"
import type { AdminComercio } from "@/lib/admin-service"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/Badge"
import { Edit, Trash2, Search, User, Mail, Calendar, CheckCircle, XCircle } from "lucide-react"

interface ComerciosTableProps {
  comercios: AdminComercio[]
  onEdit: (comercio: AdminComercio) => void
  onDelete: (id: string) => void
}

export function ComerciosTable({ comercios, onEdit, onDelete }: ComerciosTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredComercios = comercios.filter(
    (comercio) =>
      comercio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comercio.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comercio.owner?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comercio.owner?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, categoría, email o propietario..."
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
              <TableHead>Comercio</TableHead>
              <TableHead>Propietario</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Registro</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComercios.map((comercio) => (
              <TableRow key={comercio.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="relative h-10 w-10 flex-shrink-0">
                      <Image
                        src={comercio.logo_url || "/placeholder.svg?height=40&width=40"}
                        alt={comercio.name}
                        fill
                        className="rounded-full object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{comercio.name}</div>
                      <div className="text-sm text-slate-500 truncate max-w-[200px]">
                        {comercio.direction || "Sin dirección"}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {comercio.owner ? (
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-slate-400" />
                        <span className="font-medium">{comercio.owner.full_name || "Sin nombre"}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-slate-500">
                        <Mail className="h-3 w-3" />
                        <span>{comercio.owner.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {comercio.owner.is_onboarding_complete ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : (
                          <XCircle className="h-3 w-3 text-orange-500" />
                        )}
                        <span className="text-xs text-slate-500">
                          {comercio.owner.is_onboarding_complete ? "Completado" : "Pendiente"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-400 text-sm">Sin cuenta asociada</div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{comercio.category || "Sin categoría"}</Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {comercio.phone && (
                      <div className="text-sm">{comercio.phone}</div>
                    )}
                    {comercio.contact_email && (
                      <div className="text-sm text-slate-500">{comercio.contact_email}</div>
                    )}
                    {!comercio.phone && !comercio.contact_email && (
                      <div className="text-slate-400 text-sm">Sin contacto</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={comercio.isActive ? "default" : "secondary"}>
                    {comercio.isActive ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2 text-sm text-slate-500">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(comercio.created_at)}</span>
                  </div>
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
