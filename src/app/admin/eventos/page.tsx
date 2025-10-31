"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Plus, LayoutGrid, TableIcon } from "lucide-react"
import { adminService, type AdminEvent } from "@/lib/admin-service"
import { EventsTable } from "@/components/admin/EventsTable"
import { EventsGrid } from "@/components/admin/EventsGrid"
import { EventModal } from "@/components/admin/EventModal"

export default function EventosPage() {
  const [events, setEvents] = useState<AdminEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")
  const [selectedEvent, setSelectedEvent] = useState<AdminEvent | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      setLoading(true)
      const data = await adminService.getEvents()
      setEvents(data)
    } catch (error) {
      console.error('Error loading events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (event: AdminEvent) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este evento?")) {
      try {
        await adminService.deleteEvent(id)
        setEvents(events.filter((e) => e.id !== id))
      } catch (error) {
        console.error('Error deleting event:', error)
        alert('Error al eliminar el evento')
      }
    }
  }

  const handleSave = async (eventData: Partial<AdminEvent>) => {
    try {
      if (selectedEvent) {
        const updated = await adminService.updateEvent(selectedEvent.id, eventData)
        setEvents(events.map((e) => (e.id === selectedEvent.id ? updated : e)))
      } else {
        const newEvent = await adminService.createEvent(eventData)
        setEvents([newEvent, ...events])
      }
      setIsModalOpen(false)
      setSelectedEvent(null)
      // Recargar eventos para asegurar que todo está sincronizado
      await loadEvents()
    } catch (error) {
      console.error('Error saving event:', error)
      const errorMessage = error instanceof Error ? error.message : 'Error al guardar el evento'
      alert(errorMessage)
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

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-500">Cargando eventos...</div>
          </div>
        ) : (
          <>
            {viewMode === "table" ? (
              <EventsTable events={events} onEdit={handleEdit} onDelete={handleDelete} />
            ) : (
              <EventsGrid events={events} onEdit={handleEdit} onDelete={handleDelete} />
            )}
          </>
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
