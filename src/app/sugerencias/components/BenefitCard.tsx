import Image from 'next/image';
import { Gift, Calendar, Copy, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Benefit } from '@/types/sugerencias';
import { useState } from 'react';

interface BenefitCardProps {
  benefit: Benefit;
}

export function BenefitCard({ benefit }: BenefitCardProps) {
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
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Header with Business Info */}
      <div className="relative h-32 bg-gradient-to-r from-purple-500 to-pink-500">
        <Image
          src={benefit.businessLogo}
          alt={benefit.business}
          fill
          className="object-cover opacity-20"
        />
        
        {/* Discount Badge */}
        <div className="absolute top-4 right-4">
          <div className={`${getDiscountColor()} text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg`}>
            {benefit.discount}
          </div>
        </div>

        {/* Business Name */}
        <div className="absolute bottom-4 left-4">
          <h4 className="text-white font-bold text-lg drop-shadow-lg">
            {benefit.business}
          </h4>
        </div>
      </div>
      
      {/* Content */}
      <CardContent className="p-6">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
          {benefit.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {benefit.description}
        </p>

        {/* Code Section */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Código</span>
              <div className="font-mono font-bold text-lg text-gray-900">
                {benefit.code}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={copyCode}
              className="flex items-center space-x-1"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </Button>
          </div>
        </div>

        {/* Valid Until */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Válido hasta: {formatDate(benefit.validUntil)}</span>
        </div>

        {/* Category Badge */}
        <div className="mb-4">
          <Badge variant="outline" className="text-xs">
            <Gift className="h-3 w-3 mr-1" />
            {benefit.category}
          </Badge>
        </div>

        {/* Terms Preview */}
        {benefit.terms && benefit.terms.length > 0 && (
          <div className="mb-4">
            <span className="text-xs text-gray-500 uppercase tracking-wide">Términos:</span>
            <ul className="text-xs text-gray-600 mt-1 space-y-1">
              {benefit.terms.slice(0, 2).map((term, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-1">•</span>
                  <span>{term}</span>
                </li>
              ))}
              {benefit.terms.length > 2 && (
                <li className="text-blue-600">
                  +{benefit.terms.length - 2} términos más...
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Usage Limit */}
        {benefit.usageLimit && (
          <div className="text-xs text-gray-500 mb-4">
            Límite: {benefit.usageLimit} usos disponibles
          </div>
        )}

        {/* Action Button */}
        <Button 
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          disabled={!benefit.isActive}
        >
          {benefit.isActive ? 'Canjear Beneficio' : 'No Disponible'}
        </Button>
      </CardContent>
    </Card>
  );
}

