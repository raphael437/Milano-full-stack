"use client";

export const dynamic = "force-dynamic";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiClient } from "@/services/productServices";   // ← use apiClient

/* ================================
   INNER COMPONENT (uses hook)
================================ */
function PayPalSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const orderId = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const captureOrder = async () => {
      try {
        if (!orderId) {
          setError("Missing order information");
          setLoading(false);
          return;
        }

        console.log("PayPal Order ID:", orderId);

        // Use apiClient instead of raw axios – it adds the Bearer token automatically
        await apiClient.post("/api/v1/orders/capture", { orderId });

        setTimeout(() => {
          router.push("/orders");
        }, 2500);
      } catch (err: any) {
        console.error("ORDER ERROR:", err?.response?.data || err);
        setError("Failed to create order.");
      } finally {
        setLoading(false);
      }
    };

    captureOrder();
  }, [orderId, router]);

  return (
    <main className="min-h-screen bg-[#f7f3ee] flex items-center justify-center px-6">
      <div className="bg-white max-w-lg w-full rounded-3xl border border-[#ece7df] p-10 text-center">
        {loading ? (
          <>
            <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h1 className="text-3xl font-serif text-[#2d2a26] mb-4">
              Order Created Successfully
            </h1>
            <p className="text-gray-500">Preparing your order details...</p>
          </>
        ) : error ? (
          <>
            <h1 className="text-3xl font-serif text-red-600 mb-4">
              Something Went Wrong
            </h1>
            <p className="text-gray-600">{error}</p>
          </>
        ) : (
          <>
            <div className="text-6xl mb-6">✓</div>
            <h1 className="text-3xl font-serif text-[#2d2a26] mb-4">
              Order Created Successfully
            </h1>
            <p className="text-gray-500">Redirecting to your orders...</p>
          </>
        )}
      </div>
    </main>
  );
}

/* ================================
   WRAPPER WITH SUSPENSE
================================ */
export default function PayPalSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PayPalSuccessContent />
    </Suspense>
  );
}
