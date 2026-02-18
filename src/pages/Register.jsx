import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import PageMeta from "../components/PageMeta";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { register } = useAuth();
  const { pushToast } = useToast();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (form.password.length < 8) {
      pushToast("Password must be at least 8 characters");
      return;
    }
    try {
      await register(form);
      pushToast("Account created");
      nav("/");
    } catch (err) {
      pushToast(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="bg-neutral-100">
      <PageMeta title="Register" />
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 bg-white border rounded-2xl overflow-hidden">
          <div className="hidden md:block relative min-h-[520px]">
            <img
              src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80"
              alt="Register"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute left-8 bottom-8 text-white">
              <p className="text-sm tracking-[0.2em] uppercase">New Here?</p>
              <h2 className="text-4xl font-black mt-2">Create Your Account</h2>
            </div>
          </div>

          <form onSubmit={submit} className="p-8 md:p-10 space-y-4">
            <h1 className="text-3xl font-black">Register</h1>
            <p className="text-sm text-neutral-500">Start shopping and track your orders with NovaMart.</p>
            <input className="w-full border rounded-lg p-3" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input className="w-full border rounded-lg p-3" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <input className="w-full border rounded-lg p-3" type="password" placeholder="Password (min 8 chars)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <button className="w-full py-3 bg-neutral-900 text-white rounded-lg">Create Account</button>
            <p className="text-sm text-neutral-600">Already have an account? <Link to="/login" className="underline">Sign in</Link></p>
          </form>
        </div>
      </section>
    </div>
  );
}
