import { ITaskCard } from '@/lib/types/types';

export async function getTasks() {
  const res = await fetch('https://task-manager-backend-dif5.onrender.com/tasks', {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch tasks');
  }
  const { data } = await res.json();
  return data;
}

export async function createTask(newTask: ITaskCard) {
  const res = await fetch('https://task-manager-backend-dif5.onrender.com/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(newTask),
  });
  if (!res.ok) {
    throw new Error('Failed to create task');
  }
  const { data } = await res.json();
  return data;
}

export async function updateTask(
  taskId: number,
  updatedTask: {
    title: string;
    isCompleted?: boolean;
    priority?: 'low' | 'medium' | 'high';
    tags?: string[];
    description?: string;
    subtasks?: string[];
  }
) {
  const res = await fetch(`https://task-manager-backend-dif5.onrender.com/tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(updatedTask),
  });
  console.log('Response:', res);

  if (!res.ok) {
    throw new Error('Failed to update task');
  }
  const { data } = await res.json();
  return data;
}

export async function deleteTask(taskId: string) {
  const res = await fetch(`https://task-manager-backend-dif5.onrender.com/tasks/${taskId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to delete task');
  }
  const { data } = await res.json();
  return data;
}
