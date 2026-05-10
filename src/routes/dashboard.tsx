import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin, Plane, Wallet, Calendar, Plus, Sparkles, TrendingUp, ArrowRight, Trash2
} from "lucide-react";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Traveloop" },
      { name: "description", content: "Manage your trips, budget and itineraries in one place." },
    ],
  }),
  component: Dashboard,
});

/** Format a number in Indian number system (e.g. 1,00,000) */
function formatINR(n: number): string {
  const s = Math.round(n).toString();
  if (s.length <= 3) return s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `${formatted},${last3}`;
}

const activity = [
  { text: "Added day 3 itinerary to Bali Getaway", time: "2h ago" },
  { text: "Updated budget for Kyoto Spring", time: "1d ago" },
  { text: "Booked airport taxi in Bali", time: "3d ago" },
];

function StatCard({ icon: Icon, label, value, sub }: { icon: any; label: string; value: string | number; sub: string }) {
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
  const [realTrips, setRealTrips] = useState<any[]>([]);
  const [totalBudget, setTotalBudget] = useState(0);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const tripsRef = ref(db, `trips/${user.uid}`);
        const unsubscribeDb = onValue(tripsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const parsedTrips = Object.keys(data).map(key => ({
              id: key,
              ...data[key]
            })).reverse(); // show newest first
            setRealTrips(parsedTrips);

            // Calculate total budget across all trips
            const sum = parsedTrips.reduce((acc, t) => acc + (Number(t.budget) || 0), 0);
            setTotalBudget(sum);
          } else {
            setRealTrips([]);
            setTotalBudget(0);
          }
        });
        return () => unsubscribeDb();
      } else {
        setRealTrips([]);
        setTotalBudget(0);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const handleDelete = async (tripId: string) => {
    if (!auth.currentUser) return;
    try {
      const { remove } = await import("firebase/database");
      await remove(ref(db, `trips/${auth.currentUser.uid}/${tripId}`));
      toast.success("Trip deleted");
    } catch (error) {
      console.error("Error deleting trip:", error);
      toast.error("Failed to delete trip");
    }
  };

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
          <StatCard icon={Plane} label="Upcoming trips" value={realTrips.length} sub="Planned itineraries" />
          <StatCard icon={MapPin} label="Cities planned" value={realTrips.length} sub={`Across ${realTrips.length} trips`} />
          <StatCard icon={Wallet} label="Total budget" value={`₹${formatINR(totalBudget)}`} sub="Across all trips" />
          <StatCard icon={Calendar} label="Days planned" value={realTrips.reduce((acc, t) => acc + (t.days || 0), 0)} sub="This year" />
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
                {realTrips.length === 0 && (
                  <p className="text-sm text-muted-foreground py-4">No trips planned yet. Create your first itinerary using the AI Planner!</p>
                )}
                {realTrips.slice(0, 3).map((t) => (
                  <div key={t.id} className="rounded-xl border border-border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{t.destination}</p>
                        <p className="text-xs text-muted-foreground">{t.days} Days Itinerary • Budget: ₹{formatINR(t.budget)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-mint-soft px-2 py-0.5 text-[11px] font-medium text-mint">Planned</span>
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          title="Delete trip"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-gradient-brand" style={{ width: `100%` }} />
                    </div>
                    <p className="mt-1.5 text-[11px] text-muted-foreground">100% planned</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold">Budget summary</h2>
              <div className="mt-4 grid grid-cols-4 gap-3 text-center text-xs">
                {[
                  { label: "Stay", value: Math.round(totalBudget * 0.45), color: "bg-primary" },
                  { label: "Transport", value: Math.round(totalBudget * 0.20), color: "bg-mint" },
                  { label: "Food", value: Math.round(totalBudget * 0.20), color: "bg-primary/70" },
                  { label: "Activities", value: Math.round(totalBudget * 0.15), color: "bg-mint/70" },
                ].map((b) => (
                  <div key={b.label} className="rounded-xl bg-muted p-3">
                    <p className="text-muted-foreground">{b.label}</p>
                    <p className="mt-1 text-base font-bold">₹{formatINR(b.value)}</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background">
                      <div className={`h-full ${b.color}`} style={{ width: totalBudget > 0 ? `${(b.value / totalBudget) * 100}%` : '0%' }} />
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
