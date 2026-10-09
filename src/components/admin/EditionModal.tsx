"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { AdminEdition } from "@/lib/admin-service"
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
import { Calendar, ImageIcon, FileText } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { ImageUpload } from "@/components/admin/ImageUpload"
import { PDFUpload } from "@/components/admin/PDFUpload"

interface EditionModalProps {
  edition: AdminEdition | null
  open: boolean
  onClose: () => void
  onSave: (edition: Partial<AdminEdition>) => void
}

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
]

export function EditionModal({ edition, open, onClose, onSave }: EditionModalProps) {
  const [formData, setFormData] = useState<Partial<AdminEdition>>({
    title: "",
    month: "",
    year: new Date().getFullYear(),
    image: "",
    filename: "",
    pdf_url: "",
  })

  useEffect(() => {
    if (edition) {
      setFormData(edition)
    } else {
      setFormData({
        title: "",
        month: "",
        year: new Date().getFullYear(),
        image: "",
        filename: "",
        pdf_url: "",
      })
    }
  }, [edition, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar campos requeridos
    if (!formData.title || !formData.month || !formData.year) {
      alert('Por favor completa todos los campos requeridos (Título, Mes y Año)')
      return
    }
    
    onSave(formData)
    onClose()
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
        <SheetHeader>
          <SheetTitle>
            {edition ? "Editar Edición" : "Agregar Edición"}
          </SheetTitle>
          <SheetDescription>
            {edition ? "Modifica la información de la edición" : "Completa la información de la nueva edición"}
          </SheetDescription>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="grid flex-1 auto-rows-min gap-6 px-4">
          {/* Información Básica */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-900 flex items-center">
              <div className="p-2 bg-slate-100 rounded-lg mr-3">
                <Calendar className="h-4 w-4 text-slate-600" />
              </div>
              Información Básica
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-slate-700">Título de la Edición *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ej: Año 35 - Nro. 408"
                  className="rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="month" className="text-sm font-medium text-slate-700">Mes *</Label>
                  <Select
                    value={formData.month || ""}
                    onValueChange={(value) => setFormData({ ...formData, month: value })}
                  >
                    <SelectTrigger className="rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400">
                      <SelectValue placeholder="Selecciona el mes" />
                    </SelectTrigger>
                    <SelectContent>
                      {MONTHS.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year" className="text-sm font-medium text-slate-700">Año *</Label>
                  <Input
                    id="year"
                    type="number"
                    min="2000"
                    max="2100"
                    value={formData.year || new Date().getFullYear()}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || new Date().getFullYear() })}
                    className="rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="position" className="text-sm font-medium text-slate-700">Orden</Label>
                <Input
                  id="position"
                  type="number"
                  min="1"
                  value={formData.position ?? ""}
                  onChange={(e) => setFormData({ ...formData, position: parseInt(e.target.value) || undefined })}
                  placeholder="Vacío = al final de la lista"
                  className="rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                />
                <p className="text-xs text-slate-500">1 aparece primero en la página de Ediciones.</p>
              </div>
            </div>
          </div>

          {/* Imagen de Portada */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-900 flex items-center">
              <div className="p-2 bg-slate-100 rounded-lg mr-3">
                <ImageIcon className="h-4 w-4 text-slate-600" />
              </div>
              Imagen de Portada
            </h3>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Imagen de Portada</Label>
              <ImageUpload
                currentImage={formData.image || undefined}
                onImageChange={(url) => setFormData({ ...formData, image: url || "" })}
                bucket="editions_image"
              />
            </div>
          </div>

          {/* PDF de la Edición */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-900 flex items-center">
              <div className="p-2 bg-slate-100 rounded-lg mr-3">
                <FileText className="h-4 w-4 text-slate-600" />
              </div>
              PDF de la Edición
            </h3>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Archivo PDF</Label>
              <PDFUpload
                currentPDF={formData.pdf_url || undefined}
                onPDFChange={(url, filename) => {
                  setFormData({ 
                    ...formData, 
                    pdf_url: url || "", 
                    filename: filename || "" 
                  })
                }}
                bucket="editions"
              />
            </div>
          </div>

        <SheetFooter>
          <Button 
            type="submit"
            className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white"
          >
            {edition ? "Actualizar Edición" : "Crear Edición"}
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

