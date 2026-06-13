import { createFileRoute } from "@tanstack/react-router";
import { Package, CheckCircle2, Truck, Home, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/track")({
  head: () => ({ meta: [{ title: "Track Order — Together Pharmacy" }] }),
  component: Track,
});

const stages = [
  { i: ShoppingBag, label: "Order Placed", at: "Today 10:24 AM" },
  { i: CheckCircle2, label: "Confirmed", at: "Today 10:31 AM" },
  { i: Package, label: "Packed", at: "Today 11:08 AM" },
  { i: Truck, label: "Shipped", at: "In transit" },
  { i: Home, label: "Delivered", at: "Expected tomorrow" },
];

function Track() {
  const current = 3;
  return (
    <div className="px-4 md:px-6 lg:px-10 py-12 max-w-4xl mx-auto">
      <div className="rounded-3xl bg-gradient-soft border border-border p-8">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
          Order Tracking
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-1">Order #MC-2841</h1>
        <p className="text-muted-foreground mt-2">Estimated delivery: Tomorrow by 6 PM</p>
      </div>
      <div className="mt-10 rounded-3xl border border-border bg-card p-8 shadow-soft">
        <div className="relative">
          <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-border" />
          <div
            className="absolute left-5 top-5 w-0.5 bg-gradient-brand"
            style={{ height: `${(current / (stages.length - 1)) * 100}%` }}
          />
          <div className="space-y-6">
            {stages.map((s, i) => {
              const done = i <= current;
              return (
                <div key={s.label} className="flex items-center gap-4 relative">
                  <div
                    className={`relative z-10 grid place-items-center h-11 w-11 rounded-full ${done ? "bg-gradient-brand text-primary-foreground shadow-soft" : "bg-secondary text-muted-foreground"}`}
                  >
                    <s.i className="h-5 w-5" />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <div className={`font-semibold ${done ? "" : "text-muted-foreground"}`}>
                        {s.label}
                      </div>
                      <div className="text-xs text-muted-foreground">{s.at}</div>
                    </div>
                    {i === current && (
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                        In progress
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
