export default function Page() {
  const eventos = [
    { id: 1, titulo: 'Feria de lectura', fecha: '12/09/2025', lugar: 'Centro Cultural' },
    { id: 2, titulo: 'Charla con autores', fecha: '22/09/2025', lugar: 'Auditorio Matices' },
    { id: 3, titulo: 'Presentación edición especial', fecha: '30/09/2025', lugar: 'Sala Principal' },
  ]

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Eventos</h1>
        <p className="text-sm text-muted-foreground">Listado estático de eventos.</p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {eventos.map((e) => (
          <div key={e.id} className="rounded-lg border p-4">
            <div className="text-sm text-black/70">{e.fecha} · {e.lugar}</div>
            <div className="mt-1 text-lg font-semibold" style={{ color: '#005B82' }}>{e.titulo}</div>
            <div className="mt-3 text-sm text-black/60">Acciones: editar · eliminar (demo)</div>
          </div>
        ))}
      </div>
    </div>
  )
}


