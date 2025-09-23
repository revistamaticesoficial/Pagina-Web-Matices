'use client'
import { ReactNode } from 'react'
import { DashboardSidebar } from '@/components/layout/DashboardSidebar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/providers/AuthProvider'
import { useRouter } from 'next/navigation'

export default function GestionLayout({ children }: { children: ReactNode }) {
  const { authState } = useAuth()
  const router = useRouter()

  // if (!authState.user) {
  //   router.push('/')
  // }

  return (
    <main className="relative min-h-screen bg-white text-black">
      <div className="flex">
        {/* Sidebar para desktop */}
        <div className="hidden md:block fixed left-0 top-0 z-10 w-[280px] h-screen">
          <DashboardSidebar />
        </div>

        <div className="flex-1 w-full">
          {/* Header móvil/tablet */}
          <div className="flex items-center justify-between border-b px-4 py-3 md:hidden bg-white shadow-sm">
            <div className="font-semibold text-lg">Gestión</div>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="border-black/20 text-black hover:bg-gray-50 hover:border-black/30 transition-colors duration-200"
                  size="sm"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  Menú
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[280px] bg-black text-white border-r-0">
                <DashboardSidebar />
              </SheetContent>
            </Sheet>
          </div>

          {/* Contenido principal */}
          <div className="md:pl-[280px] w-full relative">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}


