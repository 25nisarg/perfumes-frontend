import { useToast } from "../context/ToastContext";

export default function ToastContainer() {
  const { toasts } = useToast();
  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {toasts.map((t) => (
        <div key={t.id} className="bg-black text-white px-4 py-2 rounded-lg shadow">{t.message}</div>
      ))}
    </div>
  );
}
