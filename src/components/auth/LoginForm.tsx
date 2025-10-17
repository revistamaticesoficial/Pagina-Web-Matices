'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { useAuth } from '@/hooks/useAuth';
import { LoginCredentials, FormErrors } from '@/types/auth';
import { validateLoginForm } from '@/lib/validations';
import { Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const { login, authState, clearError } = useAuth();

  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const handleChange = (field: keyof LoginCredentials) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }

    if (authState.error) {
      clearError();
    }
  };

  const handleBlur = (field: keyof LoginCredentials) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const validationErrors = validateLoginForm(credentials);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      await login(credentials);
      // Ir a la página de validación después de login exitoso
      router.push('/validation');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
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
          required
          disabled={authState.isLoading}
        />

        <div className="flex items-center justify-between">
          <Checkbox
            checked={credentials.rememberMe}
            onChange={handleChange('rememberMe')}
            label="Recordarme"
            disabled={authState.isLoading}
          />

          <Link
            href="/contacto"
            className="text-sm text-blue-600 hover:text-blue-500 transition-colors height{100} heightmobile{80}"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={authState.isLoading}
        >
          {authState.isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Iniciando sesión...
            </>
          ) : (
            'Iniciar Sesión'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link
            href="/auth/register"
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

