export async function getTasks() {
  const res = await fetch('https://task-manager-backend-dif5.onrender.com/tasks', {
    method: 'GET',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return res.json();
}
