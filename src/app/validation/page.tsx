"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ValidationPage() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    let navigated = false;

    const softTimeout = async <T,>(p: PromiseLike<T>, ms = 2500): Promise<T | null> => {
      let t: any;
      try {
        return await Promise.race([
          Promise.resolve(p),
          new Promise<null>((resolve) => { t = setTimeout(() => resolve(null), ms); })
        ]);
      } finally {
        if (t) clearTimeout(t);
      }
    };

    const run = async () => {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user) {
          navigated = true;
          router.push('/auth/login');
          return;
        }

        const email = userData.user.email?.toLowerCase() || '';
        const userId = userData.user.id;

        // 2) Verificar whitelist (timeout de 5 segundos)
        const wResult = await softTimeout(
          supabase
            .from('white_list')
            .select('email')
            .eq('email', email.toLowerCase())
            .maybeSingle()
        , 5000);

        // Si está en white_list, redirigir a /admin (sin verificar onboarding)
        if (wResult && !wResult.error && wResult.data?.email) {
          navigated = true;
          router.push('/admin/inicio');
          return;
        }

        // 3) Si NO está en white_list, verificar onboarding para /gestion
        // (solo aplica para clientes, no para empleados de admin)
        const profileResult = await softTimeout(
          supabase
            .from('profiles')
            .select('isOnboardingComplete')
            .eq('id', userId)
            .maybeSingle()
        , 2500);

        const isComplete = Boolean(profileResult?.data?.isOnboardingComplete);
        navigated = true;
        router.push(isComplete ? '/gestion/inicio' : '/gestion/cuenta');
      } catch (e) {
        if (!navigated) {
          navigated = true;
          router.push('/auth/login');
        }
      }
    };
    // Fallback global en caso de cuelgue de red (después de verificar white_list)
    const globalFallback = setTimeout(() => {
      if (!navigated && !cancelled) {
        navigated = true;
        router.push('/gestion/inicio');
      }
    }, 6000);

    run();
    return () => {
      cancelled = true;
      clearTimeout(globalFallback);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center"/>
  );
}


