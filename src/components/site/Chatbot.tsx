import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    
    const newMessages: Msg[] = [...messages, { role: "user", text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const systemPrompt = `You are Loop, the AI travel assistant for the Traveloop website. Traveloop helps users plan smarter trips, discover destinations, build day-by-day itineraries, manage budgets, and track their routes on a live map. The current user interacting with you is ${user ? user.displayName || user.email : "a guest user"}. Use your comprehensive knowledge to answer their travel-related questions, suggest itineraries, and guide them through the Traveloop platform features in a professional and neat manner.`;

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API key is missing. Please check your .env file.");
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          contents: newMessages
            .filter((m, i) => !(i === 0 && m.role === "bot"))
            .map((m) => ({
            role: m.role === "bot" ? "model" : "user",
            parts: [{ text: m.text }]
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with Gemini API");
      }

      const data = await response.json();
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
      
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text: botReply,
        },
      ]);
    } catch (error: any) {
      console.error("Chat API Error:", error);
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text: `I am having trouble connecting to the Gemini API: ${error.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
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
        <div className="fixed bottom-24 right-5 z-50 flex h-[450px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2 border-b border-border bg-gradient-brand px-4 py-3 text-brand-foreground shrink-0">
            <Sparkles className="h-4 w-4" />
            <div>
              <p className="text-sm font-semibold">Loop AI Assistant</p>
              <p className="text-[11px] opacity-80">Powered by Gemini AI</p>
            </div>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
                  m.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-secondary text-foreground rounded-bl-sm"
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="max-w-[85%] rounded-2xl bg-secondary text-foreground px-4 py-2 text-sm rounded-bl-sm w-fit">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex flex-wrap gap-1.5 border-t border-border p-3 shrink-0 bg-muted/30">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                disabled={loading}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground disabled:opacity-50"
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
            className="flex items-center gap-2 border-t border-border p-3 shrink-0"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your trip..."
              className="h-10 rounded-full"
              disabled={loading}
            />
            <Button type="submit" size="icon" className="h-10 w-10 shrink-0 rounded-full" disabled={loading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
