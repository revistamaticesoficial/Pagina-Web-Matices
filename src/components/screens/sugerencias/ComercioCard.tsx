import { MapPin, Phone, Globe, Star, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Comercio } from "@/types/sugerencias";
import Link from "next/link";
import Image from "next/image";

interface ComercioCardProps {
  comercio: Comercio;
}

export default function ComercioCard({ comercio }: ComercioCardProps) {
  const renderBusinessLogo = () => {
    return (
      <div className="text-white text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto">
          <span className="text-2xl font-bold">
            {comercio.name.slice(0, 1).toUpperCase()}
          </span>
        </div>
        <div className="text-lg font-bold line-clamp-2">{comercio.name}</div>
      </div>
    );
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
      {/* Logo Section */}
      {comercio.logo_url ? (
        <div className="h-48 flex items-center justify-center relative flex-shrink-0 object-contain w-full">
          <Image
            src={comercio.logo_url}
            alt={comercio.name}
            fill
          />
        </div>
      ) : (
        <div
          className={`bg-gradient-to-r from-[#005B82] via-[#004D6E] to-[#003C56] hover:bg-gradient-to-br h-48 flex items-center justify-center relative flex-shrink-0`}
        >
          {renderBusinessLogo()}

          {/* Category Badge */}
          <div className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className="bg-white/90 text-gray-900 text-xs"
            >
              {comercio.category}
            </Badge>
          </div>
        </div>
      )}

      {/* Content */}
      <CardContent className="p-6 flex flex-col flex-grow">
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
            <div className="truncate">
              {comercio.location || "Dirección no disponible"}
            </div>
            <div className="text-xs text-gray-400">
              {comercio.neighborhood || "Zona Norte"}
            </div>
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
          <div className="flex flex-wrap gap-1 mb-4">
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

        {/* Spacer to push button to bottom */}
        <div className="flex-grow"></div>

        {/* Ver más botón */}
        <Link href={`/comercios/${comercio.id}`}>
          <Button
            variant="outline"
            size="sm"
            className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-600 transition-all duration-300"
          >
            Ver más detalles
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
