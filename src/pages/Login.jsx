import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import PageMeta from "../components/PageMeta";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const { pushToast } = useToast();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      pushToast("Logged in");
      nav("/");
    } catch (err) {
      pushToast(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-neutral-100">
      <PageMeta title="Login" />
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 bg-white border rounded-2xl overflow-hidden">
          <div className="hidden md:block relative min-h-[520px]">
            <img
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80"
              alt="Login"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute left-8 bottom-8 text-white">
              <p className="text-sm tracking-[0.2em] uppercase">Welcome Back</p>
              <h2 className="text-4xl font-black mt-2">Sign In to NovaMart</h2>
            </div>
          </div>

          <form onSubmit={submit} className="p-8 md:p-10 space-y-4">
            <h1 className="text-3xl font-black">Login</h1>
            <p className="text-sm text-neutral-500">Access your account to manage orders and profile.</p>
            <input className="w-full border rounded-lg p-3" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <input type="password" className="w-full border rounded-lg p-3" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <button className="w-full py-3 bg-neutral-900 text-white rounded-lg">Sign In</button>
            <p className="text-sm text-neutral-600">No account? <Link to="/register" className="underline">Create one</Link></p>
          </form>
        </div>
      </section>
    </div>
  );
}
