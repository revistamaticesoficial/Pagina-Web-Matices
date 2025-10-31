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

        // 2) Verificar whitelist (timeout suave)
        const w = await softTimeout(
          supabase
            .from('white_list')
            .select('email')
            .eq('email', email.toLowerCase())
            .maybeSingle()
            .then(r => r)
        , 2500);

        if (w && (w as any)?.email) {
          navigated = true;
          router.push('/admin/inicio');
          return
        }
        // 3) Cargar perfil y revisar flag de onboarding (timeout suave)
        const profile = await softTimeout(
          supabase
            .from('profiles')
            .select('isOnboardingComplete')
            .eq('id', userId)
            .maybeSingle()
            .then(r => r)
        , 2500);

        const isComplete = Boolean((profile as any)?.isOnboardingComplete);
        navigated = true;
        router.push(isComplete ? '/gestion/inicio' : '/gestion/cuenta');
      } catch (e) {
        if (!navigated) {
          navigated = true;
          router.push('/auth/login');
        }
      }
    };
    // Fallback global en caso de cuelgue de red
    const globalFallback = setTimeout(() => {
      if (!navigated && !cancelled) {
        navigated = true;
        router.push('/gestion/inicio');
      }
    }, 4000);

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


