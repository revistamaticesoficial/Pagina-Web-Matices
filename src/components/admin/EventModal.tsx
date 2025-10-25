"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Event } from "@/data/mock-data"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Calendar, Clock, MapPin, Link as LinkIcon, User } from "lucide-react"

interface EventModalProps {
  event: Event | null
  open: boolean
  onClose: () => void
  onSave: (event: Partial<Event>) => void
}

export function EventModal({ event, open, onClose, onSave }: EventModalProps) {
  const [formData, setFormData] = useState<Partial<Event>>({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    time: "18:00",
    place: "",
    direction: "",
    inscription_link: "",
    open_time: "",
    close_time: "",
    isActive: true,
  })

  useEffect(() => {
    if (event) {
      setFormData(event)
    } else {
      setFormData({
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        time: "18:00",
        place: "",
        direction: "",
        inscription_link: "",
        open_time: "",
        close_time: "",
        isActive: true,
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

          {/* Fecha y Hora */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-900 flex items-center">
              <div className="p-2 bg-slate-100 rounded-lg mr-3">
                <Clock className="h-4 w-4 text-slate-600" />
              </div>
              Fecha y Hora
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div className="space-y-2">
                <Label htmlFor="time" className="text-sm font-medium text-slate-700">Hora de Inicio *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="pl-10 rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="open_time" className="text-sm font-medium text-slate-700">Hora de Apertura</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="open_time"
                    type="time"
                    value={formData.open_time || ""}
                    onChange={(e) => setFormData({ ...formData, open_time: e.target.value })}
                    placeholder="Hora de apertura de puertas"
                    className="pl-10 rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="close_time" className="text-sm font-medium text-slate-700">Hora de Cierre</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="close_time"
                    type="time"
                    value={formData.close_time || ""}
                    onChange={(e) => setFormData({ ...formData, close_time: e.target.value })}
                    placeholder="Hora de cierre del evento"
                    className="pl-10 rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  />
                </div>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="place" className="text-sm font-medium text-slate-700">Lugar</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="place"
                    value={formData.place || ""}
                    onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                    placeholder="Ej: Centro de Convenciones"
                    className="pl-10 rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="direction" className="text-sm font-medium text-slate-700">Dirección</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="direction"
                    value={formData.direction || ""}
                    onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
                    placeholder="Av. Principal 123, Córdoba"
                    className="pl-10 rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Inscripción */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-900 flex items-center">
              <div className="p-2 bg-slate-100 rounded-lg mr-3">
                <LinkIcon className="h-4 w-4 text-slate-600" />
              </div>
              Inscripción
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="inscription_link" className="text-sm font-medium text-slate-700">Link de Inscripción</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="inscription_link"
                  type="url"
                  value={formData.inscription_link || ""}
                  onChange={(e) => setFormData({ ...formData, inscription_link: e.target.value })}
                  placeholder="https://eventbrite.com/evento..."
                  className="pl-10 rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Configuración */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-900 flex items-center">
              <div className="p-2 bg-slate-100 rounded-lg mr-3">
                <User className="h-4 w-4 text-slate-600" />
              </div>
              Configuración
            </h3>
            
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="space-y-1">
                <Label htmlFor="isActive" className="text-sm font-medium text-slate-700">Estado del Evento</Label>
                <p className="text-xs text-slate-500">Activar o desactivar la visibilidad del evento</p>
              </div>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
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
