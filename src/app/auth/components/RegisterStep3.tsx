'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { RegisterData } from './RegisterWizard';
import { ArrowLeft, Store } from 'lucide-react';

interface RegisterStep3Props {
  data: Partial<RegisterData>;
  userId: string;
  onComplete: () => void;
  onPrev: () => void;
  onUpdateData: (data: Partial<RegisterData>) => void;
  setError: (error: string | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function RegisterStep3({ 
  data, 
  userId,
  onComplete, 
  onPrev,
  onUpdateData, 
  setError,
  isLoading,
  setIsLoading
}: RegisterStep3Props) {
  const [formData, setFormData] = useState({
    businessName: data.businessName || '',
    businessDescription: data.businessDescription || '',
    businessAddress: data.businessAddress || '',
    businessPhone: data.businessPhone || '',
    businessSlug: data.businessSlug || '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'businessName') {
      const slug = value.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      setFormData(prev => ({ ...prev, businessSlug: slug }));
      onUpdateData({ [field]: value, businessSlug: slug });
    } else {
      onUpdateData({ [field]: value });
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (field: keyof typeof formData, value: string) => {
    let error = '';
    
    switch (field) {
      case 'businessName':
        if (!value.trim()) {
          error = 'El nombre del comercio es requerido';
        } else if (value.length < 3) {
          error = 'El nombre debe tener al menos 3 caracteres';
        }
        break;
      case 'businessDescription':
        if (!value.trim()) {
          error = 'La descripción es requerida';
        } else if (value.length < 10) {
          error = 'La descripción debe tener al menos 10 caracteres';
        }
        break;
      case 'businessAddress':
        if (!value.trim()) {
          error = 'La dirección es requerida';
        }
        break;
      case 'businessPhone':
        if (!value.trim()) {
          error = 'El teléfono es requerido';
        } else if (!/^[\d\s\-\+\(\)]+$/.test(value)) {
          error = 'Formato de teléfono inválido';
        }
        break;
      case 'businessSlug':
        if (!value.trim()) {
          error = 'El slug es requerido';
        } else if (!/^[a-z0-9-]+$/.test(value)) {
          error = 'El slug solo puede contener letras minúsculas, números y guiones';
        } else if (value.length < 3) {
          error = 'El slug debe tener al menos 3 caracteres';
        }
        break;
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
    return error;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    Object.keys(formData).forEach(key => {
      const field = key as keyof typeof formData;
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    
    setErrors(newErrors);
    setTouched({
      businessName: true,
      businessDescription: true,
      businessAddress: true,
      businessPhone: true,
      businessSlug: true,
    });
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data: business, error: businessError } = await supabase
        .from('comercios')
        .insert({
          owner_id: userId,
          name: formData.businessName.trim(),
          direction: formData.businessAddress.trim(),
          phone: formData.businessPhone.trim(),
          slug: formData.businessSlug.trim(),
          category: 'General',
          tags: [],
          social_media: {}
        })
        .select()
        .single();

      if (businessError) {
        throw new Error(businessError.message);
      }

      console.log('Business created successfully:', business);
      
      // Actualizar datos del wizard
      onUpdateData(formData);
      
      // Completar el registro
      onComplete();
      
    } catch (error) {
      console.error('Error creating business:', error);
      setError(error instanceof Error ? error.message : 'Error al crear el comercio');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Store className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Registra tu comercio
        </h3>
        <p className="text-gray-600">
          Completa la información de tu negocio para aparecer en nuestro directorio
        </p>
      </div>

      <Input
        label="Nombre del comercio *"
        type="text"
        value={formData.businessName}
        onChange={(e) => handleInputChange('businessName', e.target.value)}
        onBlur={() => handleBlur('businessName')}
        error={touched.businessName ? errors.businessName : undefined}
        placeholder="Ej: Panadería San Juan"
        disabled={isLoading}
        autoFocus
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descripción del comercio *
        </label>
        <textarea
          value={formData.businessDescription}
          onChange={(e) => handleInputChange('businessDescription', e.target.value)}
          onBlur={() => handleBlur('businessDescription')}
          rows={4}
          disabled={isLoading}
          className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
            touched.businessDescription && errors.businessDescription
              ? 'border-red-500'
              : 'border-gray-300'
          }`}
          placeholder="Describe tu comercio, productos o servicios que ofreces..."
        />
        {touched.businessDescription && errors.businessDescription && (
          <p className="mt-1 text-sm text-red-600">{errors.businessDescription}</p>
        )}
      </div>

      <Input
        label="Dirección *"
        type="text"
        value={formData.businessAddress}
        onChange={(e) => handleInputChange('businessAddress', e.target.value)}
        onBlur={() => handleBlur('businessAddress')}
        error={touched.businessAddress ? errors.businessAddress : undefined}
        placeholder="Av. Rafael Núñez 1234, Cerro de las Rosas"
        disabled={isLoading}
      />

      <Input
        label="Teléfono de contacto *"
        type="tel"
        value={formData.businessPhone}
        onChange={(e) => handleInputChange('businessPhone', e.target.value)}
        onBlur={() => handleBlur('businessPhone')}
        error={touched.businessPhone ? errors.businessPhone : undefined}
        placeholder="0351-123-4567"
        disabled={isLoading}
      />

      <Input
        label="URL del comercio *"
        type="text"
        value={formData.businessSlug}
        onChange={(e) => handleInputChange('businessSlug', e.target.value)}
        onBlur={() => handleBlur('businessSlug')}
        error={touched.businessSlug ? errors.businessSlug : undefined}
        placeholder="panaderia-san-juan"
        disabled={isLoading}
      />
      <p className="text-xs text-gray-500 -mt-2">
        Esta será la URL de tu comercio: revista-matices.com/comercios/{formData.businessSlug || 'tu-slug'}
      </p>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-green-800">
              ¡Ya casi terminas!
            </h4>
            <div className="mt-1 text-sm text-green-700">
              <ul className="list-disc pl-5 space-y-1">
                <li>Tu comercio aparecerá en el directorio de Revista Matices</li>
                <li>Podrás gestionar beneficios y eventos desde tu panel</li>
                <li>Los usuarios podrán contactarte directamente</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          disabled={isLoading}
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Atrás
        </Button>
        
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Creando comercio...</span>
            </div>
          ) : (
            'Finalizar registro'
          )}
        </Button>
      </div>
    </form>
  );
}

