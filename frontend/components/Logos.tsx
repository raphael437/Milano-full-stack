'use client'
import Image from 'next/image';

export default function Logos() {
  return (
    <section className="bg-gray-50 py-16">
      
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <h3 className="text-center text-gray-800 text-2xl md:text-3xl font-light tracking-widest uppercase mb-12">
          Milano Fashion Week Exclusive
        </h3>

        {/* LOGOS ROW */}
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">

          <div className="opacity-60 hover:opacity-100 transition">
            <Image
              src="https://themewagon.github.io/kaira/images/logo1.png"
              alt="logo 1"
              width={130}
              height={70}
            />
          </div>

          <div className="opacity-60 hover:opacity-100 transition">
            <Image
              src="https://themewagon.github.io/kaira/images/logo2.png"
              alt="logo 2"
              width={130}
              height={70}
            />
          </div>

          <div className="opacity-60 hover:opacity-100 transition">
            <Image
              src="https://themewagon.github.io/kaira/images/logo3.png"
              alt="logo 3"
              width={130}
              height={70}
            />
          </div>

          <div className="opacity-60 hover:opacity-100 transition">
            <Image
              src="https://themewagon.github.io/kaira/images/logo4.png"
              alt="logo 4"
              width={130}
              height={70}
            />
          </div>

          <div className="opacity-60 hover:opacity-100 transition">
            <Image
              src="https://themewagon.github.io/kaira/images/logo5.png"
              alt="logo 5"
              width={130}
              height={70}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
