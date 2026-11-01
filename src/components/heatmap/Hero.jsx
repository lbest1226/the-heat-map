import React from "react";

export default function Hero({ onTalk }) {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ background: "transparent" }}>
      
      {/* Scrim over the collage background for readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
          "linear-gradient(180deg, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.32) 40%, rgba(13,13,13,0.88) 100%)"
        }} />
      

      <div className="relative z-20 px-6 max-w-5xl mx-auto text-center flex flex-col items-center">
        

        

        <h1
          className="font-display leading-[0.95]"
          style={{ color: "#F2E8CF", fontSize: "clamp(2.25rem, 6vw, 5.5rem)", letterSpacing: "-0.03em" }}>
          
          findHotChicken
        </h1>

        <p
          className="mt-5 text-base md:text-xl"
          style={{ color: "rgba(242,232,207,0.75)", fontFamily: "'JetBrains Mono', monospace" }}>
          
          A Nashvillian's guide to hot chicken.
        </p>

        <button
          onClick={onTalk}
          className="mt-10 flex items-center justify-center gap-3 rounded-2xl px-8 md:px-12 py-4 md:py-5 transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
          style={{ background: "#FF4D00", color: "#0D0D0D", boxShadow: "0 0 24px rgba(255,77,0,0.35)" }}
          aria-label="Talk to the Hot Chicken Assistant">
          
          <span className="font-display text-base md:text-lg tracking-tight">
            Talk to the Hot Chicken Assistant
          </span>
          <span className="text-xl md:text-2xl leading-none" aria-hidden="true">🔥</span>
        </button>
      </div>

      <div className="absolute bottom-6 left-0 right-0 text-center">
        <span className="label-mono" style={{ color: "rgba(242,232,207,0.4)" }}>
          ↓ SCROLL TO EXPLORE
        </span>
      </div>
    </section>);

}