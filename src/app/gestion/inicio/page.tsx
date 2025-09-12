'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
import {
  TrendingUp,
  Users,
  Calendar,
  Gift,
  Eye,
  Clock,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  BarChart3,
  Activity,
  Target,
  Zap,
  CheckCircle,
  AlertCircle,
  Info,
  Star,
  MessageSquare
} from 'lucide-react';

// Datos simulados para el dashboard
const mockData = {
  metrics: {
    promosActivas: 12,
    eventosProximos: 4,
    suscriptores: 1247,
    visitasHoy: 856,
    visitasSemana: 5423,
    canjesHoy: 23,
    canjesSemana: 156,
    comerciosTotal: 30
  },
  trends: {
    visitasChange: 12.5,
    suscriptoresChange: 8.3,
    canjesChange: -2.1
  },
  recentActivities: [
    {
      id: 1,
      type: 'promo',
      title: 'Nueva promo creada',
      description: '20% OFF en lomitos - Betos',
      time: 'Hace 2 horas',
      status: 'active'
    },
    {
      id: 2,
      type: 'event',
      title: 'Evento programado',
      description: 'Festival de Música del Cerro',
      time: 'Hace 4 horas',
      status: 'pending'
    },
    {
      id: 3,
      type: 'canje',
      title: 'Beneficio canjeado',
      description: 'Promo Pizza Libre - Usuario Juan P.',
      time: 'Hace 6 horas',
      status: 'completed'
    },
    {
      id: 4,
      type: 'subscriber',
      title: 'Nuevo suscriptor',
      description: 'María González se unió a la newsletter',
      time: 'Hace 8 horas',
      status: 'completed'
    }
  ],
  alerts: [
    {
      id: 1,
      type: 'warning',
      title: 'Promo próxima a vencer',
      message: 'La promo "30% OFF helados" vence en 3 días',
      time: 'Hace 1 hora'
    },
    {
      id: 2,
      type: 'info',
      title: 'Nuevo comercio registrado',
      message: 'Café Central se agregó al directorio',
      time: 'Hace 3 horas'
    }
  ],
  quickStats: [
    { label: 'Promos vistas hoy', value: '1,234', change: 15.2 },
    { label: 'Eventos consultados', value: '89', change: 7.8 },
    { label: 'Comercios visitados', value: '456', change: -3.1 },
    { label: 'Páginas totales', value: '12,567', change: 22.4 }
  ]
};

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatChange = (change: number) => {
    const isPositive = change >= 0;
    return {
      value: Math.abs(change),
      isPositive,
      icon: isPositive ? ArrowUpRight : ArrowDownRight,
      color: isPositive ? 'text-green-600' : 'text-red-600'
    };
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'promo': return <Gift className="w-4 h-4 text-purple-500" />;
      case 'event': return <Calendar className="w-4 h-4 text-orange-500" />;
      case 'canje': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'subscriber': return <Users className="w-4 h-4 text-blue-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header con información de tiempo real */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            ¡Hola! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Bienvenido al panel de gestión de Revista Matices
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Última actualización: {currentTime.toLocaleTimeString('es-AR')}</span>
        </div>
      </div>

      {/* Métricas principales con tendencias */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Promos activas</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {mockData.metrics.promosActivas}
                </p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+2 esta semana</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Gift className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Eventos próximos</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {mockData.metrics.eventosProximos}
                </p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">1 confirmado</span>
                </div>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Suscriptores</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {mockData.metrics.suscriptores.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{mockData.trends.suscriptoresChange}%</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Visitas hoy</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {mockData.metrics.visitasHoy}
                </p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{mockData.trends.visitasChange}%</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sección de estadísticas rápidas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Estadísticas de rendimiento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {mockData.quickStats.map((stat, index) => {
              const change = formatChange(stat.change);
              const ChangeIcon = change.icon;
              return (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                  <div className={`flex items-center justify-center mt-1 text-sm ${change.color}`}>
                    <ChangeIcon className="w-3 h-3 mr-1" />
                    {change.value}%
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Grid principal con actividades y acciones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Actividades recientes */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Actividad reciente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockData.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  </div>
                  <Badge
                    variant={activity.status === 'completed' ? 'default' : activity.status === 'active' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {activity.status === 'completed' && 'Completado'}
                    {activity.status === 'active' && 'Activo'}
                    {activity.status === 'pending' && 'Pendiente'}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Gráfico de tendencias semanal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Tendencias semanales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Visitas esta semana</span>
                  <span className="font-semibold">{mockData.metrics.visitasSemana.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Canjes esta semana</span>
                  <span className="font-semibold">{mockData.metrics.canjesSemana}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Comercios totales</span>
                  <span className="font-semibold">{mockData.metrics.comerciosTotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Canjes hoy</span>
                  <span className="font-semibold text-green-600">{mockData.metrics.canjesHoy}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel lateral con acciones y alertas */}
        <div className="space-y-6">
          {/* Accesos rápidos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Accesos rápidos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Crear nueva promo
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Agregar evento
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                Ver estadísticas
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Gestionar suscriptores
              </Button>
            </CardContent>
          </Card>

          {/* Alertas y notificaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Alertas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockData.alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <div className="flex-shrink-0">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{alert.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Información del sistema */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                Estado del sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Base de datos</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Funcionando
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Último backup</span>
                <span className="text-xs text-gray-500">Hace 2 horas</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


