import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import PageMeta from "../components/PageMeta";

function FeatureIcon({ children }) {
  return (
    <span className="h-10 w-10 rounded-full border border-neutral-300 bg-white flex items-center justify-center text-neutral-800 text-xs font-bold">
      {children}
    </span>
  );
}

function PromoCard({ title, subtitle, image, dark = false, tall = false }) {
  return (
    <article
      className={`rounded-2xl overflow-hidden relative min-h-[220px] ${tall ? "md:min-h-[280px]" : ""} ${
        dark ? "text-white" : "text-white"
      }`}
    >
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
      <div className={`absolute inset-0 ${dark ? "bg-black/55" : "bg-black/45"}`} />
      <div className="relative z-10 p-8 flex h-full items-end [text-shadow:0_2px_12px_rgba(0,0,0,0.65)]">
        <div>
          <p className={`text-sm tracking-[0.2em] ${dark ? "text-neutral-200" : "text-neutral-200"}`}>BE CONFIDENT</p>
          <h3 className="text-4xl leading-none font-bold mt-3">{title}</h3>
          <p className={`text-sm mt-3 ${dark ? "text-neutral-100" : "text-neutral-100"}`}>{subtitle}</p>
          <Link to="/shop" className="inline-flex mt-4 text-sm tracking-widest border-b border-current pb-1">
            ORDER NOW
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api.get("/products", { params: { limit: 8 } }).then((r) => console.log(r)
      // setFeatured(r.data.data.items)
  );

  }, []);

  return (
    <div className="bg-neutral-100">
      <PageMeta title="Home" />

      <section className="max-w-7xl mx-auto px-4 pt-8 md:pt-12">
        <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-orange-400 overflow-hidden relative min-h-[380px] md:min-h-[520px]">
          <img
            src="https://images.unsplash.com/photo-1622618991746-fe6004db3a47?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hero perfume"
            className="absolute right-0 top-0 h-full w-full md:w-2/3 object-cover mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent" />
          <div className="relative z-10 h-full p-8 md:p-16 flex items-center">
            <div className="text-white max-w-md">
              <p className="text-base md:text-lg tracking-[0.18em]">BE CONFIDENT</p>
              <h1 className="text-5xl md:text-7xl font-bold mt-3 leading-[0.9]">WEAR COLOR</h1>
              <p className="mt-4 text-white/90">Luxury perfume blends for your signature everyday style.</p>
              <Link
                to="/shop"
                className="inline-flex mt-8 items-center gap-2 border border-white/70 px-5 py-2 rounded-full hover:bg-white hover:text-neutral-900 transition"
              >
                ORDER NOW
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-3">
          <FeatureIcon>FS</FeatureIcon>
          <div><p className="font-semibold text-sm">FREE SHIPPING</p><p className="text-xs text-neutral-500">ON ALL ORDER</p></div>
        </div>
        <div className="flex items-center gap-3">
          <FeatureIcon>OF</FeatureIcon>
          <div><p className="font-semibold text-sm">BIG SAVING</p><p className="text-xs text-neutral-500">PERFUME OFFERS</p></div>
        </div>
        <div className="flex items-center gap-3">
          <FeatureIcon>SP</FeatureIcon>
          <div><p className="font-semibold text-sm">SECURE PAYMENT</p><p className="text-xs text-neutral-500">ALL CARDS ACCEPTED</p></div>
        </div>
        <div className="flex items-center gap-3">
          <FeatureIcon>MG</FeatureIcon>
          <div><p className="font-semibold text-sm">MONEY GUARANTEE</p><p className="text-xs text-neutral-500">30 DAY MONEY BACK</p></div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-8 grid md:grid-cols-2 gap-5">
        <PromoCard
          dark
          title="WEAR COLOR"
          subtitle="Premium Eau de Parfum collection"
          image="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80"
        />
        <PromoCard
          title="WEAR COLOR"
          subtitle="Exclusive limited edition perfume drops"
          image="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80"
        />
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-8 grid md:grid-cols-3 gap-5">
        <PromoCard
          dark
          tall
          title="WEAR COLOR"
          subtitle="Fresh daily perfume notes"
          image="https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80"
        />
        <PromoCard
          tall
          title="WEAR COLOR"
          subtitle="Signature scents for every moment"
          image="https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1200&q=80"
        />
        <PromoCard
          tall
          title="DIFFERENCE"
          subtitle="Feel luxury in every perfume spray"
          image="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80"
        />
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black tracking-tight">FIND YOUR SIGNATURE SCENT</h2>
          <p className="text-xs tracking-[0.2em] text-neutral-500 mt-2">TOP PICKED PERFUMES</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {featured.map((p) => (
            <article key={p.id} className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
              <div className="aspect-square bg-white rounded-lg flex items-center justify-center overflow-hidden">
                <img src={p.image_url} alt={p.name} className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-4 font-semibold text-sm">{p.name}</h3>
              <p className="text-xs text-neutral-500 mt-1 truncate">{p.category_name || "Perfume"}</p>
              <p className="font-bold mt-2">${Number(p.price).toFixed(2)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-5">
        {[
          "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=700&q=80",
        ].map((img, i) => (
          <article key={img} className="relative rounded-xl overflow-hidden min-h-[280px]">
            <img src={img} alt={`News ${i + 1}`} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 rounded-lg p-4">
              <p className="text-[10px] tracking-[0.2em] text-neutral-500">JUNE 24, 2026</p>
              <p className="text-sm font-bold mt-2">RECENT PERFUME TRENDS YOU MUST READ</p>
            </div>
          </article>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black tracking-tight">WHAT CUSTOMERS SAY</h2>
          <p className="text-xs tracking-[0.2em] text-neutral-500 mt-2">REAL REVIEWS</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <article className="bg-white border rounded-xl p-6">
            <p className="text-sm text-neutral-600">There are many variations, but NovaMart quality and delivery always exceed expectations.</p>
            <p className="font-semibold mt-4">KARLA LYNN</p>
          </article>
          <article className="bg-white border rounded-xl p-6">
            <p className="text-sm text-neutral-600">Excellent service, authentic products, and clean packaging. Highly recommended.</p>
            <p className="font-semibold mt-4">TOMAS CAMPBELL</p>
          </article>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-14">
        <div className="rounded-2xl bg-neutral-900 text-white p-8 md:p-12 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80"
            alt="Subscribe"
            className="absolute right-0 bottom-0 h-full w-full md:w-1/2 object-cover opacity-45"
          />
          <div className="relative z-10 max-w-xl">
            <p className="tracking-[0.16em] text-sm">SUBSCRIBE NOW</p>
            <h3 className="text-4xl font-black mt-2">25% DISCOUNT ON PERFUME SUBSCRIPTION</h3>
            <form className="mt-6 flex flex-col sm:flex-row gap-2">
              <input className="px-4 py-3 rounded-lg text-neutral-900 w-full" placeholder="Enter your email address" />
              <button type="button" className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-400 transition font-semibold">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

