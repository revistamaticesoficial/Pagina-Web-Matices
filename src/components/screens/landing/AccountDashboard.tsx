'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { storageService } from '@/lib/storage-service';
import {
  Calendar,
  TicketPercent,
  MapPin,
  ArrowUpRight,
  Sparkles,
  Mail,
  User,
  Camera,
  Phone,
  Bell,
  ShieldCheck,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Inicio', anchor: 'inicio' },
  { label: 'Eventos', anchor: 'eventos' },
  { label: 'Beneficios', anchor: 'beneficios' },
  { label: 'Contacto', anchor: 'contacto' },
  { label: 'Cuenta', anchor: 'cuenta' },
];

const stats = [
  {
    label: 'Eventos Asistidos',
    value: 30,
    change: '+12% este trimestre',
    color: 'from-[#0f4c75] to-[#3282b8]',
    icon: Calendar,
  },
  {
    label: 'Cupones Canjeados',
    value: 48,
    change: '+8 nuevos comercios',
    color: 'from-[#f97316] to-[#fb923c]',
    icon: TicketPercent,
  },
  {
    label: 'Comercios Visitados',
    value: 15,
    change: '4 lugares favoritos',
    color: 'from-[#22c55e] to-[#4ade80]',
    icon: MapPin,
  },
];

const monthlyActivity = [
  { month: 'Enero', events: 22, attendance: 95 },
  { month: 'Febrero', events: 18, attendance: 88 },
  { month: 'Marzo', events: 25, attendance: 92 },
  { month: 'Abril', events: 27, attendance: 94 },
  { month: 'Mayo', events: 30, attendance: 97 },
  { month: 'Junio', events: 24, attendance: 89 },
];

// Datos placeholders – quedarán vacíos hasta conectarlos a Supabase
const favoriteBenefits: {
  business: string;
  uses: number;
  lastUse: string;
  discount: string;
  color: string;
}[] = [];

const upcomingEvents: {
  title: string;
  date: string;
  venue: string;
  status: string;
}[] = [];

export function AccountDashboard() {
  const { authState } = useAuth();
  const router = useRouter();
  const [activeNav, setActiveNav] = useState('Inicio');
  const [selectedMonth, setSelectedMonth] = useState(monthlyActivity.at(-1)?.month ?? 'Junio');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ---- Estado local del formulario de perfil conectado a Supabase ----
  const fullNameFromAuth =
    authState.user?.profile?.full_name ||
    [authState.user?.firstName, authState.user?.lastName].filter(Boolean).join(' ') ||
    'Usuario Matices';
  const emailFromAuth = authState.user?.email || 'usuario@revistamatices.com';
  // Obtener teléfono desde profile (puede que no esté en el tipo todavía)
  const phoneFromAuth = (authState.user?.profile as any)?.phone || '';

  const [fullNameInput, setFullNameInput] = useState(fullNameFromAuth);
  const [emailInput, setEmailInput] = useState(emailFromAuth);
  const [phoneInput, setPhoneInput] = useState(phoneFromAuth);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    authState.user?.profile?.avatar_url || null,
  );
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const selectedMetrics = useMemo(
    () => monthlyActivity.find((item) => item.month === selectedMonth) ?? monthlyActivity[0],
    [selectedMonth],
  );

  // Sincronizar cuando cambie el usuario autenticado
  useEffect(() => {
    setFullNameInput(fullNameFromAuth);
    setEmailInput(emailFromAuth);
    setPhoneInput(phoneFromAuth);
  }, [fullNameFromAuth, emailFromAuth, phoneFromAuth]);

  useEffect(() => {
    setAvatarUrl(authState.user?.profile?.avatar_url || null);
  }, [authState.user?.profile?.avatar_url]);

  const handleAvatarFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file || !authState.user) return;

    setAvatarError(null);

    // Validaciones rápidas antes de marcar como "subiendo"
    if (!storageService.isValidImageFile(file)) {
      setAvatarError('Por favor seleccioná una imagen válida (JPG, PNG, GIF, WEBP).');
      event.target.value = '';
      return;
    }

    const sizeMB = storageService.getFileSizeMB(file);
    if (sizeMB > 10) {
      setAvatarError(`La imagen no debe superar los 10MB. Tamaño actual: ${sizeMB.toFixed(2)}MB`);
      event.target.value = '';
      return;
    }

    setIsUploadingAvatar(true);

    try {
      const uploadResult = await storageService.uploadImage(
        file,
        'profile', // nombre real del bucket en Supabase Storage
        `avatars/${authState.user.id}`,
      );

      if (!uploadResult?.url) {
        throw new Error('No se pudo subir la imagen de perfil.');
      }

      const newUrl = uploadResult.url;

      // Guardar URL en la tabla profiles
      const { error: profileUpdateError } = await supabase
        .from('profiles')
        .update({ avatar_url: newUrl })
        .eq('id', authState.user.id);

      if (profileUpdateError) {
        throw profileUpdateError;
      }

      // Opcional: sincronizar metadata de auth
      const { error: authUpdateError } = await supabase.auth.updateUser({
        data: {
          avatar_url: newUrl,
        },
      });

      if (authUpdateError) {
        console.warn('Error actualizando avatar_url en user_metadata:', authUpdateError);
      }

      setAvatarUrl(newUrl);
      setProfileSuccess('Foto de perfil actualizada correctamente.');
    } catch (error: any) {
      console.error('Error al actualizar la foto de perfil:', error);
      setAvatarError(
        error?.message ?? 'No se pudo actualizar la foto de perfil. Intenta nuevamente más tarde.',
      );
    } finally {
      setIsUploadingAvatar(false);
      // resetear input para permitir volver a seleccionar la misma imagen si quiere
      event.target.value = '';
    }
  };

  const handleProfileSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!authState.user) return;

    setIsSavingProfile(true);
    setProfileError(null);
    setProfileSuccess(null);

    try {
      const trimmedName = fullNameInput.trim();
      const trimmedEmail = emailInput.trim();
      const trimmedPhone = phoneInput.trim();

      // Validar email
      if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        throw new Error('El email ingresado no es válido.');
      }

      // Actualizar tabla profiles en Supabase (nombre y teléfono)
      const { error: profileUpdateError } = await supabase
        .from('profiles')
        .update({
          full_name: trimmedName || null,
          phone: trimmedPhone || null,
        })
        .eq('id', authState.user.id);

      if (profileUpdateError) {
        throw profileUpdateError;
      }

      // Actualizar email en auth.users (solo si cambió)
      if (trimmedEmail !== emailFromAuth) {
        const { error: emailUpdateError } = await supabase.auth.updateUser({
          email: trimmedEmail,
        });

        if (emailUpdateError) {
          // Si falla la actualización de email, puede ser porque requiere confirmación
          // En ese caso, Supabase enviará un email de confirmación al nuevo email
          console.warn('Error actualizando email:', emailUpdateError);
          setProfileSuccess(
            'Perfil actualizado. Se envió un email de confirmación al nuevo correo electrónico.',
          );
        } else {
          setProfileSuccess(
            'Perfil actualizado correctamente. Revisá tu nuevo email para confirmar el cambio.',
          );
        }
      } else {
        setProfileSuccess('Perfil actualizado correctamente.');
      }

      // Opcional: actualizar metadata de auth para que otros lugares vean el mismo nombre
      const { error: authUpdateError } = await supabase.auth.updateUser({
        data: {
          full_name: trimmedName,
        },
      });

      if (authUpdateError) {
        // No bloqueamos el éxito si solo falla la metadata
        console.warn('Error actualizando user_metadata en Supabase Auth:', authUpdateError);
      }
    } catch (error: any) {
      console.error('Error al actualizar el perfil:', error);
      setProfileError(
        error?.message ?? 'No se pudo actualizar el perfil. Intenta nuevamente más tarde.',
      );
    } finally {
      setIsSavingProfile(false);
    }
  };

  const fullName = fullNameInput;
  const email = emailFromAuth;
  const hasBusiness = Boolean(authState.user?.business);

  const chartPoints = monthlyActivity
    .map((item, index) => {
      const x = (index / (monthlyActivity.length - 1)) * 100;
      const y = 100 - item.attendance;
      return `${x},${y}`;
    })
    .join(' ');

  const eventPoints = monthlyActivity
    .map((item, index) => {
      const x = (index / (monthlyActivity.length - 1)) * 100;
      const y = 100 - item.events;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="min-h-screen bg-slate-50">
      <header
        id="inicio"
        className="bg-gradient-to-r from-[#003c56] to-[#005B82] text-white"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10">
          <p className="text-sm uppercase tracking-[0.35em] text-white/80">Cuenta</p>
          <h1 className="text-3xl font-semibold md:text-4xl">Hola, {fullName}</h1>
          <p className="text-white/80">Gestiona tu participación en Revista Matices</p>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10">
        {!authState.isAuthenticated && !authState.isLoading && (
          <div className="rounded-3xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Iniciá sesión para ver tus datos personalizados.
          </div>
        )}

        <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div id="cuenta" className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Cuenta</p>
                <h3 className="text-2xl font-bold text-slate-900">Configuración de perfil</h3>
              </div>
              <button className="text-sm font-semibold text-slate-900 hover:text-slate-700">
                Ver historial
              </button>
            </div>
            <form className="mt-6 space-y-5" onSubmit={handleProfileSubmit}>
              <div className="flex items-center gap-3">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={fullName}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <User className="h-6 w-6" />
                  </div>
                )}
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600 hover:border-slate-900/50"
                  onClick={() => {
                    if (!authState.isAuthenticated || isUploadingAvatar) return;
                    fileInputRef.current?.click();
                  }}
                  disabled={!authState.isAuthenticated || isUploadingAvatar}
                >
                  <Camera className="h-4 w-4" />
                  {isUploadingAvatar ? 'Subiendo...' : 'Actualizar foto'}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  className="hidden"
                  onChange={handleAvatarFileChange}
                />
              </div>
              {avatarError && (
                <p className="text-xs text-red-600">
                  {avatarError}
                </p>
              )}
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm font-semibold text-slate-600">
                  Nombre completo
                  <input
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900"
                    value={fullNameInput}
                    onChange={(e) => setFullNameInput(e.target.value)}
                    disabled={!authState.isAuthenticated || isSavingProfile}
                  />
                </label>
                <label className="text-sm font-semibold text-slate-600">
                  Email
                  <input
                    type="email"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900"
                    value={emailFromAuth}
                    readOnly
                    disabled
                  />
                </label>
              </div>
              <label className="text-sm font-semibold text-slate-600">
                Teléfono
                <div className="mt-1 flex rounded-xl border border-slate-200">
                  <span className="flex items-center px-3 text-sm text-slate-500">+54</span>
                  <input
                    className="flex-1 rounded-r-xl px-3 py-2 text-sm outline-none focus:border-slate-900"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="351-456-7890"
                    disabled={!authState.isAuthenticated || isSavingProfile}
                  />
                </div>
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-600">
                  <Bell className="h-4 w-4" />
                  Notificaciones de eventos
                  <input type="checkbox" className="ml-auto" defaultChecked />
                </label>
                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-600">
                  <ShieldCheck className="h-4 w-4" />
                  Guardar favoritos automáticamente
                  <input type="checkbox" className="ml-auto" defaultChecked />
                </label>
              </div>
              {profileError && (
                <p className="text-sm text-red-600">
                  {profileError}
                </p>
              )}
              {profileSuccess && (
                <p className="text-sm text-emerald-600">
                  {profileSuccess}
                </p>
              )}
              <button
                type="submit"
                disabled={!authState.isAuthenticated || isSavingProfile}
                className={`w-full rounded-2xl bg-gradient-to-r from-[#003c56] to-[#005B82] py-3 text-sm font-semibold text-white ${
                  (!authState.isAuthenticated || isSavingProfile) ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {isSavingProfile ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </form>
          </div>

          <div id="contacto" className="rounded-3xl bg-slate-900 p-6 text-white shadow-lg">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Soporte</p>
            <h3 className="mt-3 text-2xl font-bold">¿Necesitás ayuda?</h3>
            <p className="mt-2 text-white/80">
              Nuestro equipo responde consultas sobre eventos, beneficios y actualización de datos.
            </p>
            <div className="mt-6 space-y-3">
              <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white/10 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                <Mail className="h-4 w-4" />
                Enviar mensaje
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3 text-sm font-semibold text-slate-900">
                <Phone className="h-4 w-4" />
                Contacto directo
              </button>
            </div>
            <div className="mt-8 rounded-2xl bg-slate-800/80 p-4 text-sm text-white/70">
              <p className="font-semibold text-white">Espacios sugeridos</p>
              <p>Explorá nuevos comercios destacados según tus últimas visitas.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`inline-flex items-center rounded-full bg-gradient-to-r ${item.color} px-3 py-1 text-xs font-semibold text-white`}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </div>
              <p className="mt-5 text-4xl font-bold text-slate-900">{item.value}</p>
              <p className="text-sm text-slate-500">{item.change}</p>
            </div>
          ))}
        </section>



        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                Actividad mensual
              </p>
              <h2 className="text-2xl font-bold text-slate-900">Visión general</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {monthlyActivity.map((item) => (
                <button
                  key={item.month}
                  onClick={() => setSelectedMonth(item.month)}
                  className={`rounded-full border px-3 py-1 text-sm transition ${
                    selectedMonth === item.month
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 text-slate-600 hover:border-slate-900/50'
                  }`}
                >
                  {item.month}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl bg-slate-50 p-4">
              <svg viewBox="0 0 100 100" className="h-60 w-full text-slate-300">
                <polyline
                  points={chartPoints}
                  fill="none"
                  stroke="#1b6ca8"
                  strokeWidth="1.5"
                />
                <polyline
                  points={eventPoints}
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="1.5"
                />
              </svg>
              <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#1b6ca8]" />
                  % Asistencia
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#f97316]" />
                  Eventos
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white shadow-lg">
              <p className="text-sm uppercase tracking-[0.35em] text-white/60">{selectedMonth}</p>
              <h3 className="mt-4 text-4xl font-black">{selectedMetrics.events} eventos</h3>
              <p className="text-white/80">
                Asistencia del {selectedMetrics.attendance}% en experiencias Matices
              </p>
              <div className="mt-6 space-y-3">
                <div>
                  <p className="text-sm text-white/70">Compromiso</p>
                  <div className="mt-1 h-2 rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-200"
                      style={{ width: `${selectedMetrics.attendance}%` }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-white/70">Nuevos contactos</p>
                  <div className="mt-1 h-2 rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-300 to-amber-200"
                      style={{ width: `${Math.min(selectedMetrics.events * 3, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="eventos" className="grid gap-6 lg:grid-cols-[1fr_0.7fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Eventos</p>
                <h3 className="text-2xl font-bold text-slate-900">
                  Próximos encuentros y tu historial
                </h3>
              </div>
              <button className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800">
                Ver calendario
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.title}
                  className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition hover:-translate-y-1 hover:border-slate-200 hover:bg-white"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-slate-900">{event.title}</h4>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {event.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">{event.date}</p>
                  <p className="text-sm font-medium text-slate-600">{event.venue}</p>
                  <button className="inline-flex items-center text-sm font-semibold text-slate-900">
                    Gestionar asistencia <ArrowUpRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div id="beneficios" className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Beneficios</p>
                <h3 className="text-2xl font-bold text-slate-900">Tus favoritos</h3>
              </div>
              <button className="text-sm font-semibold text-slate-900 hover:text-slate-700">
                Explorar más
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {favoriteBenefits.map((benefit) => (
                <div
                  key={benefit.business}
                  className={`rounded-2xl border p-4 ${benefit.color} backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-slate-900">{benefit.business}</h4>
                    <span className="text-xs font-semibold text-slate-500">
                      {benefit.uses} usos
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">{benefit.discount}</p>
                  <p className="mt-2 text-xs text-slate-400">Último canje: {benefit.lastUse}</p>
                  <button className="mt-3 inline-flex items-center text-sm font-semibold text-slate-900">
                    Volver a canjear <ArrowUpRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div id="cuenta" className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Cuenta</p>
                <h3 className="text-2xl font-bold text-slate-900">Configuración de perfil</h3>
              </div>
              <button className="text-sm font-semibold text-slate-900 hover:text-slate-700">
                Ver historial
              </button>
            </div>
            <form className="mt-6 space-y-5">
            <div className="flex items-center gap-3">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={fullName}
                  className="h-14 w-14 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                  <User className="h-6 w-6" />
                </div>
              )}
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600 hover:border-slate-900/50"
                >
                  <Camera className="h-4 w-4" />
                  Actualizar foto
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm font-semibold text-slate-600">
                  Nombre completo
                  <input
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900"
                    defaultValue={fullName}
                  />
                </label>
                <label className="text-sm font-semibold text-slate-600">
                  Email
                  <input
                    type="email"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900"
                    defaultValue={email}
                  />
                </label>
              </div>
              <label className="text-sm font-semibold text-slate-600">
                Teléfono
                <div className="mt-1 flex rounded-xl border border-slate-200">
                  <span className="flex items-center px-3 text-sm text-slate-500">+54</span>
                  <input
                    className="flex-1 rounded-r-xl px-3 py-2 text-sm outline-none focus:border-slate-900"
                    defaultValue="351-456-7890"
                  />
                </div>
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-600">
                  <Bell className="h-4 w-4" />
                  Notificaciones de eventos
                  <input type="checkbox" className="ml-auto" defaultChecked />
                </label>
                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-600">
                  <ShieldCheck className="h-4 w-4" />
                  Guardar favoritos automáticamente
                  <input type="checkbox" className="ml-auto" defaultChecked />
                </label>
              </div>
              <button className="w-full rounded-2xl bg-gradient-to-r from-[#003c56] to-[#005B82] py-3 text-sm font-semibold text-white">
                Guardar cambios
              </button>
            </form>
          </div>

          <div id="contacto" className="rounded-3xl bg-slate-900 p-6 text-white shadow-lg">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Soporte</p>
            <h3 className="mt-3 text-2xl font-bold">¿Necesitás ayuda?</h3>
            <p className="mt-2 text-white/80">
              Nuestro equipo responde consultas sobre eventos, beneficios y actualización de datos.
            </p>
            <div className="mt-6 space-y-3">
              <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white/10 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                <Mail className="h-4 w-4" />
                Enviar mensaje
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3 text-sm font-semibold text-slate-900">
                <Phone className="h-4 w-4" />
                Contacto directo
              </button>
            </div>
            <div className="mt-8 rounded-2xl bg-slate-800/80 p-4 text-sm text-white/70">
              <p className="font-semibold text-white">Espacios sugeridos</p>
              <p>Explorá nuevos comercios destacados según tus últimas visitas.</p>
            </div>
          </div>
        </section> */}
      </main>

      <div className="mx-auto flex max-w-6xl justify-end px-6 pb-8">
        <button
          onClick={() => {
            if (hasBusiness) {
              router.push('/validation');
            }
          }}
          disabled={!hasBusiness}
          className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
            hasBusiness
              ? 'bg-gradient-to-r from-[#003c56] to-[#005B82] text-white shadow hover:brightness-110'
              : 'cursor-not-allowed bg-slate-200 text-slate-500'
          }`}
        >
          Dashboard
        </button>
      </div>
    </div>
  );
}


