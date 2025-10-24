"use client";

import { Metadata } from 'next';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
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
  const [stats, setStats] = useState({
    comercios: 0,
    eventos: 0,
    notas: 0,
    beneficios: 0,
    clientes: 0,
    eventosActivos: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      
      // Cargar estadísticas de comercios
      const { count: comerciosCount } = await supabase
        .from('comercios')
        .select('*', { count: 'exact', head: true });

      // Cargar estadísticas de eventos
      const { count: eventosCount } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true });

      // Cargar eventos activos (fecha >= hoy)
      const { count: eventosActivosCount } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true })
        .gte('date', new Date().toISOString().split('T')[0]);

      // Cargar estadísticas de beneficios
      const { count: beneficiosCount } = await supabase
        .from('benefits')
        .select('*', { count: 'exact', head: true });

      // Cargar estadísticas de clientes (profiles)
      const { count: clientesCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Cargar estadísticas de notas (usando eventos como proxy por ahora)
      const { count: notasCount } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true });

      setStats({
        comercios: comerciosCount || 0,
        eventos: eventosCount || 0,
        notas: notasCount || 0,
        beneficios: beneficiosCount || 0,
        clientes: clientesCount || 0,
        eventosActivos: eventosActivosCount || 0
      });

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
      count: stats.eventos
    },
    {
      title: 'Gestionar Notas',
      href: '/admin/notas',
      icon: FileText,
      color: 'bg-green-600 hover:bg-green-700',
      count: stats.notas
    },
    {
      title: 'Gestionar Beneficios',
      href: '/admin/beneficios',
      icon: Gift,
      color: 'bg-purple-600 hover:bg-purple-700',
      count: stats.beneficios
    },
    {
      title: 'Gestionar Clientes',
      href: '/admin/clientes',
      icon: Users,
      color: 'bg-orange-600 hover:bg-orange-700',
      count: stats.clientes
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-600">
            Bienvenido al panel de administración de Revista Matices
          </p>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Total Comercios
                </h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? '...' : stats.comercios}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Eventos Activos
                </h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? '...' : stats.eventosActivos}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Notas Publicadas
                </h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? '...' : stats.notas}
                </p>
              </div>
              <FileText className="h-8 w-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Clientes Registrados
                </h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? '...' : stats.clientes}
                </p>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Acciones Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Link
                  key={index}
                  href={action.href}
                  className={`${action.color} text-white p-6 rounded-lg transition-all duration-200 hover:shadow-lg group`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="h-8 w-8" />
                    <span className="text-2xl font-bold">{action.count}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm opacity-90 group-hover:opacity-100">
                    Gestionar y administrar {action.title.toLowerCase()}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Resumen de actividad reciente */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
              Resumen del Sistema
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Total de comercios registrados</span>
                <span className="font-semibold text-gray-900">{stats.comercios}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Eventos programados</span>
                <span className="font-semibold text-gray-900">{stats.eventos}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Beneficios activos</span>
                <span className="font-semibold text-gray-900">{stats.beneficios}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Usuarios registrados</span>
                <span className="font-semibold text-gray-900">{stats.clientes}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-500" />
              Acciones Comunes
            </h3>
            <div className="space-y-3">
              <Link
                href="/admin/eventos"
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Plus className="h-4 w-4 mr-3 text-blue-500" />
                <span>Crear nuevo evento</span>
              </Link>
              <Link
                href="/admin/beneficios"
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Plus className="h-4 w-4 mr-3 text-purple-500" />
                <span>Agregar nuevo beneficio</span>
              </Link>
              <Link
                href="/admin/notas"
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Plus className="h-4 w-4 mr-3 text-green-500" />
                <span>Escribir nueva nota</span>
              </Link>
              <Link
                href="/admin/clientes"
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Eye className="h-4 w-4 mr-3 text-orange-500" />
                <span>Ver todos los clientes</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
