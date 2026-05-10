import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search, MapPin, Sparkles, Calendar, Wallet, Map, Users, Plane, Mountain,
  UtensilsCrossed, Camera, Building2, Star, ArrowRight,
} from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import hero from "@/assets/hero.jpg";
import bali from "@/assets/dest-bali.jpg";
import santorini from "@/assets/dest-santorini.jpg";
import kyoto from "@/assets/dest-kyoto.jpg";
import swiss from "@/assets/dest-swiss.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Traveloop — AI-powered travel planning" },
      {
        name: "description",
        content:
          "Plan trips, build itineraries, manage budgets and discover destinations with Traveloop's AI travel assistant.",
      },
      { property: "og:title", content: "Traveloop — AI-powered travel planning" },
      { property: "og:description", content: "Smarter trips with AI itineraries, live tracking, and budget tools." },
    ],
  }),
  component: Index,
});

const destinations = [
  { name: "Bali, Indonesia", tag: "Tropical", price: "From $620", img: bali },
  { name: "Santorini, Greece", tag: "Coastal", price: "From $890", img: santorini },
  { name: "Kyoto, Japan", tag: "Cultural", price: "From $740", img: kyoto },
  { name: "Swiss Alps", tag: "Mountains", price: "From $980", img: swiss },
];

const categories = [
  { icon: Mountain, label: "Adventure" },
  { icon: UtensilsCrossed, label: "Food & Drink" },
  { icon: Building2, label: "City Breaks" },
  { icon: Plane, label: "Long Haul" },
  { icon: Camera, label: "Photography" },
  { icon: Users, label: "Family" },
];

const features = [
  { icon: Sparkles, title: "AI Trip Planner", desc: "Personalized itineraries built from your budget, dates and interests." },
  { icon: Wallet, title: "Smart Budgets", desc: "Track transport, hotels, food and activities with clear breakdowns." },
  { icon: Map, title: "Live Map Tracking", desc: "Follow your route in real-time with day-by-day destinations." },
  { icon: Calendar, title: "Itinerary Builder", desc: "Organize cities, dates and daily activities on a clean timeline." },
];

const testimonials = [
  { name: "Aarav S.", role: "Solo traveler", quote: "The AI planned my 10-day Japan trip in minutes. Saved me hours of research." },
  { name: "Priya M.", role: "Family of four", quote: "Budget tracking and the daily timeline made our Bali trip stress-free." },
  { name: "Liam K.", role: "Photographer", quote: "Loved the photo-spot suggestions. Found views I would never have discovered." },
];

function Index() {
  const [query, setQuery] = useState("");
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 opacity-30">
          <img src={hero} alt="" className="h-full w-full object-cover" width={1600} height={1024} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> AI travel planning, simplified
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Plan smarter trips,<br />travel with ease.
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Traveloop helps you discover destinations, build day-by-day itineraries, manage budgets and book local rides — all powered by AI.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <div className="flex w-full items-center gap-2 rounded-xl border border-border bg-card p-1.5 shadow-soft sm:max-w-md">
                <div className="pl-3 text-muted-foreground">
                  <Search className="h-4 w-4" />
                </div>
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Where to next?"
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0"
                />
                <Button asChild className="shrink-0">
                  <Link to="/planner">Plan Your Trip</Link>
                </Button>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-mint" /> 4.9 average rating</span>
              <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-primary" /> 25k+ travelers</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-primary" /> 120+ countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Travel categories</h2>
            <p className="mt-1 text-sm text-muted-foreground">Find inspiration by the way you love to travel.</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((c) => (
            <Card
              key={c.label}
              className="flex flex-col items-center justify-center gap-2 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-soft"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-primary">
                <c.icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium">{c.label}</span>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured destinations */}
      <section className="bg-muted/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Featured destinations</h2>
              <p className="mt-1 text-sm text-muted-foreground">Hand-picked places loved by Traveloop travelers.</p>
            </div>
            <Link to="/destinations" className="hidden text-sm font-medium text-primary hover:underline sm:inline-flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((d) => (
              <Card key={d.name} className="group overflow-hidden p-0 transition-all hover:-translate-y-0.5 hover:shadow-card">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={d.img}
                    alt={d.name}
                    loading="lazy"
                    width={800}
                    height={1024}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-mint-soft px-2 py-0.5 text-[11px] font-medium text-mint">{d.tag}</span>
                    <span className="text-xs text-muted-foreground">{d.price}</span>
                  </div>
                  <h3 className="mt-2 text-base font-semibold">{d.name}</h3>
                  <Link to="/planner" className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                    Plan a trip <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold sm:text-3xl">Everything you need to travel smart</h2>
          <p className="mt-2 text-sm text-muted-foreground">From planning to packing, Traveloop is your travel companion.</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Card key={f.title} className="p-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold sm:text-3xl text-center">Loved by travelers worldwide</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="p-6">
                <div className="flex gap-0.5 text-mint">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-sm text-foreground">"{t.quote}"</p>
                <div className="mt-4">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="overflow-hidden rounded-3xl bg-gradient-brand p-8 text-brand-foreground sm:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Your next adventure starts here</h2>
              <p className="mt-2 max-w-xl text-sm opacity-90">
                Sign up free and let Traveloop's AI create a personalized itinerary in seconds.
              </p>
            </div>
            <Button asChild variant="secondary" size="lg">
              <Link to="/signup">Start planning free</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
