import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Together Pharmacy" },
      {
        name: "description",
        content:
          "Get in touch with Together Pharmacy in Dubai. Call, email or visit our store in Deira.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="px-4 md:px-6 lg:px-10 py-16 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Contact Us</div>
        <h1 className="text-4xl md:text-5xl font-extrabold mt-2">We're here, 24/7.</h1>
        <p className="text-muted-foreground mt-3">
          Questions about a medicine, an order, or a prescription? Reach out — a real pharmacist
          will reply.
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-8 mt-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Message sent! We'll reply within 1 hour.");
          }}
          className="rounded-3xl border border-border bg-card p-8 shadow-soft space-y-4"
        >
          <h2 className="text-2xl font-bold">Send us a message</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Your name" required />
            <Field label="Phone" type="tel" required />
          </div>
          <Field label="Email" type="email" required />
          <Field label="Subject" />
          <label className="block">
            <span className="text-xs font-semibold text-muted-foreground">Message</span>
            <textarea
              required
              rows={5}
              className="mt-1 w-full px-4 py-3 rounded-xl border border-border bg-background outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition resize-none"
            />
          </label>
          <button className="w-full h-12 rounded-full bg-gradient-brand text-primary-foreground font-semibold inline-flex items-center justify-center gap-2 shadow-soft hover:shadow-glow transition">
            Send Message <ArrowRight className="h-4 w-4" />
          </button>
        </form>
        <div className="space-y-4">
          {[
            { i: Phone, t: "Phone", d: "+971 50 145 6525", s: "24/7 pharmacist" },
            { i: Mail, t: "Email", d: "care@togetherpharmacy.com", s: "We reply within 1 hour" },
            {
              i: MapPin,
              t: "Flagship Store",
              d: "Omar Bin Al Khattab St - Naif - Deira - Dubai",
              s: "United Arab Emirates",
            },
            { i: Clock, t: "Working Hours", d: "Mon–Sun 24 hours", s: "Online & in-store" },
          ].map((x) => (
            <div
              key={x.t}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5"
            >
              <span className="grid place-items-center h-12 w-12 rounded-2xl bg-gradient-brand text-primary-foreground shadow-soft">
                <x.i className="h-5 w-5" />
              </span>
              <div>
                <div className="font-semibold">{x.t}</div>
                <div className="text-sm">{x.d}</div>
                <div className="text-xs text-muted-foreground">{x.s}</div>
              </div>
            </div>
          ))}
          <div className="rounded-3xl overflow-hidden border border-border aspect-video bg-gradient-soft">
            <iframe
              title="Store location"
              loading="lazy"
              className="w-full h-full"
              src="https://www.openstreetmap.org/export/embed.html?bbox=72.82%2C18.93%2C72.84%2C18.95&layer=mapnik"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, ...rest }: { label: string; [k: string]: unknown }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <input
        {...rest}
        className="mt-1 w-full h-11 px-4 rounded-xl border border-border bg-background outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition"
      />
    </label>
  );
}
