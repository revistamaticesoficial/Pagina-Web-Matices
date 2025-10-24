'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface ComerciosPaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

export function ComerciosPagination({ totalItems, itemsPerPage }: ComerciosPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Reset to page 1 when totalItems changes
  useEffect(() => {
    setCurrentPage(1);
  }, [totalItems]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    
    // Dispatch custom event to notify grid component
    const event = new CustomEvent('comercios-page-change', {
      detail: { page }
    });
    window.dispatchEvent(event);
    
    // Scroll to top of grid
    const gridElement = document.querySelector('[data-comercios-grid]');
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <div className="flex space-x-2">
        <Button
          variant={currentPage === 1 ? "outline" : "default"}
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2"
        >
          Anterior
        </Button>

        {/* Show page numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 ${currentPage === page ? 'bg-indigo-600 text-white' : ''}`}
          >
            {page}
          </Button>
        ))}

        <Button
          variant={currentPage === totalPages ? "outline" : "default"}
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
