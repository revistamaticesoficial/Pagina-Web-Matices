'use client';

import { useMemo } from 'react';
import { PaginationData } from '@/types/sugerencias';

interface UsePaginationProps<T> {
  items: T[];
  currentPage: number;
  itemsPerPage?: number;
}

export function usePagination<T>({ 
  items, 
  currentPage, 
  itemsPerPage = 10 
}: UsePaginationProps<T>): PaginationData<T> {
  return useMemo(() => {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = items.slice(startIndex, endIndex);

    return {
      items: paginatedItems,
      totalItems,
      currentPage,
      totalPages,
      itemsPerPage
    };
  }, [items, currentPage, itemsPerPage]);
}
