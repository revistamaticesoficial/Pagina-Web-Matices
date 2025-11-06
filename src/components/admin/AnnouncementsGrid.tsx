"use client"

import { useState } from "react"
import type { AdminAnnouncement } from "@/lib/admin-service"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card"
import { Edit, Trash2, Search, ImageIcon, Eye, EyeOff } from "lucide-react"

interface AnnouncementsGridProps {
  announcements: AdminAnnouncement[]
  onEdit: (announcement: AdminAnnouncement) => void
  onDelete: (id: string) => void
}

export function AnnouncementsGrid({ announcements, onEdit, onDelete }: AnnouncementsGridProps) {
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAnnouncements.map((announcement) => (
          <Card key={announcement.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                {announcement.image_url ? (
                  <img
                    src={announcement.image_url}
                    alt={announcement.alt_text || announcement.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <Badge
                  variant={announcement.is_active ? "default" : "secondary"}
                  className="absolute right-2 top-2"
                >
                  {announcement.is_active ? "Activo" : "Inactivo"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{announcement.title}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Orden:</span>
                  <span className="font-medium">{announcement.display_order}</span>
                </div>
                {announcement.click_url && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">URL:</span>
                    <span className="truncate text-xs">{announcement.click_url}</span>
                  </div>
                )}
                {announcement.start_date && (
                  <div className="text-xs text-muted-foreground">
                    Desde: {new Date(announcement.start_date).toLocaleDateString()}
                  </div>
                )}
                {announcement.end_date && (
                  <div className="text-xs text-muted-foreground">
                    Hasta: {new Date(announcement.end_date).toLocaleDateString()}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 border-t p-4">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
                onClick={() => onEdit(announcement)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <Button variant="outline" size="sm" onClick={() => onDelete(announcement.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

