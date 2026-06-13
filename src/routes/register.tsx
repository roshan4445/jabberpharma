import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Mail, Lock, User, Phone, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Input } from "./login";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create Account — Together Pharmacy" }] }),
  component: Register,
});

function Register() {
  return (
    <div className="min-h-[80vh] grid place-items-center px-6 py-12">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Account created!");
        }}
        className="w-full max-w-md space-y-5"
      >
        <Logo />
        <div>
          <h1 className="text-3xl font-extrabold">Create your account</h1>
          <p className="text-muted-foreground mt-1">Join our customers at Together Pharmacy</p>
        </div>
        <Input icon={User} placeholder="Full name" required />
        <Input icon={Phone} type="tel" placeholder="Mobile number" required />
        <Input icon={Mail} type="email" placeholder="Email" required />
        <Input icon={Lock} type="password" placeholder="Password" required />
        <button className="w-full h-12 rounded-full bg-gradient-brand text-primary-foreground font-semibold inline-flex items-center justify-center gap-2 shadow-soft hover:shadow-glow transition">
          Create account <ArrowRight className="h-4 w-4" />
        </button>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
