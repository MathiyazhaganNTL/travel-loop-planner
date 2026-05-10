import { Compass } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-brand-foreground">
              <Compass className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold">Traveloop</span>
          </Link>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            AI-powered travel planning. Discover destinations, build itineraries, manage budgets, and travel smarter.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Product</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/planner" className="hover:text-foreground">AI Planner</Link></li>
            <li><Link to="/destinations" className="hover:text-foreground">Destinations</Link></li>
            <li><Link to="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">About</a></li>
            <li><a href="#" className="hover:text-foreground">Contact</a></li>
            <li><a href="#" className="hover:text-foreground">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Traveloop. Plan well. Travel better.
      </div>
    </footer>
  );
}
