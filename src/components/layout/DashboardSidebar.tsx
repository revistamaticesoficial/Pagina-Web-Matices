'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Inicio', href: '/gestion/inicio' },
  { label: 'Promos', href: '/gestion/promos' },
  { label: 'Eventos', href: '/gestion/eventos' },
  { label: 'Configuración', href: '/gestion/configuracion' }
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-[280px] flex-col bg-black text-white">
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border border-white/10">
            <AvatarImage src="" alt="Avatar" />
            <AvatarFallback className="bg-[#005B82] text-white">NA</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">Nombre Apellido</div>
            <div className="truncate text-xs text-white/70">usuario@correo.com</div>
          </div>
        </div>
      </div>

      <Separator className="bg-white/10" />

      <ScrollArea className="flex-1 px-2 py-2">
        <nav className="grid gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname?.startsWith(item.href)
            return (
              <Link key={item.href} href={item.href} aria-current={isActive ? 'page' : undefined} className="focus:outline-none">
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start text-white',
                    isActive ? 'bg-[#005B82] hover:bg-[#005B82]/90 text-white' : 'hover:bg-white/10'
                  )}
                >
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      <div className="mt-auto px-4 pb-4 pt-2">
        <Separator className="mb-3 bg-white/10" />
        <Button
          variant="ghost"
          className="w-full justify-center bg-white/5 text-white hover:bg-white/10"
          onClick={() => {
            // Acción dummy de cierre de sesión
            alert('Sesión cerrada (demo)')
          }}
        >
          Cerrar sesión
        </Button>
      </div>
    </div>
  )
}


