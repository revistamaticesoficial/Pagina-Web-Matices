"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Benefit } from "@/data/mock-data"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"

interface BenefitModalProps {
  benefit: Benefit | null
  open: boolean
  onClose: () => void
  onSave: (benefit: Partial<Benefit>) => void
}

export function BenefitModal({ benefit, open, onClose, onSave }: BenefitModalProps) {
  const [formData, setFormData] = useState<Partial<Benefit>>({
    title: "",
    description: "",
    code: "",
    quantity: 1,
    valid_from: new Date().toISOString().split("T")[0],
    valid_to: "",
    type: "discount",
    isActive: true,
  })

  useEffect(() => {
    if (benefit) {
      setFormData(benefit)
    } else {
      setFormData({
        title: "",
        description: "",
        code: "",
        quantity: 1,
        valid_from: new Date().toISOString().split("T")[0],
        valid_to: "",
        type: "discount",
        isActive: true,
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{benefit ? "Editar Beneficio" : "Agregar Beneficio"}</DialogTitle>
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
              <Label htmlFor="type">Tipo de beneficio</Label>
              <Select
                defaultValue={formData.type || "discount"}
                onValueChange={(value) => setFormData({ ...formData, type: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount">Descuento</SelectItem>
                  <SelectItem value="promotion">Promoción</SelectItem>
                  <SelectItem value="gift">Regalo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Código</Label>
              <Input
                id="code"
                value={formData.code || ""}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="CODIGO2024"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Cantidad disponible</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number.parseInt(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity_redeemed">Cantidad canjeada</Label>
              <Input
                id="quantity_redeemed"
                type="number"
                min="0"
                value={formData.quantity_redeemed || 0}
                onChange={(e) => setFormData({ ...formData, quantity_redeemed: Number.parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valid_from">Válido desde</Label>
              <Input
                id="valid_from"
                type="date"
                value={formData.valid_from}
                onChange={(e) => setFormData({ ...formData, valid_from: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="valid_to">Válido hasta</Label>
              <Input
                id="valid_to"
                type="date"
                value={formData.valid_to || ""}
                onChange={(e) => setFormData({ ...formData, valid_to: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
            />
            <Label htmlFor="isActive">Beneficio activo</Label>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">{benefit ? "Guardar cambios" : "Crear beneficio"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
