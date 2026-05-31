/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  Trash2,
  Plus,
  Minus,
} from "lucide-react";

import {
  getCart,
  updateCartItem,
  removeCartItem,
} from "@/services/productServices";

type CartItem = {
  cartItemId: number;
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  /* =========================================================
      FETCH CART
  ========================================================= */

  useEffect(() => {
    let mounted = true;

    const loadCart = async () => {
      try {
        const response = await getCart();

        if (!mounted) return;

        const formattedCart =
          response?.CartItems?.map((item: any) => ({
            cartItemId: item.id,
            id: item.Product.id,
            name: item.Product.name,
            price: item.Product.price,
            image: item.Product.image,
            quantity: item.quantity,
          })) || [];

        setCart(formattedCart);
      } catch (err) {
        console.log("Cart fetch error:", err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadCart();

    return () => {
      mounted = false;
    };
  }, []);

  /* =========================================================
      UPDATE QUANTITY
  ========================================================= */

  const updateQuantity = async (
    cartItemId: number,
    currentQuantity: number,
    type: "inc" | "dec"
  ) => {
    try {
      const newQuantity =
        type === "inc"
          ? currentQuantity + 1
          : currentQuantity - 1;

      if (newQuantity <= 0) {
        await handleRemove(cartItemId);
        return;
      }

      // UPDATE DATABASE
      await updateCartItem(
        cartItemId,
        newQuantity
      );

      // UPDATE UI
      setCart(prev =>
        prev.map(item =>
          item.cartItemId === cartItemId
            ? {
                ...item,
                quantity: newQuantity,
              }
            : item
        )
      );
    } catch (err) {
      console.log(
        "UPDATE QUANTITY ERROR:",
        err
      );
    }
  };

  /* =========================================================
      REMOVE ITEM
  ========================================================= */

  const handleRemove = async (
    cartItemId: number
  ) => {
    try {
      await removeCartItem(cartItemId);

      setCart(prev =>
        prev.filter(
          item =>
            item.cartItemId !==
            cartItemId
        )
      );
    } catch (err) {
      console.log(
        "REMOVE ITEM ERROR:",
        err
      );
    }
  };

  /* =========================================================
      TOTAL
  ========================================================= */

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  /* =========================================================
      LOADING
  ========================================================= */

  if (loading) {
    return (
      <p className="p-10 text-center">
        Loading cart...
      </p>
    );
  }

  /* =========================================================
      UI
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#f7f3ee] text-black p-10">
      <div className="max-w-6xl mx-auto">

        {/* TITLE */}
        <h1 className="text-3xl font-serif tracking-[0.3em] mb-10">
          YOUR CART
        </h1>

        {/* EMPTY */}
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-500">
              Your cart is empty
            </p>

            <Link
              href="/products"
              className="underline mt-4 inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">

              {cart.map(item => (
                <div
                  key={item.cartItemId}
                  className="flex gap-4 border-b pb-6"
                >

                  {/* IMAGE */}
                  <div className="relative w-28 h-32">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover rounded-xl"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex-1">

                    <h2 className="font-medium text-lg">
                      {item.name}
                    </h2>

                    <p className="text-sm text-neutral-500 mt-1">
                      ${item.price}
                    </p>

                    {/* QUANTITY */}
                    <div className="flex items-center gap-3 mt-4">

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.cartItemId,
                            item.quantity,
                            "dec"
                          )
                        }
                        className="cursor-pointer border p-2 rounded-full"
                      >
                        <Minus size={16} />
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.cartItemId,
                            item.quantity,
                            "inc"
                          )
                        }
                        className="cursor-pointer border p-2 rounded-full"
                      >
                        <Plus size={16} />
                      </button>

                    </div>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() =>
                      handleRemove(
                        item.cartItemId
                      )
                    }
                    className="cursor-pointer text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>
              ))}
            </div>

            {/* RIGHT */}
            <div className="border p-6 bg-white rounded-3xl h-fit">

              <h2 className="text-2xl font-serif mb-6">
                ORDER SUMMARY
              </h2>

              <div className="space-y-4 mb-8">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <div className="border-t pt-4 flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total}</span>
                </div>

              </div>

              <Link href="/create-order">
                <button
                  className="
                    mt-8
                    w-full
                    bg-black
                    text-white
                    py-4
                    rounded-full
                    uppercase
                    tracking-[0.25em]
                    text-xs
                    hover:bg-[#2d2a26]
                    transition
                    cursor-pointer
                  "
                >
                  Checkout
                </button>
              </Link>

              <Link
                href="/products"
                className="block text-center mt-5 text-sm text-neutral-500"
              >
                Continue Shopping
              </Link>

            </div>

          </div>
        )}
      </div>
    </main>
  );
}