"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Zap, Calendar, FileText, User, Settings, ChevronLeft, ChevronRight, BookOpen, Megaphone } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { useState } from "react"

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
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-blue-500">JP</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">Juan Perez</p>
              <p className="text-xs text-white/60 truncate">juanperez@gmail.com</p>
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
    </aside>
  )
}
