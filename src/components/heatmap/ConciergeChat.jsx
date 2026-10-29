import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Flame, X, Send, Loader2 } from "lucide-react";
import MessageBubble from "./MessageBubble";

const AGENT_NAME = "heat_concierge";

const SUGGESTIONS = [
  "Plan a 3-stop heat tour starting in Downtown",
  "Where's the original Prince's and how do I get there?",
  "Mild-ish spot with a short wait for 4 people",
  "What should I order at Hattie B's?",
];

export default function ConciergeChat({ open, setOpen }) {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Create / resume a conversation when first opened
  useEffect(() => {
    if (!open || conversation) return;
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const existing = await base44.agents.listConversations({ agent_name: AGENT_NAME });
        let conv = Array.isArray(existing) && existing.length ? existing[0] : null;
        if (!conv) {
          conv = await base44.agents.createConversation({
            agent_name: AGENT_NAME,
            metadata: { name: "Hot Chicken Assistant", description: "Route planning & dining advice" },
          });
        }
        if (cancelled) return;
        setConversation(conv);
        setMessages(conv.messages || []);
        setError(null);
      } catch (e) {
        if (cancelled) return;
        setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, conversation]);

  // Subscribe to streamed updates
  useEffect(() => {
    if (!conversation) return;
    const unsubscribe = base44.agents.subscribeToConversation(conversation.id, (data) => {
      const msgs = data.messages || [];
      setMessages(msgs);
      if (msgs.length > 0 && msgs[msgs.length - 1].role === "assistant") {
        setSending(false);
      }
    });
    return () => unsubscribe();
  }, [conversation]);

  // Auto-scroll on new content
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, sending]);

  // Focus input when panel opens and is ready
  useEffect(() => {
    if (open && inputRef.current && !loading && !error) inputRef.current.focus();
  }, [open, loading, error]);

  const handleSend = async (text) => {
    const content = (text ?? input).trim();
    if (!content || !conversation || sending) return;
    setInput("");
    setSending(true);
    setMessages((m) => [...m, { role: "user", content }]);
    try {
      await base44.agents.addMessage(conversation, { role: "user", content });
    } catch (e) {
      setSending(false);
      setError(e);
    }
  };

  const thinking =
    sending && (messages.length === 0 || messages[messages.length - 1].role === "user");

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 flex items-center gap-2.5 rounded-2xl px-4 md:px-5 py-3.5 cayenne-glow transition-transform hover:-translate-y-0.5"
        style={{ background: "#FF4D00", color: "#0D0D0D" }}
        aria-label="Open the Hot Chicken Assistant"
      >
        <Flame size={22} />
        <span className="font-display text-sm md:text-base tracking-tight uppercase leading-none">
          {open ? "Close" : "Assistant"}
        </span>
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-20 right-3 md:right-6 z-50 flex flex-col w-[calc(100vw-1.5rem)] max-w-md h-[72vh] max-h-[620px] overflow-hidden rounded-2xl"
          style={{ background: "#0D0D0D", border: "1px solid #FF4D00", boxShadow: "0 0 40px rgba(255,77,0,0.25)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #333" }}>
            <div className="flex items-center gap-2.5">
              <span
                className="flex items-center justify-center w-7 h-7 rounded-lg"
                style={{ background: "#FF4D00", color: "#0D0D0D" }}
              >
                <Flame size={16} />
              </span>
              <div className="leading-tight">
                <div className="font-display text-sm uppercase tracking-tight" style={{ color: "#F2E8CF" }}>
                  Hot Chicken Assistant
                </div>
                <div className="label-mono text-[0.6rem]" style={{ color: "rgba(242,232,207,0.5)" }}>
                  ROUTE &amp; DINING ADVICE
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{ color: "rgba(242,232,207,0.6)" }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {error ? (
              <div className="text-center py-10 px-2">
                <p className="font-display text-lg uppercase" style={{ color: "#FF4D00" }}>
                  Line&rsquo;s down
                </p>
                <p className="label-mono mt-2" style={{ color: "rgba(242,232,207,0.5)" }}>
                  Sign in to chat with the concierge.
                </p>
                <Link
                  to="/login"
                  className="inline-block mt-4 rounded-lg px-5 py-2.5 font-display text-sm uppercase"
                  style={{ background: "#FF4D00", color: "#0D0D0D" }}
                >
                  Sign in
                </Link>
              </div>
            ) : loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="animate-spin" size={22} style={{ color: "#FF4D00" }} />
              </div>
            ) : messages.length === 0 ? (
              <div className="space-y-4">
                <div className="max-w-[90%]">
                  <div className="text-sm leading-relaxed" style={{ color: "#F2E8CF" }}>
                    <p className="my-1">
                      Howdy — I&rsquo;m your <strong>Hot Chicken Assistant</strong>. Tell me where you are and how much burn
                      you can handle, and I&rsquo;ll route you to the right bird.
                    </p>
                    <p className="my-1" style={{ color: "rgba(242,232,207,0.6)" }}>
                      Try one of these:
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSend(s)}
                      className="text-left text-sm rounded-xl px-3.5 py-2.5 transition-colors hover:brightness-125"
                      style={{ background: "rgba(242,232,207,0.05)", border: "1px solid #333", color: "#F2E8CF" }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((m, i) => (
                  <MessageBubble key={i} message={m} />
                ))}
                {thinking && (
                  <div className="flex justify-start">
                    <div
                      className="flex items-center gap-2 rounded-2xl px-3.5 py-2.5"
                      style={{ background: "rgba(242,232,207,0.06)" }}
                    >
                      <Loader2 size={14} className="animate-spin" style={{ color: "#FF4D00" }} />
                      <span className="label-mono text-[0.65rem]" style={{ color: "rgba(242,232,207,0.6)" }}>
                        ASSISTANT IS THINKING
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Input */}
          {!error && !loading && (
            <div className="px-3 py-3" style={{ borderTop: "1px solid #333" }}>
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  rows={1}
                  placeholder="Ask about a spot or plan a route…"
                  className="flex-1 resize-none rounded-xl px-3.5 py-2.5 text-sm outline-none max-h-28 overflow-auto"
                  style={{
                    background: "rgba(242,232,207,0.06)",
                    border: "1px solid #333",
                    color: "#F2E8CF",
                  }}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || sending}
                  className="flex items-center justify-center rounded-xl w-10 h-10 shrink-0 transition-opacity disabled:opacity-40"
                  style={{ background: "#FF4D00", color: "#0D0D0D" }}
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}