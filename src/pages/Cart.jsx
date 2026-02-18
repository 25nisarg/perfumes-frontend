import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import PageMeta from "../components/PageMeta";

export default function Cart() {
  const { items, dispatch } = useCart();
  const subtotal = items.reduce((a, b) => a + b.price * b.quantity, 0);
  const shipping = items.length ? 5.99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-neutral-100">
      <PageMeta title="Cart" />
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-black mb-8">Your Basket</h1>
        {items.length === 0 ? (
          <div className="bg-white border rounded-2xl p-10 text-center">
            <p className="text-neutral-600">Your cart is empty.</p>
            <Link to="/shop" className="inline-block mt-4 px-5 py-2.5 bg-neutral-900 text-white rounded-lg">Start Shopping</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {items.map((i) => (
                <article key={i.product_id} className="bg-white border rounded-2xl p-4 flex gap-4">
                  <img src={i.image_url} alt={i.name} className="h-24 w-24 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{i.name}</h3>
                    <p className="text-sm text-neutral-500 mt-1">${i.price.toFixed(2)}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        className="w-20 border rounded p-1.5"
                        value={i.quantity}
                        onChange={(e) => dispatch({ type: "UPDATE", payload: { id: i.product_id, quantity: Math.max(1, Number(e.target.value) || 1) } })}
                      />
                      <button className="text-sm text-red-600" onClick={() => dispatch({ type: "REMOVE", payload: i.product_id })}>Remove</button>
                    </div>
                  </div>
                  <p className="font-semibold">${(i.price * i.quantity).toFixed(2)}</p>
                </article>
              ))}
            </div>

            <aside className="bg-white border rounded-2xl p-5 h-fit lg:sticky lg:top-24">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-neutral-600">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-neutral-600">Shipping</span><span>${shipping.toFixed(2)}</span></div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold text-base"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>
              <Link to="/checkout" className="block mt-5 text-center px-4 py-3 bg-neutral-900 text-white rounded-lg">Proceed to Checkout</Link>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}
