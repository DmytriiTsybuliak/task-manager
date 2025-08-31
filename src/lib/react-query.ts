import { signin } from '@/lib/api/auth';
import { getTasks } from '@/lib/api/tasks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

export function useSignin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signin(email, password),
    onSuccess: data => {
      console.log('Login successful:', data);
      redirect('/dashboard');
    },
    onError: error => {
      console.error('Login failed:', error);
    },
  });
}

export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => getTasks(),
  });
}
