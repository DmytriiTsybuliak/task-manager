import TaskList from '@/components/TaskList';
import { getTasks } from '@/lib/api/tasks';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async function DashBoard() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TaskList />
    </HydrationBoundary>
  );
}
