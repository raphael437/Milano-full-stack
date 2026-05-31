"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  getMe,
  getCart,
  logOut,
} from "@/services/productServices";

import { useRouter } from "next/navigation";

type CartItemType = {
  id: number;
  quantity: number;

  Product: {
    id: number;
    name: string;
    image: string;
    price: number;
  };
};

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] =
    useState<any>(null);

  const [cart, setCart] = useState<
    CartItemType[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [logoutLoading, setLogoutLoading] =
    useState(false);

  /* =========================================================
     FETCH USER + CART
  ========================================================= */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getMe();

        setUser(userData);

        const cartData = await getCart();

        setCart(
          cartData?.CartItems || []
        );
      } catch (err) {
        console.log(err);

        router.push("/signup");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);

      await logOut();

      router.push("/signup");

      router.refresh();
    } catch (err) {
      console.log(err);
    } finally {
      setLogoutLoading(false);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          flex items-center justify-center
          text-xl
        "
      >
        Loading...
      </div>
    );
  }

  /* =========================================================
     NO USER
  ========================================================= */

  if (!user) {
    return (
      <div
        className="
          min-h-screen
          flex items-center justify-center
        "
      >
        Not logged in
      </div>
    );
  }

  const total = cart.reduce(
    (acc, item) =>
      acc +
      item.Product.price *
        item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-[#f7f3ee] p-6 md:p-10">

      <div className="max-w-6xl mx-auto space-y-10">

        {/* =========================================================
            USER CARD
        ========================================================= */}

        <div
          className="
            bg-white
            rounded-3xl
            border
            p-6 md:p-8
            flex flex-col md:flex-row
            items-start md:items-center
            justify-between
            gap-6
            shadow-sm
          "
        >

          {/* LEFT */}
          <div className="flex items-center gap-5">

            <Image
              src={
                user.image ||
                "/avatar.png"
              }
              width={90}
              height={90}
              alt="user"
              className="
                rounded-full
                object-cover
                border
              "
            />

            <div className="space-y-1">

              <h1
                className="
                  text-2xl md:text-3xl
                  font-serif
                "
              >
                {user.firstName}{" "}
                {user.lastName}
              </h1>

              <p className="text-gray-500">
                {user.email}
              </p>

              <div className="flex items-center gap-3 mt-2">

                <span
                  className="
                    px-3 py-1
                    rounded-full
                    bg-black
                    text-white
                    text-xs
                    uppercase
                    tracking-[0.15em]
                  "
                >
                  {user.role}
                </span>

                {/* ADMIN BUTTON */}
                {user.role ===
                  "admin" && (
                  <Link
                    href="/admin"
                    className="
                      px-4 py-2
                      border
                      rounded-full
                      text-sm
                      uppercase
                      tracking-[0.15em]
                      hover:bg-black
                      hover:text-white
                      transition
                    "
                  >
                    Admin Panel
                  </Link>
                )}

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <button
            onClick={handleLogout}
            disabled={logoutLoading}
            className="
              bg-black
              text-white
              px-6 py-3
              rounded-full
              uppercase
              tracking-[0.2em]
              text-xs
              hover:opacity-90
              transition
              cursor-pointer
            "
          >
            {logoutLoading
              ? "Logging out..."
              : "Logout"}
          </button>

        </div>

        {/* =========================================================
            CART SECTION
        ========================================================= */}

        <div
          className="
            bg-white
            rounded-3xl
            border
            p-6 md:p-8
            shadow-sm
          "
        >

          {/* HEADER */}
          <div
            className="
              flex flex-col md:flex-row
              md:items-center
              justify-between
              gap-4
              mb-8
            "
          >

            <div>
              <h2
                className="
                  text-2xl
                  font-serif
                "
              >
                My Cart
              </h2>

              <p className="text-gray-500 mt-1">
                {cart.length} item
                {cart.length !== 1 &&
                  "s"}
              </p>
            </div>

            <div
              className="
                text-right
              "
            >
              <p className="text-gray-500 text-sm">
                Cart Total
              </p>

              <p
                className="
                  text-2xl
                  font-semibold
                "
              >
                $
                {total.toFixed(2)}
              </p>
            </div>

          </div>

          {/* EMPTY */}
          {cart.length === 0 ? (
            <div className="text-center py-14">

              <p className="text-gray-500 mb-6">
                Your cart is empty
              </p>

              <Link
                href="/products"
                className="
                  inline-block
                  border
                  px-6 py-3
                  rounded-full
                  uppercase
                  tracking-[0.15em]
                  text-sm
                  hover:bg-black
                  hover:text-white
                  transition
                "
              >
                Continue Shopping
              </Link>

            </div>
          ) : (
            <div className="space-y-5">

              {cart.map(item => (
                <div
                  key={item.id}
                  className="
                    flex flex-col md:flex-row
                    md:items-center
                    justify-between
                    gap-5
                    border-b
                    pb-5
                  "
                >

                  {/* PRODUCT */}
                  <div className="flex items-center gap-5">

                    <div
                      className="
                        relative
                        w-24 h-28
                        rounded-2xl
                        overflow-hidden
                        bg-gray-100
                      "
                    >

                      <Image
                        src={
                          item.Product
                            .image
                        }
                        alt={
                          item.Product
                            .name
                        }
                        fill
                        className="object-cover"
                      />

                    </div>

                    <div className="space-y-1">

                      <h3
                        className="
                          text-lg
                          font-medium
                        "
                      >
                        {
                          item.Product
                            .name
                        }
                      </h3>

                      <p className="text-gray-500 text-sm">
                        Quantity:{" "}
                        {
                          item.quantity
                        }
                      </p>

                      <p className="text-gray-500 text-sm">
                        Price: $
                        {
                          item.Product
                            .price
                        }
                      </p>

                    </div>

                  </div>

                  {/* TOTAL */}
                  <div
                    className="
                      text-lg
                      font-semibold
                    "
                  >
                    $
                    {(
                      item.Product
                        .price *
                      item.quantity
                    ).toFixed(2)}
                  </div>

                </div>
              ))}

              {/* GO TO CART */}
              <div className="pt-6">

                <Link
                  href="/cart"
                  className="
                    w-full md:w-auto
                    inline-flex
                    items-center
                    justify-center
                    bg-black
                    text-white
                    px-8 py-4
                    rounded-full
                    uppercase
                    tracking-[0.2em]
                    text-xs
                    hover:opacity-90
                    transition
                  "
                >
                  Go To Cart
                </Link>

              </div>

            </div>
          )}

        </div>

      </div>

    </main>
  );
}