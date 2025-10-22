'use client';

import ErrorMessage from '@/components/ErrorMessage';
import Input from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useSignUp } from '@/lib/hooks/useSignUp';

export default function SignUpForm() {
  const signup = useSignUp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    signup.mutate(
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
      {signup.isError && <ErrorMessage error={signup.error} />}
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
        <Input
          id="password"
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          required
        />
        {error && <p className="text-red-500 text-sm mt-[-8px]">{error}</p>}
        <Button type="submit" loading={signup.isPending}>
          {!signup.isPending && 'Sign Up'}
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
          onClick={() => {
            router.replace('/login');
          }}
          className="bg-green-600 hover:bg-green-700"
          type="button"
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
}
