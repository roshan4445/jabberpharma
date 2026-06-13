import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct, products } from "@/lib/products";
import { useStore } from "@/lib/store";
import {
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  Star,
  Truck,
  BadgeCheck,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { toast } from "sonner";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Product"} — Together Pharmacy` },
      { name: "description", content: loaderData?.description ?? "Product details" },
    ],
  }),
  notFoundComponent: () => (
    <div className="p-20 text-center">
      <h1 className="text-2xl font-bold">Product not found</h1>
      <Link to="/shop" className="text-primary mt-4 inline-block">
        Back to shop
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="p-20 text-center text-destructive">{error.message}</div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const addToCart = useStore((s) => s.addToCart);
  const wishlist = useStore((s) => s.wishlist);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const wished = wishlist.includes(product.id);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const similar = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="px-4 md:px-6 lg:px-10 py-10 max-w-7xl mx-auto">
      <nav className="text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/shop" className="hover:text-primary">
          Shop
        </Link>{" "}
        / <span className="text-foreground">{product.name}</span>
      </nav>
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="rounded-3xl bg-gradient-soft border border-border p-8 grid place-items-center">
          <img src={product.image} alt={product.name} className="max-h-[480px] object-contain" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            {product.brand} · {product.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-2 leading-tight">{product.name}</h1>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-success/10 text-success text-sm font-semibold">
              <Star className="h-3.5 w-3.5 fill-current" /> {product.rating}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.reviews.toLocaleString()} reviews
            </span>
          </div>
          <div className="flex items-baseline gap-3 mt-6">
            <span className="text-4xl font-extrabold">AED {product.price}</span>
            <span className="text-lg text-muted-foreground line-through">AED {product.mrp}</span>
            {discount > 0 && (
              <span className="px-2 py-1 rounded-md bg-success text-success-foreground text-xs font-bold">
                Save {discount}%
              </span>
            )}
          </div>
          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {product.benefits.map((b: string) => (
              <li key={b} className="flex items-center gap-2 text-sm">
                <BadgeCheck className="h-4 w-4 text-success" /> {b}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 mt-8">
            <div className="flex items-center rounded-full border border-border bg-card overflow-hidden">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="grid place-items-center h-11 w-11 hover:bg-secondary"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="grid place-items-center h-11 w-11 hover:bg-secondary"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => {
                addToCart(product, qty);
                toast.success("Added to cart");
              }}
              className="flex-1 h-12 rounded-full bg-card border border-border font-semibold inline-flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition"
            >
              <ShoppingBag className="h-4 w-4" /> Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`grid place-items-center h-12 w-12 rounded-full border border-border ${wished ? "text-destructive bg-destructive/10" : "hover:text-destructive"}`}
            >
              <Heart className={`h-5 w-5 ${wished ? "fill-current" : ""}`} />
            </button>
          </div>
          <Link
            to="/checkout"
            onClick={() => addToCart(product, qty)}
            className="mt-3 w-full h-12 rounded-full bg-gradient-brand text-primary-foreground font-semibold inline-flex items-center justify-center gap-2 shadow-soft hover:shadow-glow transition"
          >
            Buy Now <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="grid grid-cols-3 gap-3 mt-8 pt-8 border-t border-border">
            {[
              { i: ShieldCheck, t: "Genuine" },
              { i: Truck, t: "24h Delivery" },
              { i: BadgeCheck, t: "Easy Returns" },
            ].map((x) => (
              <div key={x.t} className="flex items-center gap-2 text-xs">
                <x.i className="h-4 w-4 text-primary" /> {x.t}
              </div>
            ))}
          </div>
        </div>
      </div>
      {similar.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
