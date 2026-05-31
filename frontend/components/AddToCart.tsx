"use client";

import { addToCart } from "@/services/productServices";

import { useRouter } from "next/navigation";

import { useState } from "react";

export default function AddToCartButton({
  productId,
}: {
  productId: number;
}) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const handleAdd = async () => {
    try {
      setLoading(true);

      await addToCart(productId, 1);

      // REFRESH DATA
      router.refresh();

      // GO TO CART
      router.push("/cart");
    } catch (err) {
      console.log(
        "Add to cart failed:",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      className="
        mt-6
        w-full
        border
        border-[#2d2a26]
        text-[#2d2a26]
        py-3
        rounded-full
        hover:bg-[#2d2a26]
        hover:text-white
        transition
        uppercase
        text-xs
        tracking-[0.2em]
        cursor-pointer
      "
    >
      {loading
        ? "Adding..."
        : "Add to Cart"}
    </button>
  );
}