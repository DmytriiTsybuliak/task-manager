import { signup } from '@/lib/api/auth';
import { useMutation } from '@tanstack/react-query';

export function useSignUp() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signup(email, password),
    onSuccess: () => {
      console.log('Sign up successful');
    },
    onError: (error) => {
      console.error('Sign up failed:', error);
    },
  });
}
