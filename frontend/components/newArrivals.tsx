"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

import Image from "next/image";
import Link from "next/link";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  addToCart,
  fetchProducts,
} from "@/services/productServices";

import { useRouter } from "next/navigation";

type ProductType = {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
};

export default function NewArrivalsCarousel() {
  const router = useRouter();

  const [products, setProducts] = useState<
    ProductType[]
  >([]);

  const [loadingProducts, setLoadingProducts] =
    useState(true);

  const [current, setCurrent] = useState(0);

  const [itemsPerView, setItemsPerView] =
    useState(4);

  const [isTransitioning, setIsTransitioning] =
    useState(false);

  const [loadingId, setLoadingId] = useState<
    number | null
  >(null);

  const timeoutRef =
    useRef<NodeJS.Timeout | null>(null);

  /* =========================================================
      FETCH REAL PRODUCTS
  ========================================================= */
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();

        setProducts(data || []);
      } catch (err) {
        console.log(
          "PRODUCT FETCH ERROR:",
          err
        );
      } finally {
        setLoadingProducts(false);
      }
    };

    loadProducts();
  }, []);

  /* =========================================================
      RESPONSIVE
  ========================================================= */
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;

      if (w >= 1024) {
        setItemsPerView(4);
      } else if (w >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    update();

    window.addEventListener("resize", update);

    return () =>
      window.removeEventListener(
        "resize",
        update
      );
  }, []);

  const maxIndex = Math.max(
    0,
    products.length - itemsPerView
  );

  const slidePercent = 100 / itemsPerView;

  const nextSlide = useCallback(() => {
    if (
      isTransitioning ||
      current >= maxIndex
    )
      return;

    setIsTransitioning(true);

    setCurrent((prev) =>
      Math.min(prev + 1, maxIndex)
    );

    if (timeoutRef.current)
      clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  }, [current, maxIndex, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (
      isTransitioning ||
      current <= 0
    )
      return;

    setIsTransitioning(true);

    setCurrent((prev) =>
      Math.max(prev - 1, 0)
    );

    if (timeoutRef.current)
      clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  }, [current, isTransitioning]);

  /* =========================================================
      ADD TO CART
  ========================================================= */
  const handleAddToCart = async (
    productId: number
  ) => {
    try {
      setLoadingId(productId);

      await addToCart(productId, 1);

      // GO TO CART
      router.push("/cart");
    } catch (err) {
      console.log(
        "Add to cart failed:",
        err
      );

      alert("Failed to add product");
    } finally {
      setLoadingId(null);
    }
  };

  if (loadingProducts) {
    return (
      <div className="py-20 text-center">
        Loading products...
      </div>
    );
  }

  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <h2 className="text-4xl md:text-5xl font-light text-center mb-12 tracking-wide">
          OUR NEW ARRIVALS
        </h2>

        {/* CAROUSEL */}
        <div className="relative">

          {/* LEFT */}
          {current > 0 && (
            <button
              onClick={prevSlide}
              className="
                absolute -left-8 top-1/2 -translate-y-1/2 z-20
                w-16 h-16 rounded-full border bg-white shadow
                flex items-center justify-center
                hover:bg-black hover:text-white transition
              "
            >
              <ChevronLeft size={30} />
            </button>
          )}

          {/* TRACK */}
          <div className="overflow-hidden">

            <div
              className="
                flex transition-transform
                duration-700 ease-in-out
              "
              style={{
                transform: `translateX(-${
                  current * slidePercent
                }%)`,
              }}
            >

              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 px-3"
                  style={{
                    width: `${slidePercent}%`,
                  }}
                >

                  {/* PRODUCT CARD */}
                  <div className="group relative">

                    {/* IMAGE */}
                    <div className="relative aspect-[704/956] overflow-hidden bg-gray-100">

                      <Link
                        href={`/products/${product.id}`}
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          unoptimized
                          className="
                            object-cover
                            group-hover:scale-105
                            transition-transform
                            duration-500
                          "
                        />
                      </Link>

                      {/* HOVER OVERLAY */}
                      <div
                        className="
                          absolute inset-0
                          bg-black/40
                          opacity-0
                          group-hover:opacity-100
                          transition
                          flex items-center justify-center
                        "
                      >

                        <button
                          onClick={() =>
                            handleAddToCart(
                              product.id
                            )
                          }
                          disabled={
                            loadingId ===
                            product.id
                          }
                          className="
                            bg-white text-black
                            px-5 py-3
                            text-sm font-medium
                            tracking-wide uppercase
                            hover:bg-black
                            hover:text-white
                            transition
                            cursor-pointer
                          "
                        >
                          {loadingId ===
                          product.id
                            ? "Adding..."
                            : "Add to Cart"}
                        </button>

                      </div>

                    </div>

                    {/* TEXT */}
                    <div className="mt-4 text-center">

                      <h3 className="text-base font-medium tracking-wide">
                        {product.name}
                      </h3>

                      <p className="text-gray-500 text-sm mt-1">
                        $
                        {Number(
                          product.price
                        ).toFixed(2)}
                      </p>

                    </div>

                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          {current < maxIndex && (
            <button
              onClick={nextSlide}
              className="
                absolute -right-8 top-1/2 -translate-y-1/2 z-20
                w-16 h-16 rounded-full border bg-white shadow
                flex items-center justify-center
                hover:bg-black hover:text-white transition
              "
            >
              <ChevronRight size={30} />
            </button>
          )}
        </div>

        {/* VIEW ALL */}
        <div className="text-center mt-12">

          <Link
            href="/products"
            className="
              inline-block px-8 py-3 border
              text-sm tracking-wider
              hover:bg-black hover:text-white
              transition
            "
          >
            VIEW ALL PRODUCTS
          </Link>

        </div>
      </div>
    </section>
  );
}