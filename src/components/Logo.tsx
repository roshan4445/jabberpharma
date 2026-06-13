import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 group ${className}`}>
      <span className="relative grid place-items-center h-10 w-10 rounded-2xl bg-gradient-brand shadow-soft text-white">
        <Plus className="h-5 w-5" strokeWidth={3} />
        <span className="absolute inset-0 rounded-2xl ring-1 ring-white/40" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display font-extrabold text-lg tracking-tight text-foreground">
          Together
        </span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Pharmacy
        </span>
      </span>
    </Link>
  );
}
