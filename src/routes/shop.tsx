import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({ category: z.string().optional() });

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop — Together Pharmacy" },
      {
        name: "description",
        content:
          "Browse medicines, cosmetics, skincare and supplements from Together Pharmacy in Dubai.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { category } = Route.useSearch();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | undefined>(category);
  useEffect(() => {
    setCat(category);
  }, [category]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState("popular");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (!cat || p.category === cat) &&
        p.price <= maxPrice &&
        (q
          ? p.name.toLowerCase().includes(q.toLowerCase()) ||
            p.brand.toLowerCase().includes(q.toLowerCase())
          : true),
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [q, cat, maxPrice, sort]);

  return (
    <div className="px-4 md:px-6 lg:px-10 py-10 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-gradient-soft border border-border p-6 md:p-8 mb-8">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Shop</div>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-1">{cat || "All Products"}</h1>
        <p className="text-muted-foreground mt-2">{filtered.length} products available</p>
      </div>
      <div className="grid lg:grid-cols-[260px_1fr] gap-6">
        <FiltersPanel
          className="hidden lg:block sticky top-24 self-start"
          cat={cat}
          setCat={setCat}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products..."
                className="w-full h-11 pl-11 pr-4 rounded-full bg-card border border-border outline-none focus:border-primary text-sm"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-11 px-4 rounded-full bg-card border border-border text-sm outline-none focus:border-primary"
            >
              <option value="popular">Most popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top rated</option>
            </select>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden h-11 px-4 rounded-full bg-card border border-border text-sm inline-flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filter
            </button>
          </div>
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border p-12 text-center text-muted-foreground">
              No products match your filters.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute bottom-0 inset-x-0 bg-card rounded-t-3xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Filters</h3>
              <button onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <FiltersPanel cat={cat} setCat={setCat} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
          </div>
        </div>
      )}
    </div>
  );
}

function FiltersPanel({
  className = "",
  cat,
  setCat,
  maxPrice,
  setMaxPrice,
}: {
  className?: string;
  cat?: string;
  setCat: (v?: string) => void;
  maxPrice: number;
  setMaxPrice: (n: number) => void;
}) {
  return (
    <aside className={`space-y-6 ${className}`}>
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-semibold mb-3">Category</h3>
        <div className="space-y-1.5">
          <button
            onClick={() => setCat(undefined)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${!cat ? "bg-primary/10 text-primary font-semibold" : "hover:bg-secondary"}`}
          >
            All categories
          </button>
          {categories.map((c) => (
            <button
              key={c.name}
              onClick={() => setCat(c.name)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition flex items-center gap-2 ${cat === c.name ? "bg-primary/10 text-primary font-semibold" : "hover:bg-secondary"}`}
            >
              <span>{c.icon}</span>
              {c.name}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-semibold mb-3">Price range</h3>
        <input
          type="range"
          min={50}
          max={1000}
          step={50}
          value={maxPrice}
          onChange={(e) => setMaxPrice(+e.target.value)}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>AED 50</span>
          <span className="font-semibold text-foreground">Up to AED {maxPrice}</span>
        </div>
      </div>
    </aside>
  );
}
