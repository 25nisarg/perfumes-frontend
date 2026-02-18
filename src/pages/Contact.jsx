import { useState } from "react";
import api from "../api/axios";
import { useToast } from "../context/ToastContext";
import PageMeta from "../components/PageMeta";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const { pushToast } = useToast();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/contact", form);
      setForm({ name: "", email: "", subject: "", message: "" });
      pushToast("Message sent");
    } catch (err) {
      pushToast(err?.response?.data?.message || "Could not send message");
    }
  };

  return (
    <div className="bg-neutral-100">
      <PageMeta title="Contact" />
      <section className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-8">
        <div className="bg-white border rounded-2xl p-6 md:p-8">
          <h1 className="text-3xl font-black">Contact Us</h1>
          <p className="text-sm text-neutral-600 mt-2">Have a question about an order or product? We are here to help.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <input className="w-full border rounded-lg p-3" placeholder="Full name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input type="email" className="w-full border rounded-lg p-3" placeholder="Email address" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="w-full border rounded-lg p-3" placeholder="Subject" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
            <textarea className="w-full border rounded-lg p-3 min-h-[130px]" placeholder="Message" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <button className="px-5 py-3 bg-neutral-900 text-white rounded-lg">Send Message</button>
          </form>
        </div>

        <div className="space-y-5">
          <div className="bg-white border rounded-2xl p-6">
            <h2 className="text-xl font-bold">Business Info</h2>
            <p className="text-sm text-neutral-600 mt-3">123 Market St, New York, NY</p>
            <p className="text-sm text-neutral-600">support@novamart.com</p>
            <p className="text-sm text-neutral-600">+1 (555) 000-0000</p>
          </div>
          <div className="rounded-2xl overflow-hidden border bg-white">
            <div className="h-[320px] bg-neutral-200 flex items-center justify-center text-neutral-500 text-sm">
              Map Embed Placeholder
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
