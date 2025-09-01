'use client';

import { useTasks } from '@/lib/react-query';

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
      <ul>
        {data.data.map((task: ITask) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
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
