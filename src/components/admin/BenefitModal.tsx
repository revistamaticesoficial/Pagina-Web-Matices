"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { AdminBenefit } from "@/lib/admin-service"
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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Gift, Hash, Calendar, Users, Store, ImageIcon } from "lucide-react"
import { adminService, type AdminComercio } from "@/lib/admin-service"
import { ImageUpload } from "@/components/admin/ImageUpload"

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
    banner_url: "",
  })

  const [businesses, setBusinesses] = useState<Pick<AdminComercio, 'id' | 'name'>[]>([])
  const [businessFilter, setBusinessFilter] = useState<string>("")
  const [comboOpen, setComboOpen] = useState<boolean>(false)

  useEffect(() => {
    const loadBusinesses = async () => {
      try {
        const data = await adminService.getComercios({ limit: 200 })
        setBusinesses((data || []).map(c => ({ id: c.id, name: c.name })))
      } catch (e) {
        console.warn('No se pudieron cargar los comercios', e)
      }
    }
    if (open) loadBusinesses()
  }, [open])

  // Búsqueda remota al escribir (con debounce)
  useEffect(() => {
    const t = setTimeout(async () => {
      if (!open) return
      try {
        const data = await adminService.getComercios({ limit: 50, search: businessFilter })
        setBusinesses((data || []).map(c => ({ id: c.id, name: c.name })))
      } catch {}
    }, 220)
    return () => clearTimeout(t)
  }, [businessFilter, open])

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
        banner_url: "",
      })
    }
  }, [benefit, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
            <h2 className="text-2xl font-light text-slate-900">
              {benefit ? "Editar Beneficio" : "Agregar Beneficio"}
            </h2>
          </SheetTitle>
          <SheetDescription>
            {benefit ? "Modifica la información del beneficio" : "Completa la información del nuevo beneficio"}
          </SheetDescription>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="grid flex-1 auto-rows-min gap-6 px-4">
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

          {/* Imagen del Beneficio */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-900 flex items-center justify-center">
              <div className="p-2 bg-slate-100 rounded-lg mr-3">
                <ImageIcon className="h-4 w-4 text-slate-600" />
              </div>
              Imagen del Beneficio
            </h3>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Imagen del Beneficio</Label>
              <ImageUpload
                currentImage={formData.banner_url || undefined}
                onImageChange={(url) => setFormData({ ...formData, banner_url: url || "" })}
                bucket="benefits"
              />
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
                    <SelectItem value="multipromo">Multipromo</SelectItem>
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

          {/* Comercios */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-900 flex items-center">
              <div className="p-2 bg-slate-100 rounded-lg mr-3">
                <Store className="h-4 w-4 text-slate-600" />
              </div>
              Comercios
            </h3>

            {/* Combobox simple: un solo campo que permite escribir y seleccionar */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Comercio</Label>
              <div className="relative">
                <Input
                  value={
                    businessFilter ||
                    (formData.business_id
                      ? (businesses.find((b) => b.id === formData.business_id)?.name || '')
                      : '')
                  }
                  onChange={(e) => { setBusinessFilter(e.target.value); setComboOpen(true); }}
                  onFocus={() => { setComboOpen(true); }}
                  onBlur={() => setTimeout(() => setComboOpen(false), 120)}
                  placeholder="Escribe para buscar y seleccionar"
                  className="rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400 pr-8"
                />
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-400">▾</div>

                {/* Dropdown */}
                {(comboOpen && businesses.length > 0) && (
                  <div className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-xl border border-slate-200 bg-white shadow-lg">
                    {businesses
                      .filter(b => b.name.toLowerCase().includes((businessFilter || '').toLowerCase()))
                      .slice(0, 50)
                      .map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onMouseDown={() => {
                            setFormData({ ...formData, business_id: b.id })
                            setBusinessFilter(b.name)
                            setComboOpen(false)
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-slate-50"
                        >
                          {b.name}
                        </button>
                      ))}
                    {businesses.filter(b => b.name.toLowerCase().includes((businessFilter || '').toLowerCase())).length === 0 && (
                      <div className="px-3 py-2 text-sm text-slate-500">Sin resultados</div>
                    )}
                  </div>
                )}
              </div>
              {formData.business_id && (
                <p className="text-xs text-slate-500">
                  Seleccionado: {businesses.find((b) => b.id === formData.business_id)?.name || '—'}
                </p>
              )}
            </div>
          </div>

        <SheetFooter>
          <Button 
            type="submit"
            className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white"
          >
            {benefit ? "Actualizar Beneficio" : "Crear Beneficio"}
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
