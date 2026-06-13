import { Link } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag, User, Menu, X, ChevronDown, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { useStore } from "@/lib/store";
import { categories } from "@/lib/products";

const nav = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Cosmetics", to: "/shop", search: { category: "Cosmetics" } as const },
  { label: "Healthcare", to: "/shop", search: { category: "Medicines" } as const },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const cartCount = useStore((s) => s.cart.reduce((n, c) => n + c.qty, 0));
  const wishlistCount = useStore((s) => s.wishlist.length);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-soft" : "bg-background/70 backdrop-blur"}`}
    >
      <div className="hidden md:flex items-center justify-between px-6 lg:px-10 h-9 bg-gradient-brand text-primary-foreground text-xs">
        <span>Free delivery on orders above AED 50 · Genuine medicines · Licensed pharmacy</span>
        <span className="flex items-center gap-2">
          <Phone className="h-3 w-3" /> 24/7 Pharmacist · +971 50 145 6525
        </span>
      </div>
      <div className="px-4 md:px-6 lg:px-10 h-16 flex items-center gap-4">
        <button
          className="md:hidden p-2 -ml-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <Logo />
        <nav className="hidden lg:flex items-center gap-1 ml-6">
          {nav.slice(0, 2).map((n) => (
            <Link
              key={n.label}
              to={n.to as any}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-lg hover:bg-secondary transition"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-lg hover:bg-secondary transition flex items-center gap-1">
              Categories <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {catOpen && (
              <div className="absolute top-full left-0 z-50 pt-3 w-140 max-w-[90vw]">
                <div className="rounded-3xl border border-border bg-card/98 shadow-elevated p-4 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2">
                  {categories.map((c) => (
                    <Link
                      key={c.name}
                      to="/shop"
                      search={{ category: c.name } as any}
                      className="flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-secondary/10 hover:text-primary transition"
                    >
                      <span
                        className={`grid place-items-center h-10 w-10 rounded-2xl bg-linear-to-br ${c.tint} text-lg shadow-sm`}
                      >
                        {c.icon}
                      </span>
                      <span className="text-sm font-semibold leading-none">{c.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {nav.slice(2).map((n) => (
            <Link
              key={n.label}
              to={n.to as any}
              search={n.search as any}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-lg hover:bg-secondary transition"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex flex-1 max-w-md mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search medicines, cosmetics, vitamins..."
            className="w-full h-11 pl-11 pr-4 rounded-full bg-card border border-transparent focus:bg-card focus:border-primary/30 focus:ring-4 focus:ring-primary/10 outline-none text-sm transition"
          />
        </div>
        <div className="flex items-center gap-1 ml-auto">
          <Link
            to="/dashboard"
            className="hidden md:grid place-items-center h-10 w-10 rounded-xl hover:bg-secondary transition relative"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-semibold grid place-items-center">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="grid place-items-center h-10 w-10 rounded-xl hover:bg-secondary transition relative"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold grid place-items-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            to="/login"
            className="ml-1 hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-gradient-brand text-primary-foreground text-sm font-semibold shadow-soft hover:shadow-glow transition"
          >
            <User className="h-4 w-4" /> Login
          </Link>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border px-4 py-3 space-y-1 bg-background">
          <div className="relative mb-3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full h-11 pl-11 pr-4 rounded-full bg-card outline-none text-sm"
            />
          </div>
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to as any}
              search={n.search as any}
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary"
            >
              {n.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-border mt-2 grid grid-cols-2 gap-1">
            {categories.slice(0, 6).map((c) => (
              <Link
                key={c.name}
                to="/shop"
                search={{ category: c.name } as any}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary text-sm"
              >
                <span>{c.icon}</span>
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
