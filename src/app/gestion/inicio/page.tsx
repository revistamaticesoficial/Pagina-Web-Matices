export default function Page() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold">Inicio</h1>
        <p className="text-sm text-muted-foreground">Resumen general del panel de gestión.</p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-4" style={{ borderColor: '#005B82' }}>
          <div className="text-sm text-black/70">Promos activas</div>
          <div className="mt-2 text-3xl font-semibold" style={{ color: '#005B82' }}>12</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-black/70">Eventos próximos</div>
          <div className="mt-2 text-3xl font-semibold" style={{ color: '#005B82' }}>4</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-black/70">Suscriptores</div>
          <div className="mt-2 text-3xl font-semibold" style={{ color: '#005B82' }}>1.2k</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-black/70">Visitas hoy</div>
          <div className="mt-2 text-3xl font-semibold" style={{ color: '#005B82' }}>856</div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border p-4">
          <h2 className="text-lg font-semibold">Accesos rápidos</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-sm">
            <li>Crear nueva promo</li>
            <li>Agregar evento</li>
            <li>Editar perfil</li>
          </ul>
        </div>
        <div className="rounded-lg border p-4" style={{ borderColor: '#F58220' }}>
          <h2 className="text-lg font-semibold" style={{ color: '#F58220' }}>Novedades</h2>
          <p className="mt-2 text-sm text-black/70">Sección especial para anuncios internos.</p>
        </div>
      </section>
    </div>
  )
}


