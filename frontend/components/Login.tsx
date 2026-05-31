/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { loginUser } from "@/services/productServices";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
const handleGoogleLogin = () => {
  window.location.href =
    `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/users/google`;
};
  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser(formData);

      console.log(data);

      // save token
      localStorage.setItem("token", data.token);

      // redirect
      router.push("/");
    } catch (err: any) {
      console.log(err);

      setError(
        err?.response?.data?.message ||
          "Email or password is incorrect"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f3ee] text-black">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT IMAGE SECTION */}
        <div className="relative hidden lg:block">
          <Image
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1974&auto=format&fit=crop"
            alt="Luxury Italian Fashion"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/35" />

          <div className="absolute bottom-16 left-16 z-10 max-w-md text-white">
            <p className="mb-4 text-sm uppercase tracking-[0.45em]">
              Firenze Collection
            </p>

            <h1 className="font-serif text-5xl leading-tight">
              Timeless Luxury,
              <br />
              Tailored In Italy.
            </h1>

            <p className="mt-6 text-sm leading-7 text-neutral-200">
              Discover refined silhouettes, handcrafted elegance,
              and modern Italian fashion culture.
            </p>
          </div>
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="flex items-center justify-center px-6 py-12">
          <Card className="w-full max-w-md border border-neutral-200 bg-white/90 p-10 shadow-none backdrop-blur-sm">

            {/* LOGO */}
            <div className="mb-10 text-center">
              <h2 className="font-serif text-4xl tracking-[0.25em]">
                MELANO
              </h2>

              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
                Italian Fashion House
              </p>
            </div>

            {/* FORM */}
            <form
              className="space-y-6"
              onSubmit={handleLogin}
            >

              {/* ERROR */}
              {error && (
                <div className="border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* EMAIL */}
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-[0.2em] text-neutral-600">
                  Email Address
                </Label>

                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
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

              {/* PASSWORD */}
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-[0.2em] text-neutral-600">
                  Password
                </Label>

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
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
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="
                      absolute
                      right-0
                      top-1/2
                      -translate-y-1/2
                      cursor-pointer
                      text-neutral-500
                      transition
                      hover:text-black
                    "
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* OPTIONS */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer accent-black"
                  />

                  <p className="text-sm text-neutral-600">
                    Remember me
                  </p>
                </div>

                <Link
                  href="/forgotpassword"
                  className="
                    cursor-pointer
                    text-sm
                    text-neutral-500
                    transition
                    hover:text-black
                  "
                >
                  Forgot Password?
                </Link>
              </div>

              {/* GOOGLE LOGIN */}
              <div className="space-y-4">
               <Button
  type="button"
  variant="outline"
  onClick={handleGoogleLogin}
  className="
    h-12
    w-full
    cursor-pointer
    rounded-none
    border
    border-neutral-300
    bg-white
    text-sm
    uppercase
    tracking-[0.15em]
    transition-all
    duration-300
    hover:bg-neutral-100
  "
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="mr-3 h-5 w-5"
  >
    <path
      fill="#FFC107"
      d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
    />
    <path
      fill="#FF3D00"
      d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2C29.2 36 26.8 37 24 37c-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.6 39.5 16.2 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.4 5.4-6.5 6.8l6.2 5.2C38.7 36.7 44 31 44 24c0-1.3-.1-2.3-.4-3.5z"
    />
  </svg>

  Continue with Google
</Button>

                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-neutral-200" />

                  <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                    Or
                  </span>

                  <div className="h-px flex-1 bg-neutral-200" />
                </div>
              </div>

              {/* SIGN IN BUTTON */}
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
                  transition-all
                  duration-300
                  hover:bg-[#2b2b2b]
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                "
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>

              {/* FOOTER */}
              <div className="pt-6 text-center">
                <p className="text-sm text-neutral-500">
                  New to Melano?{" "}
                  <Link
                    href="/signup"
                    className="
                      cursor-pointer
                      border-b
                      border-black
                      pb-[1px]
                      text-black
                      transition
                      hover:opacity-70
                    "
                  >
                    Create Account
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