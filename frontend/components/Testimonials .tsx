'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: 'Best quality ever. The fabric feels premium and the fit is absolutely perfect.',
    author: 'John Doe',
  },
  {
    id: 2,
    text: 'Amazing customer service and the clothes look even better in person.',
    author: 'Sarah Smith',
  },
  {
    id: 3,
    text: 'Elegant designs, premium materials, and very fast delivery.',
    author: 'Michael Brown',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(prev =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent(prev =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };
  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [current]);


  return (
    <section className="w-full bg-gray-200 py-24 px-4">
      <div className="max-w-5xl mx-auto relative">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-center text-black">
          WE LOVE GOOD COMPLIMENTS
        </h2>

        {/* Carousel */}
        <div className="relative overflow-hidden mt-14">

          {/* LEFT BUTTON */}
          <button
            onClick={prevSlide}
            className="
              absolute left-0 top-1/2 -translate-y-1/2 z-20
              w-14 h-14 rounded-full
              bg-white shadow-md border border-gray-300
              flex items-center justify-center
              hover:bg-black hover:text-white
              transition-all duration-300
            "
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={28} />
          </button>

          {/* SLIDES */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {testimonials.map(item => (
              <div
                key={item.id}
                className="min-w-full px-16"
              >
                <div className="bg-white rounded-3xl shadow-xl p-10 md:p-16 text-center">

                  <p className="text-2xl md:text-3xl text-gray-700 leading-relaxed font-light">
                    “{item.text}”
                  </p>

                  <span className="block mt-8 text-sm uppercase tracking-[0.3em] font-semibold text-black">
                    {item.author}
                  </span>

                </div>
              </div>
            ))}
          </div>

          {/* RIGHT BUTTON */}
          <button
            onClick={nextSlide}
            className="
              absolute right-0 top-1/2 -translate-y-1/2 z-20
              w-14 h-14 rounded-full
              bg-white shadow-md border border-gray-300
              flex items-center justify-center
              hover:bg-black hover:text-white
              transition-all duration-300
            "
            aria-label="Next testimonial"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${
                  current === index
                    ? 'bg-black scale-125'
                    : 'bg-gray-400 hover:bg-gray-600'
                }
              `}
            />
          ))}
        </div>

      </div>
    </section>
  );
}