import { ITaskCard } from '@/lib/types/types';
const API_URL = 'https://task-manager-backend-dif5.onrender.com';
const Local_API_URL = 'http://localhost:8080';

export async function getTasks(query?: string) {
  const params = new URLSearchParams();
  if (query) {
    params.append('search', query);
  }

  const res = await fetch(`${API_URL}/tasks?${params.toString()}`, {
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
  const res = await fetch(`${API_URL}/tasks`, {
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
  taskId: string,
  updatedTask: {
    title: string;
    isCompleted?: boolean;
    priority?: 'low' | 'medium' | 'high';
    tags?: string[];
    description?: string;
    subtasks?: string[];
  },
) {
  const res = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(updatedTask),
  });

  if (!res.ok) {
    throw new Error('Failed to update task');
  }
  const { data } = await res.json();
  return data;
}

export async function deleteTask(taskId: string) {
  const res = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to delete task');
  }
  const { data } = await res.json();
  return data;
}
