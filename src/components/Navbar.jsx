import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const navBase = "text-[12px] tracking-[0.2em] uppercase text-neutral-700 hover:text-neutral-900 transition";

export default function Navbar() {
  const { user, dispatch } = useAuth();
  const { items } = useCart();
  const itemCount = items.reduce((a, b) => a + b.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-neutral-200">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-white flex items-center justify-center font-black">N</span>
          <div className="leading-none">
            <p className="font-black tracking-wide text-lg">NovaMart</p>
            <p className="text-[10px] tracking-[0.16em] uppercase text-neutral-500">Perfume House</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-5">
          <NavLink to="/shop" className={navBase}>Shop</NavLink>
          <NavLink to="/about" className={navBase}>About</NavLink>
          <NavLink to="/contact" className={navBase}>Contact</NavLink>
          <NavLink to="/cart" className={navBase}>Basket</NavLink>
          <Link to="/cart" className="h-6 min-w-6 px-1 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center">
            {itemCount}
          </Link>
          {user ? (
            <>
              <NavLink to="/account" className={navBase}>Account</NavLink>
              {user.role === "admin" && <NavLink to="/admin" className={navBase}>Admin</NavLink>}
              <button onClick={() => dispatch({ type: "LOGOUT" })} className={navBase}>Logout</button>
            </>
          ) : (
            <NavLink to="/login" className={navBase}>Login</NavLink>
          )}
        </div>

        <div className="md:hidden flex items-center gap-3">
          <NavLink to="/shop" className="text-sm font-medium">Shop</NavLink>
          <NavLink to="/cart" className="text-sm font-medium">Cart ({itemCount})</NavLink>
        </div>
      </nav>
    </header>
  );
}
