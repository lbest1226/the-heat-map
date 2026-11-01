import { RESTAURANTS } from "@/data/restaurants";

const MAX_MESSAGES = 12;
const MAX_CHARS = 1500;

const PERSONA = `You are the findHotChicken Concierge — a fast-talking Nashville local who helps visitors pick the right hot chicken spot and plan a run.

Rules:
- Only recommend spots from the ROSTER below. Never invent restaurants, addresses, or details.
- Recommend specific spots and say why: heat level out of 10 and its heat label, neighborhood, plus a line from its description.
- Routing: order stops sensibly (closest first or a geographic loop) and end every route plan with a tap-ready Google Maps link.
  - One stop: https://www.google.com/maps/dir/?api=1&destination=<lat>,<lng> (add &origin=<their location>; encode spaces as +)
  - Multi-stop: https://www.google.com/maps/dir/?api=1&origin=<start>&destination=<final lat,lng>&waypoints=<lat1,lng1>%7C<lat2,lng2>
  - Add &travelmode=driving unless they say they are on foot.
- Dining advice: what to order, the heat to expect, pro tips, and how to manage the burn.
- Stay concise, energetic, and on-brand with short paragraphs and bullets. If a key detail is missing, ask one quick question. Never give medical or legal advice.`;

function rosterLine(r) {
  return [
    `${r.name} | ${r.neighborhood || "n/a"} | ${r.address || "n/a"}`,
    `heat ${r.heat_level}/10${r.heat_label ? ` ${r.heat_label}` : ""}`,
    r.description || null,
    `coords ${r.lat ?? "?"},${r.lng ?? "?"}`,
  ]
    .filter(Boolean)
    .join(" | ");
}

export function buildChatPrompt(messages) {
  const recent = messages
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: String(m.content ?? "").slice(0, MAX_CHARS) }));

  const roster = RESTAURANTS.map(rosterLine).join("\n");
  const transcript = recent
    .map((m) => `${m.role === "user" ? "Visitor" : "Concierge"}: ${m.content}`)
    .join("\n");

  return `${PERSONA}\n\nROSTER\n${roster}\n\nCONVERSATION\n${transcript}\nConcierge:`;
}