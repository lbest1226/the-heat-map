import React, { useState, useEffect } from "react";

export default function ScovilleAxis({ maxHeat = 10 }) {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? Math.min(scrolled / total, 1) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentHeat = Math.max(1, Math.round(1 + scrollPct * (maxHeat - 1)));

  return (
    <div className="hidden lg:flex fixed left-0 top-0 bottom-0 w-12 z-40 flex-col items-center justify-between py-8 pointer-events-none">
      {/* Top label */}
      <div className="label-mono text-cayenne -rotate-90 whitespace-nowrap origin-center mt-16" style={{ color: "#FF4D00" }}>
        SCOVILLE AXIS
      </div>

      {/* Track */}
      <div className="relative flex-1 w-px bg-cinder my-4 max-h-[50vh]" style={{ background: "#333" }}>
        {/* Filled portion */}
        <div
          className="absolute top-0 left-0 w-px"
          style={{
            height: `${scrollPct * 100}%`,
            background: "linear-gradient(to bottom, #FF4D00, #FF4D00)",
            boxShadow: "0 0 10px rgba(255,77,0,0.6)",
          }}
        />
        {/* Current marker */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
          style={{ top: `${scrollPct * 100}%`, transform: "translate(-50%, -50%)" }}
        >
          <div className="w-3 h-3 rounded-full" style={{ background: "#FF4D00", boxShadow: "0 0 12px rgba(255,77,0,0.8)" }} />
        </div>
      </div>

      {/* Heat readout */}
      <div className="label-mono text-buttermilk/50" style={{ color: "rgba(242,232,207,0.5)" }}>
        {String(currentHeat).padStart(2, "0")}/10
      </div>
    </div>
  );
}