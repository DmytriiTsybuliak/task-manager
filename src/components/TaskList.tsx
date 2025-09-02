'use client';

import { useTasks } from '@/lib/react-query';
import { redirect } from 'next/navigation';

export interface ITask {
  createdAt: string;
  isCompleted: boolean;
  priority: 'low' | 'medium' | 'high';
  subtasks: string[];
  tags: string[];
  title: string;
  description?: string;
  updatedAt: string;
  userId: string;
  _id: number;
}

export default function TaskList() {
  const { data, isLoading, isError } = useTasks();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    redirect('/login');
  }

  console.log(data);

  return (
    <div className="flex flex-col items-start gap-6 p-7">
      <p className="text-2xl">This is the task list page.</p>
      <ul className="flex flex-col gap-4 ">
        {data.map((task: ITask) => (
          <li key={task._id} className="border p-4 rounded shadow bg-black/95">
            <h3 className="text-lg text-white">{task.title}</h3>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Completed: {task.isCompleted ? 'Yes' : 'No'}</p>
            <p>Created At: {new Date(task.createdAt).toLocaleString()}</p>
            <p>Updated At: {new Date(task.updatedAt).toLocaleString()}</p>
            <p>Tags: {task.tags.join(', ')}</p>
            <p>Subtasks: {task.subtasks.join(', ')}</p>
            <p>User ID: {task.userId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
