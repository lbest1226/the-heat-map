import React from "react";
import { Link } from "react-router-dom";
import { heatLevelToLabel } from "@/data/restaurants";

export default function RestaurantCard({ restaurant, index }) {
  const heatPct = restaurant.heat_level / 10 * 100;

  return (
    <Link
      to={`/spot/${restaurant.rank}`}
      className="group block relative overflow-hidden transition-all duration-500 hover:-translate-y-1"
      style={{ background: "rgba(13,13,13,0.6)", border: "1px solid #333" }}>
      
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={restaurant.image_url}
          alt={`${restaurant.name} signature dish`}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:saturate-50"
          style={{ filter: "brightness(0.85) contrast(1.1)" }} />
        
        

        {/* Rank number */}
        <span className="absolute top-4 left-4 label-mono" style={{ color: "rgba(242,232,207,0.6)" }}>
          № {String(restaurant.rank).padStart(2, "0")}
        </span>

        {/* Heat level badge */}
        <div className="absolute top-4 right-4 flex flex-col items-end">
          <span className="label-mono text-[0.65rem] mb-1" style={{ color: "rgba(242,232,207,0.5)" }}>
            HEAT
          </span>
          <span className="font-display text-3xl leading-none" style={{ color: "#FF4D00" }}>
            {restaurant.heat_level}
          </span>
        </div>

        {/* Heat bar at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "#333" }}>
          <div
            className="h-full transition-all duration-500 group-hover:brightness-125"
            style={{ width: `${heatPct}%`, background: "linear-gradient(90deg, #F2E8CF, #FF4D00)" }} />
          
        </div>
      </div>

      {/* Info */}
      <div className="p-5 perforated-light">
        <span className="label-mono" style={{ color: "#FF4D00" }}>
          {heatLevelToLabel(restaurant.heat_level)}
        </span>
        <h3 className="font-display text-xl mt-2 mb-1 leading-tight" style={{ color: "#F2E8CF" }}>
          {restaurant.name.toUpperCase()}
        </h3>
        <div className="font-mono text-sm space-y-1" style={{ color: "rgba(242,232,207,0.5)" }}>
          <p>{restaurant.neighborhood.toUpperCase()}</p>
          <p className="flex items-center justify-between">
            <span>FLAVOR {restaurant.overall_flavor}/10</span>
            <span>SMOKE {restaurant.smoke_level}/10</span>
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-dashed" style={{ borderColor: "#333" }}>
          <span className="label-mono transition-colors group-hover:text-cayenne flex items-center gap-2" style={{ color: "rgba(242,232,207,0.6)" }}>
            VIEW BIRD SPECS
            <span style={{ color: "#FF4D00" }}>→</span>
          </span>
        </div>
      </div>
    </Link>);

}