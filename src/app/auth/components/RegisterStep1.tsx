'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { validateEmail, validatePassword, validateConfirmPassword } from '@/lib/validations';
import { RegisterData } from './RegisterWizard';
import { Eye, EyeOff } from 'lucide-react';

interface RegisterStep1Props {
  data: Partial<RegisterData>;
  onNext: () => void;
  onUpdateData: (data: Partial<RegisterData>) => void;
  onUserCreated: (userId: string) => void;
  setError: (error: string | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function RegisterStep1({ 
  data, 
  onNext, 
  onUpdateData, 
  onUserCreated,
  setError,
  isLoading,
  setIsLoading
}: RegisterStep1Props) {
  const [formData, setFormData] = useState({
    email: data.email || '',
    password: data.password || '',
    confirmPassword: data.confirmPassword || '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    onUpdateData({ [field]: value });
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (field: keyof typeof formData, value: string) => {
    let error = '';
    
    switch (field) {
      case 'email':
        error = validateEmail(value) || '';
        break;
      case 'password':
        error = validatePassword(value) || '';
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(formData.password, value) || '';
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
      email: true,
      password: true,
      confirmPassword: true,
    });
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      if (!supabase.auth) {
        throw new Error('Error de configuración: Supabase no está disponible');
      }
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });

      if (authError) {
        console.error('Supabase auth error:', authError);
        if (authError.code === 'email_address_invalid') {
          throw new Error('El formato del email no es válido. Por favor, verifica que esté escrito correctamente.');
        } else if (authError.code === 'weak_password') {
          throw new Error('La contraseña es demasiado débil. Debe tener al menos 6 caracteres.');
        } else if (authError.code === 'user_already_registered') {
          throw new Error('Ya existe una cuenta con este email. Intenta iniciar sesión o usa otro email.');
        } else {
          throw new Error(`Error de registro: ${authError.message}`);
        }
      }

      if (!authData.user) {
        throw new Error('No se pudo crear el usuario');
      }

      onUserCreated(authData.user.id);
      onUpdateData(formData);
      onNext();
    } catch (error) {
      console.error('Error creating account:', error);
      setError(error instanceof Error ? error.message : 'Error al crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Email *"
        type="email"
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        onBlur={() => handleBlur('email')}
        error={touched.email ? errors.email : undefined}
        placeholder="tu@email.com"
        disabled={isLoading}
      />

      <div className="relative">
        <Input
          label="Contraseña *"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          onBlur={() => handleBlur('password')}
          error={touched.password ? errors.password : undefined}
          placeholder="Mínimo 6 caracteres"
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
          disabled={isLoading}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="relative">
        <Input
          label="Confirmar contraseña *"
          type={showConfirmPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          onBlur={() => handleBlur('confirmPassword')}
          error={touched.confirmPassword ? errors.confirmPassword : undefined}
          placeholder="Repite tu contraseña"
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
          disabled={isLoading}
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="flex items-start space-x-3">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            required
            disabled={isLoading}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>
        <div className="text-sm">
          <label htmlFor="terms" className="text-gray-700">
            Acepto los{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              términos y condiciones
            </a>{' '}
            y la{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              política de privacidad
            </a>
          </label>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Creando cuenta...</span>
          </div>
        ) : (
          'Crear cuenta'
        )}
      </Button>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <a href="/auth/login" className="text-blue-600 hover:text-blue-500 font-medium">
            Iniciar sesión
          </a>
        </p>
      </div>
    </form>
  );
}

