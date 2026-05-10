import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

import santorini from "@/assets/dest-santorini.jpg";
import kyoto from "@/assets/dest-kyoto.jpg";
import swiss from "@/assets/dest-swiss.jpg";

// travel1 images
import t1_img1 from "../../image/travel1/Discover the best islands to visit this summer! Explore tropical getaways, hidden island gems, and top beach destinations perfect for sun, sand, and sea adventures___Would you like variations focused on luxury, bud.jpg";
import t1_img2 from "../../image/travel1/So beautiful! 🌴🌊 Stunning views and perfect vibes for your dream escape_ ✨ Save this slice of paradise for your next getaway! 💬.jpg";
import t1_img3 from "../../image/travel1/download (2).jpg";

// travel2 images
import t2_img1 from "../../image/travel2/A stunning aerial photograph of Dubai's iconic skyline during golden hour, showcasing the towering B.jpg";
import t2_img2 from "../../image/travel2/Dubai in 4K 😍😍.jpg";
import t2_img3 from "../../image/travel2/It’s all about fascination in Dubai.jpg";
import t2_img4 from "../../image/travel2/Makhzan Limited - Retail Shopping in Not Specified Dubai _ Reviews & Ratings.jpg";
import t2_img5 from "../../image/travel2/dubai -Emirates.jpg";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations — Traveloop" },
      { name: "description", content: "Explore curated travel destinations around the world." },
    ],
  }),
  component: Destinations,
});

const travel1Images = [t1_img1, t1_img2, t1_img3];
const travel2Images = [t2_img1, t2_img2, t2_img3, t2_img4, t2_img5];

const items = [
  { name: "Bali, Indonesia", tag: "Tropical", price: "From $620", images: travel1Images, desc: "Rice terraces, beaches and rich culture." },
  { name: "Dubai, UAE", tag: "Luxury", price: "From $1200", images: travel2Images, desc: "Fascinating skyline and shopping." },
  { name: "Santorini, Greece", tag: "Coastal", price: "From $890", images: [santorini], desc: "Iconic white villages and sunsets." },
  { name: "Kyoto, Japan", tag: "Cultural", price: "From $740", images: [kyoto], desc: "Temples, gardens and bamboo forests." },
  { name: "Swiss Alps", tag: "Mountains", price: "From $980", images: [swiss], desc: "Alpine lakes and mountain hiking." },
];

function ImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-full w-full overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.1),0_0_15px_rgba(0,0,0,0.2)]">
      {images.map((img, index) => {
        let translateX = "100%";
        let zIndex = 0;

        if (index === currentIndex) {
          translateX = "0%";
          zIndex = 10;
        } else if (index === (currentIndex - 1 + images.length) % images.length) {
          translateX = "-100%";
          zIndex = 5;
        }

        return (
          <div
            key={index}
            className="absolute top-0 left-0 h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ transform: `translateX(${translateX})`, zIndex }}
          >
            <img src={img} alt="" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/5" />
          </div>
        );
      })}
    </div>
  );
}

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
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <ImageCarousel images={d.images} />
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
