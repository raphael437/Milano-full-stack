'use client'
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-3 text-sm">
      
      <Link
        href="/products/men"
        className="text-gray-700 hover:text-black transition"
      >
        Men
      </Link>

      <Link
        href="/products/women"
        className="text-gray-700 hover:text-black transition"
      >
        Women
      </Link>

      <Link
        href="/products/bags"
        className="text-gray-700 hover:text-black transition"
      >
        Bags
      </Link>

      <Link
        href="/products/watches"
        className="text-gray-700 hover:text-black transition"
      >
        Watches
      </Link>

    </div>
  );
}
