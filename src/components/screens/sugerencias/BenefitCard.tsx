import Image from 'next/image';
import { Gift, Calendar, Copy, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Benefit } from '@/types/sugerencias';
import { useState } from 'react';
import { ModalPromo } from '@/components/screens/sugerencias';

interface BenefitCardProps {
  benefit: Benefit;
  onRedeem?: (benefit: Benefit) => void;
}

export default function BenefitCard({ benefit, onRedeem }: BenefitCardProps) {
  const [copied, setCopied] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(benefit.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error copying code:', err);
    }
  };

  const getDiscountColor = () => {
    if (benefit.discount === 'GRATIS') return 'bg-green-500';
    if (benefit.discountPercentage && benefit.discountPercentage >= 30) return 'bg-red-500';
    if (benefit.discountPercentage && benefit.discountPercentage >= 20) return 'bg-orange-500';
    return 'bg-blue-500';
  };

  return (
    <Card className="group transition-all duration-300 overflow-hidden">
      {/* Header with Business Info */}
      <div className="relative h-64 bg-gradient-to-r from-purple-500 to-pink-500 overflow-hidden">
        {/* Video Background */}
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={(e) => {
            console.warn('Error loading video:', benefit.businessLogo);
            // Fallback to gradient background if video fails
            e.currentTarget.style.display = 'none';
          }}
        >
          <source src={benefit.businessLogo} type="video/mp4" />
        </video>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Discount Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className={`${getDiscountColor()} text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg`}>
            {benefit.discount}
          </div>
        </div>

        {/* Business Name */}
        <div className="absolute bottom-4 left-4 z-10">
          <h4 className="text-white font-bold text-lg drop-shadow-lg">
            {benefit.business}
          </h4>
        </div>
      </div>
          
      
      {/* Content */}
      <CardContent className="p-4 justify-between flex flex-col" >
        <h3 className="font-bold text-base text-gray-900 mb-1 line-clamp-2">
          {benefit.title}
        </h3>
        
        <p className="text-gray-600 text-xs mb-2 line-clamp-2">
          {benefit.description}
        </p>

        {/* Valid Until */}
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Válido hasta: {formatDate(benefit.validUntil)}</span>
        </div>

        {/* Category Badge */}
        <div className="mb-2">
          <Badge variant="outline" className="text-xs">
            <Gift className="h-3 w-3 mr-1" />
            {benefit.category}
          </Badge>
        </div>

        {/* Terms Preview */}
        {benefit.terms && benefit.terms.length > 0 && (
          <div className="mb-2">
            <span className="text-xs text-gray-500 uppercase tracking-wide">Términos:</span>
            <ul className="text-xs text-gray-600 mt-1 space-y-0.5">
              {benefit.terms.slice(0, 1).map((term, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-1">•</span>
                  <span className="line-clamp-1">{term}</span>
                </li>
              ))}
              {benefit.terms.length > 1 && (
                <li className="text-blue-600">
                  +{benefit.terms.length - 1} términos más...
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Usage Limit */}
        {benefit.usageLimit && (
          <div className="text-xs text-gray-500 mb-2">
            Límite: {benefit.usageLimit} usos
          </div>
        )}

        {/* Action Button */}
        <Button 
          className="hover:shadow-xl w-full bg-gradient-to-r from-green-600 to-green-600 hover:cursor-pointer hover:from-green-700 hover:to-white-700 text-white text-sm py-2"
          disabled={!benefit.isActive}
          onClick={() => {
            if (!benefit.isActive) return;
            onRedeem?.(benefit);
          }}
        >
          {benefit.isActive ? 'Canjear Beneficio' : 'No Disponible'}
        </Button>
      </CardContent>
    </Card>
  );
}

