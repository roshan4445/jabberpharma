import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Together Pharmacy" }] }),
  component: Login,
});

function Login() {
  return (
    <div className="min-h-[80vh] grid lg:grid-cols-2">
      <div className="hidden lg:block relative bg-gradient-brand overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
        <div className="relative h-full p-12 flex flex-col justify-between text-primary-foreground">
          <Logo />
          <div>
            <h2 className="text-4xl font-extrabold leading-tight">
              Welcome back to your trusted pharmacy.
            </h2>
            <p className="mt-4 opacity-90 max-w-md">
              Track orders, manage prescriptions and refill medicines with one click.
            </p>
          </div>
          <div className="text-sm opacity-75">© Together Pharmacy</div>
        </div>
      </div>
      <div className="grid place-items-center px-6 py-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Welcome back!");
          }}
          className="w-full max-w-md space-y-5"
        >
          <div className="lg:hidden mb-4">
            <Logo />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold">Sign in</h1>
            <p className="text-muted-foreground mt-1">to your Together Pharmacy account</p>
          </div>
          <Input icon={Mail} type="email" placeholder="Email address" required />
          <Input icon={Lock} type="password" placeholder="Password" required />
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-primary" /> Remember me
            </label>
            <a href="#" className="text-primary font-semibold">
              Forgot password?
            </a>
          </div>
          <button className="w-full h-12 rounded-full bg-gradient-brand text-primary-foreground font-semibold inline-flex items-center justify-center gap-2 shadow-soft hover:shadow-glow transition">
            Sign in <ArrowRight className="h-4 w-4" />
          </button>
          <p className="text-center text-sm text-muted-foreground">
            New to Together Pharmacy?{" "}
            <Link to="/register" className="text-primary font-semibold">
              Create account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export function Input({
  icon: Icon,
  ...rest
}: {
  icon: React.ComponentType<{ className?: string }>;
  [k: string]: unknown;
}) {
  return (
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        {...rest}
        className="w-full h-12 pl-11 pr-4 rounded-xl border border-border bg-background outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition"
      />
    </div>
  );
}
