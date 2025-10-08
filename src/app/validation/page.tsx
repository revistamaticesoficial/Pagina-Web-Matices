"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ValidationPage() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        // 1) Obtener usuario autenticado
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user) {
          router.replace('/auth/login');
          return;
        }

        const email = userData.user.email?.toLowerCase() || '';
        const userId = userData.user.id;

        // 2) Verificar whitelist en Supabase (tabla: white_list con columna email)
        const { data: w } = await supabase
          .from('white_list')
          .select('email')
          .eq('email', email.toLowerCase())
          .maybeSingle();
          // .select('*')
          
        console.log('wData', w);

        if (w?.email) {
          router.push('/admin/inicio');
          return
        }
        // 3) Cargar perfil y revisar flag de onboarding
        const { data: profile, error: pError } = await supabase
          .from('profiles')
          .select('isOnboardingComplete')
          .eq('id', userId)
          .maybeSingle();

        if (pError) {
          // Si no existe perfil o hay error, llevar a onboarding
          router.replace('/gestion/cuenta');
          return;
        }

        const isComplete = Boolean(profile?.isOnboardingComplete);
        router.replace(isComplete ? '/gestion/inicio' : '/gestion/cuenta');
      } catch (e) {
        router.replace('/auth/login');
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center text-gray-600">
        Validando tu cuenta...
      </div>
    </div>
  );
}


