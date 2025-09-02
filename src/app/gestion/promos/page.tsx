export default function Page() {
  const promos = [
    { id: 1, titulo: '2x1 en suscripciones', estado: 'Activa', desde: '01/09/2025', hasta: '30/09/2025' },
    { id: 2, titulo: 'Descuento 20%', estado: 'Programada', desde: '15/09/2025', hasta: '20/09/2025' },
    { id: 3, titulo: 'Envío gratis', estado: 'Finalizada', desde: '01/08/2025', hasta: '10/08/2025' },
  ]

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Promos</h1>
        <p className="text-sm text-muted-foreground">Listado estático de promociones.</p>
      </header>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full text-sm">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-4 py-2 text-left">Título</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Desde</th>
              <th className="px-4 py-2 text-left">Hasta</th>
              <th className="px-4 py-2 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {promos.map((p) => (
              <tr key={p.id} className="border-b last:border-b-0">
                <td className="px-4 py-2">{p.titulo}</td>
                <td className="px-4 py-2">
                  <span className="rounded bg-[#005B82] px-2 py-1 text-xs text-white">{p.estado}</span>
                </td>
                <td className="px-4 py-2">{p.desde}</td>
                <td className="px-4 py-2">{p.hasta}</td>
                <td className="px-4 py-2 text-right text-black/50">Editar · Desactivar</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


