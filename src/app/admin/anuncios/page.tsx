"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { adminService } from "@/lib/admin-service"
import { Plus, LayoutGrid, TableIcon, ImageIcon, Trash2, Edit, Eye, EyeOff } from "lucide-react"
import { Badge } from "@/components/ui/Badge"

type Announcement = {
  id: string
  title: string
  image_url: string
  alt_text: string | null
  click_url: string | null
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export default function AnunciosPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid")

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

  const handleToggleActive = async (id: string, currentState: boolean) => {
    try {
      await adminService.updateAnnouncement(id, { is_active: !currentState })
      setAnnouncements(announcements.map(a => 
        a.id === id ? { ...a, is_active: !currentState } : a
      ))
    } catch (error) {
      console.error('Error updating announcement:', error)
      alert('Error al actualizar el anuncio')
    }
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
            <Button className="gap-2" onClick={() => alert('Función de crear próximamente')}>
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
        ) : announcements.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg mb-4">No hay anuncios disponibles</p>
            <Button onClick={() => alert('Función de crear próximamente')}>
              <Plus className="h-4 w-4 mr-2" />
              Crear primer anuncio
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {viewMode === "table" ? (
              <div className="bg-white rounded-lg border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orden</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {announcements.map((announcement) => (
                      <tr key={announcement.id}>
                        <td className="px-6 py-4">
                          <img
                            src={announcement.image_url}
                            alt={announcement.alt_text || announcement.title}
                            className="h-16 w-24 object-cover rounded"
                          />
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{announcement.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{announcement.display_order}</td>
                        <td className="px-6 py-4">
                          <Badge variant={announcement.is_active ? "default" : "secondary"}>
                            {announcement.is_active ? "Activo" : "Inactivo"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right text-sm space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleActive(announcement.id, announcement.is_active)}
                          >
                            {announcement.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => alert('Editar próximamente')}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(announcement.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="bg-white rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative aspect-video">
                      <img
                        src={announcement.image_url}
                        alt={announcement.alt_text || announcement.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant={announcement.is_active ? "default" : "secondary"}>
                          {announcement.is_active ? "Activo" : "Inactivo"}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{announcement.title}</h3>
                      <p className="text-sm text-gray-500 mb-4">Orden: {announcement.display_order}</p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleToggleActive(announcement.id, announcement.is_active)}
                        >
                          {announcement.is_active ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                          {announcement.is_active ? 'Desactivar' : 'Activar'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(announcement.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

