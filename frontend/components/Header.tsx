"use client";

import {
  ChevronDown,
  ShoppingCart,
  User,
  Menu,
  X,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { getMe } from "@/services/productServices";

type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export default function Header() {
  const [openMenu, setOpenMenu] =
    useState<string | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [user, setUser] =
    useState<UserType | null>(null);

  const [loading, setLoading] =
    useState(true);

  const menuRef =
    useRef<HTMLDivElement>(null);

  const toggleMenu = (menu: string) => {
    if (openMenu === menu) {
      setOpenMenu(null);
    } else {
      setOpenMenu(menu);
    }
  };

  // CHECK AUTH
  useEffect(() => {
  const checkUser = async () => {
    // If there's no token, don't even try to fetch the user
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const data = await getMe();
      setUser(data.user); // adjust based on your actual return shape
    } catch (error) {
      setUser(null);
      // Do NOT redirect here – let the component handle it gracefully
    } finally {
      setLoading(false);
    }
  };

  checkUser();
}, []);

  // CLOSE DESKTOP DROPDOWNS ON OUTSIDE CLICK
  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setOpenMenu(null);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-white">
      <header className="mx-auto flex h-20 items-center justify-between px-4 md:px-8">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-6 lg:gap-12">

          {/* LOGO */}
          <Link href="/">
            <Image
              src="https://themewagon.github.io/kaira/images/main-logo.png"
              width={120}
              height={40}
              alt="header"
              className="h-auto w-[100px] md:w-[120px]"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav
            ref={menuRef}
            className="hidden lg:block"
          >
            <ul className="flex items-center gap-8 text-lg font-medium">

              {/* HOME */}
              <li>
                <Link
                  href="/"
                  className="hover:text-gray-500 transition"
                >
                  Home
                </Link>
              </li>

              {/* CLOTHING */}
              <li className="relative">
                <button
                  onClick={() =>
                    toggleMenu("clothing")
                  }
                  className="flex items-center gap-1 hover:text-gray-500 transition"
                >
                  Clothing
                  <ChevronDown size={18} />
                </button>

                {openMenu === "clothing" && (
                  <div
                    className="
                      absolute left-0 top-10
                      w-48
                      rounded-md
                      border
                      bg-white
                      p-3
                      shadow-lg
                      z-50
                    "
                  >
                    <Link
                      href="/products/men"
                      className="block py-2 hover:text-gray-500"
                    >
                      Men
                    </Link>

                    <Link
                      href="/products/women"
                      className="block py-2 hover:text-gray-500"
                    >
                      Women
                    </Link>
                  </div>
                )}
              </li>

              {/* ACCESSORIES */}
              <li className="relative">
                <button
                  onClick={() =>
                    toggleMenu("accessories")
                  }
                  className="flex items-center gap-1 hover:text-gray-500 transition"
                >
                  Accessories
                  <ChevronDown size={18} />
                </button>

                {openMenu ===
                  "accessories" && (
                  <div
                    className="
                      absolute left-0 top-10
                      w-48
                      rounded-md
                      border
                      bg-white
                      p-3
                      shadow-lg
                      z-50
                    "
                  >
                    <Link
                      href="/products/bags"
                      className="block py-2 hover:text-gray-500"
                    >
                      Bags
                    </Link>

                    <Link
                      href="/products/watches"
                      className="block py-2 hover:text-gray-500"
                    >
                      Watches
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* USER */}
          {!loading && (
            <Link
              href={
                user
                  ? "/me"
                  : "/signup"
              }
            >
              <User
                className="
                  cursor-pointer
                  hover:text-gray-500
                  transition
                "
              />
            </Link>
          )}

          {/* CART */}
          <Link href="/cart">
            <ShoppingCart
              className="
                cursor-pointer
                hover:text-gray-500
                transition
              "
            />
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() =>
              setMobileMenuOpen(
                !mobileMenuOpen
              )
            }
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={26} />
            ) : (
              <Menu size={26} />
            )}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="border-t bg-white lg:hidden">
          <div className="flex flex-col p-4">

            <Link
              href="/"
              className="py-3 text-base font-medium"
              onClick={() =>
                setMobileMenuOpen(false)
              }
            >
              Home
            </Link>

            {/* CLOTHING */}
            <div className="py-3 text-base font-medium">
              Clothing
            </div>

            <Link
              href="/products/men"
              className="py-2 pl-4 text-gray-600"
              onClick={() =>
                setMobileMenuOpen(false)
              }
            >
              Men
            </Link>

            <Link
              href="/products/women"
              className="py-2 pl-4 text-gray-600"
              onClick={() =>
                setMobileMenuOpen(false)
              }
            >
              Women
            </Link>

            {/* ACCESSORIES */}
            <div className="pt-4 pb-3 text-base font-medium">
              Accessories
            </div>

            <Link
              href="/products/bags"
              className="py-2 pl-4 text-gray-600"
              onClick={() =>
                setMobileMenuOpen(false)
              }
            >
              Bags
            </Link>

            <Link
              href="/products/watches"
              className="py-2 pl-4 text-gray-600"
              onClick={() =>
                setMobileMenuOpen(false)
              }
            >
              Watches
            </Link>

            {/* ACCOUNT */}
            <div className="mt-4 border-t pt-4">
              <Link
                href={
                  user
                    ? "/me"
                    : "/signup"
                }
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="block py-2"
              >
                {user
                  ? "me"
                  : "Sign Up"}
              </Link>

              <Link
                href="/cart"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="block py-2"
              >
                Cart
              </Link>
              <Link
                href="/orders"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="block py-2"
              >
                orders
              </Link>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
