"use client"

import { useState } from "react"
import type { Event } from "@/data/mock-data"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card"
import { Edit, Trash2, Search, Calendar, Clock, MapPin, ExternalLink } from "lucide-react"

interface EventsGridProps {
  events: Event[]
  onEdit: (event: Event) => void
  onDelete: (id: string) => void
}

export function EventsGrid({ events, onEdit, onDelete }: EventsGridProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEvents = events.filter((event) => event.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar eventos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <img
                  src={event.banner_url || "/placeholder.svg?height=200&width=400&query=event"}
                  alt={event.title}
                  className="h-full w-full object-cover"
                />
                <Badge variant={event.isActive ? "default" : "secondary"} className="absolute right-2 top-2">
                  {event.isActive ? "Activo" : "Cancelado"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-3">{event.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {event.description || "Sin descripción"}
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                {event.place && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{event.place}</span>
                  </div>
                )}
                {event.inscription_link && (
                  <div className="flex items-center gap-2 text-primary">
                    <ExternalLink className="h-4 w-4" />
                    <a
                      href={event.inscription_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate hover:underline"
                    >
                      Link de inscripción
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 border-t p-4">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={() => onEdit(event)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <Button variant="outline" size="sm" onClick={() => onDelete(event.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
