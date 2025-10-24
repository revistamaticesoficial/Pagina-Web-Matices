"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Separator } from "@/components/ui/Separator"
import { Bell, Lock, Globe, Database, Palette, Mail } from "lucide-react"

export default function AjustesPage() {
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,

    // Privacy
    profilePublic: true,
    showEmail: false,

    // Site settings
    siteName: "Revista Matices del Cerro",
    siteUrl: "https://maticesdelcerro.com",
    contactEmail: "contacto@maticesdelcerro.com",

    // Appearance
    darkMode: false,
    compactView: false,
  })

  const handleSave = () => {
    console.log("[v0] Saving settings:", settings)
    alert("Configuración guardada exitosamente!")
  }

  return (
    <>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Ajustes</h1>
          <p className="text-muted-foreground mt-1">Configura las preferencias del sistema y tu cuenta</p>
        </div>

        <div className="space-y-6">
          {/* Notifications Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <CardTitle>Notificaciones</CardTitle>
              </div>
              <CardDescription>Gestiona cómo y cuándo recibes notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">Notificaciones por email</Label>
                  <p className="text-sm text-muted-foreground">Recibe emails sobre nuevos comentarios y actividad</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="pushNotifications">Notificaciones push</Label>
                  <p className="text-sm text-muted-foreground">Recibe notificaciones en tiempo real en tu navegador</p>
                </div>
                <Switch
                  id="pushNotifications"
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="weeklyDigest">Resumen semanal</Label>
                  <p className="text-sm text-muted-foreground">Recibe un resumen de actividad cada semana</p>
                </div>
                <Switch
                  id="weeklyDigest"
                  checked={settings.weeklyDigest}
                  onCheckedChange={(checked) => setSettings({ ...settings, weeklyDigest: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                <CardTitle>Privacidad y seguridad</CardTitle>
              </div>
              <CardDescription>Controla quién puede ver tu información</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="profilePublic">Perfil público</Label>
                  <p className="text-sm text-muted-foreground">Permite que otros usuarios vean tu perfil</p>
                </div>
                <Switch
                  id="profilePublic"
                  checked={settings.profilePublic}
                  onCheckedChange={(checked) => setSettings({ ...settings, profilePublic: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showEmail">Mostrar email públicamente</Label>
                  <p className="text-sm text-muted-foreground">Tu email será visible en tu perfil público</p>
                </div>
                <Switch
                  id="showEmail"
                  checked={settings.showEmail}
                  onCheckedChange={(checked) => setSettings({ ...settings, showEmail: checked })}
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Cambiar contraseña</Label>
                <Button variant="outline" className="w-full bg-transparent">
                  Actualizar contraseña
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Site Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                <CardTitle>Configuración del sitio</CardTitle>
              </div>
              <CardDescription>Información general de la revista</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Nombre del sitio</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteUrl">URL del sitio</Label>
                <Input
                  id="siteUrl"
                  type="url"
                  value={settings.siteUrl}
                  onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email de contacto</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                <CardTitle>Apariencia</CardTitle>
              </div>
              <CardDescription>Personaliza la interfaz del panel de administración</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="darkMode">Modo oscuro</Label>
                  <p className="text-sm text-muted-foreground">Usa un tema oscuro para el panel de administración</p>
                </div>
                <Switch
                  id="darkMode"
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => setSettings({ ...settings, darkMode: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compactView">Vista compacta</Label>
                  <p className="text-sm text-muted-foreground">Reduce el espaciado entre elementos</p>
                </div>
                <Switch
                  id="compactView"
                  checked={settings.compactView}
                  onCheckedChange={(checked) => setSettings({ ...settings, compactView: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Database & Backup */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                <CardTitle>Base de datos y respaldo</CardTitle>
              </div>
              <CardDescription>Gestiona los datos y respaldos del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Exportar datos</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Descarga una copia de todos tus datos en formato JSON
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Exportar base de datos
                </Button>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Último respaldo</Label>
                <p className="text-sm text-muted-foreground">23 de octubre de 2024, 14:30 hs</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Crear respaldo manual
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex gap-4">
            <Button size="lg" onClick={handleSave}>
              Guardar todos los cambios
            </Button>
            <Button size="lg" variant="outline">
              Restablecer valores predeterminados
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
