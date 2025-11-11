import Image from 'next/image';
import { Calendar, Clock, MapPin, Users, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Event } from '@/types/sugerencias';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'Gratis';
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0">
        {event.banner_url && event.banner_url.trim() !== '' ? (
          <Image
            src={event.banner_url}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Fallback to gradient background if image fails
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600"></div>
        )}
        
        {/* Date Badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-white rounded-lg p-2 text-center shadow-lg">
            <div className="text-xs font-medium text-gray-600">
              {formatDate(event.date).split(' ')[1]}
            </div>
            <div className="text-lg font-bold text-gray-900">
              {formatDate(event.date).split(' ')[0]}
            </div>
          </div>
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <Badge 
            className={`${event.isFree ? 'bg-green-500' : 'bg-blue-500'} text-white border-0`}
          >
            {formatPrice(event.price)}
          </Badge>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-4 left-4">
          <Badge variant="secondary" className="bg-white/90 text-gray-900">
            <Tag className="h-3 w-3 mr-1" />
            {event.category}
          </Badge>
        </div>
      </div>
      
      {/* Content */}
      <CardContent className="p-6 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {event.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span>{event.time}hs</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="truncate">{event.direction}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{event.date}</span>
          </div>

          {event.capacity && (
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-2" />
              <span>Cupos: {event.capacity}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {event.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Spacer to push button to bottom */}
        <div className="flex-grow"></div>

        {/* Action Button */}
        {/* <Button 
          className="w-full" 
          variant={event.isFree ? "default" : "outline"}
        >
          {event.isFree ? 'Participar Gratis' : 'Ver Detalles'}
        </Button> */}
      </CardContent>
    </Card>
  );
}

