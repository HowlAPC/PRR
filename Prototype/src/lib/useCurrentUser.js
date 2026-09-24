import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => ((await base44.auth.isAuthenticated()) ? base44.auth.me() : null),
    staleTime: 60000,
  });
}
