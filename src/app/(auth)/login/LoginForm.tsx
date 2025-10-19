'use client';

import ErrorMessage from '@/components/ErrorMessage';
import Input from '@/components/ui/Input';
import { useSignin } from '@/lib/hooks/useSignin';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function LoginForm() {
  const signin = useSignin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleGuestLogin = () => {
    signin.mutate(
      { email: '1tonistark1997@gmail.com', password: '1111' },
      {
        onSuccess: () => {
          router.replace('/dashboard');
        },
      },
    );
  };
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    signin.mutate(
      { email, password },
      {
        onSuccess: () => {
          router.replace('/dashboard');
        },
      },
    );
  };
  return (
    <div className="w-full max-w-xs">
      {signin.isError && <ErrorMessage error={signin.error} />}
      <form onSubmit={handleLogin} className="flex flex-col content-center gap-4 mx-auto mt-5 px-3">
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <Button type="submit" loading={signin.isPending}>
          {!signin.isPending && 'Sign In'}
        </Button>
      </form>
      <div className="relative my-5 mx-3">
        <hr className=" border-gray-300" />
        <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-2 text-gray-500 text-sm">
          or
        </span>
      </div>
      <div className="flex flex-col content-center gap-3 mx-auto mt-8 px-3">
        <Button
          onClick={() => handleGuestLogin()}
          className="bg-amber-600 hover:bg-amber-700"
          type="button"
        >
          Sign in as Guest(demo)
        </Button>
        <Button
          onClick={() => {
            router.replace('/register');
          }}
          className="bg-green-600 hover:bg-green-700"
          type="button"
        >
          Register new account
        </Button>
      </div>
    </div>
  );
}
