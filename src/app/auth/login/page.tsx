import { Suspense } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import Image from 'next/image';

function LoginContent() {
  return (
    <div className="h-[80vh] lg:min-h-screen flex items-center justify-center py-6 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8 flex justify-center">
          <Image src="/images/logotipo.png" alt="Logo Revista Matices" width={140} height={100} />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-sm text-gray-600">Cargando...</p>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}

export const metadata = {
  title: 'Iniciar Sesión - Revista Matices',
  description: 'Accede a tu cuenta de Revista Matices del Cerro de las Rosas',
};

