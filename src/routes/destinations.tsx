import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import bali from "@/assets/dest-bali.jpg";
import santorini from "@/assets/dest-santorini.jpg";
import kyoto from "@/assets/dest-kyoto.jpg";
import swiss from "@/assets/dest-swiss.jpg";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations — Traveloop" },
      { name: "description", content: "Explore curated travel destinations around the world." },
    ],
  }),
  component: Destinations,
});

const items = [
  { name: "Bali, Indonesia", tag: "Tropical", price: "From $620", img: bali, desc: "Rice terraces, beaches and rich culture." },
  { name: "Santorini, Greece", tag: "Coastal", price: "From $890", img: santorini, desc: "Iconic white villages and sunsets." },
  { name: "Kyoto, Japan", tag: "Cultural", price: "From $740", img: kyoto, desc: "Temples, gardens and bamboo forests." },
  { name: "Swiss Alps", tag: "Mountains", price: "From $980", img: swiss, desc: "Alpine lakes and mountain hiking." },
];

function Destinations() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold sm:text-4xl">Discover destinations</h1>
          <p className="mt-2 text-muted-foreground">Curated places to inspire your next trip.</p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((d) => (
            <Card key={d.name} className="group overflow-hidden p-0 transition-all hover:-translate-y-0.5 hover:shadow-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={d.img} alt={d.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-mint-soft px-2 py-0.5 text-[11px] font-medium text-mint">{d.tag}</span>
                  <span className="text-xs text-muted-foreground">{d.price}</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold">{d.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d.desc}</p>
                <Button asChild variant="ghost" size="sm" className="mt-3 px-0">
                  <Link to="/planner">Plan a trip <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </Layout>
  );
}
