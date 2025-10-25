"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { AdminBenefit } from "@/lib/admin-service"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Gift, Hash, Calendar, Users, User } from "lucide-react"

interface BenefitModalProps {
  benefit: AdminBenefit | null
  open: boolean
  onClose: () => void
  onSave: (benefit: Partial<AdminBenefit>) => void
}

export function BenefitModal({ benefit, open, onClose, onSave }: BenefitModalProps) {
  const [formData, setFormData] = useState<Partial<AdminBenefit>>({
    title: "",
    description: "",
    quantity: 1,
    valid_from: new Date().toISOString().split("T")[0],
    valid_to: "",
    type: "discount",
  })

  useEffect(() => {
    if (benefit) {
      setFormData(benefit)
    } else {
      setFormData({
        title: "",
        description: "",
        quantity: 1,
        valid_from: new Date().toISOString().split("T")[0],
        valid_to: "",
        type: "discount",
      })
    }
  }, [benefit, open])

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
          <div className="pb-6">
            <DialogTitle>
              <h2 className="text-2xl font-light text-slate-900">
                {benefit ? "Editar Beneficio" : "Agregar Beneficio"}
              </h2>
            </DialogTitle>
            <p className="text-slate-600 mt-2">
              {benefit ? "Modifica la información del beneficio" : "Completa la información del nuevo beneficio"}
            </p>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información Básica */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-900 flex items-center">
              <div className="p-2 bg-slate-100 rounded-lg mr-3">
                <Gift className="h-4 w-4 text-slate-600" />
              </div>
              Información Básica
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-slate-700">Título del Beneficio *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ej: 20% de descuento en todos los productos"
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
                  placeholder="Describe los detalles del beneficio, condiciones y restricciones..."
                  rows={3}
                  className="rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Tipo y Código */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-900 flex items-center">
              <div className="p-2 bg-slate-100 rounded-lg mr-3">
                <Hash className="h-4 w-4 text-slate-600" />
              </div>
              Tipo y Código
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-medium text-slate-700">Tipo de Beneficio</Label>
                <Select
                  defaultValue={formData.type || "discount"}
                  onValueChange={(value) => setFormData({ ...formData, type: value as any })}
                >
                  <SelectTrigger className="rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">Descuento</SelectItem>
                    <SelectItem value="promotion">Promoción</SelectItem>
                    <SelectItem value="gift">Regalo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>
          </div>

          {/* Cantidades */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-900 flex items-center">
              <div className="p-2 bg-slate-100 rounded-lg mr-3">
                <Users className="h-4 w-4 text-slate-600" />
              </div>
              Cantidades
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-sm font-medium text-slate-700">Cantidad Disponible *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number.parseInt(e.target.value) })}
                  placeholder="100"
                  className="rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  required
                />
              </div>

            </div>
          </div>

          {/* Validez */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-900 flex items-center">
              <div className="p-2 bg-slate-100 rounded-lg mr-3">
                <Calendar className="h-4 w-4 text-slate-600" />
              </div>
              Período de Validez
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="valid_from" className="text-sm font-medium text-slate-700">Válido Desde *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="valid_from"
                    type="date"
                    value={formData.valid_from || ""}
                    onChange={(e) => setFormData({ ...formData, valid_from: e.target.value })}
                    className="pl-10 rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="valid_to" className="text-sm font-medium text-slate-700">Válido Hasta</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="valid_to"
                    type="date"
                    value={formData.valid_to || ""}
                    onChange={(e) => setFormData({ ...formData, valid_to: e.target.value })}
                    placeholder="Fecha de vencimiento (opcional)"
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
              {benefit ? "Actualizar Beneficio" : "Crear Beneficio"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
