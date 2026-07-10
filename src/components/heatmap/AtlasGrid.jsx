import React, { useState, useMemo } from "react";
import ScovilleSlider from "./ScovilleSlider";
import RestaurantCard from "./RestaurantCard";
import { RESTAURANTS } from "@/data/restaurants";
import MapBox from "./MapBox";

export default function AtlasGrid() {
  const [heatValue, setHeatValue] = useState(1);

  const filtered = useMemo(() => {
    return RESTAURANTS
      .filter((r) => r.heat_level >= heatValue)
      .sort((a, b) => a.rank - b.rank);
  }, [heatValue]);

  return (
    <section id="atlas" className="relative py-24 md:py-32 px-6 md:px-16 lg:px-24" style={{ background: "#0D0D0D" }}>
      {/* Section header */}
      <div className="mb-16 md:mb-20">
        <div className="flex items-baseline gap-4 mb-4">
          <span className="label-mono" style={{ color: "#FF4D00" }}>
            02 / THE ATLAS OF HEAT
          </span>
          <div className="flex-1 h-px" style={{ background: "#333" }} />
        </div>
        <MapBox />
        <p className="mt-6 max-w-2xl text-lg" style={{ color: "rgba(242,232,207,0.7)" }}>
          Every Nashville hot chicken shrine, ranked by Scoville ferocity. Drag the axis to raise the floor — only the spots that meet your threshold survive.
        </p>
      </div>

      {/* Slider */}
      <div className="mb-12 p-6 md:p-8" style={{ background: "rgba(242,232,207,0.03)", border: "1px solid #333" }}>
        <ScovilleSlider value={heatValue} onChange={setHeatValue} />
      </div>

      {/* Result count */}
      <div className="mb-8 flex items-center justify-between">
        <span className="label-mono" style={{ color: "rgba(242,232,207,0.5)" }}>
          {filtered.length} {filtered.length === 1 ? "SPOT" : "SPOTS"} SURVIVE THE CUT
        </span>
        <span className="label-mono" style={{ color: "#FF4D00" }}>
          MIN. HEAT {heatValue}/10
        </span>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((r, i) => (
            <div key={r.rank} className="thud-in" style={{ animationDelay: `${i * 0.08}s` }}>
              <RestaurantCard restaurant={r} index={i} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <p className="display-large" style={{ color: "#FF4D00" }}>
            TOO HOT.
          </p>
          <p className="label-mono mt-4" style={{ color: "rgba(242,232,207,0.5)" }}>
            NO SPOT SURVIVES THAT THRESHOLD. LOWER THE FLOOR.
          </p>
        </div>
      )}
    </section>
  );
}