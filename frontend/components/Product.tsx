'use client';

import Image from 'next/image';
import { ShieldCheck, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchProduct } from '@/services/productServices';
import AddToCartButton from '@/components/AddToCart';

type ProductType = {
  id: number;
  price: number;
  name: string;
  description: string;
  image: string;
  colors: string[];
  sizes: string[];
};

export default function Product({ id }: { id: string }) {
  const productId = Number(id);

  const [product, setProduct] = useState<ProductType | null>(null);

  const normalizeColors = (colors: any): string[] => {
    if (!colors) return [];

    if (Array.isArray(colors)) {
      return colors.flatMap((c) =>
        typeof c === 'string'
          ? c.split(',').map((x) => x.trim())
          : []
      );
    }

    if (typeof colors === 'string') {
      return colors.split(',').map((c) => c.trim());
    }

    return [];
  };

  const normalizeSizes = (sizes: any): string[] => {
    if (!sizes) return [];

    if (Array.isArray(sizes)) {
      return sizes.map((s) => String(s).trim());
    }

    return [];
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProduct(id);

        const normalized: ProductType = {
          ...data,
          colors: normalizeColors(data.colors),
          sizes: normalizeSizes(data.sizes),
        };

        setProduct(normalized);
      } catch (err) {
        console.log(err);
      }
    };

    getProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <section className="min-h-screen bg-[#f8f5f0] px-6 py-20 lg:px-24">

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-20 lg:grid-cols-2">

        {/* IMAGE */}
        <div className="relative overflow-hidden rounded-[36px] bg-[#efe9df] p-10 shadow-2xl">
          <div className="absolute left-8 top-8 z-10 rounded-full bg-white/70 px-5 py-2 text-[11px] tracking-[0.3em]">
            MADE IN ITALY
          </div>

          <Image
            src={product.image}
            alt={product.name}
            width={800}
            height={800}
            className="h-[650px] w-full object-cover"
          />
        </div>

        {/* INFO */}
        <div className="flex flex-col justify-center">

          <h1 className="text-5xl font-light">
            {product.name}
          </h1>

          <p className="mt-5 text-3xl font-light">
            ${product.price}
          </p>

          <p className="mt-6 text-gray-600 leading-8">
            {product.description}
          </p>

          {/* COLORS (UI ONLY) */}
          <div className="mt-10">
            <h3 className="mb-4 text-xs uppercase tracking-[0.3em] text-gray-500">
              Colors
            </h3>

            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <span
                  key={color}
                  className="rounded-full border px-4 py-2 text-sm"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>

          {/* SIZES (UI ONLY) */}
          <div className="mt-8">
            <h3 className="mb-4 text-xs uppercase tracking-[0.3em] text-gray-500">
              Sizes
            </h3>

            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className="h-10 w-10 flex items-center justify-center rounded-full border text-sm"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* ADD TO CART (REAL BACKEND) */}
          <AddToCartButton productId={productId} />

          {/* FEATURES */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2">

            <div className="rounded-3xl border bg-white/60 p-6">
              <Truck className="mb-2" />
              <p className="text-sm">Free Worldwide Shipping</p>
            </div>

            <div className="rounded-3xl border bg-white/60 p-6">
              <ShieldCheck className="mb-2" />
              <p className="text-sm">Authentic Italian Craft</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}