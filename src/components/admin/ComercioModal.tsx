"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { AdminComercio } from "@/lib/admin-service"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { User, Mail, Phone, MapPin, Globe, Hash } from "lucide-react"

interface ComercioModalProps {
  comercio: AdminComercio | null
  open: boolean
  onClose: () => void
  onSave: (comercio: Partial<AdminComercio>) => void
}

export function ComercioModal({ comercio, open, onClose, onSave }: ComercioModalProps) {
  const [formData, setFormData] = useState<Partial<AdminComercio>>({
    name: "",
    description: "",
    direction: "",
    phone: "",
    category: "SERVICIOS",
    isActive: true,
    contact_email: "",
    web_url: "",
    tags: [],
    social_media: {},
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
        contact_email: "",
        web_url: "",
        tags: [],
        social_media: {},
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
        <DialogHeader>
          <DialogTitle>
            {comercio ? "Editar Comercio" : "Agregar Comercio"}
          </DialogTitle>
        </DialogHeader>
        <div className="pb-6">
          <p className="text-slate-600 mt-2">
            {comercio ? "Modifica la información del comercio" : "Completa la información del nuevo comercio"}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información Básica */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-900 flex items-center">
              <div className="p-2 bg-slate-100 rounded-lg mr-3">
                <Hash className="h-4 w-4 text-slate-600" />
              </div>
              Información Básica
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-slate-700">Nombre del Comercio *</Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Restaurante El Buen Sabor"
                  className="rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium text-slate-700">Categoría *</Label>
                <Select
                  defaultValue={formData.category || "SERVICIOS"}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SERVICIOS">Servicios</SelectItem>
                    <SelectItem value="RESTAURANTES">Restaurantes</SelectItem>
                    <SelectItem value="COMERCIOS">Comercios</SelectItem>
                    <SelectItem value="SALUD">Salud</SelectItem>
                    <SelectItem value="EDUCACION">Educación</SelectItem>
                    <SelectItem value="ENTRETENIMIENTO">Entretenimiento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-slate-700">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe brevemente el comercio..."
                rows={3}
                className="rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
              />
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-900 flex items-center">
              <div className="p-2 bg-slate-100 rounded-lg mr-3">
                <Phone className="h-4 w-4 text-slate-600" />
              </div>
              Información de Contacto
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="direction" className="text-sm font-medium text-slate-700">Dirección *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="direction"
                    value={formData.direction || ""}
                    onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
                    placeholder="Av. Principal 123, Cerro de las Rosas"
                    className="pl-10 rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-slate-700">Teléfono</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="phone"
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+54 351 123-4567"
                    className="pl-10 rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_email" className="text-sm font-medium text-slate-700">Email de Contacto</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="contact_email"
                    type="email"
                    value={formData.contact_email || ""}
                    onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                    placeholder="contacto@comercio.com"
                    className="pl-10 rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="web_url" className="text-sm font-medium text-slate-700">Sitio Web</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="web_url"
                    value={formData.web_url || ""}
                    onChange={(e) => setFormData({ ...formData, web_url: e.target.value })}
                    placeholder="https://www.comercio.com"
                    className="pl-10 rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  />
                </div>
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
                <Label htmlFor="isActive" className="text-sm font-medium text-slate-700">Estado del Comercio</Label>
                <p className="text-xs text-slate-500">Activar o desactivar la visibilidad del comercio</p>
              </div>
              <Switch
                id="isActive"
                checked={formData.isActive || false}
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
              {comercio ? "Actualizar Comercio" : "Crear Comercio"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}