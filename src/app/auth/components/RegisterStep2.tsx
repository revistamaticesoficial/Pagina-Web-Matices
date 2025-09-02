'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { validateName } from '@/lib/validations';
import { RegisterData } from './RegisterWizard';
import { ArrowLeft } from 'lucide-react';

interface RegisterStep2Props {
  data: Partial<RegisterData>;
  userId: string;
  onNext: () => void;
  onPrev: () => void;
  onUpdateData: (data: Partial<RegisterData>) => void;
  setError: (error: string | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function RegisterStep2({ 
  data, 
  userId,
  onNext, 
  onPrev,
  onUpdateData, 
  setError,
  isLoading,
  setIsLoading
}: RegisterStep2Props) {
  const [formData, setFormData] = useState({
    fullName: data.fullName || '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Update parent data
    onUpdateData({ [field]: value });
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (field: keyof typeof formData, value: string) => {
    let error = '';
    
    switch (field) {
      case 'fullName':
        if (!value.trim()) {
          error = 'El nombre completo es requerido';
        } else if (value.trim().split(' ').length < 2) {
          error = 'Ingresa tu nombre y apellido';
        } else if (value.length < 3) {
          error = 'El nombre debe tener al menos 3 caracteres';
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
      fullName: true,
    });
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Primero verificar si el perfil existe
      const { data: existingProfile, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .single();

      if (checkError && checkError.code === 'PGRST116') {
        // El perfil no existe, crearlo
        console.log('Profile not found, creating new profile...');
        const { error: createError } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            full_name: formData.fullName.trim(),
            role: 'owner',
          });

        if (createError) {
          throw new Error(`Error creating profile: ${createError.message}`);
        }
      } else if (checkError) {
        // Otro tipo de error
        throw new Error(`Error checking profile: ${checkError.message}`);
      } else {
        // El perfil existe, actualizarlo
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            full_name: formData.fullName.trim(),
          })
          .eq('id', userId);

        if (updateError) {
          throw new Error(`Error updating profile: ${updateError.message}`);
        }
      }
      
      // Actualizar datos del wizard
      onUpdateData(formData);
      
      // Ir al siguiente paso
      onNext();
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error instanceof Error ? error.message : 'Error al actualizar el perfil');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Welcome message */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">👋</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          ¡Cuenta creada exitosamente!
        </h3>
        <p className="text-gray-600">
          Ahora completa tu perfil para continuar
        </p>
      </div>

      {/* Full Name */}
      <Input
        label="Nombre completo *"
        type="text"
        value={formData.fullName}
        onChange={(e) => handleInputChange('fullName', e.target.value)}
        onBlur={() => handleBlur('fullName')}
        error={touched.fullName ? errors.fullName : undefined}
        placeholder="Juan Pérez"
        disabled={isLoading}
        autoFocus
      />

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-blue-800">
              Información de perfil
            </h4>
            <p className="mt-1 text-sm text-blue-700">
              Esta información aparecerá en tu perfil público y será visible para otros usuarios de la plataforma.
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
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
              <span>Guardando...</span>
            </div>
          ) : (
            'Continuar'
          )}
        </Button>
      </div>
    </form>
  );
}

