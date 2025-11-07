"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { AdminAnnouncements } from "@/lib/admin-service"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Switch } from "@/components/ui/switch"
import { ImageIcon, Link, Hash } from "lucide-react"
import { ImageUpload } from "./ImageUpload"

interface AnnouncementModalProps {
  announcement: AdminAnnouncements | null
  open: boolean
  onClose: () => void
  onSave: (announcement: Partial<AdminAnnouncements>) => void
}

export function AnnouncementModal({ announcement, open, onClose, onSave }: AnnouncementModalProps) {
  const [formData, setFormData] = useState<Partial<AdminAnnouncements>>({
    title: "",
    image_url: "",
    alt_text: "",
    click_url: "",
    is_active: true,
  })

  useEffect(() => {
    if (announcement) {
      // Formatear fechas para el input type="date" (necesita formato YYYY-MM-DD)
      const formatDateForInput = (dateStr: string | null) => {
        if (!dateStr) return ""
        try {
          const date = new Date(dateStr)
          return date.toISOString().split('T')[0]
        } catch {
          return ""
        }
      }
      
      setFormData({
        title: announcement.title || "",
        image_url: announcement.image_url || "",
        alt_text: announcement.alt_text || "",
        click_url: announcement.click_url || "",
        is_active: announcement.is_active ?? true,
      })
    } else {
      setFormData({
        title: "",
        image_url: "",
        alt_text: "",
        click_url: "",
        is_active: true,
      })
    }
  }, [announcement, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar campos requeridos
    if (!formData.title || !formData.image_url) {
      alert('Por favor completa todos los campos requeridos (Título e Imagen)')
      return
    }
    
    // Preparar datos para enviar a Supabase
    const dataToSave: Partial<AdminAnnouncements> = {
      title: formData.title.trim(),
      image_url: formData.image_url, // URL de la imagen subida a Supabase Storage
      alt_text: formData.alt_text?.trim() || null,
      click_url: formData.click_url?.trim() || null,
      is_active: formData.is_active ?? true,
    }
    
    onSave(dataToSave)
    onClose()
  }

  const handleImageChange = (url: string | null) => {
    setFormData({ ...formData, image_url: url || "" })
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        <SheetHeader>
          <SheetTitle>
            {announcement ? "Editar Anuncio" : "Agregar Anuncio"}
          </SheetTitle>
          <SheetDescription>
            {announcement
              ? "Modifica la información del anuncio"
              : "Completa la información del nuevo anuncio"}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="grid flex-1 auto-rows-min gap-6 px-4">
          {/* Información Básica */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-900 flex items-center">
              <div className="p-2 bg-slate-100 rounded-lg mr-3">
                <ImageIcon className="h-4 w-4 text-slate-600" />
              </div>
              Información Básica
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-slate-700">
                  Título del Anuncio *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ej: Nueva Edición de Revista Matices"
                  className="rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url" className="text-sm font-medium text-slate-700">
                  Imagen del Anuncio *
                </Label>
                <ImageUpload
                  currentImage={formData.image_url}
                  onImageChange={handleImageChange}
                  bucket="announcements"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="alt_text" className="text-sm font-medium text-slate-700">
                  Texto Alternativo (Alt Text)
                </Label>
                <Input
                  id="alt_text"
                  value={formData.alt_text || ""}
                  onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                  placeholder="Descripción de la imagen para accesibilidad"
                  className="rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                />
              </div>
            </div>
          </div>

          {/* URL y Enlace */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-900 flex items-center">
              <div className="p-2 bg-slate-100 rounded-lg mr-3">
                <Link className="h-4 w-4 text-slate-600" />
              </div>
              Enlace
            </h3>

            <div className="space-y-2">
              <Label htmlFor="click_url" className="text-sm font-medium text-slate-700">
                URL de Redirección (opcional)
              </Label>
              <div className="relative">
                <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="click_url"
                  type="url"
                  value={formData.click_url || ""}
                  onChange={(e) => setFormData({ ...formData, click_url: e.target.value })}
                  placeholder="https://sugerencias"
                  className="pl-10 rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                />
              </div>
              <p className="text-xs text-slate-500">
                Si se proporciona, el anuncio redirigirá a esta URL al hacer clic
              </p>
            </div>
          </div>

          {/* Orden y Configuración */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-900 flex items-center">
              <div className="p-2 bg-slate-100 rounded-lg mr-3">
                <Hash className="h-4 w-4 text-slate-600" />
              </div>
              Configuración
            </h3>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="display_order" className="text-sm font-medium text-slate-700">
                  Orden de Visualización
                </Label>
                <Input
                  id="display_order"
                  type="number"
                  min="1"
                  value={formData.display_order || 1}
                  onChange={(e) =>
                    setFormData({ ...formData, display_order: parseInt(e.target.value) || 1 })
                  }
                  className="rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                />
                <p className="text-xs text-slate-500">
                  Los anuncios se muestran según este orden (menor = primero)
                </p>
              </div>
            </div> */}
          </div>

          {/* Fechas */}
          {/* <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-900 flex items-center">
              <div className="p-2 bg-slate-100 rounded-lg mr-3">
                <Calendar className="h-4 w-4 text-slate-600" />
              </div>
              Período de Visualización
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="start_date" className="text-sm font-medium text-slate-700">
                  Fecha de Inicio (opcional)
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date ? String(formData.start_date) : ""}
                    onChange={(e) =>
                      setFormData({ ...formData, start_date: e.target.value || null })
                    }
                    className="pl-10 rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="end_date" className="text-sm font-medium text-slate-700">
                  Fecha de Fin (opcional)
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date ? String(formData.end_date) : ""}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value || null })}
                    className="pl-10 rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  />
                </div>
              </div>
            </div>
          </div> */}

          {/* Estado */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="is_active">Estado del Anuncio</Label>
              <p className="text-sm text-muted-foreground">
                {formData.is_active
                  ? "El anuncio será visible públicamente"
                  : "El anuncio estará oculto"}
              </p>
            </div>
            <Switch
              id="is_active"
              checked={formData.is_active ?? true}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
            />
          </div>

          <SheetFooter>
            <Button
              type="submit"
              className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white"
            >
              {announcement ? "Actualizar Anuncio" : "Crear Anuncio"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl border-slate-200 hover:bg-slate-50"
            >
              Cancelar
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

