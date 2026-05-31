"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PayPalPage() {
  const router = useRouter();

  // Optional safety: if user lands here directly
  useEffect(() => {
    const lastUrl = sessionStorage.getItem("paypal_url");

    if (lastUrl) {
      window.location.href = lastUrl;
    } else {
      router.push("/create-order");
    }
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f7f3ee] px-6">

      <div className="bg-white p-10 rounded-3xl border border-[#ece7df] text-center max-w-md w-full">

        <h1 className="text-3xl font-serif text-[#2d2a26]">
          Redirecting to PayPal
        </h1>

        <p className="text-sm text-[#6b665f] mt-4">
          Please wait while we redirect you to secure payment.
        </p>

        <div className="mt-8 animate-pulse text-gray-400">
          Loading...
        </div>

      </div>

    </main>
  );
}