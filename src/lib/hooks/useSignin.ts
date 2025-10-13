import { signin } from '@/lib/api/auth';
import { useMutation } from '@tanstack/react-query';

export function useSignin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signin(email, password),
    onSuccess: () => {
      console.log('Login successful');
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
}
