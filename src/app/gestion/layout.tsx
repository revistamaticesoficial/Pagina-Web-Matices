import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { DashboardSidebar } from '@/components/layout/DashboardSidebar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Gestión | Matices',
}

export default function GestionLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="flex">
        <div className="hidden md:block">
          <DashboardSidebar />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between border-b px-4 py-3 md:hidden">
            <div className="font-semibold">Gestión</div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="border-black/10 text-black">
                  Menú
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[280px] bg-black text-white">
                <DashboardSidebar />
              </SheetContent>
            </Sheet>
          </div>

          <main className="mx-auto max-w-6xl px-4 py-6 md:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}


