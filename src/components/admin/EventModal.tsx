"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { AdminEvent } from "@/lib/admin-service"
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
import { Calendar, Clock, MapPin, Store } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { adminService, type AdminComercio } from "@/lib/admin-service"

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
            {event ? "Editar Evento" : "Agregar Evento"}
          </SheetTitle>
          <SheetDescription>
            {event ? "Modifica la información del evento" : "Completa la información del nuevo evento"}
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
                  value={businessFilter || (formData.business_id ? (businesses.find(b => b.id === formData.business_id)?.name || '') : '')}
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
                <p className="text-xs text-slate-500">Seleccionado: {businesses.find(b => b.id === formData.business_id)?.name || '—'}</p>
              )}
            </div>
          </div>

        <SheetFooter>
          <Button 
            type="submit"
            className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white"
          >
            {event ? "Actualizar Evento" : "Crear Evento"}
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
