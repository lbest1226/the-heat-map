import React from "react";
import { HERO_IMAGE } from "@/data/restaurants";

export default function Hero({ onExplore }) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between" style={{ background: "#0D0D0D" }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Nashville hot chicken wing glistening with cayenne oil"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.45) contrast(1.2) saturate(1.2)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,13,13,0.6) 0%, rgba(13,13,13,0.3) 40%, rgba(13,13,13,0.85) 100%)" }} />
      </div>

      {/* Top metadata bar */}
      <div className="relative z-20 flex items-center justify-between px-6 md:px-16 pt-8">
        <span className="label-mono" style={{ color: "#F2E8CF" }}>
          HEAT MAP NASHVILLE
        </span>
        <span className="label-mono hidden md:inline" style={{ color: "rgba(242,232,207,0.5)" }}>
          NASHVILLE · 36.1627°N 86.7816°W
        </span>
        <span className="label-mono" style={{ color: "#FF4D00" }}>
          EST. 1930
        </span>
      </div>

      {/* Headline */}
      <div className="relative z-20 px-6 md:px-16 lg:px-20 flex-1 flex flex-col justify-center py-16">
        <span className="label-mono mb-3" style={{ color: "rgba(242,232,207,0.4)" }}>
          01 / IGNITION
        </span>
        <h1 className="display-mega" style={{ color: "#F2E8CF" }}>
          HEAT
        </h1>
        <h1 className="display-mega" style={{ color: "#F2E8CF", WebkitTextStroke: "2px #FF4D00", color: "transparent" }}>
          MAP
        </h1>
      </div>

      {/* Bottom row: MAP + magnetic explore button */}
      <div className="relative z-20 px-6 md:px-16 lg:px-20 pb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <span className="label-mono block mb-2" style={{ color: "rgba(242,232,207,0.5)" }}>
            ↓ SCROLL TO IGNITE
          </span>
          <h2 className="display-large" style={{ color: "#FF4D00" }}>
            NASHVILLE
          </h2>
          <p className="label-mono mt-3 max-w-xs" style={{ color: "rgba(242,232,207,0.5)" }}>
            A Nashvillian's guide to hot chicken
          </p>
        </div>

        <button
          onClick={onExplore}
          className="w-full md:w-auto flex items-center justify-center gap-3 rounded-2xl px-10 md:px-14 py-5 md:py-6 transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
          style={{
            background: "#FF4D00",
            color: "#0D0D0D",
            boxShadow: "0 0 24px rgba(255,77,0,0.35)",
          }}
          aria-label="Locate the heat"
        >
          <span className="font-display text-lg md:text-xl tracking-tight uppercase">
            Locate the Heat
          </span>
          <span className="text-2xl md:text-3xl leading-none" aria-hidden="true">🔥</span>
        </button>
      </div>
    </section>
  );
}