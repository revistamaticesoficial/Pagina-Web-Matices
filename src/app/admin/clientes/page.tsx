"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  Calendar,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import Image from 'next/image';

interface Cliente {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
  created_at: string;
  isOnboardingComplete?: boolean;
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    loadClientes();
  }, []);

  useEffect(() => {
    filterClientes();
  }, [clientes, searchTerm, roleFilter, sortBy, sortOrder]);

  const loadClientes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error cargando clientes:', error);
        return;
      }

      setClientes(data || []);
    } catch (error) {
      console.error('Error cargando clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterClientes = () => {
    let filtered = [...clientes];

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(cliente =>
        cliente.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por rol
    if (roleFilter !== 'all') {
      filtered = filtered.filter(cliente => cliente.role === roleFilter);
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Cliente];
      let bValue: any = b[sortBy as keyof Cliente];

      if (sortBy === 'created_at') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredClientes(filtered);
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'editor':
        return 'bg-blue-100 text-blue-800';
      case 'user':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const exportClientes = () => {
    const csvContent = [
      ['Nombre', 'Rol', 'Fecha de Registro', 'Onboarding Completo'],
      ...filteredClientes.map(cliente => [
        cliente.full_name || 'Sin nombre',
        cliente.role,
        formatDate(cliente.created_at),
        cliente.isOnboardingComplete ? 'Sí' : 'No'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clientes.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const stats = {
    total: clientes.length,
    admins: clientes.filter(c => c.role === 'admin').length,
    editors: clientes.filter(c => c.role === 'editor').length,
    users: clientes.filter(c => c.role === 'user').length,
    onboardingComplete: clientes.filter(c => c.isOnboardingComplete).length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando clientes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Users className="h-8 w-8 mr-3 text-blue-600" />
            Gestión de Clientes
          </h1>
          <p className="text-gray-600">
            Administra y supervisa todos los usuarios registrados en la plataforma
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Clientes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Administradores</p>
                  <p className="text-2xl font-bold text-red-600">{stats.admins}</p>
                </div>
                <UserCheck className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Editores</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.editors}</p>
                </div>
                <Edit className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Usuarios</p>
                  <p className="text-2xl font-bold text-green-600">{stats.users}</p>
                </div>
                <UserX className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Onboarding</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.onboardingComplete}</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros y búsqueda */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por nombre o rol..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-4">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos los roles</option>
                  <option value="admin">Administradores</option>
                  <option value="editor">Editores</option>
                  <option value="user">Usuarios</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="created_at">Fecha de registro</option>
                  <option value="full_name">Nombre</option>
                  <option value="role">Rol</option>
                </select>

                <Button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  variant="outline"
                  className="px-3 py-2"
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </Button>

                <Button
                  onClick={exportClientes}
                  variant="outline"
                  className="px-3 py-2"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de clientes */}
        <Card>
          <CardHeader>
            <CardTitle>
              Clientes ({filteredClientes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredClientes.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No se encontraron clientes</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredClientes.map((cliente) => (
                  <div
                    key={cliente.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        {cliente.avatar_url ? (
                          <Image
                            src={cliente.avatar_url}
                            alt={cliente.full_name || 'Usuario'}
                            width={48}
                            height={48}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                            <Users className="h-6 w-6 text-gray-600" />
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {cliente.full_name || 'Sin nombre'}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getRoleColor(cliente.role)}>
                            {cliente.role}
                          </Badge>
                          {cliente.isOnboardingComplete && (
                            <Badge className="bg-green-100 text-green-800">
                              Onboarding Completo
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Registrado el {formatDate(cliente.created_at)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
