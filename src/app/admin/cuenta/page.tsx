"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Mail, Phone, MapPin, Calendar } from "lucide-react"

export default function CuentaPage() {
  const [formData, setFormData] = useState({
    name: "Juan Perez",
    email: "juanperez@gmail.com",
    phone: "+54 351 514-1456",
    bio: "Editor en jefe de Revista Matices del Cerro. Apasionado por contar las historias de nuestro barrio.",
    location: "Cerro de las Rosas, Córdoba",
    joinDate: "2024-01-15",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Saving profile:", formData)
    alert("Perfil actualizado exitosamente!")
  }

  return (
    <>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Mi Cuenta</h1>
          <p className="text-muted-foreground mt-1">Gestiona tu información personal y preferencias</p>
        </div>

        <div className="grid gap-6">
          {/* Profile Picture Card */}
          <Card>
            <CardHeader>
              <CardTitle>Foto de cuenta</CardTitle>
              <CardDescription>Esta imagen se mostrará en tus artículos y comentarios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback className="text-2xl">JP</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Camera className="h-4 w-4" />
                    Cambiar foto
                  </Button>
                  <p className="text-sm text-muted-foreground">JPG, PNG o GIF. Máximo 2MB.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Información personal</CardTitle>
              <CardDescription>Actualiza tus datos de contacto y biografía</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Ubicación</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biografía</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    placeholder="Cuéntanos sobre ti..."
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Miembro desde{" "}
                    {new Date(formData.joinDate).toLocaleDateString("es-AR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit">Guardar cambios</Button>
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Account Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas de cuenta</CardTitle>
              <CardDescription>Tu actividad en la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Artículos publicados</p>
                  <p className="text-3xl font-bold">24</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total de vistas</p>
                  <p className="text-3xl font-bold">12.5K</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Borradores</p>
                  <p className="text-3xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
