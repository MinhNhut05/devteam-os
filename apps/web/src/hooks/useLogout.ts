import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '@/services/api';
import { useAuthStore } from '@/stores/auth.store';

export function useLogout() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout');
    },
    onSuccess: () => {
      logout();
      toast.success('Đã đăng xuất');
      navigate('/login', { replace: true });
    },
    onError: () => {
      // Logout locally even if API fails
      logout();
      navigate('/login', { replace: true });
    },
  });
}
