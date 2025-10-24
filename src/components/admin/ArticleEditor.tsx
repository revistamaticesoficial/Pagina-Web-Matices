"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Bold, Italic, Heading1, Heading2, List, ListOrdered, ImageIcon, LinkIcon, Quote } from "lucide-react"

interface ArticleEditorProps {
  initialData?: {
    title: string
    excerpt: string
    content: string
    category: string
    tags: string[]
    isPublished: boolean
  }
  onSave: (data: any) => void
  onCancel: () => void
}

export function ArticleEditor({ initialData, onSave, onCancel }: ArticleEditorProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    category: initialData?.category || "General",
    tags: initialData?.tags?.join(", ") || "",
    isPublished: initialData?.isPublished || false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
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

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Categoría</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="General">General</SelectItem>
              <SelectItem value="Comercio">Comercio</SelectItem>
              <SelectItem value="Salud">Salud</SelectItem>
              <SelectItem value="Educación">Educación</SelectItem>
              <SelectItem value="Cultura">Cultura</SelectItem>
              <SelectItem value="Infraestructura">Infraestructura</SelectItem>
              <SelectItem value="Deportes">Deportes</SelectItem>
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
        <Label htmlFor="content">Contenido</Label>
        <div className="rounded-lg border bg-white">
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
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown("![alt](", ")")}
              title="Imagen"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Escribe tu artículo aquí... Puedes usar Markdown para dar formato."
            rows={20}
            className="border-0 focus-visible:ring-0 font-mono text-sm"
          />
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
          {formData.isPublished ? "Publicar artículo" : "Guardar borrador"}
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
