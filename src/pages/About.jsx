import PageMeta from "../components/PageMeta";

export default function About() {
  return (
    <div className="bg-neutral-100">
      <PageMeta title="About" />

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="rounded-3xl overflow-hidden relative min-h-[280px] md:min-h-[360px]">
          <img
            src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1400&q=80"
            alt="About NovaMart"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 p-8 md:p-12 text-white max-w-2xl">
            <p className="tracking-[0.2em] text-sm uppercase">About NovaMart</p>
            <h1 className="text-4xl md:text-5xl font-black mt-3">Beauty Retail, Reimagined.</h1>
            <p className="mt-4 text-neutral-100">Inspired by premium fragrance stores, built for effortless online shopping.</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-12 grid md:grid-cols-3 gap-5">
        <article className="bg-white border rounded-2xl p-6">
          <h2 className="text-xl font-bold">Our Story</h2>
          <p className="text-sm text-neutral-600 mt-3">NovaMart started with a simple belief: premium perfumes should be easy to discover, trust, and enjoy.</p>
        </article>
        <article className="bg-white border rounded-2xl p-6">
          <h2 className="text-xl font-bold">Our Mission</h2>
          <p className="text-sm text-neutral-600 mt-3">Deliver curated products, transparent pricing, and reliable fulfillment with a modern customer-first experience.</p>
        </article>
        <article className="bg-white border rounded-2xl p-6">
          <h2 className="text-xl font-bold">Why Choose Us</h2>
          <ul className="text-sm text-neutral-600 mt-3 space-y-2">
            <li>Authentic products from trusted suppliers</li>
            <li>Secure checkout with easy order tracking</li>
            <li>Fast support and simple returns</li>
          </ul>
        </article>
      </section>
    </div>
  );
}
