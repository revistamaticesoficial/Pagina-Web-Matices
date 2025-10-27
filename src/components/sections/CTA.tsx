"use client"
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
function CTA() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, margin: "-100px" })
    
    return (
        <section className="py-16 px-4" ref={ref}>
            <motion.div 
                className="mt-16 w-full max-w-6xl mx-auto"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Card de fondo (portada) */}
              <div className="relative w-full rounded-2xl bg-gradient-to-br from-[#005B82] to-[#003C56] h-[420px]	 lg:h-[300px]  shadow-lg border border-gray-200 overflow-hidden">
                {/* Título centrado */}
                <motion.div 
                    className="absolute top-6 left-0 translate-x-1/2 w-full px-6 sm:px-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                >
                  <h1 className="font-bold text-white text-2xl sm:text-3xl text-center">Descubre todo lo que Mati tiene para ofrecerte</h1>
                </motion.div>
                <motion.div 
                    className="flex items-center justify-between gap-6 px-6 sm:px-10 py-8 sm:py-12 min-h-[300px]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                >
                  {/* Zorro a la izquierda */}
                  <motion.div 
                      className="shrink-0 absolute bottom-0 left-0"
                      initial={{ opacity: 0, x: -30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                  >
                    <Image
                      src="/images/mati-solo.png"
                      alt="Mati - Ver Sugerencias"
                      width={360}
                      height={360}
                      className="h-auto w-[200px] sm:w-[260px] object-contain"
                      priority={false}
                    />
                  </motion.div>

                  {/* Botón a la derecha del zorro */}
                  <motion.div 
                      className="flex-1 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
                  >
                    <Link href="/sugerencias">
                      <button
                        className="bg-[#F58220] hover:bg-[#E5750D] text-white font-bold text-xl sm:text-2xl px-8 sm:px-10 py-5 sm:py-6 rounded-[8px] shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
                        style={{ backgroundColor: '#F58220' }}
                      >
                        VER SUGERENCIAS
                      </button>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
        </section>
    )
}
export default CTA;