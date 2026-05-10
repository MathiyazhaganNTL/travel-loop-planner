import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin, Plane, Wallet, Calendar, Plus, Sparkles, TrendingUp, ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Traveloop" },
      { name: "description", content: "Manage your trips, budget and itineraries in one place." },
    ],
  }),
  component: Dashboard,
});

const trips = [
  { name: "Bali Getaway", dates: "Jun 12 – Jun 19", progress: 60, status: "Upcoming" },
  { name: "Kyoto Spring", dates: "Sep 04 – Sep 12", progress: 25, status: "Planning" },
];

const activity = [
  { text: "Added day 3 itinerary to Bali Getaway", time: "2h ago" },
  { text: "Updated budget for Kyoto Spring", time: "1d ago" },
  { text: "Booked airport taxi in Bali", time: "3d ago" },
];

function StatCard({ icon: Icon, label, value, sub }: { icon: any; label: string; value: string; sub: string }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-soft text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <TrendingUp className="h-4 w-4 text-mint" />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </Card>
  );
}

function Dashboard() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back 👋</p>
            <h1 className="text-2xl font-bold sm:text-3xl">Your travel dashboard</h1>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/destinations">Browse</Link>
            </Button>
            <Button asChild>
              <Link to="/planner"><Plus className="mr-1.5 h-4 w-4" /> New trip</Link>
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Plane} label="Upcoming trips" value="2" sub="Next in 18 days" />
          <StatCard icon={MapPin} label="Cities planned" value="7" sub="Across 2 trips" />
          <StatCard icon={Wallet} label="Total budget" value="$3,420" sub="$640 spent" />
          <StatCard icon={Calendar} label="Days planned" value="14" sub="This year" />
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-5">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Upcoming trips</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/planner">View all <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
                </Button>
              </div>
              <div className="mt-4 space-y-3">
                {trips.map((t) => (
                  <div key={t.name} className="rounded-xl border border-border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.dates}</p>
                      </div>
                      <span className="rounded-full bg-mint-soft px-2 py-0.5 text-[11px] font-medium text-mint">{t.status}</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${t.progress}%` }} />
                    </div>
                    <p className="mt-1.5 text-[11px] text-muted-foreground">{t.progress}% planned</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold">Budget summary</h2>
              <div className="mt-4 grid grid-cols-4 gap-3 text-center text-xs">
                {[
                  { label: "Stay", value: 1450, color: "bg-primary" },
                  { label: "Transport", value: 820, color: "bg-mint" },
                  { label: "Food", value: 640, color: "bg-primary/70" },
                  { label: "Activities", value: 510, color: "bg-mint/70" },
                ].map((b) => (
                  <div key={b.label} className="rounded-xl bg-muted p-3">
                    <p className="text-muted-foreground">{b.label}</p>
                    <p className="mt-1 text-base font-bold">${b.value}</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background">
                      <div className={`h-full ${b.color}`} style={{ width: `${(b.value / 1500) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-5">
            <Card className="p-6">
              <h2 className="text-lg font-semibold">Quick actions</h2>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="sm" className="justify-start">
                  <Link to="/planner"><Sparkles className="mr-1.5 h-4 w-4" /> AI plan</Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="justify-start">
                  <Link to="/destinations"><MapPin className="mr-1.5 h-4 w-4" /> Explore</Link>
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Wallet className="mr-1.5 h-4 w-4" /> Budget
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Calendar className="mr-1.5 h-4 w-4" /> Calendar
                </Button>
              </div>
            </Card>
            <Card className="p-6">
              <h2 className="text-lg font-semibold">Recent activity</h2>
              <ul className="mt-4 space-y-3">
                {activity.map((a, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <div>
                      <p>{a.text}</p>
                      <p className="text-xs text-muted-foreground">{a.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
