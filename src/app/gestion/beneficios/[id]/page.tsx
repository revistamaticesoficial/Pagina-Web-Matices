"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";

type BenefitRow = {
  id: string;
  title: string;
  description?: string | null;
  quantity?: number | null;
  expires_at?: string | null;
  valid_to?: string | null;
  type?: string | null;
  created_at?: string | null;
};

type RedemptionRow = {
  id: string;
  benefit_id: string | null;
  full_name: string;
  dni: string | null;
  phone: string | null;
  email: string | null;
  redeemed_at: string | null;
  status: 'required' | 'redeemed' | 'canceled' | null;
};

export default function BeneficioDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id as string);

  const [benefit, setBenefit] = useState<BenefitRow | null>(null);
  const [redemptions, setRedemptions] = useState<RedemptionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<null | { type: 'redeem' | 'cancel', row: RedemptionRow }>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [{ data: b }, { data: r }] = await Promise.all([
          supabase.from('benefits').select('*').eq('id', id).maybeSingle(),
          supabase.from('benefit_redemptions').select('*').eq('benefit_id', id).order('redeemed_at', { ascending: false })
        ]);
        setBenefit((b || null) as any);
        setRedemptions((r || []) as any);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const usados = useMemo(() => redemptions.filter(c => c.status === "redeemed").length, [redemptions]);
  const pedidos = useMemo(() => redemptions.filter(c => c.status === "required").length, [redemptions]);

  const handlerCancel = async (redemptionId: string) => {
    try {
      setUpdatingId(redemptionId);
      const { error } = await (supabase as any)
        .from('benefit_redemptions')
        .update({ status: 'canceled' })
        .eq('id', redemptionId)
        .eq('status', 'required');
      if (error) throw error;
      setRedemptions(prev => prev.map(r => r.id === redemptionId ? { ...r, status: 'canceled' } : r));
    } catch (e) {
      console.error('Error cancelando cupón:', e);
      alert('No se pudo cancelar el cupón.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handlerUse = async (r: RedemptionRow) => {
    try {
      setUpdatingId(r.id);
      const nowIso = new Date().toISOString();
      const { error } = await (supabase as any)
        .from('benefit_redemptions')
        .update({ status: 'redeemed', redeemed_at: nowIso })
        .eq('id', r.id)
        .eq('status', 'required');
      if (error) throw error;
      setRedemptions(prev => prev.map(x => x.id === r.id ? { ...x, status: 'redeemed', redeemed_at: nowIso } : x));
    } catch (e) {
      console.error('Error marcando canjeado:', e);
      alert('No se pudo marcar como canjeado.');
    } finally {
      setUpdatingId(null);
    }
  };

  const openConfirm = (type: 'redeem' | 'cancel', row: RedemptionRow) => {
    setConfirmAction({ type, row });
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    setConfirmOpen(false);
    setConfirmAction(null);
  };

  const acceptConfirm = async () => {
    if (!confirmAction) return;
    const { type, row } = confirmAction;
    closeConfirm();
    if (type === 'redeem') {
      await handlerUse(row);
    } else {
      await handlerCancel(row);
    }
  };

  const statusToSpanish = (s: RedemptionRow['status']) => {
    switch (s) {
      case 'required':
        return 'Pendiente';
      case 'redeemed':
        return 'Canjeado';
      case 'canceled':
        return 'Cancelado';
      default:
        return '-';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Cargando beneficio...</p>
      </div>
    );
  }

  if (!benefit) {
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

  const createdAt = benefit.created_at || new Date().toISOString().slice(0, 10);
  const vence = (benefit.valid_to || benefit.expires_at || '') as string;
  const categoria = benefit.type || '—';

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
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{benefit.title}</h1>
        <p className="text-gray-600 mt-2">{benefit.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="border rounded-lg p-4">
          <div className="text-sm text-gray-500">Creado</div>
          <div className="text-lg font-semibold">{createdAt}</div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-sm text-gray-500">Vence</div>
          <div className="text-lg font-semibold">{vence}</div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-sm text-gray-500">Categoría</div>
          <div className="text-lg font-semibold capitalize">{categoria}</div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-sm text-gray-500">Cantidad</div>
          <div className="text-lg font-semibold">{benefit.quantity ?? 0}</div>
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

      {/* Tabla de redenciones */}
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
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {redemptions.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={7}>Sin redenciones aún</td>
              </tr>
            ) : (
              redemptions.map((c) => (
                <tr key={c.id} className="border-b last:border-b-0">
                  <td className="px-4 py-2">{c.full_name}</td>
                  <td className="px-4 py-2">{c.dni}</td>
                  <td className="px-4 py-2">{c.phone}</td>
                  <td className="px-4 py-2">{c.email}</td>
                  <td className="px-4 py-2">{c.redeemed_at ? new Date(c.redeemed_at).toLocaleString('es-AR') : '-'}</td>
                  <td className="px-4 py-2">{statusToSpanish(c.status)}</td>
                  <td className="px-4 py-2">
                    <div className="flex justify-start gap-2">
                      <button
                        type="button"
                        disabled={c.status !== 'required' || updatingId === c.id}
                        onClick={() => openConfirm('redeem', c)}
                        className={`px-2 py-1 rounded text-white ${c.status !== 'required' ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                      >
                        Usar
                      </button>
                      <button
                        type="button"
                        disabled={c.status !== 'required' || updatingId === c.id}
                        onClick={() => openConfirm('cancel', c)}
                        className={`px-2 py-1 rounded text-white ${c.status !== 'required' ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700'}`}
                      >
                        Cancelar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación */}
      {confirmOpen && confirmAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-6">
            <h3 className="text-lg font-semibold mb-2">Confirmar cambio de estado</h3>
            <p className="text-gray-700 mb-6">El estado del cupón solo puede modificarse una sola vez. ¿Aceptas este cambio?</p>
            <div className="flex justify-end gap-3">
              <button onClick={closeConfirm} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancelar</button>
              <button onClick={acceptConfirm} className="px-4 py-2 rounded text-white bg-[#005B82] hover:bg-[#004A6B]">Aceptar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


