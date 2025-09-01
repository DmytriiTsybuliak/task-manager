// export interface TaskListProps {

import { useTasks } from '@/lib/react-query';

// }

export default function TaskList() {
  const { data, isLoading, isError, error } = useTasks();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading tasks: {(error as Error).message}</div>;
  }

  console.log(data);

  return (
    <div>
      <p>This is the task list page.</p>
    </div>
  );
}
