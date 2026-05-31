/*

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createPayPalOrder } from '@/services/productServices';

import { Button } from '@/components/ui/button';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const [cart] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Italian Wool Jacket',
      price: 120,
      quantity: 1,
      image:
        'https://images.unsplash.com/photo-1520975958225-9c8f2b0b3f2c?q=80&w=1974&auto=format&fit=crop',
    },
    {
      id: 2,
      name: 'Luxury Cotton Shirt',
      price: 80,
      quantity: 1,
      image:
        'https://images.unsplash.com/photo-1520975682031-ae0d5b1f6f6b?q=80&w=1974&auto=format&fit=crop',
    },
  ]);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const data = await createPayPalOrder(total);

      if (data?.approvalUrl) {
        window.location.href = data.approvalUrl;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f3ee] text-black p-10">
      <div className="max-w-5xl mx-auto">

        
        <h1 className="text-3xl font-serif tracking-[0.3em] mb-10">
          CHECKOUT
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">

          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b pb-6"
              >
                <div className="relative w-24 h-28">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="font-medium">{item.name}</h2>

                  <p className="text-sm text-neutral-500">
                    {item.quantity} × ${item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border bg-white p-6 h-fit">

            <h2 className="text-lg font-serif mb-6">
              ORDER SUMMARY
            </h2>

            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>${total}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <div className="flex justify-between font-semibold text-lg border-t pt-4">
              <span>Total</span>
              <span>${total}</span>
            </div>

            <Button
              onClick={handleCheckout}
              disabled={loading}
              className="
                w-full mt-6 h-12
                bg-black text-white
                uppercase tracking-widest
                cursor-pointer
              "
            >
              {loading ? 'Processing...' : 'Pay with PayPal'}
            </Button>

            <div className="text-center mt-6">
              <Link
                href="/cart"
                className="text-sm border-b border-black"
              >
                Back to Cart
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

*/
