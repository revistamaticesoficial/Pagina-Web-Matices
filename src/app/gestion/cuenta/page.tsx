// app/cuenta/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";
import { Checkbox } from "@/components/ui/Checkbox";
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'

const DIAS = [
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
  "domingo",
] as const;

const CATEGORY_OPTIONS = [
  { value: 'GASTRONOMIA', label: 'Gastronomía' },
  { value: 'SERVICIOS', label: 'Servicios' },
  { value: 'SALUD', label: 'Salud' },
  { value: 'EDUCACION', label: 'Educación' },
  { value: 'DEPORTES', label: 'Deportes' },
  { value: 'INMOBILIARIA', label: 'Inmobiliaria' },
] as const;

type Dia = typeof DIAS[number];

type Horario = { apertura: string; cierre: string } | { apertura: "Cerrado"; cierre: "Cerrado" };

type ComercioState = {
  name: string;
  slug: string;
  cargo: string;
  categoria: string;
  descripcion?: string;
  direccion: string;
  telefono: string;
  horarios: Record<Dia, Horario>;
  redes: { instagram: string; facebook: string; tiktok: string };
  tags: string[];
  logo?: string;
};

type UserState = {
  nombre: string;
  apellido: string;
  email: string;
  foto: string;
};

function slugify(v: string) {
  return (v || "")
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function CuentaPage() {
  const { authState } = useAuth();
  const userId = authState.user?.id || '';
  const userEmail = authState.user?.email || '';
  // Estado principal
  const [user, setUser] = useState<UserState>({ nombre: "", apellido: "", email: "", foto: "" });

  const [comercio, setComercio] = useState<ComercioState>({
    name: "",
    slug: "",
    cargo: "",
    categoria: "",
    direccion: "",
    telefono: "",
    horarios: {
      lunes: { apertura: "09:00", cierre: "18:00" },
      martes: { apertura: "09:00", cierre: "18:00" },
      miercoles: { apertura: "09:00", cierre: "18:00" },
      jueves: { apertura: "09:00", cierre: "18:00" },
      viernes: { apertura: "09:00", cierre: "18:00" },
      sabado: { apertura: "10:00", cierre: "14:00" },
      domingo: { apertura: "Cerrado", cierre: "Cerrado" },
    },
    redes: { instagram: "", facebook: "", tiktok: "" },
    tags: [],
  });

  // Drafts para dialogs
  const [userDraft, setUserDraft] = useState<UserState>(user);
  const [comercioDraft, setComercioDraft] = useState<ComercioState>(comercio);

  // UI/UX: opciones de tags disponibles
  const [availableTags] = useState<string[]>([
    "Delivery",
    "Local Físico",
    "Retiro en tienda",
    "Estacionamiento",
    "Wifi",
  ]);
  const [tempSelectedTags, setTempSelectedTags] = useState<string[]>([]);
  const toggleTempTag = (tag: string) => setTempSelectedTags((p)=> p.includes(tag)? p.filter(t=>t!==tag): [...p, tag]);
  const addSelectedTagsToDraft = () => {
    if (!tempSelectedTags.length) return;
    setComercioDraft(prev => ({ ...prev, tags: Array.from(new Set([...(prev.tags||[]), ...tempSelectedTags])) }));
    setTempSelectedTags([]);
  }

  // Errores de foto
  const [photoError, setPhotoError] = useState<string>("");
  const [logoError, setLogoError] = useState<string>("");
  // Modal de éxito
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Cargar datos reales desde Supabase
  useEffect(() => {
    const load = async () => {
      if (!userId) return;
      // Perfil
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', userId)
        .maybeSingle();
      const fullName = profile?.full_name || '';
      const [nombre, ...rest] = fullName.split(' ');
      const apellido = rest.join(' ');
      const loadedUser: UserState = { nombre: nombre||'', apellido: apellido||'', email: userEmail||'-', foto: profile?.avatar_url || '' };
      setUser(loadedUser); setUserDraft(loadedUser);

      // Comercio
      const { data: bizRows, error: bizErr } = await supabase
        .from('comercios')
        .select('id, name, slug, description, direction, phone, category, tags, social_media, logo_url, created_at')
        .eq('owner_id', userId)
        .order('created_at', { ascending: false });

      if (!bizErr && Array.isArray(bizRows) && bizRows.length > 0) {
        const biz = bizRows[0] as any;
        const redes = { instagram: biz.social_media?.instagram || '', facebook: biz.social_media?.facebook || '', tiktok: biz.social_media?.tiktok || '' };
        const loadedBiz: ComercioState = { name: biz.name||'', slug: biz.slug||'', cargo: '', categoria: biz.category||'', descripcion: biz.description||'', direccion: biz.direction||'', telefono: biz.phone||'', horarios: comercio.horarios, redes, tags: Array.isArray(biz.tags)? biz.tags: [], logo: biz.logo_url || '' };
        setComercio(loadedBiz); setComercioDraft(loadedBiz);
      }
    }
    load()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  const getEffectiveUserId = async (): Promise<string | null> => {
    if (userId) return userId;
    const { data } = await supabase.auth.getUser();
    return data?.user?.id || null;
  };

  const saveProfile = async () => {
    const uid = await getEffectiveUserId();
    if (!uid) { alert('No hay usuario autenticado'); return; }
    const full_name = [userDraft.nombre, userDraft.apellido].filter(Boolean).join(' ').trim()
    console.log('log prev upload data SB');
    
    try {
      const { error } = await supabase.from('profiles').upsert({ id: uid, full_name, avatar_url: userDraft.foto || null });
      if (error) throw error;
      setUser(userDraft)
      console.log('log after upload data SB');
      if (full_name && (comercio.name||'').trim()) {
        await supabase.from('profiles').update({ isOnboardingComplete: true }).eq('id', uid)
      }
      setSuccessMessage('Cambios guardados exitosamente');
      setSuccessOpen(true);
    } catch (e) {
      console.error('Error guardando perfil', e);
      alert('No se pudo guardar el perfil. Revisa los datos e intenta nuevamente.');
    }
  }

  const saveBusiness = async () => {
    const uid = await getEffectiveUserId();
    if (!uid) { alert('No hay usuario autenticado'); return; }
    const safeName = (comercioDraft.name||'').trim();
    const safeSlug = (comercioDraft.slug || slugify(comercioDraft.name)).trim();
    if (!safeName || !safeSlug) {
      alert('Nombre y slug del comercio son obligatorios');
      return;
    }
    try {
      // Buscar comercio existente del usuario
      const { data: existingRows, error: findErr } = await supabase
        .from('comercios')
        .select('id')
        .eq('owner_id', uid);
      if (findErr) throw findErr;

      // Normalizar categoría a formato constante (ej.: GASTRONOMIA)
      const normalizedCategory = (comercioDraft.categoria || '')
        .toUpperCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '');

      const payload = {
        owner_id: uid,
        name: safeName,
        slug: safeSlug,
        description: comercioDraft.descripcion || null,
        direction: comercioDraft.direccion || null,
        phone: comercioDraft.telefono || null,
        category: normalizedCategory || null,
        tags: comercioDraft.tags || [],
        social_media: { instagram: comercioDraft.redes.instagram || '', facebook: comercioDraft.redes.facebook || '', tiktok: comercioDraft.redes.tiktok || '' },
        logo_url: comercioDraft.logo || null
      } as any;

      const attemptInsert = async () => {
        // Intentar insertar y, si hay conflicto de slug, ajustar y reintentar una vez
        const { error: insErr } = await supabase.from('comercios').insert(payload);
        if (insErr) {
          const msg = String((insErr as any)?.message || insErr);
          const isSlugConflict = msg.toLowerCase().includes('slug') && msg.toLowerCase().includes('duplicate');
          if (isSlugConflict) {
            const altSlug = `${safeSlug}-${Math.random().toString(36).slice(2, 6)}`;
            const { error: insErr2 } = await supabase.from('comercios').insert({ ...payload, slug: altSlug });
            if (insErr2) throw insErr2;
          } else {
            throw insErr;
          }
        }
      };

      if (existingRows && existingRows.length > 0) {
        const id = existingRows[0].id as string;
        const { error: updErr } = await supabase
          .from('comercios')
          .update(payload)
          .eq('id', id);
        if (updErr) {
          // Si falla el update (p.ej., por políticas), intentar crear nueva fila propia
          await attemptInsert();
        }
      } else {
        await attemptInsert();
      }

      // Recargar y reflejar estado desde DB
      const { data: freshRows } = await supabase
        .from('comercios')
        .select('name, slug, description, direction, phone, category, tags, social_media, logo_url, created_at')
        .eq('owner_id', uid)
        .order('created_at', { ascending: false });
      if (freshRows && freshRows.length) {
        const biz = freshRows[0] as any;
        const redes = { instagram: biz.social_media?.instagram || '', facebook: biz.social_media?.facebook || '', tiktok: biz.social_media?.tiktok || '' };
        const loadedBiz: ComercioState = { name: biz.name||'', slug: biz.slug||'', cargo: '', categoria: biz.category||'', descripcion: biz.description||'', direccion: biz.direction||'', telefono: biz.phone||'', horarios: comercio.horarios, redes, tags: Array.isArray(biz.tags)? biz.tags: [], logo: biz.logo_url || '' };
        setComercio(loadedBiz);
        setComercioDraft(loadedBiz);
      } else {
        setComercio(comercioDraft);
      }

      const full_name = [userDraft.nombre, userDraft.apellido].filter(Boolean).join(' ').trim()
      if (full_name && safeName) {
        await supabase.from('profiles').update({ isOnboardingComplete: true }).eq('id', userId)
      }
      setSuccessMessage('Cambios guardados exitosamente');
      setSuccessOpen(true);
    } catch (e) {
      console.error('Error guardando comercio', e);
      const msg = (e as any)?.message || String(e);
      alert(`No se pudo guardar el comercio. Detalle: ${msg}`);
    }
  }

  // Horarios ediciones locales
  const [editingDia, setEditingDia] = useState<Dia | null>(null);
  const [tmpApertura, setTmpApertura] = useState<string>("");
  const [tmpCierre, setTmpCierre] = useState<string>("");
  const [tmpCerrado, setTmpCerrado] = useState<boolean>(false);
  const openEditDia = (dia: Dia) => { setEditingDia(dia); const h = comercioDraft.horarios[dia]; if (h.apertura === 'Cerrado'){ setTmpCerrado(true); setTmpApertura(''); setTmpCierre(''); } else { setTmpCerrado(false); setTmpApertura(h.apertura); setTmpCierre(h.cierre);} };
  const saveEditDiaLocal = () => { if (!editingDia) return; const nuevo: Horario = tmpCerrado? { apertura:'Cerrado', cierre:'Cerrado'} : { apertura: tmpApertura || '09:00', cierre: tmpCierre || '18:00'}; setComercioDraft(prev=>({ ...prev, horarios: { ...prev.horarios, [editingDia]: nuevo }})); setEditingDia(null); };
  const formatHorario = (h: Horario) => h.apertura === "Cerrado" ? "Cerrado" : `${h.apertura} - ${h.cierre}`;

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 height{100} heightmobile{80}">
      {/* Card Usuario */}
      <h4 className="text-2xl font-extrabold text-[#005B82]">Cuenta</h4>
      <Card className=" bg-transparent border-[1px] border-[#000] shadow-lg hover:shadow-xl duration-300 shadow-sm py-4 height{100} heightmobile{80}">
        <CardContent className="pt-2 pb-4 px-6">
          <div className="flex items-center gap-4">
            <Image src={user.foto || "/images/foto-perfil.jpg"} alt="Foto perfil" width={80} height={80} className="rounded-full w-20 h-20 object-cover border border-[#000]" />
            <div>
              <p className="font-semibold">{[user.nombre, user.apellido].filter(Boolean).join(' ') || '-'}</p>
              <p className="text-sm text-gray-500">{user.email || '-'}</p>
            </div>
          </div>
          <div className="mt-3 w-full flex justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" className="rounded-full" onClick={() => setUserDraft(user)}>+</Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-auto p-6">
                <DialogHeader>
                  <DialogTitle>Editar Cuenta</DialogTitle>
                </DialogHeader>
                <div className="p-6 md:p-8 grid grid-cols-1 gap-6">
                  <div>
                    <Label>Nombre</Label>
                    <Input value={userDraft.nombre} onChange={(e) => setUserDraft({ ...userDraft, nombre: e.target.value })} className="mt-1" />
                  </div>
                  <div>
                    <Label>Apellido</Label>
                    <Input value={userDraft.apellido} onChange={(e) => setUserDraft({ ...userDraft, apellido: e.target.value })} className="mt-1" />
                  </div>
                  <div>
                    <Label>Email (no editable)</Label>
                    <Input value={userDraft.email} disabled className="mt-1" />
                  </div>
                  <div>
                    <Label>Foto de perfil</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <img src={userDraft.foto || "/images/foto-perfil.jpg"} alt="Vista previa" className="w-20 h-20 rounded-full object-cover ring-2 ring-[#005B82]" />
                      <div className="flex flex-col gap-2">
                        <input type="file" accept="image/*" onChange={(e) => { setPhotoError(""); const file = e.target.files?.[0]; if (!file) return; if (!file.type.startsWith("image/")) { setPhotoError("El archivo debe ser una imagen."); return; } if (file.size > 2 * 1024 * 1024) { setPhotoError("La imagen no puede superar 2MB."); return; } const reader = new FileReader(); reader.onload = (ev) => { const result = ev.target?.result as string | undefined; if (result) setUserDraft({ ...userDraft, foto: result }); }; reader.readAsDataURL(file); }} />
                        {photoError && <p className="text-xs text-red-600">{photoError}</p>}
                        <div className="flex gap-2">
                          <Button type="button" className="bg-gray-200 text-gray-800" onClick={() => setUserDraft({ ...userDraft, foto: "" })}>Quitar foto</Button>
                        </div>
                        <p className="text-xs text-gray-500">Subí una imagen desde tu galería (máx. 2MB). Si no subís nada, usaremos /imagenes/foto-perfil.jpg</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <DialogClose asChild>
                      <Button className="bg-gray-200 text-gray-800" type="button">Cancelar</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button type="button" onClick={saveProfile}>Guardar</Button>
                    </DialogClose>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Card Comercio */}
      <h4 className="text-2xl font-extrabold text-[#005B82]">Comercio</h4>
      <Card className="shadow-lg hover:shadow-xl duration-300 bg-transparent border-[1px] border-[#000] shadow-sm py-4">
        <CardContent className="space-y-2 px-6 pb-5 text-left relative">
          {comercio.logo && (
            <img
              src={comercio.logo}
              alt="Logo del comercio"
              className="absolute top-6 right-4 w-12 h-12 rounded object-cover bg-white border shadow"
            />
          )}
          <p><strong>Nombre:</strong> {comercio.name || '-'}</p>
          <p><strong>Slug:</strong> {comercio.slug || '-'}</p>
          <p><strong>Cargo:</strong> {comercio.cargo || '-'}</p>
          <p><strong>Categoría:</strong> {comercio.categoria || '-'}</p>
          <p><strong>Dirección:</strong> {comercio.direccion || '-'}</p>
          <p><strong>Teléfono:</strong> {comercio.telefono || '-'}</p>
          <p><strong>Redes:</strong> {(comercio.redes.instagram || '-')}, {(comercio.redes.facebook || '-')}</p>
          <p><strong>Tags:</strong> {comercio.tags.length ? comercio.tags.join(", ") : '-'}</p>

          <div className="mt-3 w-full flex justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" className="rounded-full" onClick={() => setComercioDraft(comercio)}>+</Button>
              </DialogTrigger>
              <DialogContent className="relative max-h-[80vh] overflow-y-auto p-6">
                <DialogHeader>
                  <DialogTitle>Editar Comercio</DialogTitle>
                </DialogHeader>

                {/* Logo preview en esquina superior derecha */}
                {(comercioDraft.logo || comercio.logo) && (
                  <img
                    src={(comercioDraft.logo || comercio.logo) as string}
                    alt="Logo del comercio"
                    className="absolute top-4 right-4 w-14 h-14 rounded object-cover bg-white border shadow"
                  />
                )}

                <div className="grid gap-5 pt-2">
                  {/* Logo del comercio */}
                  <div>
                    <Label>Subir su logo</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <img src={comercioDraft.logo || '/images/logo.jpg'} alt="Logo" className="w-20 h-20 rounded object-cover ring-2 ring-[#005B82] bg-white" />
                      <div className="flex flex-col gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            setLogoError("");
                            const file = e.target.files?.[0];
                            if (!file) return;
                            if (!file.type.startsWith('image/')) { setLogoError('El archivo debe ser una imagen.'); return; }
                            if (file.size > 2 * 1024 * 1024) { setLogoError('La imagen no puede superar 2MB.'); return; }
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              const result = ev.target?.result as string | undefined;
                              if (result) setComercioDraft({ ...comercioDraft, logo: result });
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                        {logoError && <p className="text-xs text-red-600">{logoError}</p>}
                        {!!comercioDraft.logo && (
                          <div className="flex gap-2">
                            <Button type="button" className="bg-gray-200 text-gray-800" onClick={() => setComercioDraft({ ...comercioDraft, logo: '' })}>Quitar logo</Button>
                          </div>
                        )}
                        <p className="text-xs text-gray-500">Subí una imagen de tu marca (máx. 2MB).</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label>Nombre del comercio</Label>
                    <Input value={comercioDraft.name} onChange={(e) => setComercioDraft({ ...comercioDraft, name: e.target.value, slug: comercioDraft.slug || slugify(e.target.value) })} className="mt-1" placeholder="Ej: Mi Comercio" />
                  </div>
                  <div>
                    <Label>Slug</Label>
                    <Input value={comercioDraft.slug} onChange={(e) => setComercioDraft({ ...comercioDraft, slug: slugify(e.target.value) })} className="mt-1" placeholder="mi-comercio" />
                  </div>

          <div>
            <Label>Cargo</Label>
            <Select key={`cargo-${comercioDraft.cargo || 'none'}`} defaultValue={comercioDraft.cargo} onValueChange={(v) => setComercioDraft({ ...comercioDraft, cargo: v })}>
              <SelectTrigger className="mt-1"><SelectValue placeholder="Seleccioná cargo" /></SelectTrigger>
              <SelectContent>
                {['Dueño','Encargado','Gerente','Empleado','Otro'].map(opt => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Categoría</Label>
            <Select key={`cat-${comercioDraft.categoria || 'none'}`} defaultValue={comercioDraft.categoria} onValueChange={(v) => setComercioDraft({ ...comercioDraft, categoria: v })}>
              <SelectTrigger className="mt-1"><SelectValue placeholder="Seleccioná categoría" /></SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

                  <div>
                    <Label>Descripción</Label>
                    <Input value={comercioDraft.descripcion || ''} onChange={(e) => setComercioDraft({ ...comercioDraft, descripcion: e.target.value })} className="mt-1" placeholder="Ej: local de comida" />
                  </div>

                  <div>
                    <Label>Dirección</Label>
                    <Input value={comercioDraft.direccion} onChange={(e) => setComercioDraft({ ...comercioDraft, direccion: e.target.value })} className="mt-1" placeholder="Ej: Av. Principal 123" />
                  </div>

                  <div>
                    <Label>Teléfono</Label>
                    <Input type="tel" inputMode="tel" value={comercioDraft.telefono} onChange={(e) => setComercioDraft({ ...comercioDraft, telefono: e.target.value })} className="mt-1" placeholder="Ej: 351 123 4567" />
                  </div>

                  <div>
                    <Label>Horarios</Label>
                    <div className="mt-2 divide-y border rounded">
                      {DIAS.map((dia) => (
                        <div key={dia} className="flex items-center justify-between px-3 py-2">
                          <span className="w-28 capitalize">{dia}</span>
                          <span className="text-sm text-gray-600">{formatHorario(comercioDraft.horarios[dia])}</span>
                          <Button size="sm" className="ml-3" onClick={() => openEditDia(dia)}>Editar</Button>
                        </div>
                      ))}
                    </div>
                    {editingDia && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
                        <div className="absolute inset-0 bg-black/50" onClick={() => setEditingDia(null)} />
                        <div className="relative z-10 w-full max-w-md mx-4 bg-white rounded-lg shadow-xl p-6" onClick={(e) => e.stopPropagation()}>
                          <div className="mb-4"><h3 className="text-lg font-bold">Editar horario: {editingDia}</h3></div>
                          <div className="mt-1 space-y-3">
                            <div className="flex items-center gap-2">
                              <Checkbox id="cerrado" checked={tmpCerrado} onChange={(e) => setTmpCerrado(e.target.checked)} />
                              <label htmlFor="cerrado" className="text-sm">Cerrado todo el día</label>
                            </div>
                            {!tmpCerrado && (
                              <div className="grid grid-cols-2 gap-3">
                                <div><Label>Desde</Label><Input type="time" value={tmpApertura} onChange={(e) => setTmpApertura(e.target.value)} className="mt-1" /></div>
                                <div><Label>Hasta</Label><Input type="time" value={tmpCierre} onChange={(e) => setTmpCierre(e.target.value)} className="mt-1" /></div>
                              </div>
                            )}
                            <div className="flex justify-end gap-2 pt-2">
                              <Button className="bg-gray-200 text-gray-800" type="button" onClick={() => setEditingDia(null)}>Cancelar</Button>
                              <Button type="button" onClick={saveEditDiaLocal}>Guardar</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Redes Sociales</Label>
                    <div className="mt-2">
                      <Label>Instagram</Label>
                      <Input value={comercioDraft.redes.instagram} onChange={(e) => setComercioDraft({ ...comercioDraft, redes: { ...comercioDraft.redes, instagram: e.target.value } })} placeholder="Instagram" className="mt-1" />
                    </div>
                    <div className="mt-2">
                      <Label>Facebook</Label>
                      <Input value={comercioDraft.redes.facebook} onChange={(e) => setComercioDraft({ ...comercioDraft, redes: { ...comercioDraft.redes, facebook: e.target.value } })} placeholder="Facebook" className="mt-2" />
                    </div>
                    <div className="mt-2">
                      <Label>Tik Tok</Label>
                      <Input value={comercioDraft.redes.tiktok} onChange={(e) => setComercioDraft({ ...comercioDraft, redes: { ...comercioDraft.redes, tiktok: e.target.value } })} placeholder="tiktok" className="mt-2" />
                    </div>
                  </div>

                  <div>
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {comercioDraft.tags.map((t) => (
                        <span key={t} className="px-2 py-1 rounded-full text-xs bg-gray-100 border">
                          {t}
                          <button className="ml-2 text-gray-500 hover:text-gray-700" onClick={() => setComercioDraft(prev => ({ ...prev, tags: prev.tags.filter(x => x !== t) }))}>×</button>
                        </span>
                      ))}
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">Seleccioná una o varias tags para agregar:</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {availableTags.map((tag) => (
                          <label key={tag} className={`flex items-center gap-2 border rounded px-2 py-1 cursor-pointer ${tempSelectedTags.includes(tag) ? 'bg-blue-50 border-blue-300' : 'bg-white'}`}>
                            <input type="checkbox" checked={tempSelectedTags.includes(tag)} onChange={() => toggleTempTag(tag)} />
                            <span className="text-sm">{tag}</span>
                          </label>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Button onClick={addSelectedTagsToDraft} disabled={!tempSelectedTags.length}>+ Agregar seleccionadas</Button>
                        {!!tempSelectedTags.length && (
                          <Button type="button" className="bg-gray-200 text-gray-800" onClick={() => setTempSelectedTags([])}>Limpiar selección</Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <DialogClose asChild>
                      <Button className="bg-red-500 text-white hover:bg-red-700 hover:text-white" type="button">Cancelar</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button type="button" onClick={saveBusiness}>Guardar</Button>
                    </DialogClose>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Modal de éxito */}
      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="max-w-sm p-6 sm:p-7 rounded-2xl">
          <DialogHeader>
            <DialogTitle>Cambios guardados</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <p className="text-sm text-gray-700 leading-relaxed">
              {successMessage || 'Cambios guardados exitosamente.'}
            </p>
          </div>
          <div className="flex justify-end pt-4">
            <Button className="px-5" onClick={() => setSuccessOpen(false)}>Aceptar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
