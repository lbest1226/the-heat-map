import React from "react";
import { HEAT_TICKS } from "@/data/restaurants";

export default function ScovilleSlider({ value, onChange }) {
  const pct = ((value - 1) / 9) * 100;

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-4">
        <span className="label-mono" style={{ color: "rgba(242,232,207,0.5)" }}>
          DRAG TO CALIBRATE HEAT
        </span>
        <span className="label-mono text-2xl md:text-3xl font-display" style={{ color: "#FF4D00" }}>
          {HEAT_TICKS.find((t) => t.level >= value)?.label || "MAX"}
        </span>
      </div>

      <div className="relative h-2 mb-3" style={{ background: "#333" }}>
        {/* Track fill */}
        <div
          className="absolute top-0 left-0 h-full"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #F2E8CF 0%, #FF4D00 100%)",
            boxShadow: "0 0 12px rgba(255,77,0,0.5)",
          }}
        />
        {/* Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center"
          style={{ left: `${pct}%` }}
        >
          <div
            className="w-6 h-6 rotate-45 border-2"
            style={{ background: "#0D0D0D", borderColor: "#FF4D00", boxShadow: "0 0 16px rgba(255,77,0,0.6)" }}
          />
        </div>
        {/* Hidden native input for interaction */}
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="Scoville heat level filter"
        />
      </div>

      {/* Tick labels */}
      <div className="flex justify-between">
        {HEAT_TICKS.map((tick) => (
          <button
            key={tick.level}
            onClick={() => onChange(tick.level)}
            className="label-mono transition-colors hover:text-cayenne"
            style={{
              color: value >= tick.level ? "#FF4D00" : "rgba(242,232,207,0.35)",
            }}
          >
            {tick.label}
          </button>
        ))}
      </div>
    </div>
  );
}