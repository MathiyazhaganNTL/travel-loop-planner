import { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Msg = { role: "user" | "bot"; text: string };

const suggestions = [
  "Plan a 5-day Bali trip",
  "Budget tips for Europe",
  "Best food in Kyoto",
];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "Hi! I'm Loop, your travel assistant. Where would you like to go?" },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text: "Great choice! I can help you build an itinerary, estimate budget and suggest activities. Try the AI Planner for a full plan.",
        },
      ]);
    }, 700);
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-brand text-brand-foreground shadow-card transition-transform hover:scale-105"
        aria-label="Open chat"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[min(92vw,360px)] overflow-hidden rounded-2xl border border-border bg-card shadow-card animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2 border-b border-border bg-gradient-brand px-4 py-3 text-brand-foreground">
            <Sparkles className="h-4 w-4" />
            <div>
              <p className="text-sm font-semibold">Loop AI Assistant</p>
              <p className="text-[11px] opacity-80">Online · Replies instantly</p>
            </div>
          </div>
          <div className="max-h-80 space-y-2 overflow-y-auto p-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 border-t border-border p-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-border p-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your trip..."
              className="h-9"
            />
            <Button type="submit" size="icon" className="h-9 w-9">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
