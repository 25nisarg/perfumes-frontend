import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import PageMeta from "../components/PageMeta";

export default function Account() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders/my").then((r) => setOrders(r.data.data));
  }, []);

  const totalSpent = useMemo(() => orders.reduce((sum, o) => sum + Number(o.total || 0), 0), [orders]);

  return (
    <div className="bg-neutral-100">
      <PageMeta title="Account" />
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-black">My Account</h1>
        <div className="grid md:grid-cols-3 gap-5 mt-6">
          <article className="bg-white border rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Profile</p>
            <p className="font-semibold mt-2">{user?.name}</p>
            <p className="text-sm text-neutral-600">{user?.email}</p>
          </article>
          <article className="bg-white border rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Total Orders</p>
            <p className="text-3xl font-black mt-2">{orders.length}</p>
          </article>
          <article className="bg-white border rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Total Spent</p>
            <p className="text-3xl font-black mt-2">${totalSpent.toFixed(2)}</p>
          </article>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4">My Orders</h2>
        {orders.length === 0 ? (
          <div className="bg-white border rounded-2xl p-8 text-neutral-600">No orders yet.</div>
        ) : (
          <div className="space-y-3">
            {orders.map((o) => (
              <article key={o.id} className="bg-white border rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <p className="font-semibold">Order #{o.id}</p>
                  <p className="text-sm text-neutral-500">{new Date(o.created_at).toLocaleString()}</p>
                </div>
                <p className="text-sm font-medium px-3 py-1 rounded-full bg-neutral-100 w-fit">{o.status}</p>
                <p className="font-bold">${Number(o.total).toFixed(2)}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
