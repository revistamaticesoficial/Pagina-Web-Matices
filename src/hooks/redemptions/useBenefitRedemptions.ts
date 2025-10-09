 'use client';

 import { useCallback, useEffect, useState } from 'react';
 import { supabase } from '@/lib/supabase';

 export interface BenefitRedemption {
   id: string;
   benefit_id: string;
   full_name: string;
   dni: string;
   phone: string;
   email?: string | null;
   generated_code: string;
   claimed_at: string;
   user_id?: string | null;
 }

 interface UseBenefitRedemptionsReturn {
   redemptions: BenefitRedemption[];
   loading: boolean;
   error: string | null;
   refetch: () => Promise<void>;
 }

 export function useBenefitRedemptions(benefitId?: string): UseBenefitRedemptionsReturn {
   const [redemptions, setRedemptions] = useState<BenefitRedemption[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   const fetchRedemptions = useCallback(async () => {
     try {
       setLoading(true);
       setError(null);

       let query = supabase
         .from('benefits_redemptions')
         .select('*')
         .order('claimed_at', { ascending: false });

       if (benefitId) {
         query = query.eq('benefit_id', benefitId);
       }

       const { data, error: fetchError } = await query;
       if (fetchError) throw fetchError;

       setRedemptions((data || []) as BenefitRedemption[]);
     } catch (err) {
       console.error('Error loading redemptions:', err);
       setError(err instanceof Error ? err.message : 'Error desconocido');
       setRedemptions([]);
     } finally {
       setLoading(false);
     }
   }, [benefitId]);

   useEffect(() => {
     fetchRedemptions();
   }, [fetchRedemptions]);

   return { redemptions, loading, error, refetch: fetchRedemptions };
 }


