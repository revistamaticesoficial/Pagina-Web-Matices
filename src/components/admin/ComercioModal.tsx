"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Comercio } from "@/data/mock-data"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

interface ComercioModalProps {
  event: Event | null
  open: boolean
  onClose: () => void
  onSave: (event: Partial<Event>) => void
}

export function ComercioModal({ event, open, onClose, onSave }: ComercioModalProps) {
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{event ? "Editar Evento" : "Agregar Evento"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Fecha *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Hora *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="open_time">Hora de apertura</Label>
              <Input
                id="open_time"
                type="time"
                value={formData.open_time || ""}
                onChange={(e) => setFormData({ ...formData, open_time: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="close_time">Hora de cierre</Label>
              <Input
                id="close_time"
                type="time"
                value={formData.close_time || ""}
                onChange={(e) => setFormData({ ...formData, close_time: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="place">Lugar</Label>
            <Input
              id="place"
              value={formData.place || ""}
              onChange={(e) => setFormData({ ...formData, place: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="direction">Dirección</Label>
            <Input
              id="direction"
              value={formData.direction || ""}
              onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inscription_link">Link de inscripción</Label>
            <Input
              id="inscription_link"
              type="url"
              value={formData.inscription_link || ""}
              onChange={(e) => setFormData({ ...formData, inscription_link: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
            />
            <Label htmlFor="isActive">Evento activo</Label>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">{event ? "Guardar cambios" : "Crear evento"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
