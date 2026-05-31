"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyOtp } from "@/services/productServices";

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (!email) {
        setError("Email missing");
        return;
      }

      await verifyOtp({
        email,
        otp,
      });

      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f7f3ee]">
      <form onSubmit={handleVerify} className="w-full max-w-md bg-white p-10">

        <h1 className="mb-8 text-center font-serif text-3xl">
          Verify OTP
        </h1>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="mb-4 w-full border-b p-3 outline-none"
        />

        {error && (
          <p className="mb-4 text-sm text-red-500">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black p-3 text-white"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </main>
  );
}