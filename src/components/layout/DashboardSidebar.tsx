"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, Users, Zap, Calendar, FileText, User, Settings, ChevronLeft, ChevronRight, BookOpen, Megaphone, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useAuth } from "@/providers/AuthProvider"

const menuItems = [
  { href: "/admin/inicio", label: "Inicio", icon: Home },
  { href: "/admin/comercios", label: "Comercios", icon: Users },
  { href: "/admin/beneficios", label: "Beneficios", icon: Zap },
  { href: "/admin/eventos", label: "Eventos", icon: Calendar },
  { href: "/admin/articulos", label: "Articulos", icon: FileText },
  { href: "/admin/ediciones", label: "Ediciones", icon: BookOpen },
  { href: "/admin/anuncios", label: "Anuncios", icon: Megaphone },
  { href: "/admin/cuenta", label: "Cuenta", icon: User },
  { href: "/admin/ajustes", label: "Ajustes", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { authState, logout } = useAuth()
  const user = authState.user

  //obtener nombre completo
  const fullName = user?.profile?.full_name ||
                   (user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` :  '') ||
                   user?.firstName || ''
                  || 'Usuario'

  //obtener email
  const userEmail = user?.email || ''

  //obtener avatar
  const avatarUrl = user?.profile?.avatar_url || user?.avatar || ''

  //obtener iniciales para el fallback del avatar
  const getInitials = (name: string) => {
     const parts = name.trim().split(' ')
     if (parts.length >= 2) {
       return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
     }
     return name.substring(0, 2).toUpperCase()
    }
    const initials = getInitials(fullName)
    const handleLogout = async () => {
      try {
        await logout()
        //el logout ya redirige a '/' automaticamente segun authProvider
      } catch (error) {
        console.error('Error al cerrar sesión:', error)
      }
    }


  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-[#0a0a0a] text-white transition-all duration-300 z-50",
        isCollapsed ? "w-20" : "w-72",
      )}
    >
      {/* Toggle Button */}
      <div className="absolute -right-3 top-6">
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6 rounded-full bg-white border-2 border-[#0a0a0a]"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3 text-[#0a0a0a]" />
          ) : (
            <ChevronLeft className="h-3 w-3 text-[#0a0a0a]" />
          )}
        </Button>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ">
            <AvatarImage src={avatarUrl || "/placeholder.svg?height=40&width=32"} />
            <AvatarFallback className="bg-blue-500">{initials}</AvatarFallback>
            </Avatar>
            {/* <p className="font-semibold text-sm truncate">{fullName || 'Usuario'}</p>
            <p className="text-xs text-white/60 truncate">{userEmail || 'no disponible'}</p> */}
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">
                {authState.isLoading ? 'Cargando...' : (fullName || 'Usuario')}
              </p>
              <p className="text-xs text-white/60 truncate">
                {authState.isLoading ? '....' : (userEmail || 'no disponible')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white",
                isCollapsed && "justify-center",
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

  {/* Logout Button - Parte inferior */}
  <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-red-500 hover:bg-red-500/10 hover:text-red-400",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">Cerrar Sesión</span>}
        </Button>
      </div>
    </aside>
  )
}
