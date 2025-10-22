"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

const slides = [
  {
    image: "/images/banner/kempes.png",
    title: "Revista",
    highlight: "Matices",
    description:
      "Creciendo junto a vos",
  },
  {
    image: "/images/banner/nunez.png",
    title: "Conectamos con los",
    highlight: "vecinos",
    subtitle: "y construimos comunidad",
    description: "Aprovecha los beneficios exclusivos para la comunidad los 365 días del año",
  },
  {
    image: "/images/banner/mujer-urbana1.jpg",
    title: "Contamos las ",
    highlight: "historias",
    subtitle: "que importan",
    description: "Las noticias y eventos que hacen de Cerro de las Rosas un lugar especial para vivir.",
  },
]

export function HeroHome() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
  }

  return (
    <section className="relative h-[80vh] lg:h-screen w-full overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image || "/placeholder.svg"}
            alt={`${slide.title} ${slide.highlight}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-full">
          <div className="max-w-3xl xl:max-w-5xl">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  index === currentSlide ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8 absolute"
                }`}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 text-balance">
                  {slide.title} <span className="text-[#005B82]">{slide.highlight}</span>
                  <br />
                  {slide.subtitle}
                </h1>
                <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl text-pretty leading-relaxed">
                  {slide.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-[#005B82] hover:bg-[#005B8290] text-white">
                    <Link href="/notas">
                    Ver Últimos artículos
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                  >
                    <Link href="/guianorte">
                    Conoce Guía Norte
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Dots */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide ? "w-8 bg-[#005B82]" : "w-2 bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrow Buttons */}
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={prevSlide}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={nextSlide}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
