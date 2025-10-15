"use client"

import { Button } from "@/components/ui/Button"
// import { Utensils, Calendar, Tag } from "lucide-react"

// const categories = [
//   {
//     icon: Utensils,
//     label: "GASTRONOMÍA",
//     color: "bg-[#0B5F7C] hover:bg-[#0B5F7C]/90",
//   },
//   {
//     icon: Calendar,
//     label: "EVENTOS",
//     color: "bg-[#FF6B35] hover:bg-[#FF6B35]/90",
//   },
//   {
//     icon: Tag,
//     label: "PROMOCIONES",
//     color: "bg-[#2D9F3C] hover:bg-[#2D9F3C]/90",
//   },
// ]

interface Category {
  name: string;
  label: string;
  color: string;
}

export default function HeroSugerencias({ categories, setCurrentTab, setCurrentPage }: { 
  categories: Category[], 
  setCurrentTab: (tab: 'comercios' | 'eventos' | 'beneficios') => void, 
  setCurrentPage: (page: number) => void 
}) {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/videosug/sugerencia.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance">
            Matices <span className="text-accent">se renueva</span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-12 text-pretty leading-relaxed">
            Descubrí nuestra nueva imagen
          </p>

          {/* Category Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            {categories.map((category) => {
            //   const Icon = category.icon
              return (
                <Button
                  key={category.name}
                  size="lg"
                  onClick={() => { setCurrentTab(category.name as 'comercios' | 'eventos' | 'beneficios'); setCurrentPage(1); }}
                  className={`${category.color} text-white min-w-[200px] h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105`}
                >
                  {/* <Icon className="mr-2 h-5 w-5" /> */}
                  {category.label}
                </Button>
              )
            })}
          </div>

          <p className="text-white/80 text-sm">Explorá los mejores comercios y beneficios del barrio</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
