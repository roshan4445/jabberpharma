import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
  Shield,
  Truck,
  BadgeCheck,
} from "lucide-react";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="mt-24 bg-gradient-soft border-t border-border">
      <div className="px-4 md:px-6 lg:px-10 py-10 grid md:grid-cols-3 gap-6 border-b border-border">
        {[
          { icon: Shield, t: "100% Genuine", s: "Licensed pharmacy" },
          { icon: Truck, t: "Fast Delivery", s: "Within 24-48 hours" },
          { icon: BadgeCheck, t: "Verified Quality", s: "Expert pharmacists" },
        ].map((x) => (
          <div key={x.t} className="flex items-center gap-4">
            <span className="grid place-items-center h-12 w-12 rounded-2xl bg-gradient-brand text-primary-foreground shadow-soft">
              <x.icon className="h-5 w-5" />
            </span>
            <div>
              <div className="font-semibold">{x.t}</div>
              <div className="text-sm text-muted-foreground">{x.s}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 md:px-6 lg:px-10 py-12 grid md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <Logo />
          <p className="text-sm text-muted-foreground max-w-sm">
            Together Pharmacy — trusted healthcare in Dubai. Order genuine medicines and wellness
            products with reliable delivery.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4 text-primary" /> +971 50 145 6525
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4 text-primary" /> care@togetherpharmacy.com
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" /> Omar Bin Al Khattab St - Naif - Deira -
              Dubai - United Arab Emirates
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid place-items-center h-9 w-9 rounded-xl bg-card border border-border hover:bg-gradient-brand hover:text-primary-foreground hover:border-transparent transition"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {[
          {
            title: "Quick Links",
            links: [
              ["Home", "/"],
              ["Shop", "/shop"],
              ["About", "/about"],
              ["Contact", "/contact"],
              ["Track Order", "/track"],
            ],
          },
          {
            title: "Categories",
            links: [
              ["Medicines", "/shop"],
              ["Cosmetics", "/shop"],
              ["Skincare", "/shop"],
              ["Supplements", "/shop"],
              ["Ayurvedic", "/shop"],
            ],
          },
          {
            title: "Support",
            links: [
              ["Login", "/login"],
              ["Register", "/register"],
              ["Dashboard", "/dashboard"],
              ["Cart", "/cart"],
              ["Help Center", "/contact"],
            ],
          },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-semibold mb-3">{col.title}</h4>
            <ul className="space-y-2 text-sm">
              {col.links.map(([label, to]) => (
                <li key={label}>
                  <Link
                    to={to as any}
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="px-4 md:px-6 lg:px-10 py-6 border-t border-border flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-muted-foreground">
        <span>
          © 2026 Together Pharmacy LLC. Licensed in UAE · Trade License available on request
        </span>
        <span>Designed for modern healthcare · Crafted with care</span>
      </div>
    </footer>
  );
}
