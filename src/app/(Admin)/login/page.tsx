'use client';

import Loader from '@/components/Loader';
import { useSignin } from '@/lib/hooks/useSignin';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const signin = useSignin();
  const [email, setEmail] = useState('1tonistark1997@gmail.com');
  const [password, setPassword] = useState('1111');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    signin.mutate(
      { email, password },
      {
        onSuccess: () => {
          router.replace('/dashboard'); // moved to useEffect
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {signin.isError && (
        <p className="text-red-500">
          Login failed. Please try again.{' '}
          {signin.error instanceof Error ? signin.error.message : String(signin.error)}
        </p>
      )}
      <form
        onSubmit={handleLogin}
        className="flex flex-col content-center gap-4 w-full max-w-3/20 mx-auto mt-10 px-3"
      >
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          required
        />
        <button
          type="submit"
          disabled={signin.isPending}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {signin.isPending ? <Loader /> : 'Login'}
        </button>
      </form>
    </div>
  );
}
