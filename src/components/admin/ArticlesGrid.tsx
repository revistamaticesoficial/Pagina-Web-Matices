"use client"

import { useState } from "react"
import type { Article } from "@/data/mock-data"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card"
import { Edit, Trash2, Search, Eye, Calendar, User } from "lucide-react"

interface ArticlesGridProps {
  articles: Article[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function ArticlesGrid({ articles, onEdit, onDelete }: ArticlesGridProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar artículos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <img
                  src={article.featured_image || "/placeholder.svg?height=200&width=400"}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
                <Badge variant={article.isPublished ? "default" : "secondary"} className="absolute right-2 top-2">
                  {article.isPublished ? "Publicado" : "Borrador"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="mb-2">
                <Badge variant="outline">{article.category}</Badge>
              </div>
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{article.excerpt}</p>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-3 w-3" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(article.published_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-3 w-3" />
                  <span>{article.views} vistas</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 border-t p-4">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={() => onEdit(article.id)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <Button variant="outline" size="sm" onClick={() => onDelete(article.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
