import { createFileRoute } from "@tanstack/react-router";
import { Award, HeartHandshake, Sparkles, Target, Users, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Together Pharmacy" },
      {
        name: "description",
        content:
          "Together Pharmacy is a licensed pharmacy in Dubai making trusted healthcare accessible to local families and visitors.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="px-4 md:px-6 lg:px-10 py-16 max-w-6xl mx-auto">
      <section className="text-center max-w-3xl mx-auto">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Our Story</div>
        <h1 className="text-4xl md:text-5xl font-extrabold mt-2 leading-tight">
          Healthcare you can actually trust.
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          Born from a local practice, Together Pharmacy brings the same personal care your
          neighbourhood chemist offered — now serving Dubai with reliable delivery and expert
          pharmacists.
        </p>
      </section>
      <section className="grid md:grid-cols-3 gap-5 mt-12">
        {[
          {
            i: Target,
            t: "Our Mission",
            d: "Make genuine, affordable medicines and wellness products available to every household in Dubai and the UAE within hours.",
          },
          {
            i: Sparkles,
            t: "Our Vision",
            d: "To be the most trusted digital pharmacy — combining clinical care with luxury-grade experience.",
          },
          {
            i: HeartHandshake,
            t: "Our Values",
            d: "Patient first. Integrity always. Genuine products. Transparent pricing. Compassionate service.",
          },
        ].map((x) => (
          <div key={x.t} className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <span className="grid place-items-center h-12 w-12 rounded-2xl bg-gradient-brand text-primary-foreground shadow-soft">
              <x.i className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-bold text-lg">{x.t}</h3>
            <p className="text-sm text-muted-foreground mt-2">{x.d}</p>
          </div>
        ))}
      </section>
      <section className="mt-16 rounded-[2.5rem] bg-gradient-brand p-8 md:p-12 text-primary-foreground grid md:grid-cols-3 gap-6 text-center">
        {[
          ["1M+", "Families served"],
          ["50,000+", "Products in stock"],
          ["120+", "Cities delivered"],
        ].map(([n, l]) => (
          <div key={l}>
            <div className="text-4xl md:text-5xl font-extrabold">{n}</div>
            <div className="opacity-90 mt-1">{l}</div>
          </div>
        ))}
      </section>
      <section className="mt-16">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Our Team</div>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">Care begins with people</h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mt-10">
          {[
            { n: "Dr. Anjali Rao", r: "Chief Pharmacist", i: Award },
            { n: "Raj Khanna", r: "Head of Operations", i: ShieldCheck },
            { n: "Meera Iyer", r: "Customer Care Lead", i: HeartHandshake },
            { n: "Vikram Patel", r: "Quality Assurance", i: Users },
          ].map((t) => (
            <div
              key={t.n}
              className="rounded-3xl border border-border bg-card p-6 text-center shadow-soft"
            >
              <div className="mx-auto grid place-items-center h-20 w-20 rounded-full bg-gradient-brand text-primary-foreground text-2xl font-extrabold">
                {t.n
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div className="font-semibold mt-3">{t.n}</div>
              <div className="text-xs text-muted-foreground">{t.r}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
