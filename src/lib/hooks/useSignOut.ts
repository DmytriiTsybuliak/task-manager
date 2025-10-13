import { signout } from '@/lib/api/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useSignOut() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signout,
    onSuccess: () => {
      console.log('✅ Log out successful');
      queryClient.clear();
      router.push('/login');
    },
    onError: (error) => {
      console.error('❌ Log out failed:', error);
    },
  });
}
