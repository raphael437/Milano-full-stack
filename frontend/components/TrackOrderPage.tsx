/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function TrackOrderPage() {
  const params = useParams();
  const trackingNumber = params?.trackingNumber as string;

  const [trackingData, setTrackingData] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!trackingNumber) return;

    const loadTracking = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/orders/track/${trackingNumber}`,
          {
            withCredentials: true,
          }
        );

        setTrackingData(res.data);
      } catch (err) {
        console.log("TRACKING ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTracking();
  }, [trackingNumber]);

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading tracking information...
      </div>
    );
  }

  if (!trackingData) {
    return (
      <div className="p-10 text-center">
        No tracking information found.
      </div>
    );
  }

  const order = trackingData.order;
  const trackingInfo = trackingData.trackingInfo;

  return (
    <main className="max-w-3xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8">
        Order Tracking
      </h1>

      <div className="border rounded-xl p-6 space-y-4">
        <p>
          <strong>Order ID:</strong>{" "}
          {order?.id}
        </p>

        <p>
          <strong>Order Status:</strong>{" "}
          {order?.status}
        </p>

        <p>
          <strong>Tracking Number:</strong>{" "}
          {trackingNumber}
        </p>

        <p>
          <strong>Carrier Status:</strong>{" "}
          {trackingInfo?.status ||
            "Processing"}
        </p>

        {trackingInfo?.updates?.length > 0 && (
          <div>
            <h2 className="font-semibold mb-3">
              Tracking Updates
            </h2>

            <div className="space-y-3">
              {trackingInfo.updates.map(
                (
                  update: any,
                  index: number
                ) => (
                  <div
                    key={index}
                    className="border-l-2 pl-4"
                  >
                    <p className="font-medium">
                      {
                        update.description
                      }
                    </p>

                    <p className="text-sm text-gray-500">
                      {update.date}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}