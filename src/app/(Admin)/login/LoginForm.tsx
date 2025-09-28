'use client';

import ErrorMessage from '@/components/ErrorMessage';
import Loader from '@/components/Loader';
import { useSignin } from '@/lib/hooks/useSignin';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
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
          router.replace('/dashboard');
        },
      }
    );
  };
  return (
    <div className="w-full max-w-xs">
      {signin.isError && <ErrorMessage error={signin.error} />}
      <form
        onSubmit={handleLogin}
        className="flex flex-col content-center gap-4 mx-auto mt-10 px-3"
      >
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          className="border p-3 rounded"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="border p-3 rounded"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          required
        />
        {signin.isPending && <Loader />}
        <button
          type="submit"
          disabled={signin.isPending}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
