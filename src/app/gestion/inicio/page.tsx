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
    <div className="space-y-6 sm:space-y-8">
      {/* Header con información de tiempo real */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            ¡Hola! 👋
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Bienvenido al panel de gestión de Revista Matices
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 shrink-0">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">Última actualización: {currentTime.toLocaleTimeString('es-AR')}</span>
        </div>
      </div>

      {/* Métricas principales con tendencias */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Promos activas</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">
                  {mockData.metrics.promosActivas}
                </p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-green-600 truncate">+2 esta semana</span>
                </div>
              </div>
              <div className="p-2 sm:p-3 bg-purple-100 rounded-full ml-3 flex-shrink-0">
                <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Eventos próximos</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">
                  {mockData.metrics.eventosProximos}
                </p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-green-600 truncate">1 confirmado</span>
                </div>
              </div>
              <div className="p-2 sm:p-3 bg-orange-100 rounded-full ml-3 flex-shrink-0">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Suscriptores</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">
                  {mockData.metrics.suscriptores.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-green-600 truncate">+{mockData.trends.suscriptoresChange}%</span>
                </div>
              </div>
              <div className="p-2 sm:p-3 bg-blue-100 rounded-full ml-3 flex-shrink-0">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Visitas hoy</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">
                  {mockData.metrics.visitasHoy}
                </p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-green-600 truncate">+{mockData.trends.visitasChange}%</span>
                </div>
              </div>
              <div className="p-2 sm:p-3 bg-green-100 rounded-full ml-3 flex-shrink-0">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sección de estadísticas rápidas */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
            Estadísticas de rendimiento
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {mockData.quickStats.map((stat, index) => {
              const change = formatChange(stat.change);
              const ChangeIcon = change.icon;
              return (
                <div key={index} className="text-center p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1 leading-tight">{stat.label}</div>
                  <div className={`flex items-center justify-center mt-2 text-xs sm:text-sm ${change.color}`}>
                    <ChangeIcon className="w-3 h-3 mr-1 flex-shrink-0" />
                    {change.value}%
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Grid principal con actividades y acciones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Actividades recientes */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
                Actividad reciente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {mockData.recentActivities.map((activity) => (
                <div key={activity.id} className="flex flex-col sm:flex-row sm:items-start gap-3 p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 self-start sm:self-center">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{activity.title}</p>
                      <span className="text-xs text-gray-500 self-start sm:self-center">{activity.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{activity.description}</p>
                  </div>
                  <Badge
                    variant={activity.status === 'completed' ? 'default' : activity.status === 'active' ? 'secondary' : 'outline'}
                    className="text-xs self-start sm:self-center w-fit"
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
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                Tendencias semanales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-lg bg-blue-50">
                  <span className="text-sm font-medium text-gray-700">Visitas esta semana</span>
                  <span className="font-bold text-lg text-blue-600">{mockData.metrics.visitasSemana.toLocaleString()}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-lg bg-purple-50">
                  <span className="text-sm font-medium text-gray-700">Canjes esta semana</span>
                  <span className="font-bold text-lg text-purple-600">{mockData.metrics.canjesSemana}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-lg bg-green-50">
                  <span className="text-sm font-medium text-gray-700">Comercios totales</span>
                  <span className="font-bold text-lg text-green-600">{mockData.metrics.comerciosTotal}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-lg bg-orange-50">
                  <span className="text-sm font-medium text-gray-700">Canjes hoy</span>
                  <span className="font-bold text-lg text-orange-600">{mockData.metrics.canjesHoy}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel lateral con acciones y alertas */}
        <div className="space-y-4 sm:space-y-6">
          {/* Accesos rápidos */}
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                Accesos rápidos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3">
              <Button className="w-full justify-start bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm sm:text-base py-2 sm:py-3">
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                <span className="truncate">Crear nueva promo</span>
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm sm:text-base py-2 sm:py-3">
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                <span className="truncate">Agregar evento</span>
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm sm:text-base py-2 sm:py-3">
                <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                <span className="truncate">Ver estadísticas</span>
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm sm:text-base py-2 sm:py-3">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                <span className="truncate">Gestionar suscriptores</span>
              </Button>
            </CardContent>
          </Card>

          {/* Alertas y notificaciones */}
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                Alertas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {mockData.alerts.map((alert) => (
                <div key={alert.id} className="flex flex-col sm:flex-row sm:items-start gap-3 p-3 sm:p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0 self-start sm:self-center">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">{alert.title}</p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Información del sistema */}
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Info className="w-4 h-4 sm:w-5 sm:h-5" />
                Estado del sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-lg bg-green-50">
                <span className="text-sm font-medium text-gray-700">Base de datos</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Online
                </Badge>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-lg bg-blue-50">
                <span className="text-sm font-medium text-gray-700">API</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Funcionando
                </Badge>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-lg bg-gray-50">
                <span className="text-sm font-medium text-gray-700">Último backup</span>
                <span className="text-xs sm:text-sm text-gray-500 font-medium">Hace 2 horas</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


