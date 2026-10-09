"use client"

import { useState } from "react"
import type { AdminEdition } from "@/lib/admin-service"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2, Search, ImageIcon, FileText, ArrowUp, ArrowDown } from "lucide-react"
import Image from "next/image"

interface EditionsTableProps {
  editions: AdminEdition[]
  onEdit: (edition: AdminEdition) => void
  onDelete: (id: string) => void
  onMove: (id: string, direction: "up" | "down") => void
}

export function EditionsTable({ editions, onEdit, onDelete, onMove }: EditionsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEditions = editions.filter((edition) =>
    edition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    edition.month.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar ediciones..."
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
              <TableHead className="w-32">Orden</TableHead>
              <TableHead>Portada</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Período</TableHead>
              <TableHead>PDF</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEditions.map((edition) => (
              <TableRow key={edition.id}>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className="w-6 text-center font-semibold">{edition.position}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={editions[0]?.id === edition.id}
                      onClick={() => onMove(edition.id, "up")}
                      title="Subir"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={editions[editions.length - 1]?.id === edition.id}
                      onClick={() => onMove(edition.id, "down")}
                      title="Bajar"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="relative h-16 w-12 overflow-hidden rounded border">
                    {edition.image ? (
                      <Image
                        src={edition.image}
                        alt={edition.title}
                        className="h-full w-full object-cover"
                        fill
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-100">
                        <ImageIcon className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{edition.title}</TableCell>
                <TableCell>
                  {edition.month} {edition.year}
                </TableCell>
                <TableCell>
                  {edition.pdf_url ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <FileText className="h-4 w-4" />
                      <span className="text-xs">{edition.filename || "PDF disponible"}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">Sin PDF</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(edition)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(edition.id)}>
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

