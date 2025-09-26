// app/cuenta/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";
import { Checkbox } from "@/components/ui/Checkbox";
import Image from 'next/image'

const DIAS = [
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
  "domingo",
] as const;

type Dia = typeof DIAS[number];

type Horario = { apertura: string; cierre: string } | { apertura: "Cerrado"; cierre: "Cerrado" };

type ComercioState = {
  cargo: string;
  categoria: string;
  descripcion?: string;
  direccion: string;
  telefono: string;
  horarios: Record<Dia, Horario>;
  redes: { instagram: string; facebook: string; tiktok: string };
  tags: string[];
};

type UserState = {
  nombre: string;
  apellido: string;
  email: string;
  foto: string;
};

export default function CuentaPage() {
  // Estado principal
  const [user, setUser] = useState<UserState>({
    nombre: "Juan",
    apellido: "Pérez",
    email: "juanperez@gmail.com",
    foto: "https://via.placeholder.com/80"
  });

  const [comercio, setComercio] = useState<ComercioState>({
    cargo: "Dueño",
    categoria: "Gastronomía",
    direccion: "Av. Principal 123",
    telefono: "123456789",
    horarios: {
      lunes: { apertura: "09:00", cierre: "18:00" },
      martes: { apertura: "09:00", cierre: "18:00" },
      miercoles: { apertura: "09:00", cierre: "18:00" },
      jueves: { apertura: "09:00", cierre: "18:00" },
      viernes: { apertura: "09:00", cierre: "18:00" },
      sabado: { apertura: "10:00", cierre: "14:00" },
      domingo: { apertura: "Cerrado", cierre: "Cerrado" },
    },
    redes: {
      instagram: "@miComercio",
      facebook: "facebook.com/miComercio",
      tiktok: "tiktok.com/miComercio",
    },
    tags: ["Delivery", "Local Físico"],
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

  // Nueva selección múltiple temporal de tags
  const [tempSelectedTags, setTempSelectedTags] = useState<string[]>([]);

  const toggleTempTag = (tag: string) => {
    setTempSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const addSelectedTagsToDraft = () => {
    if (tempSelectedTags.length === 0) return;
    setComercioDraft((prev) => {
      const merged = Array.from(new Set([...(prev.tags || []), ...tempSelectedTags]));
      return { ...prev, tags: merged };
    });
    setTempSelectedTags([]);
  };

  // Horarios: edición por día
  const [editingDia, setEditingDia] = useState<Dia | null>(null);
  const [tmpApertura, setTmpApertura] = useState<string>("");
  const [tmpCierre, setTmpCierre] = useState<string>("");
  const [tmpCerrado, setTmpCerrado] = useState<boolean>(false);
  
  // Errores de foto
  const [photoError, setPhotoError] = useState<string>("");

  const openEditDia = (dia: Dia) => {
    setEditingDia(dia);
    const h = comercioDraft.horarios[dia];
    if (h.apertura === "Cerrado") {
      setTmpCerrado(true);
      setTmpApertura("");
      setTmpCierre("");
    } else {
      setTmpCerrado(false);
      setTmpApertura(h.apertura);
      setTmpCierre(h.cierre);
    }
  };

  const saveEditDia = () => {
    if (!editingDia) return;
    const nuevo: Horario = tmpCerrado
      ? { apertura: "Cerrado", cierre: "Cerrado" }
      : { apertura: tmpApertura || "09:00", cierre: tmpCierre || "18:00" };
    setComercioDraft((prev) => ({
      ...prev,
      horarios: { ...prev.horarios, [editingDia]: nuevo },
    }));
    setEditingDia(null);
  };

  const removeTagDraft = (t: string) => {
    setComercioDraft((prev) => ({ ...prev, tags: prev.tags.filter((x) => x !== t) }));
  };

  const formatHorario = (h: Horario) =>
    h.apertura === "Cerrado" ? "Cerrado" : `${h.apertura} - ${h.cierre}`;

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6">
      {/* Card Usuario */}
      <h4 className="text-2xl font-extrabold text-[#005B82]">Cuenta</h4>
      <Card className=" bg-blue-50 shadow-lg hover:shadow-xl duration-300 shadow-sm py-4">
        <CardContent className="pt-2 pb-4 px-6">
          <div className="flex items-center gap-4">
            <Image src={"/images/foto-perfil.jpg"} alt="Foto perfil" width={80} height={80} className="rounded-full w-20 h-20 object-cover border border-[#000]" />
            <div>
              <p className="font-semibold">{user.nombre} {user.apellido}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
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
                      <img
                        src={userDraft.foto || "/imagenes/foto-perfil.jpg"}
                        alt="Vista previa"
                        className="w-20 h-20 rounded-full object-cover ring-2 ring-[#005B82]"
                      />
                      <div className="flex flex-col gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            setPhotoError("");
                            const file = e.target.files?.[0];
                            if (!file) return;
                            if (!file.type.startsWith("image/")) {
                              setPhotoError("El archivo debe ser una imagen.");
                              return;
                            }
                            if (file.size > 2 * 1024 * 1024) { // 2MB
                              setPhotoError("La imagen no puede superar 2MB.");
                              return;
                            }
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              const result = ev.target?.result as string | undefined;
                              if (result) setUserDraft({ ...userDraft, foto: result });
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
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
                      <Button type="button" onClick={() => setUser(userDraft)}>Guardar</Button>
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
      <Card className="shadow-lg hover:shadow-xl duration-300 bg-blue-50 shadow-sm py-4">
        <CardContent className="space-y-2 px-6 pb-5 text-left">
          {/* resumen visual */}
          <p><strong>Cargo:</strong> {comercio.cargo}</p>
          <p><strong>Categoría:</strong> {comercio.categoria}</p>
          <p><strong>Dirección:</strong> {comercio.direccion}</p>
          <p><strong>Teléfono:</strong> {comercio.telefono}</p>
          <p><strong>Redes:</strong> {comercio.redes.instagram}, {comercio.redes.facebook}</p>
          <p><strong>Tags:</strong> {comercio.tags.join(", ")}</p>

          <div className="mt-3 w-full flex justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" className="rounded-full" onClick={() => setComercioDraft(comercio)}>+</Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-auto p-6">
                <DialogHeader>
                  <DialogTitle>Editar Comercio</DialogTitle>
                </DialogHeader>

                <div className="grid gap-5 pt-2">
                  {/* campos existentes ... */}

                  {/* Cargo */}
                  <div>
                    <Label>Cargo</Label>
                    <Select defaultValue={comercioDraft.cargo}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Seleccioná cargo" /></SelectTrigger>
                      <SelectContent>
                        {['Dueño','Encargado','Gerente','Empleado','Otro'].map(opt => (
                          <SelectItem key={opt} value={opt} onClick={() => setComercioDraft({ ...comercioDraft, cargo: opt })}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Categoría */}
                  <div>
                    <Label>Categoría</Label>
                    <Select defaultValue={comercioDraft.categoria}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Seleccioná categoría" /></SelectTrigger>
                      <SelectContent>
                        {['Gastronomía','Servicios','Salud','Educación','Deportes','Inmobiliaria'].map(opt => (
                          <SelectItem key={opt} value={opt} onClick={() => setComercioDraft({ ...comercioDraft, categoria: opt })}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                   {/* Descripción */}
                   <div>
                    <Label>Descripción</Label>
                    <Input value={comercioDraft.descripcion} onChange={(e) => setComercioDraft({ ...comercioDraft, descripcion: e.target.value })} className="mt-1" placeholder="Ej: local de comida" />
                  </div>

                  {/* Dirección */}
                  <div>
                    <Label>Dirección</Label>
                    <Input value={comercioDraft.direccion} onChange={(e) => setComercioDraft({ ...comercioDraft, direccion: e.target.value })} className="mt-1" placeholder="Ej: Av. Principal 123" />
                  </div>

                  {/* Teléfono */}
                  <div>
                    <Label>Teléfono</Label>
                    <Input type="tel" inputMode="tel" value={comercioDraft.telefono} onChange={(e) => setComercioDraft({ ...comercioDraft, telefono: e.target.value })} className="mt-1" placeholder="Ej: 351 123 4567" />
                  </div>

                  {/* Horarios (resumen + editar por día) */}
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

                    {/* Overlay edición por día */}
                    {editingDia && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
                        <div className="absolute inset-0 bg-black/50" onClick={() => setEditingDia(null)} />
                        <div className="relative z-10 w-full max-w-md mx-4 bg-white rounded-lg shadow-xl p-6" onClick={(e) => e.stopPropagation()}>
                          <div className="mb-4">
                            <h3 className="text-lg font-bold">Editar horario: {editingDia}</h3>
                          </div>
                          <div className="mt-1 space-y-3">
                            <div className="flex items-center gap-2">
                              <Checkbox id="cerrado" checked={tmpCerrado} onChange={(e) => setTmpCerrado(e.target.checked)} />
                              <label htmlFor="cerrado" className="text-sm">Cerrado todo el día</label>
                            </div>
                            {!tmpCerrado && (
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <Label>Desde</Label>
                                  <Input type="time" value={tmpApertura} onChange={(e) => setTmpApertura(e.target.value)} className="mt-1" />
                                </div>
                                <div>
                                  <Label>Hasta</Label>
                                  <Input type="time" value={tmpCierre} onChange={(e) => setTmpCierre(e.target.value)} className="mt-1" />
                                </div>
                              </div>
                            )}
                            <div className="flex justify-end gap-2 pt-2">
                              <Button className="bg-gray-200 text-gray-800" type="button" onClick={() => setEditingDia(null)}>Cancelar</Button>
                              <Button type="button" onClick={saveEditDia}>Guardar</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Redes Sociales */}
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
                          <button className="ml-2 text-gray-500 hover:text-gray-700" onClick={() => removeTagDraft(t)}>×</button>
                        </span>
                      ))}
                    </div>

                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">Seleccioná una o varias tags para agregar:</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {availableTags.map((tag) => (
                          <label key={tag} className={`flex items-center gap-2 border rounded px-2 py-1 cursor-pointer ${tempSelectedTags.includes(tag) ? 'bg-blue-50 border-blue-300' : 'bg-white'}`}>
                            <input
                              type="checkbox"
                              checked={tempSelectedTags.includes(tag)}
                              onChange={() => toggleTempTag(tag)}
                            />
                            <span className="text-sm">{tag}</span>
                          </label>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Button onClick={addSelectedTagsToDraft} disabled={tempSelectedTags.length === 0}>+ Agregar seleccionadas</Button>
                        {tempSelectedTags.length > 0 && (
                          <Button type="button" className="bg-gray-200 text-gray-800" onClick={() => setTempSelectedTags([])}>Limpiar selección</Button>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Tags */}
                  {/* This section is now redundant as tags are handled by tempSelectedTags */}
                  {/* <div>
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {comercioDraft.tags.map((t) => (
                        <span key={t} className="px-2 py-1 rounded-full text-xs bg-gray-100 border">
                          {t}
                          <button className="ml-2 text-gray-500 hover:text-gray-700" onClick={() => removeTagDraft(t)}>×</button>
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Select value={tagToAdd || ""} onValueChange={(value) => setTagToAdd(value)}>
                        <SelectTrigger className="min-w-[220px]"><SelectValue placeholder="Seleccionar tag" /></SelectTrigger>
                        <SelectContent>
                          {availableTags.map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button onClick={() => addTagDraft()} disabled={!tagToAdd}>+ Agregar</Button>
                    </div>
                  </div> */}

                  <div className="flex justify-end gap-2 pt-2">
                    <DialogClose asChild>
                      <Button className="bg-red-500 text-white hover:bg-red-700 hover:text-white" type="button">Cancelar</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button type="button" onClick={() => setComercio(comercioDraft)}>Guardar</Button>
                    </DialogClose>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
