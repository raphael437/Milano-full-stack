"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getUserOrders } from "@/services/productServices";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getUserOrders();
        setOrders(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <p className="p-10">Loading...</p>;

  if (!orders.length)
    return <p className="p-10">No orders yet</p>;

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border p-5 rounded-xl"
          >
            <p><b>Order ID:</b> {order.id}</p>
            <p><b>Status:</b> {order.status}</p>

            <Link
              href={`/orderinfo/${order.id}`}
              className="text-blue-600 underline mt-2 inline-block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}