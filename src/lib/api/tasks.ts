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

export async function createTask(newTask: { title: string; description: string }) {
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
