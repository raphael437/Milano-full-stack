'use client';

import {
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import {
  fetchProducts,
  addToCart,
} from '@/services/productServices';

import { useRouter } from 'next/navigation';

type ProductType = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function MayLike() {
  const router = useRouter();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

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
     FETCH PRODUCTS
  ========================================================= */

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();

        const formattedProducts = data.map(
          (product: any) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            image:
              product.image ||
              'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop',
          })
        );

        // RANDOM PRODUCTS
        const shuffled = formattedProducts.sort(
          () => 0.5 - Math.random()
        );

        setProducts(shuffled.slice(0, 8));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
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

      if (w >= 1280) {
        setItemsPerView(4);
      } else if (w >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    update();

    window.addEventListener(
      'resize',
      update
    );

    return () =>
      window.removeEventListener(
        'resize',
        update
      );
  }, []);

  const maxIndex = Math.max(
    0,
    products.length - itemsPerView
  );

  const slidePercent = 100 / itemsPerView;

  /* =========================================================
     NEXT
  ========================================================= */

  const nextSlide = useCallback(() => {
    if (
      isTransitioning ||
      current >= maxIndex
    )
      return;

    setIsTransitioning(true);

    setCurrent(prev =>
      Math.min(prev + 1, maxIndex)
    );

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  }, [current, maxIndex, isTransitioning]);

  /* =========================================================
     PREV
  ========================================================= */

  const prevSlide = useCallback(() => {
    if (
      isTransitioning ||
      current <= 0
    )
      return;

    setIsTransitioning(true);

    setCurrent(prev =>
      Math.max(prev - 1, 0)
    );

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

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

      router.push('/cart');
    } catch (err) {
      console.log(
        'Add to cart failed:',
        err
      );

      alert('Failed to add product');
    } finally {
      setLoadingId(null);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading products...
      </div>
    );
  }

  return (
    <section className="w-full bg-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div
          className="
            flex flex-col md:flex-row
            md:items-center
            md:justify-between
            gap-6 mb-14
          "
        >
          <h2
            className="
              text-4xl md:text-5xl
              font-extrabold tracking-wide
              text-black
            "
          >
            You May Also Like
          </h2>

          <Link
            href="/products"
            className="
              px-8 py-3 border border-black
              text-sm uppercase
              tracking-[0.15em]
              hover:bg-black
              hover:text-white
              transition
            "
          >
            View All Products
          </Link>
        </div>

        {/* CAROUSEL */}
        <div className="relative">
          {/* LEFT */}
          {current > 0 && (
            <button
              onClick={prevSlide}
              className="
                absolute -left-6 top-1/2
                -translate-y-1/2 z-20
                w-14 h-14 bg-white border
                shadow rounded-full
                flex items-center
                justify-center
                hover:bg-black
                hover:text-white
                transition
              "
            >
              <ChevronLeft size={28} />
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
              {products.map(product => (
                <div
                  key={product.id}
                  className="flex-shrink-0 px-3"
                  style={{
                    width: `${slidePercent}%`,
                  }}
                >
                  <div className="group">
                    {/* IMAGE */}
                    <div
                      className="
                        relative
                        aspect-[704/956]
                        overflow-hidden
                        bg-gray-100
                        rounded-xl
                      "
                    >
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

                      {/* HOVER */}
                      <div
                        className="
                          absolute inset-0
                          bg-black/40
                          opacity-0
                          group-hover:opacity-100
                          transition
                          flex items-center
                          justify-center
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
                            px-5 py-3 text-sm
                            uppercase tracking-wide
                            hover:bg-black
                            hover:text-white
                            transition
                            cursor-pointer
                          "
                        >
                          {loadingId ===
                          product.id
                            ? 'Adding...'
                            : 'Add to Cart'}
                        </button>
                      </div>
                    </div>

                    {/* INFO */}
                    <div
                      className="
                        mt-5 text-center
                        space-y-2
                      "
                    >
                      <h3
                        className="
                          text-base font-semibold
                          tracking-wide text-black
                        "
                      >
                        {product.name}
                      </h3>

                      <p className="text-gray-500 text-sm">
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
                absolute -right-6 top-1/2
                -translate-y-1/2 z-20
                w-14 h-14 bg-white border
                shadow rounded-full
                flex items-center
                justify-center
                hover:bg-black
                hover:text-white
                transition
              "
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}