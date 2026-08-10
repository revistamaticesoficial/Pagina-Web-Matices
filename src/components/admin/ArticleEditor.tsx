"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Bold, Italic, Heading1, Heading2, List, ListOrdered, ImageIcon, LinkIcon, Quote, Eye, Edit } from "lucide-react"
import { ImageUpload } from "./ImageUpload"
import { MarkdownImageUpload } from "./MarkdownImageUpload"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ArticleEditorProps {
  initialData?: {
    title: string
    excerpt: string
    content: string
    category: string
    tags: string[]
    isPublished: boolean
    featuredImage?: string
    author?: string
  }
  onSave: (data: any) => void
  onCancel: () => void
}

export function ArticleEditor({ initialData, onSave, onCancel }: ArticleEditorProps) {
  const [viewMode, setViewMode] = useState<'edit' | 'preview' | 'split'>('edit')
  const isEditing = !!initialData
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    category: initialData?.category || "NOTICIAS",
    tags: initialData?.tags?.join(", ") || "",
    isPublished: initialData?.isPublished || false,
    featuredImage: initialData?.featuredImage || "",
    author: initialData?.author || "",
  })

  const handleImageChange = (url: string | null) => {
    setFormData({ ...formData, featuredImage: url || "" })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Convertir tags a array
    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)

    onSave({
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category,
      tags: tagsArray,
      isPublished: formData.isPublished,
      featured_image_url: formData.featuredImage,
      author: formData.author,
    })
  }

  const insertMarkdown = (before: string, after = "") => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = formData.content.substring(start, end)
    const newText =
      formData.content.substring(0, start) + before + selectedText + after + formData.content.substring(end)

    setFormData({ ...formData, content: newText })
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }

  const handleImageInsert = (markdownText: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const newText =
      formData.content.substring(0, start) + '\n' + markdownText + '\n' + formData.content.substring(start)

    setFormData({ ...formData, content: newText })
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + markdownText.length + 2, start + markdownText.length + 2)
    }, 0)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Título del artículo *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Escribe un título atractivo..."
          className="text-2xl font-bold"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Extracto</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          placeholder="Breve resumen del artículo..."
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="author">Autor</Label>
        <Input
          id="author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          placeholder="Nombre del autor..."
        />
      </div>

      <div className="space-y-2">
        <Label>Imagen Destacada</Label>
        <ImageUpload
          currentImage={formData.featuredImage}
          onImageChange={handleImageChange}
          bucket="articles"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Categoría</Label>
          <Select defaultValue={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NOTICIAS">Noticias</SelectItem>
              <SelectItem value="GASTRONOMIA">Gastronomía</SelectItem>
              <SelectItem value="SERVICIOS">Servicios</SelectItem>
              <SelectItem value="ENTRETENIMIENTO">Entretenimiento</SelectItem>
              <SelectItem value="DEPORTES">Deportes</SelectItem>
              <SelectItem value="INMOBILIARIA">Inmobiliaria</SelectItem>
              <SelectItem value="SALUD">Salud</SelectItem>
              <SelectItem value="EDUCACION">Educación</SelectItem>
              <SelectItem value="CULTURA">Cultura</SelectItem>
              <SelectItem value="INFRAESTRUCTURA">Infraestructura</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="tags">Etiquetas (separadas por coma)</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="etiqueta1, etiqueta2, etiqueta3"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="content">Contenido</Label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={viewMode === 'edit' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('edit')}
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button
              type="button"
              variant={viewMode === 'preview' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('preview')}
            >
              <Eye className="h-4 w-4 mr-2" />
              Vista
            </Button>
            <Button
              type="button"
              variant={viewMode === 'split' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('split')}
            >
              <Edit className="h-4 w-4 mr-2" />
              Dividido
            </Button>
          </div>
        </div>
        <div className="rounded-lg border bg-white">
          {/* Toolbar */}
          <div className="flex flex-wrap gap-1 border-b p-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("# ", "")} title="Título 1">
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("## ", "")} title="Título 2">
              <Heading2 className="h-4 w-4" />
            </Button>
            <div className="w-px bg-border mx-1" />
            <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("**", "**")} title="Negrita">
              <Bold className="h-4 w-4" />
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("*", "*")} title="Cursiva">
              <Italic className="h-4 w-4" />
            </Button>
            <div className="w-px bg-border mx-1" />
            <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("- ", "")} title="Lista">
              <List className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown("1. ", "")}
              title="Lista numerada"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
            <div className="w-px bg-border mx-1" />
            <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("> ", "")} title="Cita">
              <Quote className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown("[texto](", ")")}
              title="Enlace"
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
            <MarkdownImageUpload onImageInsert={handleImageInsert} />
          </div>

          {/* Content area based on view mode */}
          {viewMode === 'edit' && (
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Escribe tu artículo aquí... Puedes usar Markdown para dar formato."
              rows={20}
              className="border-0 focus-visible:ring-0 font-mono text-sm"
            />
          )}

          {viewMode === 'preview' && (
            <div className="p-6 prose prose-slate max-w-none min-h-[400px] overflow-auto">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ node, children, ...props }) => {
                    // Detectar si contiene solo imagen
                    const hasImage = children && typeof children === 'object' && 
                      Array.isArray(children) && 
                      children.some((child: any) => child?.type === 'img')
                    
                    if (hasImage) {
                      // Si contiene imagen, renderizar como div
                      return <div className="mb-4">{children}</div>
                    }
                    return <p className="whitespace-pre-wrap mb-4" {...props}>{children}</p>
                  },
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 whitespace-pre-wrap" {...props} />
                  ),
                  img: ({ node, ...props }: any) => {
                    const { src, alt = '', ...rest } = props;
                    return (
                      <div className="my-6 relative w-full aspect-video">
                        <Image
                          src={src || ''}
                          alt={alt}
                          fill
                          className="rounded-lg object-contain shadow-lg"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                          {...rest}
                        />
                      </div>
                    );
                  },
                }}
              >
                {formData.content}
              </ReactMarkdown>
            </div>
          )}

          {viewMode === 'split' && (
            <div className="grid grid-cols-2 h-[500px] overflow-hidden">
              <div className="border-r">
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Escribe tu artículo aquí..."
                  className="border-0 focus-visible:ring-0 font-mono text-sm h-full resize-none"
                />
              </div>
              <div className="p-4 prose prose-slate max-w-none overflow-auto h-full">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ node, children, ...props }) => {
                      // Detectar si contiene solo imagen
                      const hasImage = children && typeof children === 'object' && 
                        Array.isArray(children) && 
                        children.some((child: any) => child?.type === 'img')
                      
                      if (hasImage) {
                        // Si contiene imagen, renderizar como div
                        return <div className="mb-4">{children}</div>
                      }
                      return <p className="whitespace-pre-wrap mb-4" {...props}>{children}</p>
                    },
                    blockquote: ({ node, ...props }) => (
                      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 whitespace-pre-wrap" {...props} />
                    ),
                    img: ({ node, alt, ...props }) => (
                      <div className="my-6">
                        <img {...props} alt={alt || ''} className="rounded-lg w-full h-auto shadow-lg" loading="lazy" />
                      </div>
                    ),
                  }}
                >
                  {formData.content}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Usa Markdown para dar formato: **negrita**, *cursiva*, # Título, - Lista, etc.
        </p>
      </div>

      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label htmlFor="isPublished">Estado de publicación</Label>
          <p className="text-sm text-muted-foreground">
            {formData.isPublished ? "El artículo será visible públicamente" : "El artículo se guardará como borrador"}
          </p>
        </div>
        <Switch
          id="isPublished"
          checked={formData.isPublished}
          onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })}
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" size="lg">
          {isEditing 
            ? (formData.isPublished ? "Actualizar artículo publicado" : "Guardar cambios")
            : (formData.isPublished ? "Publicar artículo" : "Guardar borrador")
          }
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
