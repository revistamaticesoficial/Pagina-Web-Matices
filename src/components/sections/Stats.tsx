"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  const stats = [
    { number: "15+", label: "Artículos semanales", color: "#005B82" },
    { number: "140+", label: "Comercios asociados", color: "#F58220" },
    { number: "12K+", label: "Lectores mensuales", color: "#3BA740" }
  ]

  return (
    <section className="py-12 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <motion.div
                className="text-3xl lg:text-4xl font-bold mb-2"
                style={{ color: stat.color }}
                initial={{ scale: 0.5 }}
                animate={isInView ? { scale: 1 } : { scale: 0.5 }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.5, type: "spring", stiffness: 200 }}
              >
                {stat.number}
              </motion.div>
              <motion.div
                className="text-sm lg:text-base text-gray-600"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: index * 0.2 + 0.5, duration: 0.4 }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
