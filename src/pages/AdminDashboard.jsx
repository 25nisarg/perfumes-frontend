import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { useToast } from "../context/ToastContext";
import PageMeta from "../components/PageMeta";

const empty = { name: "", description: "", price: "", stock: "", category_id: "", image_url: "" };

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const { pushToast } = useToast();

  const loadData = async () => {
    const [p, o, c] = await Promise.all([api.get("/products"), api.get("/orders"), api.get("/categories")]);
    setProducts(p.data.data.items);
    setOrders(o.data.data);
    setCategories(c.data.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalRevenue = useMemo(
    () => orders.reduce((sum, order) => sum + Number(order.total || 0), 0),
    [orders]
  );

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingId) await api.put(`/products/${editingId}`, form);
      else await api.post("/products", form);
      setForm(empty);
      setEditingId(null);
      pushToast("Product saved");
      loadData();
    } catch (err) {
      pushToast(err?.response?.data?.message || "Unable to save product");
    }
  };

  return (
    <div className="bg-neutral-100">
      <PageMeta title="Admin Dashboard" />
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-black">Admin Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-5 mt-6 mb-8">
          <article className="bg-white border rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Products</p>
            <p className="text-3xl font-black mt-2">{products.length}</p>
          </article>
          <article className="bg-white border rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Orders</p>
            <p className="text-3xl font-black mt-2">{orders.length}</p>
          </article>
          <article className="bg-white border rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Revenue</p>
            <p className="text-3xl font-black mt-2">${totalRevenue.toFixed(2)}</p>
          </article>
        </div>

        <form onSubmit={saveProduct} className="bg-white border rounded-2xl p-5 md:p-6 grid md:grid-cols-3 gap-3 mb-8">
          <input className="border rounded-lg p-2.5" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input type="number" step="0.01" className="border rounded-lg p-2.5" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          <input type="number" className="border rounded-lg p-2.5" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
          <select className="border rounded-lg p-2.5" value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} required>
            <option value="">Category</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input className="border rounded-lg p-2.5 md:col-span-2" placeholder="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} required />
          <textarea className="border rounded-lg p-2.5 md:col-span-3 min-h-[90px]" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          <button className="bg-neutral-900 text-white rounded-lg py-2.5">{editingId ? "Update Product" : "Create Product"}</button>
        </form>

        <div className="bg-white border rounded-2xl p-4 md:p-5 mb-8 overflow-auto">
          <h2 className="text-2xl font-bold mb-3">Products</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-2">Name</th>
                <th className="pb-2">Price</th>
                <th className="pb-2">Stock</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="py-3">{p.name}</td>
                  <td>${Number(p.price).toFixed(2)}</td>
                  <td>{p.stock}</td>
                  <td className="space-x-2">
                    <button className="text-blue-600" onClick={() => { setEditingId(p.id); setForm(p); }}>Edit</button>
                    <button className="text-red-600" onClick={async () => { await api.delete(`/products/${p.id}`); loadData(); }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white border rounded-2xl p-4 md:p-5 overflow-auto">
          <h2 className="text-2xl font-bold mb-3">Orders</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-2">ID</th>
                <th className="pb-2">Customer</th>
                <th className="pb-2">Total</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b">
                  <td className="py-3">#{o.id}</td>
                  <td>{o.user_name}</td>
                  <td>${Number(o.total).toFixed(2)}</td>
                  <td>
                    <select
                      className="border rounded p-1.5"
                      value={o.status}
                      onChange={async (e) => {
                        await api.put(`/orders/${o.id}/status`, { status: e.target.value });
                        loadData();
                      }}
                    >
                      {["pending", "processing", "shipped", "delivered", "cancelled"].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
