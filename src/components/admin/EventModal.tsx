"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { AdminEvent } from "@/lib/admin-service"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, MapPin } from "lucide-react"

interface EventModalProps {
  event: AdminEvent | null
  open: boolean
  onClose: () => void
  onSave: (event: Partial<AdminEvent>) => void
}

export function EventModal({ event, open, onClose, onSave }: EventModalProps) {
  const [formData, setFormData] = useState<Partial<AdminEvent>>({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    location: "",
  })

  useEffect(() => {
    if (event) {
      setFormData(event)
    } else {
      setFormData({
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        location: "",
      })
    }
  }, [event, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto  p-4  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
        <DialogHeader>
          <DialogTitle>
            {event ? "Editar Evento" : "Agregar Evento"}
          </DialogTitle>
        </DialogHeader>
        <div className="pb-6">
          <p className="text-slate-600 mt-2">
            {event ? "Modifica la información del evento" : "Completa la información del nuevo evento"}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
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
                <Label htmlFor="title" className="text-sm font-medium text-slate-700">Título del Evento *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ej: Conferencia de Marketing Digital"
                  className="rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-slate-700">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe el evento, sus objetivos y público objetivo..."
                  rows={3}
                  className="rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Fecha */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-900 flex items-center">
              <div className="p-2 bg-slate-100 rounded-lg mr-3">
                <Clock className="h-4 w-4 text-slate-600" />
              </div>
              Fecha
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium text-slate-700">Fecha del Evento *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="pl-10 rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  required
                />
              </div>
            </div>
          </div>

          {/* Ubicación */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-900 flex items-center">
              <div className="p-2 bg-slate-100 rounded-lg mr-3">
                <MapPin className="h-4 w-4 text-slate-600" />
              </div>
              Ubicación
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium text-slate-700">Ubicación</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="location"
                  value={formData.location || ""}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Ej: Centro de Convenciones, Av. Principal 123, Córdoba"
                  className="pl-10 rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="rounded-xl border-slate-200 hover:bg-slate-50"
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white"
            >
              {event ? "Actualizar Evento" : "Crear Evento"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
