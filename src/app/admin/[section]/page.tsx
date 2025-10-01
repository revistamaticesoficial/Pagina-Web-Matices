import { redirect, notFound } from 'next/navigation'


const SECTION_MAP: Record<string, string> = {
  inicio: '/admin/inicio',
  eventos: '/admin/eventos',
  notas: '/admin/notas',
  cuenta: '/admin/cuenta',
  beneficios: '/admin/beneficios',
}

export default function AdminSectionPage({ params }: { params: { section: string } }) {
  const target = SECTION_MAP[params.section]
  if (target) {
    redirect(target)
  }
  notFound()
}


