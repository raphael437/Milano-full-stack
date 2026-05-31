/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { forgetPassword } from '@/services/productServices';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage('');
      setError('');

      const data = await forgetPassword(email);

      setMessage(data.message);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          'Something went wrong, please try again.'
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
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1974&auto=format&fit=crop"
            alt="Luxury Fashion"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
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

              {/* EMAIL */}
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
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

              {/* SUCCESS */}
              {message && (
                <p className="text-sm text-green-600 border border-green-200 bg-green-50 p-3">
                  {message}
                </p>
              )}

              {/* ERROR */}
              {error && (
                <p className="text-sm text-red-600 border border-red-200 bg-red-50 p-3">
                  {error}
                </p>
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
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>

              {/* BACK */}
              <div className="text-center pt-4">
                <Link
                  href="/login"
                  className="border-b border-black text-sm"
                >
                  Back to Login
                </Link>
              </div>

            </form>
          </Card>
        </div>
      </div>
    </main>
  );
}