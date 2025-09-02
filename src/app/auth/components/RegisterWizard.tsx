'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RegisterStep1 } from './RegisterStep1';
import { RegisterStep2 } from './RegisterStep2';
import { RegisterStep3 } from './RegisterStep3';

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  businessName: string;
  businessDescription: string;
  businessAddress: string;
  businessPhone: string;
  businessSlug: string;
}

export function RegisterWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [registerData, setRegisterData] = useState<Partial<RegisterData>>({});
  
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔄 currentStep changed to:', currentStep);
  }, [currentStep]);

  const updateData = (stepData: Partial<RegisterData>) => {
    setRegisterData(prev => ({ ...prev, ...stepData }));
    setError(null);
  };

  const nextStep = () => {
    setCurrentStep(prev => {
      const newStep = prev + 1;
      return newStep;
    });
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleComplete = () => {
    router.push('/gestion/inicio');
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Crear cuenta';
      case 2: return 'Tu perfil';
      case 3: return 'Tu comercio';
      default: return 'Registro';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return 'Ingresa tu email y contraseña para crear tu cuenta';
      case 2: return 'Completa la información de tu perfil';
      case 3: return 'Registra tu comercio en nuestra plataforma';
      default: return '';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                  step < currentStep
                    ? 'bg-green-500 text-white'
                    : step === currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step < currentStep ? '✓' : step}
              </div>
              {step < 3 && (
                <div
                  className={`h-1 w-16 mx-2 transition-all duration-200 ${
                    step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {getStepTitle()}
          </h3>
          <p className="text-gray-600 text-sm">
            {getStepDescription()}
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="min-h-[400px]">
        {currentStep === 1 && (
          <RegisterStep1
            data={registerData}
            onNext={nextStep}
            onUpdateData={updateData}
            onUserCreated={setUserId}
            setError={setError}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
        
        {currentStep === 2 && (
          <RegisterStep2
            data={registerData}
            userId={userId!}
            onNext={nextStep}
            onPrev={prevStep}
            onUpdateData={updateData}
            setError={setError}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
        
        {currentStep === 3 && (
          <RegisterStep3
            data={registerData}
            userId={userId!}
            onComplete={handleComplete}
            onPrev={prevStep}
            onUpdateData={updateData}
            setError={setError}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-center text-sm text-gray-500">
          Paso {currentStep} de 3
        </div>
      </div>
    </div>
  );
}

