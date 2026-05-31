import Image from 'next/image';
import Link from 'next/link';
import Sidebar from './Sidebar';
import { getWatches } from '@/services/productServices';

export default async function WatchPage() {
  const products = await getWatches();

  return (
    <div className="min-h-screen bg-[#f7f3ee] flex">
      {/* SIDEBAR */}
      <div className="w-44 bg-[#f8f4ef] border-r border-[#e7dfd4] p-6">
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 px-8 py-12">

        {/* HERO */}
        <div className="mb-14">
          <p className="text-xs tracking-[0.35em] uppercase text-gray-500 mb-3">
            Milano Timepieces
          </p>

          <h1 className="text-5xl font-serif tracking-wide text-[#2d2a26]">
            Luxury Watches Collection
          </h1>

          <p className="mt-4 text-sm text-[#6b665f] max-w-xl leading-7">
            Precision engineering, timeless design, and luxury craftsmanship inspired by Swiss and Italian watchmaking.
          </p>
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products?.map((product: any) => (
            <div
              key={product.id}
              className="bg-[#fcfaf7] rounded-[28px] overflow-hidden border border-[#ece7df] hover:-translate-y-1 transition-all duration-500 flex flex-col group"
            >
              {/* IMAGE */}
              <Link href={`/products/${product.id}`}>
                <div className="relative w-full h-[420px] bg-[#f5f1ea] overflow-hidden cursor-pointer">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition duration-700"
                  />
                </div>
              </Link>

              {/* CONTENT */}
              <div className="p-5 flex flex-col flex-1">

                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">
                  Swiss Inspired
                </p>

                <h2 className="text-[22px] font-serif text-[#2d2a26] leading-snug">
                  {product.name}
                </h2>

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

                <Link
                  href="/cart"
                  className="mt-6 w-full border border-[#2d2a26] text-[#2d2a26] py-3 rounded-full hover:bg-[#2d2a26] hover:text-white transition duration-300 tracking-[0.2em] uppercase text-xs text-center block"
                >
                  Add to Cart
                </Link>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}