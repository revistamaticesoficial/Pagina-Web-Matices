'use client';

import { useState, Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { RegisterWizard } from '../components/RegisterWizard';
import Image from 'next/image';

function RegisterContent() {
  return (
    <div className="min-h-screen  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-8">
          <Image src="/images/logotipo.png" alt="Logo Matices" width={200} height={120} />
        </div>
        <RegisterWizard />
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RegisterContent />
    </Suspense>
  );
}