"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import { motion, AnimatePresence } from "framer-motion"

const slides = [
  {
    image: "/images/banner/nunez.png",
    title: "Revista",
    highlight: "Matices",
    description:
      "Creciendo junto a vos",
  },
  {
    image: "/images/banner/kempes.png",
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
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image || "/placeholder.svg"}
            alt={`${slides[currentSlide].title} ${slides[currentSlide].highlight}`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-full">
          <div className="max-w-3xl xl:max-w-5xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 text-balance leading-tight"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {slides[currentSlide].title} <span className="text-white">{slides[currentSlide].highlight} </span>
                  <br />
                  {slides[currentSlide].subtitle}
                </motion.h1>
                <motion.p 
                  className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl text-pretty leading-relaxed"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {slides[currentSlide].description}
                </motion.p>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <Button size="lg" className="bg-[#005B82] hover:bg-[#005B8290] text-white w-full sm:w-auto">
                    <Link href="/notas">
                    Ver Últimos artículos
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 w-full sm:w-auto"
                  >
                    <Link href="/sugerencias">
                    Conoce Sugerencias
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <motion.div 
        className="absolute bottom-4 sm:bottom-8 left-0 right-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Dots */}
            <div className="flex gap-1 sm:gap-2">
              {slides.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all ${
                    index === currentSlide ? "w-6 sm:w-8 bg-[#005B82]" : "w-1.5 sm:w-2 bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            {/* Arrow Buttons */}
            <div className="flex gap-1 sm:gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={prevSlide}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={nextSlide}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10"
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
