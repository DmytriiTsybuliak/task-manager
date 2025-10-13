export async function signin(email: string, password: string) {
  const res = await fetch('https://task-manager-backend-dif5.onrender.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Login failed');
  }
  return res.json();
}

export async function signout() {
  const res = await fetch('https://task-manager-backend-dif5.onrender.com/auth/logout', {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Logout failed');
  }
  return null;
}
