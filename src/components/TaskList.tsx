'use client';

import TaskCard from '@/components/TaskCard';
import { useTasks } from '@/lib/hooks/react-query';
import { ITaskCard } from '@/lib/types/types';
import { redirect } from 'next/navigation';

export default function TaskList() {
  const { data, isLoading, isError } = useTasks();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    redirect('/login');
  }

  return (
    <div className="flex flex-col items-start gap-6 p-7">
      <p className="text-2xl">This is the task list page.</p>

      <ul className="flex flex-col gap-4 ">
        {data.map((task: ITaskCard) => (
          <TaskCard key={task._id} {...task} />
        ))}
      </ul>
    </div>
  );
}
