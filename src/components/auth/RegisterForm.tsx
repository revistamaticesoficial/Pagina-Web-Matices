'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { useAuth } from '@/hooks/useAuth';
import { RegisterCredentials, FormErrors } from '@/types/auth';
import { validateEmail, validatePassword, validateConfirmPassword } from '@/lib/validations';
import { User, Mail, Lock, AlertCircle, Loader2, CheckCircle } from 'lucide-react';

export function RegisterForm() {
  const router = useRouter();
  const { register, authState, clearError } = useAuth();
  
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    firstName: '', // no se solicitará en UI
    lastName: '', // no se solicitará en UI
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    newsletter: false,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const handleChange = (field: keyof RegisterCredentials) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }

    // Clear global error
    if (authState.error) {
      clearError();
    }
  };

  const handleBlur = (field: keyof RegisterCredentials) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allFields = ['email', 'password', 'confirmPassword'];
    const touchedState = allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {});
    setTouched(touchedState);
    
    // Validate form (solo email/contraseñas/aceptTerms)
    const validationErrors: FormErrors = {};
    const e1 = validateEmail(credentials.email); if (e1) validationErrors.email = e1;
    const e2 = validatePassword(credentials.password); if (e2) validationErrors.password = e2;
    const e3 = validateConfirmPassword(credentials.password, credentials.confirmPassword); if (e3) validationErrors.confirmPassword = e3;
    if (!credentials.acceptTerms) validationErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
    setErrors(validationErrors);
    
    // If there are validation errors, don't submit
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      await register(credentials);
      router.push('/validation');
    } catch (error) {
      // Error is handled by the auth context
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Crear Cuenta
        </h1>
        <p className="text-gray-600">
          Únete a la comunidad de Revista Matices
        </p>
      </div>

      {authState.error && (
        <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
            <span className="text-sm text-red-700">{authState.error}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        <Input
          type="email"
          label="Email"
          placeholder="tu@email.com"
          value={credentials.email}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
          error={touched.email ? errors.email : undefined}
          leftIcon={<Mail />}
          required
          disabled={authState.isLoading}
        />

        <Input
          type="password"
          label="Contraseña"
          placeholder="••••••••"
          value={credentials.password}
          onChange={handleChange('password')}
          onBlur={handleBlur('password')}
          error={touched.password ? errors.password : undefined}
          leftIcon={<Lock />}
          showPasswordToggle
          helperText="Mínimo 8 caracteres, 1 mayúscula, 1 minúscula y 1 número"
          required
          disabled={authState.isLoading}
        />

        <Input
          type="password"
          label="Confirmar Contraseña"
          placeholder="••••••••"
          value={credentials.confirmPassword}
          onChange={handleChange('confirmPassword')}
          onBlur={handleBlur('confirmPassword')}
          error={touched.confirmPassword ? errors.confirmPassword : undefined}
          leftIcon={<Lock />}
          showPasswordToggle
          required
          disabled={authState.isLoading}
        />

        <div className="space-y-4">
          <Checkbox
            checked={credentials.acceptTerms}
            onChange={(e) => setCredentials(prev => ({ ...prev, acceptTerms: (e.target as HTMLInputElement).checked }))}
            error={touched.acceptTerms ? errors.acceptTerms : undefined}
            label={
              <span>
                Acepto los{' '}
                <Link href="/terminos" className="text-blue-600 hover:text-blue-500">
                  términos y condiciones
                </Link>
                {' '}y la{' '}
                <Link href="/privacidad" className="text-blue-600 hover:text-blue-500">
                  política de privacidad
                </Link>
              </span>
            }
            required
            disabled={authState.isLoading}
          />

          <Checkbox
            checked={credentials.newsletter}
            onChange={handleChange('newsletter')}
            label="Quiero recibir noticias y actualizaciones por email"
            description="Puedes cancelar la suscripción en cualquier momento"
            disabled={authState.isLoading}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={authState.isLoading}
        >
          {authState.isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creando cuenta...
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Crear Cuenta
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link 
            href="/auth/login" 
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

