"use client"

import { useState } from "react"
import type { AdminAnnouncements } from "@/lib/admin-service"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/Badge"
import { Edit, Trash2, Search, ImageIcon } from "lucide-react"
import Image from "next/image"

interface AnnouncementsTableProps {
  announcements: AdminAnnouncements[]
  onEdit: (announcement: AdminAnnouncements) => void
  onDelete: (id: string) => void
}

export function AnnouncementsTable({ announcements, onEdit, onDelete }: AnnouncementsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAnnouncements = announcements.filter((announcement) =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar anuncios..."
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
              <TableHead>Imagen</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>URL</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAnnouncements.map((announcement) => (
              <TableRow key={announcement.id}>
                <TableCell>
                  <div className="relative h-16 w-24 overflow-hidden rounded border">
                    {announcement.image_url ? (
                      <Image
                        src={announcement.image_url}
                        alt={announcement.alt_text || announcement.title}
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
                <TableCell className="font-medium">{announcement.title}</TableCell>
                <TableCell>
                  <Badge variant={announcement.is_active ? "default" : "secondary"}>
                    {announcement.is_active ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                  {announcement.click_url || "-"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(announcement)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(announcement.id)}>
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

