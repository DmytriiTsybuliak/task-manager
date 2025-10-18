'use client';

import ErrorMessage from '@/components/ErrorMessage';
import Input from '@/components/ui/Input';
import { useSignin } from '@/lib/hooks/useSignin';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/ui/Button';

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
    </div>
  );
}
