import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star, Eye } from "lucide-react";
import { useStore } from "@/lib/store";
import type { Product } from "@/lib/products";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const addToCart = useStore((s) => s.addToCart);
  const wishlist = useStore((s) => s.wishlist);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const wished = wishlist.includes(product.id);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="group relative bg-card rounded-3xl border border-border overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <div className="relative aspect-square bg-gradient-to-br from-secondary to-background overflow-hidden">
        <Link to="/products/$id" params={{ id: product.id }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-gradient-brand text-primary-foreground shadow-soft uppercase tracking-wide">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-success text-success-foreground shadow-soft">
              -{discount}%
            </span>
          )}
        </div>
        <button
          onClick={() => {
            toggleWishlist(product.id);
            toast.success(wished ? "Removed from wishlist" : "Added to wishlist");
          }}
          className={`absolute top-3 right-3 grid place-items-center h-9 w-9 rounded-full glass shadow-soft transition ${wished ? "text-destructive" : "text-foreground/70 hover:text-destructive"}`}
          aria-label="Wishlist"
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-current" : ""}`} />
        </button>
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition">
          <Link
            to="/products/$id"
            params={{ id: product.id }}
            className="flex-1 h-9 rounded-xl glass text-sm font-semibold inline-flex items-center justify-center gap-1.5"
          >
            <Eye className="h-3.5 w-3.5" /> Quick View
          </Link>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="text-[11px] text-muted-foreground uppercase tracking-wider">
          {product.brand}
        </div>
        <Link
          to="/products/$id"
          params={{ id: product.id }}
          className="font-semibold text-sm mt-1 line-clamp-2 hover:text-primary transition"
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-1 mt-2 text-xs">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="font-semibold">{product.rating}</span>
          <span className="text-muted-foreground">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-end justify-between mt-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold">AED {product.price}</span>
              {product.mrp > product.price && (
                <span className="text-xs text-muted-foreground line-through">
                  AED {product.mrp}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => {
              addToCart(product);
              toast.success(`${product.name} added to cart`);
            }}
            className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-brand text-primary-foreground shadow-soft hover:shadow-glow transition"
            aria-label="Add to cart"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
