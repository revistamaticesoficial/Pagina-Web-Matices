import { MapPin, Phone, Globe, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Comercio } from '@/types/sugerencias';

interface ComercioCardProps {
  comercio: Comercio;
}

export function ComercioCard({ comercio }: ComercioCardProps) {
  const renderBusinessLogo = () => {
    // Custom logos for specific businesses
    if (comercio.name === 'Betos') {
      return (
        <div className="text-white text-center">
          <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mb-2 mx-auto">
            <span className="font-bold text-lg">B</span>
          </div>
          <div className="text-2xl font-bold">el verdadero</div>
          <div className="text-3xl font-bold">LOMITO</div>
        </div>
      );
    }
    
    if (comercio.name === 'Vidón Bar') {
      return (
        <div className="text-white text-center">
          <div className="text-4xl font-serif italic mb-2">Vidón</div>
          <div className="text-lg tracking-wider">~ BAR ~</div>
        </div>
      );
    }
    
    if (comercio.name === 'Pizza Libre') {
      return (
        <div className="text-black text-center">
          <div className="text-3xl font-bold">PIZZA</div>
          <div className="text-2xl font-serif italic">Libre</div>
        </div>
      );
    }
    
    if (comercio.name === 'Kit Wonder') {
      return (
        <div className="text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto">
            <span className="text-2xl font-bold">W</span>
          </div>
          <div className="text-lg font-bold">KIT WONDER</div>
        </div>
      );
    }
    
    // Default logo for other businesses
    return (
      <div className="text-white text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto">
          <span className="text-2xl font-bold">
            {comercio.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="text-lg font-bold">{comercio.name}</div>
      </div>
    );
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Logo Section */}
      <div className={`${comercio.backgroundColor} h-48 flex items-center justify-center relative`}>
        {renderBusinessLogo()}
        
        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-white/90 text-gray-900 text-xs">
            {comercio.category}
          </Badge>
        </div>
      </div>
      
      {/* Content */}
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {comercio.name}
          </h3>
          <Star className="h-4 w-4 text-yellow-500 flex-shrink-0 ml-2" />
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {comercio.description}
        </p>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
          <div className="min-w-0">
            <div className="truncate">{comercio.location}</div>
            <div className="text-xs text-gray-400">{comercio.neighborhood}</div>
          </div>
        </div>

        {/* Contact Info */}
        {comercio.contact && (
          <div className="space-y-1 mb-4">
            {comercio.contact.phone && (
              <div className="flex items-center text-sm text-gray-500">
                <Phone className="h-4 w-4 mr-2" />
                <span>{comercio.contact.phone}</span>
              </div>
            )}
            {comercio.contact.website && (
              <div className="flex items-center text-sm text-gray-500">
                <Globe className="h-4 w-4 mr-2" />
                <span className="truncate">{comercio.contact.website}</span>
              </div>
            )}
          </div>
        )}

        {/* Services */}
        {comercio.services && comercio.services.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {comercio.services.slice(0, 3).map((service, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {service}
              </Badge>
            ))}
            {comercio.services.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{comercio.services.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
