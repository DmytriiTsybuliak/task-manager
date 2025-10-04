import { createTask, deleteTask, getTasks, updateTask } from '@/lib/api/tasks';
import { ITaskCard } from '@/lib/types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useTasks() {
   return useQuery({
      queryKey: ['tasks'],
      queryFn: getTasks,
      staleTime: 1000 * 60 * 5, // 5 minutes
   });
}

export function useCreateTask() {
   const queryClient = useQueryClient();
   return useMutation({
      // mutationFn: async (newTask: ITaskCard) => {
      //   return await createTask(newTask);
      // },
      mutationFn: (newTask: ITaskCard) => createTask(newTask),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
      onError: (error) => {
         console.error('Error creating task:', error);
      },
   });
}

export function useUpdateTask() {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: ({ taskID, newTask }: { taskID: string; newTask: ITaskCard }) =>
         updateTask(taskID, newTask),
      onMutate: async ({ taskID, newTask }) => {
         await queryClient.cancelQueries({ queryKey: ['tasks'] });
         const previousTasks = queryClient.getQueryData<ITaskCard[]>(['tasks']);
         queryClient.setQueryData<ITaskCard[]>(['tasks'], (old) => {
            if (!old) return [];
            return old.map((task) => (task._id === taskID ? { ...task, ...newTask } : task));
         });
         return { previousTasks };
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
      onError: (err, variables, context) => {
         if (context?.previousTasks) {
            queryClient.setQueryData(['tasks'], context.previousTasks);
         }
         console.error('Error updating task:', err);
      },
      // We don't need this because we're doing optimistic updates
      // but I'll leave it here for reference

      // onSuccess: () => {
      //   queryClient.invalidateQueries({ queryKey: ['tasks'] });
      // },
      // onError: error => {
      //   console.error('Error creating task:', error);
      // },
   });
}

export function useDeleteTask() {
   const queryClient = useQueryClient();
   return useMutation({
      // mutationFn: async (taskID: string) => {
      //   return await deleteTask(taskID);
      // },
      mutationFn: (taskID: string) => deleteTask(taskID),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
      onError: (error) => {
         console.error('Error deleting task:', error);
      },
   });
}
