"use client";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useState, useEffect } from "react";
import Image from "next/image";

type Promo = {
  id: number;
  titulo: string;
  descripcion?: string;
  beneficio?: "descuento" | "multipromo";
  cantidad?: number;
  canjeados?: number;
  estado: "Activa" | "Programada" | "Finalizada";
  desde: string;
  hasta: string;
  imagen?: string;
  comercio?: string;
};

export default function Page() {
  const [open, setOpen] = useState(false);

  // Estado de promos (persistencia en memoria de la sesión)
  const [promos, setPromos] = useState<Promo[]>([
    { id: 1, titulo: '2x1 en suscripciones', descripcion: '', beneficio: 'multipromo', cantidad: 0, canjeados: 0, estado: 'Activa', desde: '2025-09-01', hasta: '2025-09-30' },
    { id: 2, titulo: 'Descuento 20%', descripcion: '', beneficio: 'descuento',   cantidad: 0, canjeados: 0, estado: 'Programada', desde: '2025-09-15', hasta: '2025-09-20' },
    { id: 3, titulo: 'Envío gratis',        descripcion: '', beneficio: 'descuento',   cantidad: 0, canjeados: 0, estado: 'Finalizada', desde: '2025-08-01', hasta: '2025-08-10' },
  ]);

  // Cargar desde localStorage al montar
  useEffect(() => {
    const saved = localStorage.getItem("promos");
    if (saved) {
      try {
        setPromos(JSON.parse(saved));
      } catch {}
    }
  }, []);

  // Guardar en localStorage al cambiar promos
  useEffect(() => {
    localStorage.setItem("promos", JSON.stringify(promos));
  }, [promos]);

  // Modo y formulario
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Promo>({ id: 0, titulo: '', descripcion: '', beneficio: 'descuento', cantidad: 0, canjeados: 0, estado: 'Activa', desde: '', hasta: '', imagen: '', comercio: '' });

  const openCreate = () => {
    setIsEditing(false);
    setEditingId(null);
    setForm({ id: 0, titulo: '', descripcion: '', beneficio: 'descuento', cantidad: 0, canjeados: 0, estado: 'Activa', desde: '', hasta: '', imagen: '', comercio: '' });
    setOpen(true);
  };

  const openEdit = (p: Promo) => {
    setIsEditing(true);
    setEditingId(p.id);
    setForm({
      id: p.id,
      titulo: p.titulo,
      descripcion: p.descripcion ?? '',
      beneficio: p.beneficio ?? 'descuento',
      cantidad: p.cantidad ?? 0,
      canjeados: p.canjeados ?? 0,
      estado: p.estado,
      desde: p.desde,
      hasta: p.hasta,
      imagen: p.imagen ?? ''
      , comercio: p.comercio ?? ''
    });
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && editingId != null) {
      setPromos(prev => prev.map(x => x.id === editingId ? { ...x, ...form, id: editingId } : x));
    } else {
      const newId = (promos.at(-1)?.id ?? 0) + 1;
      setPromos(prev => [...prev, { ...form, id: newId }]);
    }
    setOpen(false);
  };

  const manejarImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm(prev => ({ ...prev, imagen: (ev.target?.result as string) || '' }));
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (id: number) => {
    setPromos(prev => prev.filter(x => x.id !== id));
  };

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
        <h1 className="text-4xl md:text-5xl font-bold bg-[#005B82] via-red-600 to-pink-600 bg-clip-text text-transparent">
            Promos
            </h1>
          <p className="text-sm text-muted-foreground">Listado estático de promociones.</p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-white text-black rounded-md hover:opacity-90 border-2 border-black hover:bg-black hover:text-white duration-200"
        >
          + Crear Promo
        </button>
      </header>

      {/* Modal de creación/edición */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 h-[100vh] mt-0">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 max-h-[600px] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Editar Promoción' : 'Nueva Promoción'}</h2>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <Label>Título</Label>
              <input
                type="text"
                placeholder="Título de la promoción"
                className="border p-2 rounded"
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                required
              />

              {/* Descripción */}
              <Label>Descripción</Label>
              <Input
                type="text"
                placeholder="Descripción del producto"
                value={form.descripcion}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              />

              {/* Beneficio */}
              <Label>Tipo de beneficio</Label>
              <select
                className="border p-2 rounded"
                value={form.beneficio}
                onChange={(e) => setForm({ ...form, beneficio: e.target.value as Promo['beneficio'] })}
              >
                <option value="descuento">Descuento</option>
                <option value="multipromo">Multipromo</option>
              </select>

              {/* Cantidad y Canjeados */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Cantidad de descuentos</Label>
                  <Input
                    type="number"
                    placeholder="Cantidad"
                    value={form.cantidad ?? 0}
                    onChange={(e) => setForm({ ...form, cantidad: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Canjeados</Label>
                  <Input
                    type="number"
                    placeholder="Canjeados"
                    value={form.canjeados ?? 0}
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">Este valor se actualiza automáticamente cuando se usan cupones.</p>
                </div>
              </div>

              {/* Estado */}
              <Label>Estado</Label>
              <select
                className="border p-2 rounded"
                value={form.estado}
                onChange={(e) => setForm({ ...form, estado: e.target.value as Promo['estado'] })}
              >
                <option value="Activa">Activa</option>
                <option value="Programada">Programada</option>
                <option value="Finalizada">Finalizada</option>
              </select>

              {/* Imagen */}
              <Label>Imagen (opcional)</Label>
              <input
                type="file"
                accept="image/*"
                onChange={manejarImagen}
                className="border p-2 rounded"
              />
              {form.imagen && (
                <div className="mt-2">
                  <Image src={form.imagen} alt="Preview" width={128} height={128} className="w-32 h-32 object-cover rounded border" />
                </div>
              )}

              {/* Comercio */}
              <Label>Comercio</Label>
              <select
                className="border p-2 rounded"
                value={form.comercio ?? ''}
                onChange={(e) => setForm({ ...form, comercio: e.target.value })}
                required
              >
                <option value="" disabled>Selecciona un comercio</option>
                <option value="Topping">Topping</option>
                <option value="Casa Criolla">Casa Criolla</option>
                <option value="Tortas Rossi">Tortas Rossi</option>
              </select>

              <div className="grid grid-cols-2 gap-3 ">
                <div className="gap-3">
                  <Label>Desde</Label>
                  <input
                    type="date"
                    className="border p-2 rounded w-full mt-3"
                    value={form.desde}
                    onChange={(e) => setForm({ ...form, desde: e.target.value })}
                    required
                  />
                </div>
                <div className="gap-3">
                  <Label>Hasta</Label>
                  <input
                    type="date"
                    className="border p-2 rounded w-full mt-3"
                    value={form.hasta}
                    onChange={(e) => setForm({ ...form, hasta: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-2">
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Guardar</button>
              </div> 
            </form>
          </div>
        </div>
        
      )}
      

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
            {promos.map((p) => (
              <tr key={p.id} className="border-b last:border-b-0">
                <td className="px-4 py-2">{p.titulo}</td>
                <td className="px-4 py-2">
                  <span className={`rounded px-2 py-1 text-xs text-white ${
                    p.estado === 'Activa' ? 'bg-[#005B82]' : p.estado === 'Programada' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}>{p.estado}</span>
                </td>
                <td className="px-4 py-2 text-right">{p.cantidad ?? 0}</td>
                <td className="px-4 py-2 text-right">{p.canjeados ?? 0}</td>
                <td className="px-4 py-2">{p.desde}</td>
                <td className="px-4 py-2">{p.hasta}</td>
                <td className="px-4 py-2">
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => openEdit(p)} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Editar</button>
                    <button type="button" onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700">Borrar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}