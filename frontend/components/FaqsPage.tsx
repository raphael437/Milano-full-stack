"use client";

export default function FAQsPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ee] px-6 py-16 md:px-20">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* HEADER */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif">
            FAQs
          </h1>
          <p className="text-gray-600">
            Everything you need to know about Casa di Milano.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-6">

          {[
            {
              q: "Where are your products made?",
              a: "All our collections are designed with Italian inspiration and crafted using premium European materials.",
            },
            {
              q: "Do you ship internationally?",
              a: "Yes, we offer fast and secure worldwide shipping with tracking.",
            },
            {
              q: "How long does delivery take?",
              a: "Delivery takes 3–7 business days depending on your location.",
            },
            {
              q: "Can I return my order?",
              a: "Yes, we offer free global returns within 14 days of delivery.",
            },
            {
              q: "How can I track my order?",
              a: "You can track your order using the tracking page in your account dashboard.",
            },
            {
              q: "Do you offer customer support?",
              a: "Yes, our support team is available 24/7 for any assistance.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border rounded-2xl p-6"
            >
              <h3 className="font-serif text-lg mb-2">
                {item.q}
              </h3>
              <p className="text-gray-600 text-sm leading-6">
                {item.a}
              </p>
            </div>
          ))}

        </div>

      </div>
    </main>
  );
}