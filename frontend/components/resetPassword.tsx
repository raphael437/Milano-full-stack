/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { resetPassword } from '@/services/productServices';

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');

      await resetPassword(token, password, passwordConfirm);

      // after success → send user to login
      router.push('/login');
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          'Reset failed. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f3ee] text-black">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT IMAGE */}
        <div className="relative hidden lg:block">
          <Image
            src="https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1974&auto=format&fit=crop"
            alt="Luxury Reset"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute bottom-16 left-16 text-white max-w-md">
            <p className="text-sm uppercase tracking-[0.4em] mb-4">
              Secure Recovery
            </p>

            <h1 className="font-serif text-5xl leading-tight">
              Create New
              <br />
              Password
            </h1>

            <p className="mt-6 text-sm text-neutral-200">
              Protect your account with a strong new password and continue your experience.
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="flex items-center justify-center px-6 py-12">
          <Card className="w-full max-w-md border border-neutral-200 bg-white/90 p-10 shadow-none backdrop-blur-sm">

            <div className="mb-10 text-center">
              <h2 className="font-serif text-4xl tracking-[0.25em]">
                MELANO
              </h2>

              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
                Reset Password
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* PASSWORD */}
              <div className="space-y-2">
                <Label>New Password</Label>

                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="
                      h-12
                      rounded-none
                      border-0
                      border-b
                      border-neutral-300
                      bg-transparent
                      px-0
                      pr-10
                      text-base
                      shadow-none
                      focus-visible:border-black
                      focus-visible:ring-0
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                      absolute right-0 top-1/2
                      -translate-y-1/2
                      cursor-pointer
                      text-neutral-500
                      hover:text-black
                    "
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="space-y-2">
                <Label>Confirm Password</Label>

                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="••••••••"
                  className="
                    h-12
                    rounded-none
                    border-0
                    border-b
                    border-neutral-300
                    bg-transparent
                    px-0
                    text-base
                    shadow-none
                    focus-visible:border-black
                    focus-visible:ring-0
                  "
                />
              </div>

              {/* ERROR */}
              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3">
                  {error}
                </div>
              )}

              {/* BUTTON */}
              <Button
                type="submit"
                disabled={loading}
                className="
                  h-12
                  w-full
                  cursor-pointer
                  rounded-none
                  bg-black
                  text-sm
                  uppercase
                  tracking-[0.25em]
                  hover:bg-[#2b2b2b]
                  disabled:opacity-60
                "
              >
                {loading ? 'Updating...' : 'Reset Password'}
              </Button>

            </form>
          </Card>
        </div>
      </div>
    </main>
  );
}