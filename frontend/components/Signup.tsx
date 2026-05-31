'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

import { signupUser } from '@/services/productServices';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function SignupPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');
    setSuccess('');
    setLoading(true);

    if (formData.password !== formData.passwordConfirm) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const data = await signupUser(formData);

      console.log(data);

      setSuccess('OTP sent successfully. Please verify your email.');
      router.push(`/verifyotp?email=${encodeURIComponent(formData.email)}`);
    } catch (err: any) {
      console.log(err);

      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignup = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/users/google`;
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

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute bottom-16 left-16 z-10 max-w-md text-white">
            <p className="mb-4 text-sm uppercase tracking-[0.45em]">MELANO</p>

            <h1 className="font-serif text-5xl leading-tight">
              Join The World
              <br />
              Of Italian Luxury.
            </h1>

            <p className="mt-6 text-sm leading-7 text-neutral-200">
              Create your account and experience timeless elegance and refined
              fashion.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center px-6 py-12">
          <Card className="w-full max-w-md border border-neutral-200 bg-white/90 p-10 shadow-none">
            {/* LOGO */}
            <div className="mb-10 text-center">
              <h2 className="font-serif text-4xl tracking-[0.25em]">MELANO</h2>

              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
                Create Account
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-6">
              {/* ERROR */}
              {error && (
                <div className="border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}
              {/* SUCCESS */}
              {success && (
                <div className="border border-green-200 bg-green-50 p-3 text-sm text-green-600">
                  {success}
                </div>
              )}
              {/* FIRST NAME */}
              <div className="space-y-2">
                <Label>First Name</Label>

                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="h-12 rounded-none border-0 border-b border-neutral-300 px-0 shadow-none focus-visible:ring-0"
                />
              </div>
              {/* LAST NAME */}
              <div className="space-y-2">
                <Label>Last Name</Label>

                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="h-12 rounded-none border-0 border-b border-neutral-300 px-0 shadow-none focus-visible:ring-0"
                />
              </div>
              {/* EMAIL */}
              <div className="space-y-2">
                <Label>Email</Label>

                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-12 rounded-none border-0 border-b border-neutral-300 px-0 shadow-none focus-visible:ring-0"
                />
              </div>
              {/* PASSWORD */}
              <div className="space-y-2">
                <Label>Password</Label>

                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="h-12 rounded-none border-0 border-b border-neutral-300 px-0 pr-10 shadow-none focus-visible:ring-0"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {/* CONFIRM PASSWORD */}
              <div className="space-y-2">
                <Label>Confirm Password</Label>

                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="passwordConfirm"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                    required
                    className="h-12 rounded-none border-0 border-b border-neutral-300 px-0 pr-10 shadow-none focus-visible:ring-0"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-500"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
              {/* BUTTON */}
              <Button
                type="submit"
                disabled={loading}
                className="
                  h-12
                  w-full
                  rounded-none
                  bg-black
                  text-sm
                  uppercase
                  tracking-[0.25em]
                  hover:bg-[#2b2b2b]
                "
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
              <Button
                type="button"
                onClick={handleGoogleSignup}
                className="
    h-12 w-full
    border border-neutral-300
    bg-white
    text-black
    uppercase
    tracking-[0.2em]
    hover:bg-neutral-100
  "
              >
                Continue with Google
              </Button>
              verify
              {/* FOOTER */}
              <div className="pt-4 text-center">
                <p className="text-sm text-neutral-500">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    className="border-b border-black text-black"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </main>
  );
}
