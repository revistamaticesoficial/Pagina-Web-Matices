"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type Beneficio = {
  id: number;
  titulo: string;
  descripcion?: string;
  beneficio?: "descuento" | "multipromo";
  cantidad?: number;
  canjeados?: number;
  estado: "Activa" | "Programada" | "Finalizada";
  desde: string;
  hasta: string;
  createdAt?: string;
};

type CuponRedencion = {
  id: string;
  beneficioId: number;
  nombre: string;
  dni: string;
  telefono: string;
  email: string;
  estado: "pedido" | "usado"; // pedido = generado/no usado; usado = canjeado
  fecha: string; // fecha de creación del cupón
};

const loadBeneficios = (): Beneficio[] => {
  try {
    const saved = localStorage.getItem("promos");
    if (!saved) return [];
    return JSON.parse(saved) as Beneficio[];
  } catch {
    return [];
  }
};

const loadCupones = (): CuponRedencion[] => {
  try {
    const saved = localStorage.getItem("cupones");
    if (!saved) return [];
    return JSON.parse(saved) as CuponRedencion[];
  } catch {
    return [];
  }
};

export default function BeneficioDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id as string);

  const [beneficio, setBeneficio] = useState<Beneficio | null>(null);
  const [cupones, setCupones] = useState<CuponRedencion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const beneficios = loadBeneficios();
    const found = beneficios.find((b) => b.id === id) || null;
    setBeneficio(found);
    setCupones(loadCupones().filter((c) => c.beneficioId === id));
    setLoading(false);
  }, [id]);

  const usados = useMemo(() => cupones.filter(c => c.estado === "usado").length, [cupones]);
  const pedidos = useMemo(() => cupones.filter(c => c.estado === "pedido").length, [cupones]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Cargando beneficio...</p>
      </div>
    );
  }

  if (!beneficio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Beneficio no encontrado</h1>
          <button
            onClick={() => router.push('/gestion/beneficios')}
            className="px-4 py-2 bg-[#005B82] text-white rounded hover:bg-[#004A6B]"
          >
            Volver a beneficios
          </button>
        </div>
      </div>
    );
  }

  const createdAt = beneficio.createdAt || new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Header con back */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push('/gestion/beneficios')}
          className="inline-flex items-center gap-2 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-800"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a beneficios
        </button>
      </div>

      {/* Título y metadatos */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{beneficio.titulo}</h1>
        <p className="text-gray-600 mt-2">{beneficio.descripcion}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="border rounded-lg p-4">
          <div className="text-sm text-gray-500">Creado</div>
          <div className="text-lg font-semibold">{createdAt}</div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-sm text-gray-500">Vence</div>
          <div className="text-lg font-semibold">{beneficio.hasta}</div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-sm text-gray-500">Categoría</div>
          <div className="text-lg font-semibold capitalize">{beneficio.beneficio || '—'}</div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-sm text-gray-500">Estado</div>
          <div className="text-lg font-semibold">{beneficio.estado}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <div className="text-sm text-gray-500">Cupones usados</div>
          <div className="text-3xl font-bold text-green-700">{usados}</div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-sm text-gray-500">Cupones pedidos (pendientes)</div>
          <div className="text-3xl font-bold text-yellow-700">{pedidos}</div>
        </div>
      </div>

      {/* Tabla de clientes */}
      <div className="border rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">DNI</th>
              <th className="px-4 py-2 text-left">Teléfono</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {cupones.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>Sin redenciones aún</td>
              </tr>
            ) : (
              cupones.map((c) => (
                <tr key={c.id} className="border-b last:border-b-0">
                  <td className="px-4 py-2">{c.nombre}</td>
                  <td className="px-4 py-2">{c.dni}</td>
                  <td className="px-4 py-2">{c.telefono}</td>
                  <td className="px-4 py-2">{c.email}</td>
                  <td className="px-4 py-2">{c.fecha}</td>
                  <td className="px-4 py-2 capitalize">{c.estado}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


