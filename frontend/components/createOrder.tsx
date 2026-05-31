"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPayPalOrder } from "@/services/productServices";

export default function CreateOrderPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    shipCountry: "",
    shipCity: "",
    shipPostalCode: "",
    shipAddress1: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckout = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);
      setError("");

      const data = await createPayPalOrder(formData);

      if (!data?.approvalUrl) {
        throw new Error("Missing PayPal approval URL");
      }

      // Redirect user to PayPal
      window.location.href = data.approvalUrl;
    } catch (err: any) {
      console.log("CHECKOUT ERROR:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Checkout failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f3ee] px-6 py-20">
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl border border-[#ece7df]">

        {/* TITLE */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.35em] uppercase text-gray-500 mb-3">
            Secure Checkout
          </p>

          <h1 className="text-4xl font-serif text-[#2d2a26]">
            Shipping Details
          </h1>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 bg-red-100 text-red-600 p-4 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleCheckout} className="space-y-6">

          {/* COUNTRY */}
          <div>
            <label className="block text-sm mb-2 text-[#6b665f]">
              Country Code
            </label>
            <input
              type="text"
              name="shipCountry"
              placeholder="EG"
              value={formData.shipCountry}
              onChange={handleChange}
              className="w-full border border-[#ddd] p-4 rounded-xl outline-none focus:border-black"
              required
            />
          </div>

          {/* CITY */}
          <div>
            <label className="block text-sm mb-2 text-[#6b665f]">
              City
            </label>
            <input
              type="text"
              name="shipCity"
              placeholder="Cairo"
              value={formData.shipCity}
              onChange={handleChange}
              className="w-full border border-[#ddd] p-4 rounded-xl outline-none focus:border-black"
              required
            />
          </div>

          {/* POSTAL */}
          <div>
            <label className="block text-sm mb-2 text-[#6b665f]">
              Postal Code
            </label>
            <input
              type="text"
              name="shipPostalCode"
              placeholder="11511"
              value={formData.shipPostalCode}
              onChange={handleChange}
              className="w-full border border-[#ddd] p-4 rounded-xl outline-none focus:border-black"
              required
            />
          </div>

          {/* ADDRESS */}
          <div>
            <label className="block text-sm mb-2 text-[#6b665f]">
              Address
            </label>
            <input
              type="text"
              name="shipAddress1"
              placeholder="Street Address"
              value={formData.shipAddress1}
              onChange={handleChange}
              className="w-full border border-[#ddd] p-4 rounded-xl outline-none focus:border-black"
              required
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-sm mb-2 text-[#6b665f]">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              placeholder="+20xxxxxxxxxx"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-[#ddd] p-4 rounded-xl outline-none focus:border-black"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-full uppercase tracking-[0.2em] text-sm hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Redirecting..." : "Continue to PayPal"}
          </button>

        </form>
      </div>
    </main>
  );
}