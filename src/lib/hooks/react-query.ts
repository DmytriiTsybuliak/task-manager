import { createTask, deleteTask, getTasks, updateTask } from '@/lib/api/tasks';
import { ITaskCard } from '@/lib/types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTask: ITaskCard) => {
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

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ taskID, newTask }: { taskID: string; newTask: ITaskCard }) => {
      return await updateTask(taskID, newTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: error => {
      console.error('Error creating task:', error);
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (taskID: string) => {
      deleteTask(taskID);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: error => {
      console.error('Error deleting task:', error);
    },
  });
}
