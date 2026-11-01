import React from "react";
import RestaurantCard from "./RestaurantCard";
import { RESTAURANTS } from "@/data/restaurants";
import MapBox from "./MapBox";

export default function AtlasGrid() {
  const spots = [...RESTAURANTS].sort((a, b) => a.rank - b.rank);

  return (
    <section id="atlas" className="relative py-24 md:py-32 px-6 md:px-16 lg:px-24" style={{ background: "transparent" }}>
      {/* Section header */}
      <div className="mb-16 md:mb-20">
        <div className="flex items-baseline gap-4 mb-4">
          

          
          <div className="flex-1 h-px" style={{ background: "#333" }} />
        </div>
        <MapBox />
        

        
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {spots.map((r, i) =>
        <div key={r.rank} className="thud-in" style={{ animationDelay: `${i * 0.08}s` }}>
            <RestaurantCard restaurant={r} index={i} />
          </div>
        )}
      </div>
    </section>);

}