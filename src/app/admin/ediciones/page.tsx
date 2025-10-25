"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Plus, LayoutGrid, TableIcon, Download, Eye } from "lucide-react"

// Mock data para ediciones
interface Edition {
  id: string
  title: string
  month: string
  year: number
  number: number
  year_number: number
  cover_image_url: string
  pdf_url?: string
  description?: string
  is_published: boolean
  published_at?: string
  created_at: string
  updated_at: string
}

const mockEditions: Edition[] = [
  {
    id: "1",
    title: "Año 35 - Nro. 408",
    month: "Enero",
    year: 2025,
    number: 408,
    year_number: 35,
    cover_image_url: "/images/ediciones/enero2025.png",
    pdf_url: "/ediciones/enero2025.pdf",
    description: "Edición de enero 2025 con las últimas noticias del barrio",
    is_published: true,
    published_at: "2025-01-01T00:00:00Z",
    created_at: "2024-12-15T10:00:00Z",
    updated_at: "2024-12-15T10:00:00Z"
  },
  {
    id: "2",
    title: "Año 35 - Nro. 409",
    month: "Febrero",
    year: 2025,
    number: 409,
    year_number: 35,
    cover_image_url: "/images/ediciones/febrero2025.png",
    pdf_url: "/ediciones/febrero2025.pdf",
    description: "Edición de febrero 2025 con eventos y comercios destacados",
    is_published: true,
    published_at: "2025-02-01T00:00:00Z",
    created_at: "2025-01-15T10:00:00Z",
    updated_at: "2025-01-15T10:00:00Z"
  },
  {
    id: "3",
    title: "Año 35 - Nro. 410",
    month: "Marzo",
    year: 2025,
    number: 410,
    year_number: 35,
    cover_image_url: "/images/ediciones/marzo2025.png",
    description: "Edición de marzo 2025 en preparación",
    is_published: false,
    created_at: "2025-02-15T10:00:00Z",
    updated_at: "2025-02-15T10:00:00Z"
  },
  {
    id: "4",
    title: "Año 35 - Nro. 411",
    month: "Abril",
    year: 2025,
    number: 411,
    year_number: 35,
    cover_image_url: "/images/ediciones/abril2025.png",
    description: "Edición de abril 2025 en preparación",
    is_published: false,
    created_at: "2025-03-15T10:00:00Z",
    updated_at: "2025-03-15T10:00:00Z"
  },
  {
    id: "5",
    title: "Año 35 - Nro. 412",
    month: "Mayo",
    year: 2025,
    number: 412,
    year_number: 35,
    cover_image_url: "/images/ediciones/mayo2025.png",
    description: "Edición de mayo 2025 en preparación",
    is_published: false,
    created_at: "2025-04-15T10:00:00Z",
    updated_at: "2025-04-15T10:00:00Z"
  },
  {
    id: "6",
    title: "Año 35 - Nro. 413",
    month: "Junio",
    year: 2025,
    number: 413,
    year_number: 35,
    cover_image_url: "/images/ediciones/junio2025.png",
    description: "Edición de junio 2025 en preparación",
    is_published: false,
    created_at: "2025-05-15T10:00:00Z",
    updated_at: "2025-05-15T10:00:00Z"
  }
]

export default function EdicionesPage() {
  const [editions, setEditions] = useState<Edition[]>(mockEditions)
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid")

  const handlePublish = (id: string) => {
    setEditions(editions.map(edition => 
      edition.id === id 
        ? { ...edition, is_published: true, published_at: new Date().toISOString() }
        : edition
    ))
  }

  const handleUnpublish = (id: string) => {
    setEditions(editions.map(edition => 
      edition.id === id 
        ? { ...edition, is_published: false, published_at: undefined }
        : edition
    ))
  }

  const handleDownload = (edition: Edition) => {
    if (edition.pdf_url) {
      window.open(edition.pdf_url, '_blank')
    } else {
      alert('PDF no disponible aún')
    }
  }

  return (
    <>
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Ediciones</h1>
            <p className="text-muted-foreground mt-1">Gestiona las ediciones de la revista</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("table")}
            >
              <TableIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nueva Edición
            </Button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {editions.map((edition) => (
              <div
                key={edition.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Cover Image */}
                <div className="relative h-64">
                  <img
                    src={edition.cover_image_url}
                    alt={edition.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      edition.is_published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {edition.is_published ? 'Publicada' : 'Borrador'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{edition.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{edition.month} {edition.year}</p>
                  {edition.description && (
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {edition.description}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleDownload(edition)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                  </div>

                  {/* Publish/Unpublish */}
                  <div className="mt-3">
                    {edition.is_published ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => handleUnpublish(edition.id)}
                      >
                        Despublicar
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => handlePublish(edition.id)}
                      >
                        Publicar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Edición
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Período
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {editions.map((edition) => (
                  <tr key={edition.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-12 w-8 object-cover rounded mr-3"
                          src={edition.cover_image_url}
                          alt={edition.title}
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {edition.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {edition.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {edition.month} {edition.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        edition.is_published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {edition.is_published ? 'Publicada' : 'Borrador'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {edition.published_at 
                        ? new Date(edition.published_at).toLocaleDateString()
                        : '-'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload(edition)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {edition.is_published ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUnpublish(edition.id)}
                          >
                            Despublicar
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handlePublish(edition.id)}
                          >
                            Publicar
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
