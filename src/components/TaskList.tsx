'use client';

import TaskCard from '@/components/TaskCard';
import { useTasks } from '@/lib/hooks/react-query';
import { ITaskCard } from '@/lib/types/types';
import { useRouter } from 'next/navigation';

export default function TaskList() {
  const { data, isLoading, isError } = useTasks();
  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    // redirect('/login'); // this redirect only works on server side
    router.push('/login'); // this works on client side
    return null;
  }

  return (
    <div className="flex flex-col items-start gap-6 p-7">
      <p className="text-2xl">This is the task list page.</p>

      <ul className="flex flex-col gap-4 ">
        {data.map((task: ITaskCard) => (
          <TaskCard key={task._id} {...task} />
        ))}
      </ul>
      {/* <AddTaskForm /> */}
    </div>
  );
}
