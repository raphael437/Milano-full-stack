import Image from 'next/image';
import Sidebar from './Sidebar';
import { fetchProducts } from '@/services/productServices';
import AddToCartButton from '@/components/AddToCart';
import Link from 'next/link';

// export const dynamic = 'force-dynamic';

export default async function Products() {
  const products = await fetchProducts();

  return (
    <div className="min-h-screen bg-[#f7f3ee] flex">

      {/* SIDEBAR */}
      <div className="w-44 bg-[#f8f4ef] border-r border-[#e7dfd4] p-6">
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 px-8 py-12">

        {/* HEADER */}
        <div className="mb-14">
          <p className="text-xs tracking-[0.35em] uppercase text-gray-500 mb-3">
            Milano Collection
          </p>

          <h1 className="text-5xl font-serif tracking-wide text-[#2d2a26]">
            Timeless Italian Elegance
          </h1>

          <p className="mt-4 text-sm text-[#6b665f] max-w-xl leading-7">
            Refined silhouettes, artisanal craftsmanship, and contemporary luxury inspired by Milan.
          </p>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {products?.map((product: any) => (
            <div
              key={product.id}
              className="bg-[#fcfaf7] rounded-[28px] overflow-hidden border border-[#ece7df] hover:-translate-y-1 transition-all duration-500 flex flex-col group"
            >

              {/* IMAGE → CLICKABLE */}
              <Link href={`/products/${product.id}`}>
                <div className="relative w-full h-[420px] bg-[#f5f1ea] overflow-hidden cursor-pointer">

                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                </div>
              </Link>

              {/* CONTENT */}
              <div className="p-5 flex flex-col flex-1">

                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">
                  Made in Italy
                </p>

                {/* NAME → ALSO CLICKABLE (optional but better UX) */}
                <Link href={`/products/${product.id}`}>
                  <h2 className="text-[22px] font-serif text-[#2d2a26] leading-snug hover:underline cursor-pointer">
                    {product.name}
                  </h2>
                </Link>

                <p className="text-[#6b665f] text-sm mt-3 leading-6 line-clamp-2">
                  {product.description}
                </p>

                <div className="mt-auto pt-6 flex items-center justify-between">

                  <span className="text-2xl font-light tracking-wide text-[#1f1b17]">
                    €{product.price}
                  </span>

                  <span className="text-[10px] tracking-[0.2em] uppercase bg-[#f3eee7] text-[#6b665f] px-3 py-1 rounded-full">
                    {product.category}
                  </span>

                </div>

                {/* ADD TO CART */}
                <AddToCartButton productId={product.id} />

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}