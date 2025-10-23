import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin - Inicio - Revista Matices',
  description: 'Panel de administración de Revista Matices',
};

export default function AdminInicioPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Panel de Administración
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Estadísticas rápidas */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Total de Comercios
            </h3>
            <p className="text-3xl font-bold text-blue-600">24</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Eventos Activos
            </h3>
            <p className="text-3xl font-bold text-green-600">12</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Notas Publicadas
            </h3>
            <p className="text-3xl font-bold text-purple-600">48</p>
          </div>
        </div>
        
        {/* Acciones rápidas */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Acciones Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              href="/admin/eventos" 
              className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-center transition-colors"
            >
              Gestionar Eventos
            </Link>
            <Link 
              href="/admin/notas" 
              className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg text-center transition-colors"
            >
              Gestionar Notas
            </Link>
            <Link 
              href="/admin/beneficios" 
              className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg text-center transition-colors"
            >
              Gestionar Beneficios
            </Link>
            <Link 
              href="/admin/clientes" 
              className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-lg text-center transition-colors"
            >
              Gestionar Clientes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}