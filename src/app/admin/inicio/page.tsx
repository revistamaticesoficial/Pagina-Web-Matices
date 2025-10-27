"use client";

import { Metadata } from 'next';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { adminService, type DashboardStats } from '@/lib/admin-service';
import { 
  Users, 
  Calendar, 
  FileText, 
  Gift, 
  TrendingUp, 
  Eye,
  Plus,
  BarChart3,
  Clock,
  CheckCircle
} from 'lucide-react';

export default function AdminInicioPage() {
  const [stats, setStats] = useState<DashboardStats>({
    comercios: { total: 0, activos: 0, inactivos: 0 },
    beneficios: { total: 0, activos: 0, redimidos: 0 },
    eventos: { total: 0, proximos: 0, pasados: 0 },
    articulos: { total: 0, publicados: 0, borradores: 0, vistas: 0 },
    usuarios: { total: 0, nuevos_mes: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const dashboardStats = await adminService.getDashboardStats();
      setStats(dashboardStats);
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Gestionar Eventos',
      href: '/admin/eventos',
      icon: Calendar,
      color: 'bg-blue-600 hover:bg-blue-700',
      count: stats.eventos.total
    },
    {
      title: 'Gestionar Artículos',
      href: '/admin/articulos',
      icon: FileText,
      color: 'bg-green-600 hover:bg-green-700',
      count: stats.articulos.total
    },
    {
      title: 'Gestionar Beneficios',
      href: '/admin/beneficios',
      icon: Gift,
      color: 'bg-purple-600 hover:bg-purple-700',
      count: stats.beneficios.total
    },
    {
      title: 'Gestionar Comercios',
      href: '/admin/comercios',
      icon: Users,
      color: 'bg-orange-600 hover:bg-orange-700',
      count: stats.comercios.total
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-light text-slate-900 mb-3">
            Dashboard
          </h1>
          <p className="text-slate-600 text-lg">
            Panel de administración de Revista Matices
          </p>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-slate-100 rounded-xl">
                <BarChart3 className="h-6 w-6 text-slate-600" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-light text-slate-900">
                  {loading ? '...' : stats.comercios.total}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {stats.comercios.activos} activos
                </p>
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-600 uppercase tracking-wide">
              Comercios
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Calendar className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-light text-slate-900">
                  {loading ? '...' : stats.eventos.proximos}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {stats.eventos.total} total
                </p>
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-600 uppercase tracking-wide">
              Eventos
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-violet-100 rounded-xl">
                <FileText className="h-6 w-6 text-violet-600" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-light text-slate-900">
                  {loading ? '...' : stats.articulos.publicados}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {stats.articulos.vistas} vistas
                </p>
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-600 uppercase tracking-wide">
              Artículos
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-100 rounded-xl">
                <Gift className="h-6 w-6 text-amber-600" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-light text-slate-900">
                  {loading ? '...' : stats.beneficios.activos}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {stats.beneficios.redimidos} redimidos
                </p>
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-600 uppercase tracking-wide">
              Beneficios
            </h3>
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="mb-12">
          <h2 className="text-3xl font-light text-slate-900 mb-8">
            Acciones Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Link
                  key={index}
                  href={action.href}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-slate-200 transition-colors">
                      <IconComponent className="h-6 w-6 text-slate-600" />
                    </div>
                    <span className="text-2xl font-light text-slate-900">{action.count}</span>
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">{action.title}</h3>
                  <p className="text-sm text-slate-500 group-hover:text-slate-600 transition-colors">
                    Gestionar y administrar {action.title.toLowerCase()}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Resumen de actividad reciente */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h3 className="text-xl font-medium text-slate-900 mb-6 flex items-center">
              <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              Resumen del Sistema
            </h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">Total de comercios registrados</span>
                <span className="font-medium text-slate-900 text-lg">{stats.comercios.total}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">Eventos programados</span>
                <span className="font-medium text-slate-900 text-lg">{stats.eventos.total}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">Beneficios activos</span>
                <span className="font-medium text-slate-900 text-lg">{stats.beneficios.activos}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-slate-600">Artículos publicados</span>
                <span className="font-medium text-slate-900 text-lg">{stats.articulos.publicados}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h3 className="text-xl font-medium text-slate-900 mb-6 flex items-center">
              <div className="p-2 bg-slate-100 rounded-lg mr-3">
                <Clock className="h-5 w-5 text-slate-600" />
              </div>
              Acciones Comunes
            </h3>
            <div className="space-y-4">
              <Link
                href="/admin/eventos"
                className="flex items-center p-4 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="p-2 bg-emerald-100 rounded-lg mr-4 group-hover:bg-emerald-200 transition-colors">
                  <Plus className="h-4 w-4 text-emerald-600" />
                </div>
                <span className="text-slate-700 group-hover:text-slate-900">Crear nuevo evento</span>
              </Link>
              <Link
                href="/admin/beneficios"
                className="flex items-center p-4 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="p-2 bg-violet-100 rounded-lg mr-4 group-hover:bg-violet-200 transition-colors">
                  <Plus className="h-4 w-4 text-violet-600" />
                </div>
                <span className="text-slate-700 group-hover:text-slate-900">Agregar nuevo beneficio</span>
              </Link>
              <Link
                href="/admin/articulos"
                className="flex items-center p-4 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="p-2 bg-amber-100 rounded-lg mr-4 group-hover:bg-amber-200 transition-colors">
                  <Plus className="h-4 w-4 text-amber-600" />
                </div>
                <span className="text-slate-700 group-hover:text-slate-900">Escribir nuevo artículo</span>
              </Link>
              <Link
                href="/admin/comercios"
                className="flex items-center p-4 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="p-2 bg-slate-100 rounded-lg mr-4 group-hover:bg-slate-200 transition-colors">
                  <Eye className="h-4 w-4 text-slate-600" />
                </div>
                <span className="text-slate-700 group-hover:text-slate-900">Ver todos los comercios</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
