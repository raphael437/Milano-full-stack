"use client";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ee] px-6 py-16 md:px-20">
      <div className="max-w-6xl mx-auto space-y-14">

        {/* HEADER */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif">
            Our Services
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Luxury is not only what you wear — it is how you experience it.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {[
            {
              title: "Book An Appointment",
              desc: "Private styling sessions with our fashion consultants.",
            },
            {
              title: "Pick Up In Store",
              desc: "Fast and seamless in-store pickup for your orders.",
            },
            {
              title: "Special Packaging",
              desc: "Signature luxury packaging for a refined unboxing experience.",
            },
            {
              title: "Free Global Returns",
              desc: "Hassle-free returns from anywhere in the world.",
            },
            {
              title: "Personal Styling",
              desc: "Get curated outfits tailored to your taste.",
            },
            {
              title: "Customer Support",
              desc: "Dedicated luxury support team available 24/7.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border rounded-2xl p-6 space-y-3 hover:shadow-sm transition"
            >
              <h3 className="font-serif text-xl">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-6">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </main>
  );
}