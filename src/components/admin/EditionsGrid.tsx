"use client"

import { useState } from "react"
import Image from "next/image"
import type { AdminEdition } from "@/lib/admin-service"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardFooter } from "@/components/ui/Card"
import { Edit, Trash2, Search, ImageIcon, FileText, Download, ArrowLeft, ArrowRight } from "lucide-react"

interface EditionsGridProps {
  editions: AdminEdition[]
  onEdit: (edition: AdminEdition) => void
  onDelete: (id: string) => void
  onMove: (id: string, direction: "up" | "down") => void
}

export function EditionsGrid({ editions, onEdit, onDelete, onMove }: EditionsGridProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEditions = editions.filter((edition) =>
    edition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    edition.month.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDownload = (edition: AdminEdition) => {
    if (edition.pdf_url) {
      window.open(edition.pdf_url, '_blank')
    } else {
      alert('PDF no disponible aún')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar ediciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredEditions.map((edition) => (
          <Card key={edition.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-64 w-full bg-slate-100 flex items-center justify-center">
                {edition.image && edition.image.trim() !== '' ? (
                  <Image
                    src={edition.image}
                    alt={edition.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="text-slate-400">
                    <ImageIcon className="h-12 w-12" />
                  </div>
                )}
                <span className="absolute left-2 top-2 z-10 rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white">
                  #{edition.position}
                </span>
              </div>
            </CardContent>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{edition.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {edition.month} {edition.year}
              </p>
              {edition.pdf_url ? (
                <div className="flex items-center gap-2 text-sm text-green-600 mb-4">
                  <FileText className="h-4 w-4" />
                  <span>{edition.filename || "PDF disponible"}</span>
                </div>
              ) : (
                <p className="text-sm text-gray-400 mb-4">Sin PDF</p>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-2 border-t p-4">
              <div className="grid w-full grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={editions[0]?.id === edition.id}
                  onClick={() => onMove(edition.id, "up")}
                  title="Mover antes"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={editions[editions.length - 1]?.id === edition.id}
                  onClick={() => onMove(edition.id, "down")}
                  title="Mover después"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex w-full gap-2">
                {edition.pdf_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="min-w-0 flex-1 bg-transparent"
                    onClick={() => handleDownload(edition)}
                  >
                    <Download className="mr-1 h-4 w-4 shrink-0" />
                    PDF
                  </Button>
                )}
                <Button variant="outline" size="sm" className="min-w-0 flex-1 bg-transparent" onClick={() => onEdit(edition)}>
                  <Edit className="mr-1 h-4 w-4 shrink-0" />
                  Editar
                </Button>
                <Button variant="outline" size="sm" className="shrink-0" onClick={() => onDelete(edition.id)} title="Eliminar">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

