'use client';

import TaskCard from '@/app/(Admin)/dashboard/TaskCard';
import { useTasks } from '@/lib/hooks/react-query';
import { ITaskCard } from '@/lib/types/types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function TaskList() {
  const { data, isLoading, isError } = useTasks();
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      // redirect('/login'); // this redirect only works on server side
      router.push('/login'); // this works on client side
    }
  }, [isError, router]);

  if (isError) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center m-3 gap-6 p-7">
      {isLoading && <p>Loading tasks...</p>}
      <ul className="flex flex-row gap-4 flex-wrap ">
        {data && data.map((task: ITaskCard) => <TaskCard key={task._id} {...task} />)}
      </ul>
    </div>
  );
}
