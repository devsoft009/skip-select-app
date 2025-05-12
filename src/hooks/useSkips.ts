import { useEffect, useState } from 'react';
import axios from 'axios';
import { Skip } from '../types';

interface UseSkipsParams {
  postcode: string;
  area: string;
}

const BASE_URL =
  'https://app.wewantwaste.co.uk/api/skips/by-location';

const FALLBACK_IMG =
  'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg';

export default function useSkips({ postcode, area }: UseSkipsParams) {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchSkips() {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${BASE_URL}?postcode=${postcode}&area=${encodeURIComponent(area)}`
        );

        if (!isMounted) return;

        const mapped: Skip[] = data.map((s: any) => ({
          id: s.id,
          name: `${s.size} Yard Skip`,         
          yards: s.size,                        
          hirePeriodDays: s.hire_period_days,   
          price: s.price_before_vat,                    
          allowedOnRoad: s.allowed_on_road,
          allowsHeavyWaste: s.allows_heavy_waste,
          image: s.imageUrl || FALLBACK_IMG, 
        }));

        setSkips(mapped);
        setError(null);
      } catch (err) {
        if (isMounted) setError('Could not load skips – please retry later.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchSkips();

    return () => {
      isMounted = false;
    };
  }, [postcode, area]);

  return { skips, loading, error };
}