"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ee] px-6 py-16 md:px-20">
      <div className="max-w-5xl mx-auto space-y-14">

        {/* HERO */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-serif tracking-wide">
            Casa di Milano
          </h1>

          <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
            L’Eleganza Italiana
          </p>

          <p className="text-gray-600 leading-7 max-w-2xl mx-auto">
            Inspired by the refined atmosphere of Milanese fashion houses,
            our collections embody timeless sophistication, artisanal craftsmanship,
            and contemporary Italian luxury.
          </p>

          <p className="italic text-lg md:text-xl">
            “La moda passa, lo stile resta.”
          </p>
        </section>

        {/* STORY */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-serif">Our Philosophy</h2>
            <p className="text-gray-600 leading-7">
              We believe fashion is not just clothing — it is identity, culture,
              and emotion. Every piece is designed in the spirit of Milan:
              minimal, elegant, and timeless.
            </p>

            <p className="text-gray-600 leading-7">
              From leather craftsmanship to modern street silhouettes,
              Casa di Milano brings together tradition and innovation.
            </p>
          </div>

          <div className="bg-white border rounded-2xl p-8 space-y-4">
            <h3 className="font-serif text-xl">Made in Italy Values</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• Artisan craftsmanship</li>
              <li>• Premium Italian materials</li>
              <li>• Timeless design philosophy</li>
              <li>• Sustainable production mindset</li>
            </ul>
          </div>
        </section>

      </div>
    </main>
  );
}