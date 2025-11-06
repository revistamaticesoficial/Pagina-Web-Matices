"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Plus, LayoutGrid, TableIcon } from "lucide-react"
import { adminService, type AdminAnnouncement } from "@/lib/admin-service"
import { AnnouncementsTable } from "@/components/admin/AnnouncementsTable"
import { AnnouncementsGrid } from "@/components/admin/AnnouncementsGrid"
import { AnnouncementModal } from "@/components/admin/AnnouncementModal"

export default function AnunciosPage() {
  const [announcements, setAnnouncements] = useState<AdminAnnouncement[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AdminAnnouncement | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    loadAnnouncements()
  }, [])

  const loadAnnouncements = async () => {
    try {
      setLoading(true)
      const data = await adminService.getAnnouncements()
      setAnnouncements(data)
    } catch (error) {
      console.error('Error loading announcements:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (announcement: AdminAnnouncement) => {
    setSelectedAnnouncement(announcement)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este anuncio?")) {
      try {
        await adminService.deleteAnnouncement(id)
        setAnnouncements(announcements.filter((a) => a.id !== id))
      } catch (error) {
        console.error('Error deleting announcement:', error)
        alert('Error al eliminar el anuncio')
      }
    }
  }

  const handleSave = async (announcementData: Partial<AdminAnnouncement>) => {
    try {
      if (selectedAnnouncement) {
        const updated = await adminService.updateAnnouncement(selectedAnnouncement.id, announcementData)
        setAnnouncements(announcements.map((a) => (a.id === selectedAnnouncement.id ? updated : a)))
      } else {
        const newAnnouncement = await adminService.createAnnouncement(announcementData)
        setAnnouncements([newAnnouncement, ...announcements])
      }
      setIsModalOpen(false)
      setSelectedAnnouncement(null)
      // Recargar anuncios para asegurar que todo está sincronizado
      await loadAnnouncements()
    } catch (error) {
      console.error('Error saving announcement:', error)
      const errorMessage = error instanceof Error ? error.message : 'Error al guardar el anuncio'
      alert(errorMessage)
    }
  }

  const handleAddNew = () => {
    setSelectedAnnouncement(null)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Anuncios</h1>
            <p className="text-muted-foreground mt-1">Gestiona los anuncios del popup en la landing</p>
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
              Agregar Anuncio
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005B82] mb-4"></div>
            <div className="text-gray-500">Cargando anuncios...</div>
          </div>
        ) : (
          <>
            {viewMode === "table" ? (
              <AnnouncementsTable
                announcements={announcements}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ) : (
              <AnnouncementsGrid
                announcements={announcements}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </>
        )}

        <AnnouncementModal
          announcement={selectedAnnouncement}
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedAnnouncement(null)
          }}
          onSave={handleSave}
        />
      </div>
    </>
  )
}

