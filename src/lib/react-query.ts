import { signin } from '@/lib/api/auth';
import { createTask, getTasks } from '@/lib/api/tasks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useSignin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signin(email, password),
    onSuccess: data => {
      console.log('Login successful:', data);
    },
    onError: error => {
      console.error('Login failed:', error);
    },
  });
}

export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTask: { title: string; description: string }) => {
      createTask(newTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: error => {
      console.error('Error creating task:', error);
    },
  });
}
