'use client'

import React, { useMemo, useState } from 'react'
import { ComerciosGrid } from './ComerciosGrid'
import type { Database } from '@/types/database'
import { Button } from '@/components/ui/Button'
import { Hamburger, ShieldPlus, SearchCheck, Leaf, BookMarked, BicepsFlexed } from 'lucide-react'

type Business = Database['public']['Tables']['comercios']['Row']

interface Props {
  comercios: Business[]
}

const CATEGORIES: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { label: 'Gastronomía', value: 'GASTRONOMIA', icon: Hamburger },
  { label: 'Salud', value: 'SALUD', icon: ShieldPlus },
  { label: 'Servicios', value: 'SERVICIOS', icon: SearchCheck },
  { label: 'Estética', value: 'ESTETICA', icon: Leaf },
  { label: 'Educación', value: 'EDUCACION', icon: BookMarked },
  { label: 'Deporte', value: 'DEPORTES', icon: BicepsFlexed },
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
          const Icon = cat.icon
          return (
            <Button
              key={cat.value}
              variant={isActive ? 'default' : 'outline'}
              className={`px-4 py-2 rounded-md flex items-center gap-2 ${isActive ? 'bg-[#F58220] text-white bg-gradient-to-r from-[#FA780A] via-[#D96400] to-[#D96400] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:cursor-pointer' : ''}`}
              onClick={() => setSelected((prev) => (prev === cat.value ? null : cat.value))}
            >
              <Icon className="h-4 w-4" />
              {cat.label}
            </Button>
          )
        })}
      </div>

      <ComerciosGrid comercios={filtered as any} />
    </div>
  )
}


