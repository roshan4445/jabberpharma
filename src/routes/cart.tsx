import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Together Pharmacy" }] }),
  component: Cart,
});

function Cart() {
  const cart = useStore((s) => s.cart);
  const updateQty = useStore((s) => s.updateQty);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const subtotal = cart.reduce((n, c) => n + c.qty * c.product.price, 0);
  const savings = cart.reduce((n, c) => n + c.qty * (c.product.mrp - c.product.price), 0);
  const shipping = subtotal > 499 || subtotal === 0 ? 0 : 49;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="px-4 py-24 max-w-md mx-auto text-center">
        <div className="mx-auto grid place-items-center h-20 w-20 rounded-3xl bg-gradient-brand text-primary-foreground shadow-soft">
          <ShoppingBag className="h-9 w-9" />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold">Your cart is empty</h1>
        <p className="text-muted-foreground mt-2">Browse our pharmacy and add some products.</p>
        <Link
          to="/shop"
          className="inline-flex mt-6 items-center gap-2 h-12 px-6 rounded-full bg-gradient-brand text-primary-foreground font-semibold shadow-soft"
        >
          Start shopping <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 lg:px-10 py-10 max-w-7xl mx-auto grid lg:grid-cols-[1fr_380px] gap-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6">
          Your Cart{" "}
          <span className="text-muted-foreground text-lg font-medium">({cart.length})</span>
        </h1>
        <div className="space-y-4">
          {cart.map((c) => (
            <div
              key={c.product.id}
              className="flex gap-4 p-4 rounded-2xl border border-border bg-card"
            >
              <Link
                to="/products/$id"
                params={{ id: c.product.id }}
                className="shrink-0 grid place-items-center h-24 w-24 rounded-xl bg-gradient-soft"
              >
                <img
                  src={c.product.image}
                  alt={c.product.name}
                  className="h-20 w-20 object-contain"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {c.product.brand}
                </div>
                <Link
                  to="/products/$id"
                  params={{ id: c.product.id }}
                  className="font-semibold hover:text-primary transition line-clamp-1"
                >
                  {c.product.name}
                </Link>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-bold">AED {c.product.price}</span>
                  <span className="text-xs text-muted-foreground line-through">
                    AED {c.product.mrp}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center rounded-full border border-border overflow-hidden">
                    <button
                      onClick={() => updateQty(c.product.id, c.qty - 1)}
                      className="grid place-items-center h-9 w-9 hover:bg-secondary"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-9 text-center font-semibold text-sm">{c.qty}</span>
                    <button
                      onClick={() => updateQty(c.product.id, c.qty + 1)}
                      className="grid place-items-center h-9 w-9 hover:bg-secondary"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(c.product.id)}
                    className="grid place-items-center h-9 w-9 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition"
                    aria-label="Remove"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <aside className="lg:sticky lg:top-24 self-start rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h2 className="font-bold text-lg">Order Summary</h2>
        <div className="relative mt-4">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Promo code"
            className="w-full h-11 pl-10 pr-24 rounded-full bg-secondary border border-border outline-none text-sm"
          />
          <button className="absolute right-1 top-1/2 -translate-y-1/2 h-9 px-4 rounded-full bg-foreground text-background text-xs font-semibold">
            Apply
          </button>
        </div>
        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd className="font-semibold">AED {subtotal}</dd>
          </div>
          <div className="flex justify-between text-success">
            <dt>You save</dt>
            <dd className="font-semibold">-AED {savings}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Shipping</dt>
            <dd className="font-semibold">{shipping === 0 ? "FREE" : `AED ${shipping}`}</dd>
          </div>
          <div className="border-t border-border pt-3 flex justify-between font-bold text-base">
            <span>Total</span>
            <span>AED {total}</span>
          </div>
        </dl>
        <Link
          to="/checkout"
          className="mt-6 w-full h-12 rounded-full bg-gradient-brand text-primary-foreground font-semibold inline-flex items-center justify-center gap-2 shadow-soft hover:shadow-glow transition"
        >
          Checkout <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Secure checkout · Encrypted payments
        </p>
      </aside>
    </div>
  );
}
