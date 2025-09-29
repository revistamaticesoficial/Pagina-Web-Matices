"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Beneficio = {
  id: number;
  titulo: string;
  descripcion?: string;
  beneficio?: "descuento" | "multipromo";
  cantidad?: number;
  canjeados?: number;
  estado: "Activa" | "Programada" | "Finalizada";
  desde: string; // fecha de inicio
  hasta: string; // fecha de fin (vencimiento)
  createdAt?: string; // opcional para items viejos; nuevos lo establecen
};

export default function Page() {
  const router = useRouter();

  const [beneficios, setBeneficios] = useState<Beneficio[]>([
    { id: 1, titulo: '2x1 en suscripciones', descripcion: '', beneficio: 'multipromo', cantidad: 0, canjeados: 0, estado: 'Activa', desde: '2025-09-01', hasta: '2025-09-30' },
    { id: 2, titulo: 'Descuento 20%', descripcion: '', beneficio: 'descuento',   cantidad: 0, canjeados: 0, estado: 'Programada', desde: '2025-09-15', hasta: '2025-09-20' },
    { id: 3, titulo: 'Envío gratis',        descripcion: '', beneficio: 'descuento',   cantidad: 0, canjeados: 0, estado: 'Finalizada', desde: '2025-08-01', hasta: '2025-08-10' },
  ]);

  // Cargar desde localStorage (clave histórica "promos" para compatibilidad)
  useEffect(() => {
    const saved = localStorage.getItem("promos");
    if (saved) {
      try {
        const parsed: Beneficio[] = JSON.parse(saved);
        setBeneficios(parsed);
      } catch {}
    }
  }, []);

  // Guardar en localStorage para mantener compatibilidad
  useEffect(() => {
    localStorage.setItem("promos", JSON.stringify(beneficios));
  }, [beneficios]);

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold bg-[#005B82] via-red-600 to-pink-600 bg-clip-text text-transparent">
            Beneficios
          </h1>
          <p className="text-sm text-muted-foreground">Listado de beneficios activos y programados.</p>
        </div>
      </header>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full text-sm">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-4 py-2 text-left">Título</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-right">Cantidad</th>
              <th className="px-4 py-2 text-right">Canjeados</th>
              <th className="px-4 py-2 text-left">Desde</th>
              <th className="px-4 py-2 text-left">Hasta</th>
              <th className="px-4 py-2 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {beneficios.map((b) => (
              <tr key={b.id} className="border-b last:border-b-0">
                <td className="px-4 py-2">{b.titulo}</td>
                <td className="px-4 py-2">
                  <span
                    className={`rounded px-2 py-1 text-xs text-white ${
                      b.estado === 'Activa' ? 'bg-[#005B82]' : b.estado === 'Programada' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                  >
                    {b.estado}
                  </span>
                </td>
                <td className="px-4 py-2 text-right">{b.cantidad ?? 0}</td>
                <td className="px-4 py-2 text-right">{b.canjeados ?? 0}</td>
                <td className="px-4 py-2">{b.desde}</td>
                <td className="px-4 py-2">{b.hasta}</td>
                <td className="px-4 py-2">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => router.push(`/gestion/beneficios/${b.id}`)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      ver detalle
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


