"use client";
import { useEffect, useMemo, useState } from "react";
import { formatDateLabel } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Estado = 'Activa' | 'Finalizada' | 'No disponible';

type Row = {
  id: string;
  titulo: string;
  cantidad: number;
  canjeados: number;
  estado: Estado;
  desde: string;
  hasta: string;
};

export default function Page() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [unauth, setUnauth] = useState<boolean>(false);
console.log('rows:', rows);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data: userRes } = await supabase.auth.getUser();
        const user = userRes?.user || null;
        if (!user) {
          setUnauth(true);
          setRows([]);
          return;
        }

        const { data: business } = await supabase
          .from('comercios')
          .select('*')
          .eq('owner_id', user.id)
          .single();

        if (!business) {
          setRows([]);
          return;
        }

        const { data: benefits } = await supabase
          .from('benefits')
          .select('*')
          .eq('comercio_id', (business as any).id as string)
          .order('created_at', { ascending: false });

        const ids = (benefits || []).map((b: any) => b.id as string);
        const countsEntries = await Promise.all(
          ids.map(async (id) => {
            const { count } = await (supabase as any)
              .from('benefit_redemptions')
              .select('id', { count: 'exact', head: true })
              .eq('benefit_id', id)
              .eq('status', 'redeemed');
            return [id, count ?? 0] as const;
          })
        );
        const countsMap = Object.fromEntries(countsEntries) as Record<string, number>;

        const mapped: Row[] = (benefits || []).map((b: any) => {
          const dateRaw: string | null = b.valid_to ?? b.expires_at ?? null;
          const validUntil = dateRaw ? (/^\d{4}-\d{2}-\d{2}$/.test(dateRaw) ? dateRaw : new Date(dateRaw).toISOString().slice(0,10)) : '';
          const y = validUntil ? Number(validUntil.slice(0,4)) : 0;
          const m = validUntil ? Number(validUntil.slice(5,7)) : 1;
          const d = validUntil ? Number(validUntil.slice(8,10)) : 1;
          const endOfDay = validUntil ? new Date(y, m - 1, d, 23, 59, 59, 999) : null;
          const estado: Estado = b.isActive ? (endOfDay && endOfDay.getTime() < Date.now() ? 'Finalizada' : 'Activa' ) : 'No disponible';

          return {
            id: b.id as string,
            titulo: b.title as string,
            cantidad: typeof b.quantity === 'number' ? b.quantity : 0,
            canjeados: countsMap[b.id] ?? 0,
            estado,
            desde: b.valid_from || '-',
            hasta: b.valid_to || '-',
          };
        });

        setRows(mapped);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <p className="text-gray-600">Cargando beneficios...</p>
      </div>
    );
  }

  if (unauth) {
    return (
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">No autenticado</h2>
        <p className="text-gray-600">Inicia sesión para ver tus beneficios.</p>
      </div>
    );
  }

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
              <th className="px-4 py-2 text-right">Cantidad Total</th>
              <th className="px-4 py-2 text-right">Canjeados</th>
              <th className="px-4 py-2 text-right">Cantidad Disponible</th>
              <th className="px-4 py-2 text-left">Desde</th>
              <th className="px-4 py-2 text-left">Hasta</th>
              <th className="px-4 py-2 text-right">Acciones</th>
              
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((b) => (
                <tr key={b.id} className="border-b last:border-b-0">
                  <td className="px-4 py-2">{b.titulo}</td>
                  <td className="px-4 py-2">
                    <span className={`rounded px-2 py-1 text-xs text-white ${b.estado === 'Activa' ? 'bg-[#005B82]' : b.estado === 'Finalizada' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                      {b.estado}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right">{(b.cantidad ?? 0)}</td>
                  <td className="px-4 py-2 text-right">{(b.canjeados ?? 0)}</td>
                  <td className="px-4 py-2 text-right">{Math.max(0, (b.cantidad ?? 0) - (b.canjeados ?? 0))}</td>
                  <td className="px-4 py-2">{b.desde}</td>
                  <td className="px-4 py-2">{b.hasta}</td>
                  <td className="px-4 py-2">
                    <div className="flex justify-end gap-2">
                      <Link href={`/gestion/beneficios/${b.id}`} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">ver detalle</Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-6" colSpan={7}>Sin beneficios</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
 
