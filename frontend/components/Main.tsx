'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const products = [
  {
    id: 1,
    src: 'https://themewagon.github.io/kaira/images/banner-image-1.jpg',
    title: 'Giacca in Pelle',
    description: 'Soft Italian leather tailored with timeless Milano elegance.',
  },
  {
    id: 2,
    src: 'https://themewagon.github.io/kaira/images/banner-image-3.jpg',
    title: 'Moda Metropolitana',
    description: 'Minimal street silhouettes inspired by the style of Milan.',
  },
  {
    id: 3,
    src: 'https://themewagon.github.io/kaira/images/banner-image-2.jpg',
    title: 'Essenziali di Lusso',
    description: 'Elevated essentials crafted for refined everyday living.',
  },
  {
    id: 4,
    src: 'https://themewagon.github.io/kaira/images/banner-image-4.jpg',
    title: 'Maglieria Italiana',
    description:
      'Soft textures and elegant winter layering with artisanal detail.',
  },
  {
    id: 5,
    src: 'https://themewagon.github.io/kaira/images/banner-image-5.jpg',
    title: 'Collezione Inverno',
    description:
      'Warm contemporary tailoring designed for sophisticated comfort.',
  },
  {
    id: 6,
    src: 'https://themewagon.github.io/kaira/images/banner-image-6.jpg',
    title: 'Eleganza Moderna',
    description: 'Modern Italian luxury inspired by timeless craftsmanship.',
  },
];

export default function Main() {
  const [current, setCurrent] = useState(0);

  const itemsPerView = 3;

  const maxIndex = products.length - itemsPerView;

  const nextSlide = () => {
    setCurrent(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="w-full bg-[#f6f1ea] py-28 px-8 overflow-hidden">
      {/* HERO */}
      <div className="text-center mb-24 max-w-4xl mx-auto">
        <p className="uppercase tracking-[0.45em] text-[#a08f7d] text-xs mb-5">
          Casa di Milano
        </p>

        <h1 className="text-6xl md:text-7xl font-serif text-[#2c221c] leading-tight">
          L’Eleganza Italiana
        </h1>

        <p className="mt-8 text-[#6f6458] text-lg leading-9 max-w-2xl mx-auto">
          Inspired by the refined atmosphere of Milanese fashion houses, our
          collections embody timeless sophistication, artisanal craftsmanship,
          and contemporary Italian luxury.
        </p>

        {/* Editorial Image */}
        <div className="relative w-full aspect-[3/2] mt-16 rounded-[40px] overflow-hidden">
  <Image
    src="https://images.unsplash.com/photo-1557167668-6eb71e76b603?w=3000&q=100"
    alt="Italian luxury fashion"
    fill
    priority
    className="object-cover"
  />

  <div className="absolute inset-0 bg-black/10" />
</div>

        <p className="mt-8 italic text-[#8b7c6d] text-sm tracking-wide">
          “La moda passa, lo stile resta.”
        </p>

        <p className="text-[#b1a394] text-xs tracking-[0.25em] uppercase mt-2">
          Fashion fades, style remains.
        </p>
      </div>

      {/* CAROUSEL */}
      <div className="relative max-w-7xl mx-auto">
        {/* LEFT BUTTON */}
        <button
          onClick={prevSlide}
          className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-[#fcfaf7] border border-[#e7dfd4] rounded-full flex items-center justify-center hover:bg-[#2c221c] hover:text-white transition duration-300"
        >
          <ChevronLeft />
        </button>

        {/* TRACK */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${current * (100 / itemsPerView)}%)`,
            }}
          >
            {products.map(product => (
              <div key={product.id} className="basis-1/3 flex-shrink-0 px-5">
                {/* CARD */}
                <div className="group">
                  {/* IMAGE */}
                  <Link href={`/products/${product.id}`}>
                    <div className="relative aspect-[688/859] overflow-hidden rounded-[32px] bg-[#ede5db]">
                      <Image
                        src={product.src}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    </div>
                  </Link>

                  {/* TEXT */}
                  <div className="pt-7">
                    <p className="uppercase tracking-[0.3em] text-[10px] text-[#a39180] mb-3">
                      Made in Italy
                    </p>

                    <h2 className="text-[28px] font-serif text-[#2c221c]">
                      {product.title}
                    </h2>

                    <p className="text-[#6f6458] mt-4 leading-8 text-[15px]">
                      {product.description}
                    </p>

                    <Link
                      href={`/products`}
                      className="inline-block mt-6 text-[11px] uppercase tracking-[0.35em] border-b border-[#2c221c] pb-1 text-[#2c221c] hover:opacity-70 transition"
                    >
                      Discover now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT BUTTON */}
        <button
          onClick={nextSlide}
          className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-[#fcfaf7] border border-[#e7dfd4] rounded-full flex items-center justify-center hover:bg-[#2c221c] hover:text-white transition duration-300"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}
