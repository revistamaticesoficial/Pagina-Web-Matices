"use client"

import { useState } from "react"
import type { AdminBenefit } from "@/lib/admin-service"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card"
import { Edit, Trash2, Search, Calendar, Ticket, BookOpen } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

// Función helper para detectar si es video o imagen basado en la extensión
const isVideo = (url: string | null | undefined): boolean => {
  if (!url) return false;
  const urlLower = url.toLowerCase();
  // Verificar si termina en .mp4 (últimos 4 caracteres)
  return urlLower.endsWith('.mp4');
};

interface BenefitsGridProps {
  benefits: AdminBenefit[]
  onEdit: (benefit: AdminBenefit) => void
  onDelete: (id: string) => void
}

export function BenefitsGrid({ benefits, onEdit, onDelete }: BenefitsGridProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBenefits = benefits.filter((benefit) => benefit.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const getBenefitTypeLabel = (type: string | null) => {
    const types: Record<string, string> = {
      discount: "Descuento",
      promotion: "Promoción",
      gift: "Regalo",
    }
    return type ? types[type] || type : "-"
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar beneficios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBenefits.map((benefit) => {
          const progress = ((benefit.redemptions_count || 0) / benefit.quantity) * 100

          return (
            <Card key={benefit.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-40 w-full bg-gray-200 overflow-hidden">
                  {benefit.banner_url && benefit.banner_url.trim() !== '' ? (
                    <>
                      {isVideo(benefit.banner_url) ? (
                        <video
                          className="w-full h-full object-cover"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="auto"
                          onError={(e) => {
                            console.warn('Error loading video:', benefit.banner_url);
                            e.currentTarget.style.display = 'none';
                          }}
                        >
                          <source src={benefit.banner_url} type="video/mp4" />
                        </video>
                      ) : (
                        <Image
                          src={benefit.banner_url}
                          alt={benefit.title || 'Beneficio'}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            console.warn('Error loading image:', benefit.banner_url);
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                    </>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-gray-500" />
                    </div>
                  )}
                  <Badge variant="default" className="absolute right-2 top-2">
                    Activo
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <Badge variant="outline">{getBenefitTypeLabel(benefit.type)}</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {benefit.description || "Sin descripción"}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Canjeados</span>
                    <span className="font-medium">
                      {benefit.redemptions_count || 0} / {benefit.quantity}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Hasta {benefit.valid_to ? new Date(benefit.valid_to).toLocaleDateString() : "∞"}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 border-t p-4">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={() => onEdit(benefit)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDelete(benefit.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
