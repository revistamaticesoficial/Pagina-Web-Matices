import { redirect, notFound } from 'next/navigation'


const SECTION_MAP: Record<string, string> = {
  inicio: '/admin/inicio',
  eventos: '/admin/eventos',
  articulos: '/admin/articulos',
  cuenta: '/admin/cuenta',
  beneficios: '/admin/beneficios',
  comercios: '/admin/comercios',
  ajustes: '/admin/ajustes',
}

export default async function AdminSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params
  const target = SECTION_MAP[section]
  if (target) {
    redirect(target)
  }
  notFound()
}


