import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import api from "../api/axios";
import PageMeta from "../components/PageMeta";

export default function Checkout() {
  const { items, dispatch } = useCart();
  const { pushToast } = useToast();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal_code: "",
    country: "USA",
  });

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shipping = items.length ? 5.99 : 0;
    return { subtotal, shipping, total: subtotal + shipping };
  }, [items]);

  const submit = async (e) => {
    e.preventDefault();
    if (!items.length) {
      pushToast("Your cart is empty");
      return;
    }

    setLoading(true);
    try {
      await api.post("/orders", { items, shipping: form, payment_method: paymentMethod });
      dispatch({ type: "CLEAR" });
      pushToast("Order placed successfully");
      nav("/account");
    } catch (err) {
      pushToast(err?.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-neutral-100">
      <PageMeta title="Checkout" />
      <section className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-6">
        <form onSubmit={submit} className="lg:col-span-2 bg-white border rounded-2xl p-6 md:p-8">
          <h1 className="text-3xl font-black">Checkout</h1>
          <p className="text-sm text-neutral-500 mt-2">Please confirm your shipping and payment details.</p>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <input className="border rounded-lg p-3" placeholder="Full name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input type="email" className="border rounded-lg p-3" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="border rounded-lg p-3" placeholder="Phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input className="border rounded-lg p-3" placeholder="City" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            <input className="border rounded-lg p-3 md:col-span-2" placeholder="Address" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            <input className="border rounded-lg p-3" placeholder="Postal code" required value={form.postal_code} onChange={(e) => setForm({ ...form, postal_code: e.target.value })} />
            <input className="border rounded-lg p-3" placeholder="Country" required value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
          </div>

          <div className="mt-6">
            <p className="font-semibold mb-2">Payment Method</p>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2"><input type="radio" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} /> Cash on Delivery</label>
              <label className="flex items-center gap-2"><input type="radio" checked={paymentMethod === "stripe"} onChange={() => setPaymentMethod("stripe")} /> Card (Stripe Placeholder)</label>
            </div>
          </div>

          <button disabled={loading} className="mt-7 px-6 py-3 bg-neutral-900 text-white rounded-lg disabled:opacity-50">
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        <aside className="bg-white border rounded-2xl p-5 h-fit lg:sticky lg:top-24">
          <h2 className="text-xl font-bold">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm max-h-72 overflow-auto pr-1">
            {items.map((i) => (
              <div key={i.product_id} className="flex justify-between gap-2">
                <p className="text-neutral-600">{i.name} x {i.quantity}</p>
                <p>${(i.price * i.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-3 text-sm space-y-1">
            <div className="flex justify-between"><span className="text-neutral-600">Subtotal</span><span>${totals.subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-neutral-600">Shipping</span><span>${totals.shipping.toFixed(2)}</span></div>
            <div className="flex justify-between font-bold text-base"><span>Total</span><span>${totals.total.toFixed(2)}</span></div>
          </div>
        </aside>
      </section>
    </div>
  );
}
