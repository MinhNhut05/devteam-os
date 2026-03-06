import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { useAuthStore } from '@/stores/auth.store';

interface User {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  provider: 'LOCAL' | 'GOOGLE';
  theme: 'LIGHT' | 'DARK' | 'SYSTEM';
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useCurrentUser() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const updateUser = useAuthStore((state) => state.updateUser);

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await api.get<User>('/users/me');
      // Sync user data with store (keeps store fresh)
      updateUser(response.data);
      return response.data;
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
