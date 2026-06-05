'use client'
import {
  CalendarDays,
  Package,
  Recycle,
  Store,
} from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

export default function FeatureBox() {
  const features = [
    {
      icon: CalendarDays,
      title: 'Book An Appointment',
      description:
        'At imperdiet dui accumsan sit amet nulla risus est ultricies quis.',
    },
    {
      icon: Store,
      title: 'Pick Up In Store',
      description:
        'At imperdiet dui accumsan sit amet nulla risus est ultricies quis.',
    },
    {
      icon: Package,
      title: 'Special Packaging',
      description:
        'At imperdiet dui accumsan sit amet nulla risus est ultricies quis.',
    },
    {
      icon: Recycle,
      title: 'Free Global Returns',
      description:
        'At imperdiet dui accumsan sit amet nulla risus est ultricies quis.',
    },
  ];

  const categories = [
    {
      id: 1,
      title: 'Shop for Men',
      href: '/products/men',
      imgSrc:
        'https://themewagon.github.io/kaira/images/cat-item1.jpg',
      alt: 'Men fashion collection',
    },
    {
      id: 2,
      title: 'Shop for Women',
      href: '/products/women',
      imgSrc:
        'https://themewagon.github.io/kaira/images/cat-item2.jpg',
      alt: 'Women fashion collection',
    },
    {
      id: 3,
      title: 'Shop Bags',
      href: '/products/bags',
      imgSrc:
        'https://themewagon.github.io/kaira/images/cat-item3.jpg',
      alt: 'Bags collection',
    },
    {
      id: 4,
      title: 'Shop Watches',
      href: '/products/watches',
      imgSrc:
        'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1974&auto=format&fit=crop',
      alt: 'Luxury watches collection',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

      {/* FEATURES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="
              text-center
              bg-white
              rounded-2xl
              p-6
              shadow-sm
              hover:shadow-md
              transition-shadow
              duration-300
              border
              border-gray-100
            "
          >
            <div className="flex justify-center mb-4">
              <feature.icon className="w-10 h-10 text-gray-800 stroke-[1.5]" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>

            <p className="text-gray-500 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* CATEGORY GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className="
              group
              overflow-hidden
              rounded-2xl
              bg-white
              shadow-sm
              hover:shadow-md
              transition-shadow
              duration-300
            "
          >
            {/* IMAGE */}
            <div className="relative w-full h-64 md:h-80 overflow-hidden">
              <Image
                src={category.imgSrc}
                alt={category.alt}
                fill
                className="
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
                sizes="
                  (max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  25vw
                "
              />
            </div>

            {/* CONTENT */}
            <div className="p-5 text-center">
              <Link
                href={category.href}
                className="
                  inline-block
                  text-gray-800
                  font-medium
                  hover:text-gray-500
                  transition-colors
                  duration-200
                "
              >
                {category.title} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
