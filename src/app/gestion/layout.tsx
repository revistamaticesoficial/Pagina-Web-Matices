'use client'
import { ReactNode, useEffect, useCallback, useState } from 'react'
import { DashboardSidebar } from '@/components/layout/DashboardSidebar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog'
import { supabase } from '@/lib/supabase'

export default function GestionLayout({ children }: { children: ReactNode }) {
  const { authState } = useAuth()
  const router = useRouter()
  const [showOnboardingModal, setShowOnboardingModal] = useState(false)

  const evaluateOnboarding = useCallback(async () => {
    if (!authState.user) return
    try {
      // Cargar perfil
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, isOnboardingComplete')
        .eq('id', authState.user.id)
        .maybeSingle()

      // Cargar comercio
      const { data: business } = await supabase
        .from('comercios')
        .select('name')
        .eq('owner_id', authState.user.id)
        .maybeSingle()

      const hasFullName = Boolean(profile?.full_name && profile.full_name.trim().length > 1)
      const hasBusinessName = Boolean(business?.name && business.name.trim().length > 1)
      const isComplete = Boolean(profile?.isOnboardingComplete)

      if (!isComplete && hasFullName && hasBusinessName) {
        // Marcar onboarding como completo
        await supabase
          .from('profiles')
          .update({ isOnboardingComplete: true })
          .eq('id', authState.user.id)
        setShowOnboardingModal(false)
        return
      }

      // Mostrar modal si no está completo
      setShowOnboardingModal(!isComplete)
    } catch {
      // En caso de error, no bloquear la UI pero mostrar modal
      setShowOnboardingModal(true)
    }
  }, [authState.user])

  useEffect(() => {
    if (!authState.isLoading && !authState.user) {
      router.push('/')
    }
  }, [authState.isLoading, authState.user, router])

  // Evaluar al entrar a gestión y cuando el usuario cambie
  useEffect(() => {
    if (!authState.isLoading && authState.user) {
      evaluateOnboarding()
    }
  }, [authState.isLoading, authState.user, evaluateOnboarding])

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

      {/* Modal de Onboarding */}
      <Dialog open={showOnboardingModal} onOpenChange={setShowOnboardingModal}>
        <DialogContent className="sm:max-w-[480px] p-5 text-center">
          <DialogHeader>
            <DialogTitle>Completa tu perfil</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Para utilizar la plataforma es necesario completar los datos de tu perfil y de tu comercio.
            </p>
            <div className="flex justify-center gap-2 mt-10">
              {/* <Button variant="outline" onClick={() => setShowOnboardingModal(false)} className="bg-red-700 hover:bg-red-500 text-white">Cerrar</Button> */}
              <Button onClick={() => setShowOnboardingModal(false)}>Ir a completar datos</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}


