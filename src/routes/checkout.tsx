import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { CreditCard, Banknote, Smartphone, Truck, ShieldCheck, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Together Pharmacy" }] }),
  component: Checkout,
});

function Checkout() {
  const cart = useStore((s) => s.cart);
  const clearCart = useStore((s) => s.clearCart);
  const navigate = useNavigate();
  const [pay, setPay] = useState("upi");
  const subtotal = cart.reduce((n, c) => n + c.qty * c.product.price, 0);
  const shipping = subtotal > 499 || subtotal === 0 ? 0 : 49;
  const total = subtotal + shipping;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Order placed successfully!");
    clearCart();
    navigate({ to: "/track" });
  }

  return (
    <div className="px-4 md:px-6 lg:px-10 py-10 max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8">Checkout</h1>
      <form onSubmit={submit} className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-bold text-lg mb-4">Customer Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" required />
              <Field label="Phone" type="tel" required />
              <Field label="Email" type="email" className="sm:col-span-2" required />
              <Field label="Address" className="sm:col-span-2" required />
              <Field label="City" required />
              <Field label="Pincode" required />
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-bold text-lg mb-4">Payment Method</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { id: "upi", t: "UPI", d: "Pay via any UPI app", i: Smartphone },
                {
                  id: "card",
                  t: "Credit / Debit Card",
                  d: "Visa, Mastercard, RuPay",
                  i: CreditCard,
                },
                { id: "netbanking", t: "Net Banking", d: "All Indian banks", i: ShieldCheck },
                { id: "cod", t: "Cash on Delivery", d: "Pay when delivered", i: Banknote },
              ].map((m) => (
                <label
                  key={m.id}
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${pay === m.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
                >
                  <input
                    type="radio"
                    name="pay"
                    className="mt-1 accent-primary"
                    checked={pay === m.id}
                    onChange={() => setPay(m.id)}
                  />
                  <m.i className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">{m.t}</div>
                    <div className="text-xs text-muted-foreground">{m.d}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
        <aside className="lg:sticky lg:top-24 self-start rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-bold text-lg">Order Summary</h2>
          <div className="space-y-3 mt-4 max-h-64 overflow-auto pr-1">
            {cart.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Your cart is empty.{" "}
                <Link to="/shop" className="text-primary">
                  Shop now
                </Link>
              </p>
            ) : (
              cart.map((c) => (
                <div key={c.product.id} className="flex gap-3">
                  <img
                    src={c.product.image}
                    alt={c.product.name}
                    className="h-14 w-14 object-contain rounded-lg bg-gradient-soft"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium line-clamp-1">{c.product.name}</div>
                    <div className="text-xs text-muted-foreground">Qty {c.qty}</div>
                  </div>
                  <div className="text-sm font-semibold">AED {c.product.price * c.qty}</div>
                </div>
              ))
            )}
          </div>
          <dl className="mt-5 pt-5 border-t border-border space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-semibold">AED {subtotal}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="font-semibold">{shipping ? `AED ${shipping}` : "FREE"}</dd>
            </div>
            <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
              <dt>Total</dt>
              <dd>AED {total}</dd>
            </div>
          </dl>
          <button
            type="submit"
            disabled={!cart.length}
            className="mt-6 w-full h-12 rounded-full bg-gradient-brand text-primary-foreground font-semibold inline-flex items-center justify-center gap-2 shadow-soft disabled:opacity-50"
          >
            Place Order <ArrowRight className="h-4 w-4" />
          </button>
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
            <Truck className="h-3.5 w-3.5" /> Delivery in 24-48 hours
          </div>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  className = "",
  ...rest
}: {
  label: string;
  className?: string;
  [k: string]: unknown;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <input
        {...rest}
        className="mt-1 w-full h-11 px-4 rounded-xl border border-border bg-background outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition"
      />
    </label>
  );
}
