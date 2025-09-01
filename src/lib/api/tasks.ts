export async function getTasks() {
  const res = await fetch('https://task-manager-backend-dif5.onrender.com/tasks', {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return res.json();
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
  return res.json();
}
