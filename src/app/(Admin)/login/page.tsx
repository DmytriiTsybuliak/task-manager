'use client';

import { useSignin } from '@/lib/react-query';
import { useState } from 'react';

export default function Login() {
  const signin = useSignin();

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    signin.mutate({ email: '', password: '2212' });
    // Handle login logic here
  };

  return (
    <div>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
        <input type="email" placeholder="Email" className="border p-2 rounded" required />
        <input type="password" placeholder="Password" className="border p-2 rounded" required />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
