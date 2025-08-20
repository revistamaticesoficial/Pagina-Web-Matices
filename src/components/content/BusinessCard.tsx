import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Star, Crown } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Business } from '@/types';
import { getPlanColor, getBusinessImagePlaceholder, truncateText } from '@/lib/utils';

interface BusinessCardProps {
  business: Business;
  variant?: 'default' | 'featured' | 'compact';
}

export function BusinessCard({ business, variant = 'default' }: BusinessCardProps) {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';

  if (isFeatured) {
    return (
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="relative">
          <Image
            src={'/images/logo.jpg'}
            alt={business.name}
            width={600}
            height={300}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
          {business.featured && (
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-yellow-500 text-white">
                <Star className="h-3 w-3 mr-1" />
                Destacado
              </Badge>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge 
              className={`${getPlanColor(business.plan)} text-white border-0`}
            >
              {business.plan}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">
              <Link href={`/comercios/${business.id}`}>
                {business.name}
              </Link>
            </h3>
            {business.plan === 'PREMIUM' && (
              <Crown className="h-5 w-5 text-yellow-500" />
            )}
          </div>
          
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {truncateText(business.description, 150)}
          </p>
          
          {business.services && business.services.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {business.services.slice(0, 3).map((service, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {service}
                  </Badge>
                ))}
                {business.services.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{business.services.length - 3} más
                  </Badge>
                )}
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{business.location.neighborhood}</span>
            </div>
            {business.contact.phone && (
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>{business.contact.phone}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isCompact) {
    return (
      <Card className="group hover:shadow-md transition-all duration-300">
        <div className="flex space-x-4 p-4">
          <div className="relative flex-shrink-0">
            <Image
              src={'/images/logo.jpg'}
              alt={business.name}
              width={80}
              height={80}
              className="w-20 h-20 object-cover rounded-md"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
            {business.featured && (
              <div className="absolute -top-1 -right-1">
                <Star className="h-4 w-4 text-yellow-500" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <Badge 
                className={`${getPlanColor(business.plan)} text-white border-0 text-xs`}
              >
                {business.plan}
              </Badge>
              {business.featured && (
                <Badge variant="secondary" className="text-xs">
                  Destacado
                </Badge>
              )}
            </div>
            
            <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              <Link href={`/comercios/${business.id}`}>
                {business.name}
              </Link>
            </h3>
            
            <p className="text-muted-foreground text-xs mb-2 line-clamp-2">
              {truncateText(business.description, 80)}
            </p>
            
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{business.location.neighborhood}</span>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <Image
          src={'/images/logo.jpg'}
          alt={business.name}
          width={400}
          height={250}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        {business.featured && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-yellow-500 text-white">
              <Star className="h-3 w-3 mr-1" />
              Destacado
            </Badge>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge 
            className={`${getPlanColor(business.plan)} text-white border-0`}
          >
            {business.plan}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
            <Link href={`/comercios/${business.id}`}>
              {business.name}
            </Link>
          </h3>
          {business.plan === 'PREMIUM' && (
            <Crown className="h-4 w-4 text-yellow-500 flex-shrink-0 ml-2" />
          )}
        </div>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {truncateText(business.description, 100)}
        </p>
        
        {business.services && business.services.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {business.services.slice(0, 2).map((service, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {service}
                </Badge>
              ))}
              {business.services.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{business.services.length - 2}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{business.location.neighborhood}</span>
          </div>
          {business.contact.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Contactar</span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

