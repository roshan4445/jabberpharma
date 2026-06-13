import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { Package, Heart, MapPin, FileText, User, LogOut, ChevronRight } from "lucide-react";
import { products } from "@/lib/products";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "My Account — Together Pharmacy" }] }),
  component: Dashboard,
});

function Dashboard() {
  const wishlist = useStore((s) => s.wishlist);
  const wishItems = products.filter((p) => wishlist.includes(p.id));
  const stats = [
    { i: Package, label: "Orders", value: "12" },
    { i: Heart, label: "Wishlist", value: String(wishlist.length) },
    { i: FileText, label: "Prescriptions", value: "4" },
    { i: MapPin, label: "Addresses", value: "2" },
  ];
  const nav = [User, Package, MapPin, Heart, FileText, LogOut];
  const navLabels = [
    "Profile",
    "My Orders",
    "Saved Addresses",
    "Wishlist",
    "Prescriptions",
    "Sign out",
  ];
  return (
    <div className="px-4 md:px-6 lg:px-10 py-10 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-gradient-brand p-8 text-primary-foreground shadow-elevated flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="grid place-items-center h-16 w-16 rounded-2xl bg-white/20 backdrop-blur text-2xl font-bold">
            P
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider opacity-80">Welcome back</div>
            <h1 className="text-2xl md:text-3xl font-extrabold">Priya Sharma</h1>
            <p className="text-sm opacity-90">
              priya@example.com · Together Pharmacy member since 2023
            </p>
          </div>
        </div>
        <Link
          to="/shop"
          className="h-11 px-5 rounded-full bg-white text-primary font-semibold shadow-soft inline-flex items-center"
        >
          Continue shopping
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center h-10 w-10 rounded-xl bg-primary/10 text-primary">
                <s.i className="h-5 w-5" />
              </span>
              <div>
                <div className="text-2xl font-extrabold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-[260px_1fr] gap-6 mt-8">
        <aside className="rounded-2xl border border-border bg-card p-3 self-start">
          {nav.map((Icon, i) => (
            <button
              key={navLabels[i]}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition ${i === 1 ? "bg-primary/10 text-primary" : "hover:bg-secondary"}`}
            >
              <span className="flex items-center gap-2">
                <Icon className="h-4 w-4" /> {navLabels[i]}
              </span>
              <ChevronRight className="h-4 w-4 opacity-60" />
            </button>
          ))}
        </aside>
        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="font-bold text-lg mb-4">Recent Orders</h2>
            <div className="space-y-3">
              {[
                { id: "MC-2841", date: "12 Jun 2026", status: "Delivered", total: 1248 },
                { id: "MC-2774", date: "28 May 2026", status: "Shipped", total: 599 },
                { id: "MC-2611", date: "10 May 2026", status: "Delivered", total: 349 },
              ].map((o) => (
                <div
                  key={o.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-secondary/60"
                >
                  <div>
                    <div className="font-semibold">Order #{o.id}</div>
                    <div className="text-xs text-muted-foreground">{o.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">AED {o.total}</div>
                    <span
                      className={`text-xs font-semibold ${o.status === "Delivered" ? "text-success" : "text-primary"}`}
                    >
                      {o.status}
                    </span>
                  </div>
                  <Link
                    to="/track"
                    className="ml-4 text-sm font-semibold text-primary hidden sm:inline"
                  >
                    Track →
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {wishItems.length > 0 && (
            <div className="rounded-3xl border border-border bg-card p-6">
              <h2 className="font-bold text-lg mb-4">Your Wishlist</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {wishItems.slice(0, 6).map((p) => (
                  <Link key={p.id} to="/products/$id" params={{ id: p.id }} className="group">
                    <div className="aspect-square rounded-2xl bg-gradient-soft border border-border overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-contain p-3 group-hover:scale-110 transition"
                      />
                    </div>
                    <div className="text-sm font-medium mt-2 line-clamp-1">{p.name}</div>
                    <div className="text-sm font-bold text-primary">AED {p.price}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
