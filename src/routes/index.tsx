import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  Upload,
  ShieldCheck,
  Truck,
  BadgeCheck,
  Headphones,
  Star,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Quote,
  Tag,
  Heart,
  Activity,
  Droplets,
  Sun,
} from "lucide-react";
import heroImg from "@/assets/hero-pharmacy.jpg";
import cosmeticsImg from "@/assets/cosmetics-banner.jpg";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useRef, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Together Pharmacy — Your Trusted Healthcare Partner" },
      {
        name: "description",
        content:
          "Order medicines, premium cosmetics and wellness products online from Together Pharmacy in Dubai. Licensed pharmacy with reliable delivery and expert pharmacists.",
      },
      { property: "og:title", content: "Together Pharmacy" },
      {
        property: "og:description",
        content:
          "Your trusted healthcare partner in Dubai. Genuine medicines, premium cosmetics, fast delivery.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Categories />
      <BestSellers />
      <CosmeticsShowcase />
      <PrescriptionUpload />
      <WhyChooseUs />
      <Offers />
      <HealthTips />
      <Testimonials />
      <Newsletter />
    </>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-primary/15 blur-3xl animate-blob" />
      <div
        className="absolute -bottom-20 right-0 h-96 w-96 rounded-full bg-success/15 blur-3xl animate-blob"
        style={{ animationDelay: "3s" }}
      />
      <div className="relative px-4 md:px-6 lg:px-10 pt-12 pb-20 grid lg:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Licensed Pharmacy · Trusted by 1M+ families</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
            Your trusted <span className="text-gradient-brand">healthcare</span> partner, delivered.
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Genuine medicines, premium cosmetics and daily essentials — backed by expert pharmacists
            and delivered to your door in 24 hours.
          </p>
          <div className="relative max-w-xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search 50,000+ medicines, vitamins, cosmetics..."
              className="w-full h-14 pl-14 pr-32 rounded-full bg-card border border-border shadow-soft focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition"
            />
            <Link
              to="/shop"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-5 rounded-full bg-gradient-brand text-primary-foreground text-sm font-semibold shadow-soft inline-flex items-center gap-1.5"
            >
              Search <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-gradient-brand text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition"
            >
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#prescription"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-card border border-border font-semibold hover:border-primary hover:text-primary transition"
            >
              <Upload className="h-4 w-4" /> Upload Prescription
            </a>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
            {[
              { i: ShieldCheck, t: "Licensed" },
              { i: BadgeCheck, t: "Genuine" },
              { i: Truck, t: "24h Delivery" },
              { i: Headphones, t: "Expert Support" },
            ].map((x) => (
              <div key={x.t} className="flex items-center gap-2 text-sm">
                <span className="grid place-items-center h-8 w-8 rounded-lg bg-primary/10 text-primary">
                  <x.i className="h-4 w-4" />
                </span>
                <span className="font-medium">{x.t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-4 bg-gradient-brand rounded-[3rem] blur-2xl opacity-30" />
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-elevated animate-float">
            <img
              src={heroImg}
              alt="Together Pharmacy"
              width={1536}
              height={1280}
              className="w-full h-auto"
            />
          </div>
          <div
            className="absolute -left-4 top-10 glass rounded-2xl p-3 pr-5 shadow-soft hidden sm:flex items-center gap-3 animate-float"
            style={{ animationDelay: "1s" }}
          >
            <span className="grid place-items-center h-10 w-10 rounded-xl bg-success text-success-foreground">
              <BadgeCheck className="h-5 w-5" />
            </span>
            <div>
              <div className="text-xs text-muted-foreground">Order placed</div>
              <div className="font-semibold text-sm">Delivered in 12 mins</div>
            </div>
          </div>
          <div
            className="absolute -right-2 bottom-10 glass rounded-2xl p-3 pr-5 shadow-soft hidden sm:flex items-center gap-3 animate-float"
            style={{ animationDelay: "2s" }}
          >
            <span className="grid place-items-center h-10 w-10 rounded-xl bg-primary text-primary-foreground">
              <Star className="h-5 w-5 fill-current" />
            </span>
            <div>
              <div className="text-xs text-muted-foreground">Rated by patients</div>
              <div className="font-semibold text-sm">4.9 / 5 · 28k reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="border-y border-border bg-card">
      <div className="px-4 md:px-6 lg:px-10 py-6 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {[
          ["1M+", "Happy customers"],
          ["50K+", "Products"],
          ["24h", "Avg delivery"],
          ["4.9★", "Customer rating"],
        ].map(([n, l]) => (
          <div key={l}>
            <div className="text-2xl md:text-3xl font-extrabold text-gradient-brand">{n}</div>
            <div className="text-xs text-muted-foreground mt-1">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Categories ---------- */
function Categories() {
  return (
    <section className="px-4 md:px-6 lg:px-10 py-20 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Shop by category"
        title="Find everything your family needs"
        subtitle="From everyday medicines to premium cosmetics, all in one place."
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-10">
        {categories.map((c, i) => (
          <Link
            key={c.name}
            to="/shop"
            search={{ category: c.name } as any}
            className="group relative rounded-3xl border border-border bg-card p-5 hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${c.tint} opacity-0 group-hover:opacity-100 transition`}
            />
            <div className="relative">
              <div
                className={`grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br ${c.tint} text-3xl mb-3 group-hover:scale-110 transition`}
              >
                {c.icon}
              </div>
              <div className="font-semibold text-sm">{c.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1 group-hover:text-primary transition">
                Explore <ChevronRight className="h-3 w-3" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ---------- Best Sellers ---------- */
function BestSellers() {
  return (
    <section className="px-4 md:px-6 lg:px-10 py-20 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-10">
        <SectionHeader
          eyebrow="Best sellers"
          title="Loved by thousands of families"
          subtitle="Our most-ordered medicines and wellness essentials."
          inline
        />
        <Link
          to="/shop"
          className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {products.slice(0, 8).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

/* ---------- Cosmetics Showcase ---------- */
function CosmeticsShowcase() {
  return (
    <section className="px-4 md:px-6 lg:px-10 py-20 max-w-7xl mx-auto">
      <div className="relative rounded-[2.5rem] overflow-hidden border border-border bg-card shadow-soft">
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto">
            <img
              src={cosmeticsImg}
              alt="Luxury cosmetics"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-gradient-soft">
            <div className="inline-flex w-fit items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" /> Luxury beauty collection
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-4 leading-tight">
              Skin that glows.
              <br />
              Confidence that lasts.
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md">
              Discover dermatologist-approved skincare and premium beauty products curated for every
              skin type.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-8">
              {products
                .filter((p) => ["Cosmetics", "Skincare"].includes(p.category))
                .slice(0, 3)
                .map((p) => (
                  <Link key={p.id} to="/products/$id" params={{ id: p.id }} className="group">
                    <div className="aspect-square rounded-2xl bg-card border border-border overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="h-full w-full object-contain p-3 group-hover:scale-110 transition"
                      />
                    </div>
                    <div className="text-xs font-medium mt-2 line-clamp-1">{p.name}</div>
                    <div className="text-xs text-primary font-bold">AED {p.price}</div>
                  </Link>
                ))}
            </div>
            <Link
              to="/shop"
              search={{ category: "Cosmetics" } as any}
              className="inline-flex w-fit items-center gap-2 mt-8 h-12 px-6 rounded-full bg-gradient-brand text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition"
            >
              Shop the collection <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Prescription Upload ---------- */
function PrescriptionUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  function onFile(f: File | undefined | null) {
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    toast.success("Prescription uploaded — our pharmacist will reach out shortly.");
  }
  return (
    <section id="prescription" className="px-4 md:px-6 lg:px-10 py-20 max-w-7xl mx-auto">
      <div className="relative rounded-[2.5rem] overflow-hidden border border-border bg-gradient-brand p-8 md:p-12 text-primary-foreground">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="relative grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-xs font-semibold backdrop-blur">
              <Upload className="h-3.5 w-3.5" /> Secure & private
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-4 leading-tight">
              Upload your prescription.
              <br />
              We'll handle the rest.
            </h2>
            <p className="mt-4 text-primary-foreground/85 max-w-md">
              Drop a photo or PDF. A licensed pharmacist verifies your order and delivers it
              discreetly in hours.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {[
                "Verified by licensed pharmacists",
                "256-bit encrypted upload",
                "Insurance & GST invoice",
              ].map((x) => (
                <li key={x} className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4" /> {x}
                </li>
              ))}
            </ul>
          </div>
          <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              onFile(e.dataTransfer.files?.[0]);
            }}
            className="relative block rounded-3xl border-2 border-dashed border-white/40 hover:border-white p-8 cursor-pointer text-center glass-dark transition"
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0])}
            />
            {preview ? (
              <div className="space-y-3">
                <img
                  src={preview}
                  alt="Prescription preview"
                  className="mx-auto max-h-48 rounded-xl shadow-soft"
                />
                <div className="text-sm font-medium">{file?.name}</div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setFile(null);
                    setPreview(null);
                  }}
                  className="text-xs underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="space-y-3 py-6">
                <div className="mx-auto grid place-items-center h-16 w-16 rounded-2xl bg-white/15">
                  <Upload className="h-7 w-7" />
                </div>
                <div className="font-semibold">Drag & drop your prescription</div>
                <div className="text-sm opacity-80">
                  or click to browse — JPG, PNG, PDF up to 10MB
                </div>
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="mt-2 inline-flex items-center gap-2 h-10 px-5 rounded-full bg-white text-primary font-semibold shadow-soft"
                >
                  Browse files
                </button>
              </div>
            )}
          </label>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why Choose Us ---------- */
function WhyChooseUs() {
  const items = [
    {
      i: ShieldCheck,
      t: "Licensed Pharmacy",
      d: "Government-certified with verified drug licenses.",
    },
    { i: BadgeCheck, t: "Genuine Medicines", d: "Sourced directly from authorised distributors." },
    { i: Truck, t: "Fast Delivery", d: "Same-day in metro, 24-48h nationwide." },
    { i: ShieldCheck, t: "Secure Payments", d: "Encrypted checkout with all major methods." },
    {
      i: Headphones,
      t: "Expert Pharmacists",
      d: "Free chat consultation with certified pharmacists.",
    },
    { i: BadgeCheck, t: "Easy Returns", d: "Hassle-free 7-day return on eligible items." },
  ];
  return (
    <section className="px-4 md:px-6 lg:px-10 py-20 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Why Together Pharmacy"
        title="Healthcare you can trust"
        subtitle="Six reasons families across the UAE choose Together Pharmacy every day."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {items.map((x) => (
          <div
            key={x.t}
            className="group p-6 rounded-3xl border border-border bg-card hover:shadow-elevated hover:-translate-y-1 transition-all"
          >
            <span className="grid place-items-center h-12 w-12 rounded-2xl bg-gradient-brand text-primary-foreground shadow-soft group-hover:shadow-glow transition">
              <x.i className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-semibold text-lg">{x.t}</h3>
            <p className="text-sm text-muted-foreground mt-2">{x.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Offers ---------- */
function Offers() {
  const offers = [
    {
      tag: "Up to 35% off",
      title: "Monthly medicine refills",
      desc: "Save big on chronic care",
      from: "from-sky-500 to-cyan-400",
    },
    {
      tag: "BUY 1 GET 1",
      title: "Skincare essentials",
      desc: "Pick two, pay for one",
      from: "from-rose-500 to-pink-400",
    },
    {
      tag: "Flat AED 200 off",
      title: "Health supplements",
      desc: "Code: WELLNESS200",
      from: "from-emerald-500 to-teal-400",
    },
  ];
  return (
    <section className="px-4 md:px-6 lg:px-10 py-20 max-w-7xl mx-auto">
      <SectionHeader eyebrow="This week's deals" title="Special offers, just for you" />
      <div className="grid md:grid-cols-3 gap-5 mt-10">
        {offers.map((o) => (
          <div
            key={o.title}
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${o.from} p-7 text-white shadow-soft hover:shadow-elevated transition`}
          >
            <Tag className="absolute top-4 right-4 h-16 w-16 opacity-15" />
            <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/20 backdrop-blur text-[11px] font-bold uppercase tracking-wide">
              {o.tag}
            </div>
            <h3 className="mt-4 text-2xl font-extrabold leading-tight">{o.title}</h3>
            <p className="mt-1 opacity-90 text-sm">{o.desc}</p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-white text-foreground text-sm font-semibold shadow-soft"
            >
              Claim offer <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Health Tips ---------- */
function HealthTips() {
  const posts = [
    {
      i: Heart,
      title: "10 simple ways to boost immunity this season",
      tag: "Wellness",
      time: "5 min read",
    },
    {
      i: Droplets,
      title: "The complete guide to layering skincare",
      tag: "Skincare",
      time: "8 min read",
    },
    {
      i: Activity,
      title: "Daily habits for healthy blood pressure",
      tag: "Health",
      time: "6 min read",
    },
    { i: Sun, title: "Sun protection: SPF myths debunked", tag: "Skincare", time: "4 min read" },
  ];
  return (
    <section className="px-4 md:px-6 lg:px-10 py-20 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Health & wellness"
        title="Expert tips from our pharmacists"
        subtitle="Practical advice for a healthier everyday."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        {posts.map((p) => (
          <article
            key={p.title}
            className="group rounded-3xl border border-border bg-card overflow-hidden hover:shadow-elevated hover:-translate-y-1 transition-all"
          >
            <div className="aspect-[4/3] bg-gradient-soft grid place-items-center text-primary">
              <p.i className="h-16 w-16 group-hover:scale-110 transition" strokeWidth={1.5} />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="px-2 py-0.5 rounded-full bg-secondary font-medium">{p.tag}</span>
                <span>·</span>
                <span>{p.time}</span>
              </div>
              <h3 className="mt-3 font-semibold leading-snug group-hover:text-primary transition">
                {p.title}
              </h3>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-primary">
                Read article <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const items = [
    {
      name: "Priya Sharma",
      role: "Dubai",
      text: "Together Pharmacy is my go-to for monthly refills. Genuine products and lightning-fast delivery!",
      rating: 5,
    },
    {
      name: "Arjun Mehta",
      role: "Bangalore",
      text: "Their pharmacist actually chatted with me about my prescription — felt like a real clinic.",
      rating: 5,
    },
    {
      name: "Anjali Verma",
      role: "Delhi",
      text: "Skincare collection is on par with luxury boutiques. Packaging is gorgeous too.",
      rating: 5,
    },
  ];
  return (
    <section className="px-4 md:px-6 lg:px-10 py-20 max-w-7xl mx-auto">
      <SectionHeader eyebrow="Loved by patients" title="What our customers say" />
      <div className="grid md:grid-cols-3 gap-5 mt-10">
        {items.map((t) => (
          <div
            key={t.name}
            className="rounded-3xl border border-border bg-card p-7 shadow-soft relative"
          >
            <Quote className="absolute top-4 right-4 h-10 w-10 text-primary/10" />
            <div className="flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="mt-4 text-foreground/90 leading-relaxed">"{t.text}"</p>
            <div className="flex items-center gap-3 mt-6 pt-5 border-t border-border">
              <div className="grid place-items-center h-11 w-11 rounded-full bg-gradient-brand text-primary-foreground font-bold">
                {t.name[0]}
              </div>
              <div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role} · Verified customer</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Newsletter ---------- */
function Newsletter() {
  return (
    <section className="px-4 md:px-6 lg:px-10 py-12 max-w-7xl mx-auto">
      <div className="rounded-[2rem] bg-gradient-brand p-8 md:p-12 text-primary-foreground flex flex-col md:flex-row items-center justify-between gap-6 shadow-elevated">
        <div>
          <h3 className="text-2xl md:text-3xl font-extrabold">Get 10% off your first order</h3>
          <p className="opacity-90 mt-1">
            Health tips, exclusive offers and product launches in your inbox.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Subscribed! Check your inbox for the code.");
          }}
          className="flex w-full md:w-auto gap-2"
        >
          <input
            type="email"
            required
            placeholder="your@email.com"
            className="h-12 px-5 rounded-full bg-white text-foreground min-w-0 md:w-72 outline-none"
          />
          <button className="h-12 px-6 rounded-full bg-foreground text-background font-semibold whitespace-nowrap">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

/* ---------- Helpers ---------- */
function SectionHeader({
  eyebrow,
  title,
  subtitle,
  inline,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  inline?: boolean;
}) {
  return (
    <div className={inline ? "" : "text-center max-w-2xl mx-auto"}>
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</div>
      <h2 className="text-3xl md:text-4xl font-extrabold mt-2 leading-tight">{title}</h2>
      {subtitle && <p className="text-muted-foreground mt-3">{subtitle}</p>}
    </div>
  );
}
