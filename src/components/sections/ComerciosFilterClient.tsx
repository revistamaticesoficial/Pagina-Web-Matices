'use client'

import { useMemo, useState } from 'react'
import { ComerciosGrid } from './ComerciosGrid'
import type { Database } from '@/types/database'
import { Button } from '@/components/ui/Button'

type Business = Database['public']['Tables']['comercios']['Row']

interface Props {
  comercios: Business[]
}

const CATEGORIES: { label: string; value: string }[] = [
  { label: 'Gastronomía', value: 'GASTRONOMIA' },
  { label: 'Salud', value: 'SALUD' },
  { label: 'Servicios', value: 'SERVICIOS' },
  { label: 'Estética', value: 'ESTETICA' },
  { label: 'Educación', value: 'EDUCACION' },
  { label: 'Deporte', value: 'DEPORTES' },
]

export default function ComerciosFilterClient({ comercios }: Props) {
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (!selected) return comercios
    return comercios.filter((c) => (c.category || '').toUpperCase() === selected)
  }, [comercios, selected])

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-wrap gap-4 justify-center mb-20">
        {CATEGORIES.map((cat) => {
          const isActive = selected === cat.value
          return (
            <Button
              key={cat.value}
              variant={isActive ? 'default' : 'outline'}
              className={`px-4 py-2 rounded-md ${isActive ? 'bg-[#F58220] border-[#F58220] text-white' : ''}`}
              onClick={() => setSelected((prev) => (prev === cat.value ? null : cat.value))}
            >
              {cat.label}
            </Button>
          )
        })}
      </div>

      <ComerciosGrid comercios={filtered as any} />
    </div>
  )
}


