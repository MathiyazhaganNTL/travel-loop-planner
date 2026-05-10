import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — Traveloop" }] }),
  component: Signup,
});

function Signup() {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-6">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-brand-foreground">
            <Compass className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-bold">Traveloop</span>
        </Link>
        <Card className="p-7">
          <h1 className="text-xl font-bold">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Start planning trips with AI in seconds.</p>
          <form className="mt-5 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" placeholder="Alex Traveler" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="At least 8 characters" className="mt-1.5" />
            </div>
            <Button type="submit" className="w-full">Create account</Button>
          </form>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">Log in</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
