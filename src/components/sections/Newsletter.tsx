'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Mail, Send, CheckCircle } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
  };

  if (isSubscribed) {
    return (
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-800 mb-2">
            ¡Gracias por suscribirte!
          </h3>
          <p className="text-green-700 mb-4">
            Ahora recibirás las últimas noticias y ofertas del Cerro de las Rosas directamente en tu email.
          </p>
          <Button
            variant="outline"
            onClick={() => setIsSubscribed(false)}
            className="border-green-300 text-green-700 hover:bg-green-100"
          >
            Suscribir otro email
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Mail className="h-6 w-6 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-blue-900">
          Mantente informado
        </CardTitle>
        <p className="text-blue-700 text-lg">
          Suscríbete a nuestro newsletter y recibe las últimas noticias del Cerro de las Rosas
        </p>
      </CardHeader>
      
      <CardContent className="pb-8">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex space-x-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <Button
              type="submit"
              disabled={isLoading || !email}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <p className="text-xs text-blue-600 mt-3 text-center">
            Recibirás noticias semanales. Puedes cancelar la suscripción en cualquier momento.
          </p>
        </form>
        
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-6 text-sm text-blue-700">
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4" />
              <span>Sin spam</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4" />
              <span>Noticias locales</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4" />
              <span>Ofertas exclusivas</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

