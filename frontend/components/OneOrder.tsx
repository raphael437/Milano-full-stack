/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getOrderDetails } from "@/services/productServices";

export default function OrderInfoPage() {
  const { orderid } = useParams();

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getOrderDetails(Number(orderid));
        setOrder(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [orderid]);
console.log(orderid,order)
  if (loading) return <p className="p-10">Loading...</p>;

  if (!order)
    return <p className="p-10">No order found</p>;

  return (
    <main className="p-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Order Info
      </h1>

      <div className="border p-6 rounded-xl space-y-3">
        <p><b>Order orderid:</b> {order.orderid}</p>
        <p><b>Status:</b> {order.status}</p>
        <p>
          <b>Tracking Number:</b>{" "}
          {order.trackingNumber}
        </p>

        <Link
          href={`/trackorder/${order.trackingNumber}`}
          className="text-blue-600 underline block mt-4"
        >
          Track This Order
        </Link>
      </div>
    </main>
  );
}