import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import SkeletonCard from "../components/SkeletonCard";
import PageMeta from "../components/PageMeta";

export default function Shop() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({ items: [], pagination: { page: 1, pages: 1, total: 0 } });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    sort: "newest",
    page: 1,
    limit: 8,
  });

  useEffect(() => {
    api.get("/categories").then((r) => setCategories(r.data.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    api.get("/products", { params: filters })
      .then((r) => setProducts(r.data.data))
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div className="bg-neutral-100">
      <PageMeta title="Shop" />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-2xl overflow-hidden relative min-h-[220px]">
          <img
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1400&q=80"
            alt="Shop banner"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 p-8 md:p-10 text-white">
            <p className="text-sm tracking-[0.2em] uppercase">NovaMart Collection</p>
            <h1 className="text-4xl md:text-5xl font-black mt-2">Shop Premium Perfumes</h1>
            <p className="mt-3 text-white/90">Curated fragrances from fresh citrus to deep woody blends.</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="bg-white border rounded-2xl p-4 md:p-5 grid md:grid-cols-6 gap-3">
          <input
            className="border rounded-lg p-2.5 md:col-span-2"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
          />
          <select className="border rounded-lg p-2.5" value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value, page: 1 })}>
            <option value="">All Categories</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input className="border rounded-lg p-2.5" type="number" min="0" placeholder="Min $" value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value, page: 1 })} />
          <input className="border rounded-lg p-2.5" type="number" min="0" placeholder="Max $" value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value, page: 1 })} />
          <select className="border rounded-lg p-2.5" value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value, page: 1 })}>
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold">Products</h2>
          <p className="text-sm text-neutral-500">{products.pagination.total || 0} items</p>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : products.items.length === 0 ? (
          <div className="bg-white border rounded-2xl p-10 text-center text-neutral-500">No products found. Try adjusting your filters.</div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.items.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            <Pagination page={products.pagination.page} pages={products.pagination.pages} onChange={(page) => setFilters({ ...filters, page })} />
          </>
        )}
      </section>
    </div>
  );
}
