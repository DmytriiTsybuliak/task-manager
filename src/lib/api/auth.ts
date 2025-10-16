const API_URL = 'https://task-manager-backend-dif5.onrender.com';
const Local_API_URL = 'http://localhost:8080';

export async function signin(email: string, password: string) {
  const res = await fetch(`${Local_API_URL}/auth/login`, {
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
  const res = await fetch(`${Local_API_URL}/auth/logout`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Logout failed');
  }
  return null;
}
