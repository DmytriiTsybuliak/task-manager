'use client';

import { useSignin } from '@/lib/hooks/useSignin';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const signin = useSignin();
  const [email, setEmail] = useState('1tonistark1997@gmail.com');
  const [password, setPassword] = useState('1111');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    signin.mutate({ email: email, password: password });
  };

  if (signin.isSuccess) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {signin.isPending && <p>Loading...</p>}

      {signin.isError && (
        <p className="text-red-500">
          Login failed. Please try again.{' '}
          {signin.error instanceof Error ? signin.error.message : String(signin.error)}
        </p>
      )}
      <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
        <input
          type="email"
          placeholder="Email"
          className="border p-5 rounded"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-5 rounded"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
