"use client"
import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { mockArticles } from '@/data/articles'
import { Calendar, Clock, User, BookOpen } from 'lucide-react'
import Image from 'next/image'

function NotasSection() {
  const notes = useMemo(() => mockArticles.slice(0, 5), [])
  const [perView, setPerView] = useState(1)
  const [index, setIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const computePerView = () => {
      if (window.innerWidth >= 1024) return 3
      if (window.innerWidth >= 640) return 2
      return 1
    }
    const update = () => {
      const newPerView = computePerView()
      setPerView((prev) => {
        const updated = newPerView
        if (prev !== updated) {
          // clamp current index so we don't overflow
          const maxIndex = Math.max(0, notes.length - updated)
          setIndex((i) => (i > maxIndex ? maxIndex : i))
        }
        return updated
      })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxIndex = Math.max(0, notes.length - perView)

  // autoplay: every ~5.5s move one card, pause on hover
  useEffect(() => {
    if (isHovered || notes.length <= perView) return
    const id = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1))
    }, 5500)
    return () => clearInterval(id)
  }, [isHovered, perView, maxIndex, notes.length])

  return (
    <section className='py-16'>
      <h1 className="text-3xl font-bold text-[#005B82] text-center mb-8">Notas Destacadas</h1>
      <div className="mt-8 w-full max-w-7xl mx-auto">
        <div className="relative overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          {/* Track con 5 tarjetas, ancho flexible y desplazamiento por tarjeta */}
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
          >
            {notes.map((nota) => (
              <div key={nota.id} className="px-2" style={{ flex: `0 0 ${100 / perView}%` }}>
                <div className=" bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative h-44 bg-gray-100">
                    {
                      nota.image ? (
                        <Image src={nota.image} alt={nota.title} fill className={`object-cover`} />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-14 h-14 mx-auto mb-2 bg-[#005B82] rounded-full flex items-center justify-center">
                              <BookOpen className="w-7 h-7 text-white" />
                            </div>
                            <p className="text-gray-700 font-medium text-xs">Nota Destacada</p>
                          </div>
                        </div>
                      )
                    }
                  </div>

                  <div className="p-5 flex flex-col justify-between h-64">
                    <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">{nota.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">{nota.excerpt}</p>

                    <div className="flex items-center justify-between text-[11px] text-gray-500 mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1" />
                          <span>{new Date(nota.publishedAt).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1" />
                          <span>{nota.readTime} min</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-xs text-gray-600">
                        <User className="w-4 h-4 mr-1" />
                        <span>{nota.author}</span>
                      </div>
                    </div>

                    <Link href={`/notas/${nota.id}`}>
                      <button className="w-full bg-[#005B82] hover:bg-[#004D6E] text-white font-medium py-2.5 rounded-lg transition-all duration-200">
                        Leer Nota Completa
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          {notes.length > perView && (
            <>
              <button
                onClick={() => setIndex((i) => (i === 0 ? maxIndex : i - 1))}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border rounded-full p-2 shadow"
                aria-label="Anterior"
              >
                {/* simple chevron */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={() => setIndex((i) => (i >= maxIndex ? 0 : i + 1))}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border rounded-full p-2 shadow"
                aria-label="Siguiente"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}

          {/* Dots (por posición de inicio del viewport) */}
          {notes.length > perView && (
            <div className="flex items-center justify-center space-x-2 mt-6">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full ${i === index ? 'bg-[#005B82]' : 'bg-gray-300'}`}
                  aria-label={`Ir a página ${i + 1}`}
                />)
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default NotasSection