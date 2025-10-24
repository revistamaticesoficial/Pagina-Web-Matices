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
  comercio: Comercio | null
  open: boolean
  onClose: () => void
  onSave: (comercio: Partial<Comercio>) => void
}

export function ComercioModal({ comercio, open, onClose, onSave }: ComercioModalProps) {
  const [formData, setFormData] = useState<Partial<Comercio>>({
    name: "",
    description: "",
    direction: "",
    phone: "",
    category: "SERVICIOS",
    isActive: true,
  })

  useEffect(() => {
    if (comercio) {
      setFormData(comercio)
    } else {
      setFormData({
        name: "",
        description: "",
        direction: "",
        phone: "",
        category: "SERVICIOS",
        isActive: true,
      })
    }
  }, [comercio, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{comercio ? "Editar Comercio" : "Agregar Comercio"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre *</Label>
            <Input
              id="name"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              <Label htmlFor="direction">Dirección *</Label>
              <Input
                id="direction"
                value={formData.direction || ""}
                onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={formData.phone || ""}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría *</Label>
            <select
              id="category"
              value={formData.category || "SERVICIOS"}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="SERVICIOS">Servicios</option>
              <option value="RESTAURANTES">Restaurantes</option>
              <option value="COMERCIOS">Comercios</option>
              <option value="SALUD">Salud</option>
              <option value="EDUCACION">Educación</option>
              <option value="ENTRETENIMIENTO">Entretenimiento</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive || false}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
            />
            <Label htmlFor="isActive">Comercio activo</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {comercio ? "Actualizar" : "Crear"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}