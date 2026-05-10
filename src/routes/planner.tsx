import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/site/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, MapPin, Calendar, Wallet, Plane, Loader2 } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { toast } from "sonner";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Trip Planner — Traveloop" },
      { name: "description", content: "Generate a personalized itinerary in seconds with Traveloop AI." },
    ],
  }),
  component: Planner,
});

type Day = { day: number; title: string; activities: string[] };

function Planner() {
  const [destination, setDestination] = useState("Bali");
  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState(1200);
  const [interest, setInterest] = useState("Beaches, food, culture");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<Day[] | null>(null);

  const generate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPlan(null);
    
    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 1100));

    const sample: Day[] = Array.from({ length: days }).map((_, i) => ({
      day: i + 1,
      title:
        i === 0
          ? `Arrival in ${destination}`
          : i === days - 1
          ? "Relax & Departure"
          : ["Cultural day", "Nature & adventure", "Local food tour", "Hidden gems"][i % 4],
      activities: [
        "Morning: scenic walk + breakfast at a local cafe",
        "Afternoon: top-rated attraction + photo stops",
        "Evening: recommended restaurant with local cuisine",
      ],
    }));

    try {
      if (auth.currentUser) {
        await addDoc(collection(db, "trips"), {
          userId: auth.currentUser.uid,
          destination,
          days,
          budget,
          interest,
          plan: sample,
          createdAt: serverTimestamp()
        });
        toast.success("Trip saved to your account!");
      }
    } catch (error) {
      console.error("Error saving trip to Firebase:", error);
      toast.error("Failed to save trip. Are you logged in?");
    }

    setPlan(sample);
    setLoading(false);
  };

  const perDay = Math.round(budget / days);

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> AI Powered
          </span>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Plan your perfect trip</h1>
          <p className="mt-2 text-muted-foreground">Tell us a few details and our AI will craft a day-by-day itinerary.</p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[420px_1fr]">
          <Card className="p-6">
            <form onSubmit={generate} className="space-y-4">
              <div>
                <Label htmlFor="dest">Destination</Label>
                <div className="relative mt-1.5">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="dest" value={destination} onChange={(e) => setDestination(e.target.value)} className="pl-9" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="days">Days</Label>
                  <div className="relative mt-1.5">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="days" type="number" min={1} max={30} value={days} onChange={(e) => setDays(Number(e.target.value))} className="pl-9" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="budget">Budget (USD)</Label>
                  <div className="relative mt-1.5">
                    <Wallet className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="budget" type="number" min={100} step={50} value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="pl-9" />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="interests">Interests</Label>
                <Input id="interests" value={interest} onChange={(e) => setInterest(e.target.value)} className="mt-1.5" />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate itinerary
              </Button>
            </form>

            <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4">
              <p className="text-xs text-muted-foreground">Estimated daily budget</p>
              <p className="mt-1 text-2xl font-bold">${perDay}<span className="text-sm font-normal text-muted-foreground">/day</span></p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="rounded-lg bg-background p-2">
                  <p className="text-muted-foreground">Stay</p>
                  <p className="font-semibold">${Math.round(perDay * 0.45)}</p>
                </div>
                <div className="rounded-lg bg-background p-2">
                  <p className="text-muted-foreground">Food</p>
                  <p className="font-semibold">${Math.round(perDay * 0.25)}</p>
                </div>
                <div className="rounded-lg bg-background p-2">
                  <p className="text-muted-foreground">Activities</p>
                  <p className="font-semibold">${Math.round(perDay * 0.3)}</p>
                </div>
              </div>
            </div>
          </Card>

          <div>
            {!plan && !loading && (
              <Card className="grid h-full min-h-[300px] place-items-center p-10 text-center">
                <div>
                  <Plane className="mx-auto h-10 w-10 text-primary" />
                  <p className="mt-3 text-sm text-muted-foreground">Your itinerary will appear here.</p>
                </div>
              </Card>
            )}
            {loading && (
              <Card className="grid h-full min-h-[300px] place-items-center p-10">
                <div className="text-center">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                  <p className="mt-3 text-sm text-muted-foreground">Crafting your perfect plan…</p>
                </div>
              </Card>
            )}
            {plan && (
              <div className="space-y-3">
                {plan.map((d) => (
                  <Card key={d.day} className="p-5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-brand text-sm font-bold text-brand-foreground">
                        {d.day}
                      </span>
                      <h3 className="text-base font-semibold">{d.title}</h3>
                    </div>
                    <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                      {d.activities.map((a, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
