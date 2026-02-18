import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <img src={product.image_url} alt={product.name} className="h-52 w-full object-cover" />
      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-neutral-500 min-h-[40px]">{product.description.slice(0, 70)}...</p>
        <div className="mt-3 flex justify-between items-center">
          <span className="font-bold">${Number(product.price).toFixed(2)}</span>
          <Link to={`/products/${product.id}`} className="px-3 py-1.5 bg-neutral-900 text-white rounded-lg text-sm">View</Link>
        </div>
      </div>
    </div>
  );
}
