import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-black">NovaMart</h3>
          <p className="text-sm text-neutral-400 mt-3">Premium perfume collections with trusted service and fast delivery.</p>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide uppercase">Shop</p>
          <div className="mt-3 space-y-2 text-sm text-neutral-400">
            <p>Men's Perfume</p>
            <p>Women's Perfume</p>
            <p>Unisex Perfume</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide uppercase">Company</p>
          <div className="mt-3 space-y-2 text-sm text-neutral-400">
            <Link to="/about" className="block hover:text-white">About Us</Link>
            <Link to="/contact" className="block hover:text-white">Contact</Link>
            <Link to="/shop" className="block hover:text-white">All Products</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide uppercase">Support</p>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>support@novamart.com</p>
            <p>+1 (555) 000-0000</p>
            <p>Mon-Sat, 9:00 AM - 8:00 PM</p>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-neutral-500 flex items-center justify-between">
          <p>(c) {new Date().getFullYear()} NovaMart. All rights reserved.</p>
          <p>Secure checkout powered by NovaMart</p>
        </div>
      </div>
    </footer>
  );
}
