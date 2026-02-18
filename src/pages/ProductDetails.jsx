import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import PageMeta from "../components/PageMeta";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { dispatch } = useCart();
  const { pushToast } = useToast();

  useEffect(() => {
    api.get(`/products/${id}`).then((r) => setProduct(r.data.data));
  }, [id]);

  if (!product) return <div className="p-8">Loading...</div>;

  const addToCart = () => {
    dispatch({
      type: "ADD",
      payload: {
        product_id: product.id,
        name: product.name,
        price: Number(product.price),
        image_url: product.image_url,
        quantity: qty,
      },
    });
    pushToast("Added to cart");
  };

  return (
    <div className="bg-neutral-100">
      <PageMeta title={product.name} />
      <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
        <div className="bg-white border rounded-2xl p-4">
          <img src={product.image_url} alt={product.name} className="w-full h-[520px] object-cover rounded-xl" />
        </div>

        <div className="bg-white border rounded-2xl p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{product.category_name}</p>
          <h1 className="text-4xl font-black mt-2">{product.name}</h1>
          <p className="text-neutral-600 mt-4 leading-relaxed">{product.description}</p>
          <p className="text-3xl font-bold mt-6">${Number(product.price).toFixed(2)}</p>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm text-neutral-500">Availability:</span>
            <span className={`text-sm font-semibold ${product.stock > 0 ? "text-green-700" : "text-red-600"}`}>
              {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
            </span>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <input
              type="number"
              min="1"
              max={Math.max(1, Number(product.stock))}
              className="w-24 border rounded-lg p-2"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            />
            <button
              disabled={product.stock <= 0}
              onClick={addToCart}
              className="px-6 py-3 bg-neutral-900 text-white rounded-lg disabled:opacity-50"
            >
              Add to Cart
            </button>
          </div>

          <Link to="/shop" className="inline-block mt-6 text-sm underline text-neutral-600">Continue shopping</Link>
        </div>
      </section>
    </div>
  );
}
