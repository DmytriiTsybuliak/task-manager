'use client';

import AddTaskModal from '@/components/AddTaskModal';
import TaskCard from '@/components/TaskCard';
import { useTasks } from '@/lib/hooks/react-query';
import { ITaskCard } from '@/lib/types/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TaskList() {
  const { data, isLoading, isError } = useTasks();
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      // redirect('/login'); // this redirect only works on server side
      router.push('/login'); // this works on client side
    }
  }, [isError, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    // redirect('/login'); // this redirect only works on server side
    // router.push('/login'); // this works on client side
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
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        + Add Task
      </button>
      <AddTaskModal isOpen={IsModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
