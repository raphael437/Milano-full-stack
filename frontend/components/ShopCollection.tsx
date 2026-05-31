import Image from 'next/image';
import Link from 'next/link';

export default function ShopNewCollection() {
  return (
    <section className="bg-[#f5f5f5] py-16">
      
      {/* Parent Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Card */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col lg:flex-row items-center">
          
          {/* Image Side */}
          <div className="relative w-full lg:w-1/2 aspect-[1404/1372]">
            <Image
              src="https://themewagon.github.io/kaira/images/single-image-2.jpg"
              alt="collection"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 p-8 md:p-12">
            
            <h3 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">
              Classic Winter Collection
            </h3>

            <p className="text-gray-600 leading-8 pt-6 pb-8 text-lg">
              Dignissim lacus, turpis ut suspendisse vel tellus. Turpis purus,
              gravida orci, fringilla a. Ac sed eu fringilla odio mi.
              Consequat pharetra at magna imperdiet cursus ac faucibus sit
              libero. Ultricies quam nunc, lorem sit lorem urna, pretium
              aliquam ut. In vel, quis donec dolor id in. Pulvinar commodo
              mollis diam sed facilisis at cursus imperdiet cursus ac faucibus
              sit faucibus sit libero.
            </p>

            <Link
              href="/products"
              className="inline-block border-2 border-black px-8 py-4 uppercase tracking-[0.2em] font-semibold hover:bg-black hover:text-white transition duration-300"
            >
              Shop Collection
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}