'use client';

import { BusinessWithDetails, DAYS_OF_WEEK } from '@/types/business';
import { MapPin, Phone, Clock, Edit } from 'lucide-react';

interface BusinessOverviewProps {
  business: BusinessWithDetails;
}

export function BusinessOverview({ business }: BusinessOverviewProps) {
  const formatBusinessHours = () => {
    if (!business.business_hours || business.business_hours.length === 0) {
      return 'Horarios no configurados';
    }

    return business.business_hours.map(hour => {
      const dayName = DAYS_OF_WEEK[hour.day_of_week];
      return `${dayName}: ${hour.open_time} - ${hour.close_time}`;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          {business.logo_url ? (
            <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
              <img 
                src={business.logo_url} 
                alt={`Logo de ${business.name}`}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-600">
                {business.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{business.name}</h2>
            <p className="text-gray-600 mt-1">{business.description}</p>
          </div>
        </div>
        
        <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
          <Edit className="w-4 h-4" />
          <span>Editar</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact info */}
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900 flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>Ubicación</span>
          </h3>
          <p className="text-gray-600 text-sm">{business.address || 'No especificada'}</p>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium text-gray-900 flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>Teléfono</span>
          </h3>
          <p className="text-gray-600 text-sm">{business.phone || 'No especificado'}</p>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium text-gray-900 flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Horarios</span>
          </h3>
          <div className="text-gray-600 text-sm">
            {business.business_hours && business.business_hours.length > 0 ? (
              <div className="space-y-1">
                {formatBusinessHours().map((hour, index) => (
                  <div key={index}>{hour}</div>
                ))}
              </div>
            ) : (
              <p>No configurados</p>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {business.benefits?.length || 0}
            </div>
            <div className="text-sm text-gray-600">Beneficios activos</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {business.events?.length || 0}
            </div>
            <div className="text-sm text-gray-600">Eventos programados</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-sm text-gray-600">Visitas este mes</div>
          </div>
        </div>
      </div>
    </div>
  );
}

