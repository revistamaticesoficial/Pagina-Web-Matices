'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { TabType } from '@/types/sugerencias';

export function useTabNavigation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentTab = (searchParams.get('tab') as TabType) || 'comercios';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const setTab = useCallback((tab: TabType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    params.set('page', '1'); // Reset to page 1 when changing tabs
    router.push(`/sugerencias?${params.toString()}`);
  }, [router, searchParams]);

  const setPage = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/sugerencias?${params.toString()}`);
  }, [router, searchParams]);

  return {
    currentTab,
    currentPage,
    setTab,
    setPage
  };
}

