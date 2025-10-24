"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Plus, LayoutGrid, TableIcon } from "lucide-react"
import { mockEvents, type Event } from "@/data/mock-data"
import { EventsTable } from "@/components/admin/EventsTable"
import { EventsGrid } from "@/components/admin/EventsGrid"
import { EventModal } from "@/components/admin/EventModal"

export default function EventosPage() {
  const [events, setEvents] = useState<Event[]>(mockEvents)
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEdit = (event: Event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este evento?")) {
      setEvents(events.filter((e) => e.id !== id))
    }
  }

  const handleSave = (eventData: Partial<Event>) => {
    if (selectedEvent) {
      setEvents(events.map((e) => (e.id === selectedEvent.id ? { ...e, ...eventData } : e)))
    } else {
      const newEvent: Event = {
        id: String(Date.now()),
        created_at: new Date().toISOString(),
        comercio_id: null,
        banner_url: null,
        ...eventData,
      } as Event
      setEvents([...events, newEvent])
    }
  }

  const handleAddNew = () => {
    setSelectedEvent(null)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Eventos</h1>
            <p className="text-muted-foreground mt-1">Gestiona los eventos del barrio</p>
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
              Agregar Evento
            </Button>
          </div>
        </div>

        {viewMode === "table" ? (
          <EventsTable events={events} onEdit={handleEdit} onDelete={handleDelete} />
        ) : (
          <EventsGrid events={events} onEdit={handleEdit} onDelete={handleDelete} />
        )}

        <EventModal
          event={selectedEvent}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      </div>
    </>
  )
}
