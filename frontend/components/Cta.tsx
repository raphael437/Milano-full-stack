'use client'
import Image from 'next/image';
import Link from 'next/link';
import { Input } from './ui/input';
import { Button } from './ui/button';

const images = [
  'https://themewagon.github.io/kaira/images/insta-item1.jpg',
  'https://themewagon.github.io/kaira/images/insta-item2.jpg',
  'https://themewagon.github.io/kaira/images/insta-item3.jpg',
  'https://themewagon.github.io/kaira/images/insta-item4.jpg',
  'https://themewagon.github.io/kaira/images/insta-item5.jpg',
  'https://themewagon.github.io/kaira/images/insta-item6.jpg',
];

export default function Cta() {
  return (
    <section className="w-full bg-[#f8f8f8] overflow-hidden">
      {/* Newsletter */}
      <div className="relative flex flex-col items-center justify-center py-24 px-6">
        {/* Background text */}
        <h1 className="absolute inset-0 text-[120px] font-light uppercase text-gray-200 opacity-40 tracking-[10px] leading-none text-center overflow-hidden select-none">
          Newsletter Newsletter Newsletter
        </h1>

        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-serif uppercase text-black text-center mb-10">
            Sign Up For Our Newsletter
          </h2>

          <div className="w-full flex flex-col gap-3">
            <Input
              type="email"
              placeholder="Your Email Address"
              className="h-14 bg-white text-lg rounded-md"
            />
            <button className="h-14 w-full bg-[#1b1f27] hover:bg-black text-white text-lg uppercase tracking-[2px] transition-all duration-300 rounded-none cursor-pointer border border-transparent hover:border-white">
              <Link href="/signup">Sign Up</Link>
            </button>
          </div>
        </div>
      </div>

      {/* Instagram images */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {images.map((img, index) => (
          <div key={index} className="relative group overflow-hidden">
            <Image
              src={img}
              alt={`instagram-${index}`}
              width={400}
              height={400}
              className="w-full h-[250px] object-cover transition duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Instagram button */}
      <div className="flex justify-center -mt-6 relative z-10">
        <Link
          href="/products"
          className="bg-[#1b1f27] text-white px-6 py-2 uppercase tracking-wide hover:bg-black transition"
        >
          check our latest
        </Link>
      </div>
    </section>
  );
}
