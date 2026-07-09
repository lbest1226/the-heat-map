import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { RESTAURANTS, heatLevelToLabel } from "@/data/restaurants";

export default function RestaurantDetail() {
  const { id } = useParams();
  const restaurant = RESTAURANTS.find((r) => String(r.rank) === String(id));
  const [lineDensity, setLineDensity] = useState(50);

  // Simulate live line-wait heatmap density
  useEffect(() => {
    const interval = setInterval(() => {
      setLineDensity((prev) => {
        const next = prev + (Math.random() - 0.5) * 15;
        return Math.max(20, Math.min(95, next));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: "#0D0D0D" }}>
        <h1 className="display-large" style={{ color: "#FF4D00" }}>404°</h1>
        <p className="label-mono mt-4" style={{ color: "rgba(242,232,207,0.5)" }}>THIS SPOT BURNED DOWN OR NEVER EXISTED</p>
        <Link to="/" className="mt-8 label-mono" style={{ color: "#FF4D00" }}>← BACK TO THE HEAT MAP</Link>
      </div>
    );
  }

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${restaurant.lat},${restaurant.lng}`;
  const heatPct = (restaurant.heat_level / 10) * 100;

  return (
    <div className="min-h-screen" style={{ background: "#0D0D0D" }}>
      {/* Top bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 border-b" style={{ background: "rgba(13,13,13,0.95)", borderColor: "#333", backdropFilter: "blur(10px)" }}>
        <Link to="/" className="label-mono hover:text-cayenne transition-colors" style={{ color: "rgba(242,232,207,0.7)" }}>
          ← THE HEAT MAP
        </Link>
        <span className="label-mono hidden sm:inline" style={{ color: "#FF4D00" }}>
          № {String(restaurant.rank).padStart(2, "0")} / 07
        </span>
      </div>

      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-57px)]">
        {/* Left: macro image (sticky) */}
        <div className="relative lg:sticky lg:top-[57px] lg:h-[calc(100vh-57px)] h-[50vh] overflow-hidden">
          <img
            src={restaurant.image_url}
            alt={`${restaurant.name} signature dish — macro`}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.8) contrast(1.15) saturate(1.1)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,13,13,0.3) 0%, transparent 30%, rgba(13,13,13,0.8) 100%)" }} />

          {/* Floating heat readout */}
          <div className="absolute top-6 right-6 text-right">
            <span className="label-mono block" style={{ color: "rgba(242,232,207,0.5)" }}>HEAT INDEX</span>
            <span className="font-display text-6xl md:text-7xl leading-none" style={{ color: "#FF4D00" }}>{restaurant.heat_level}</span>
            <span className="font-display text-2xl" style={{ color: "rgba(242,232,207,0.5)" }}>/10</span>
          </div>

          {/* Bottom name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <span className="label-mono" style={{ color: "#FF4D00" }}>{restaurant.established}</span>
            <h1 className="font-display text-3xl md:text-5xl mt-2 leading-[0.9]" style={{ color: "#F2E8CF" }}>
              {restaurant.name.toUpperCase()}
            </h1>
          </div>
        </div>

        {/* Right: scrollable technical brief */}
        <div className="p-6 md:p-10 lg:p-14 space-y-12">
          {/* Meta header */}
          <div>
            <span className="label-mono" style={{ color: "#FF4D00" }}>{heatLevelToLabel(restaurant.heat_level)}</span>
            <div className="grid grid-cols-2 gap-px mt-4" style={{ background: "#333" }}>
              {[
                { k: "NEIGHBORHOOD", v: restaurant.neighborhood },
                { k: "SCOVILLE", v: restaurant.scoville_range },
                { k: "SIGNATURE", v: restaurant.signature_dish },
                { k: "WAIT TIME", v: restaurant.wait_time },
              ].map((item) => (
                <div key={item.k} className="p-3" style={{ background: "#0D0D0D" }}>
                  <div className="label-mono mb-1" style={{ color: "rgba(242,232,207,0.4)" }}>{item.k}</div>
                  <div className="font-mono text-sm" style={{ color: "#F2E8CF" }}>{item.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Heat bar */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="label-mono" style={{ color: "rgba(242,232,207,0.5)" }}>SCOVILLE FEROCITY</span>
              <span className="label-mono" style={{ color: "#FF4D00" }}>{restaurant.heat_level}/10</span>
            </div>
            <div className="h-3 relative" style={{ background: "#333" }}>
              <div className="h-full heat-shimmer" style={{ width: `${heatPct}%`, background: "linear-gradient(90deg, #F2E8CF, #FF4D00)" }} />
            </div>
          </div>

          {/* The brief */}
          <div>
            <h2 className="font-mono text-sm uppercase tracking-widest mb-3" style={{ color: "#FF4D00" }}>// THE BRIEF</h2>
            <p className="text-lg leading-relaxed" style={{ color: "rgba(242,232,207,0.85)" }}>{restaurant.description}</p>
          </div>

          {/* Spice profile */}
          <div>
            <h2 className="font-mono text-sm uppercase tracking-widest mb-3" style={{ color: "#FF4D00" }}>// SPICE PROFILE</h2>
            <p className="text-lg leading-relaxed" style={{ color: "rgba(242,232,207,0.85)" }}>{restaurant.spice_profile}</p>
          </div>

          {/* Bread-to-pickle ratio */}
          <div>
            <h2 className="font-mono text-sm uppercase tracking-widest mb-3" style={{ color: "#FF4D00" }}>// BREAD-TO-PICKLE RATIO</h2>
            <p className="text-lg leading-relaxed" style={{ color: "rgba(242,232,207,0.85)" }}>{restaurant.bread_pickle_ratio}</p>
          </div>

          {/* Live line-wait heatmap */}
          <div>
            <h2 className="font-mono text-sm uppercase tracking-widest mb-3" style={{ color: "#FF4D00" }}>// LINE-WAIT HEATMAP</h2>
            <p className="text-sm mb-4" style={{ color: "rgba(242,232,207,0.5)" }}>
              Live crowd density — thermal imaging simulation. Updates every 2 seconds.
            </p>
            <div className="grid grid-cols-10 gap-1 p-4" style={{ background: "#1a1a1a", border: "1px solid #333" }}>
              {Array.from({ length: 50 }).map((_, i) => {
                const cellHeat = Math.max(0, Math.min(1, (lineDensity / 100) + (Math.random() - 0.5) * 0.4));
                const intensity = Math.floor(cellHeat * 255);
                return (
                  <div
                    key={i}
                    className="aspect-square transition-all duration-1000"
                    style={{
                      background: cellHeat > 0.1 ? `rgba(${255 - intensity + 50}, ${Math.floor(intensity * 0.3)}, 0, ${cellHeat})` : "#0D0D0D",
                      boxShadow: cellHeat > 0.7 ? `0 0 6px rgba(255,77,0,${cellHeat})` : "none",
                    }}
                  />
                );
              })}
            </div>
            <div className="flex justify-between mt-3">
              <span className="label-mono" style={{ color: "rgba(242,232,207,0.4)" }}>DENSITY: {Math.round(lineDensity)}%</span>
              <span className="label-mono" style={{ color: restaurant.wait_time.includes("90") ? "#FF4D00" : "rgba(242,232,207,0.4)" }}>
                {lineDensity > 70 ? "PEAK SURGE" : lineDensity > 45 ? "MODERATE" : "CLEAR PATH"}
              </span>
            </div>
          </div>

          {/* Address + directions */}
          <div className="pt-6 border-t" style={{ borderColor: "#333" }}>
            <span className="label-mono block mb-2" style={{ color: "rgba(242,232,207,0.5)" }}>LOCATION</span>
            <p className="font-mono text-sm mb-6" style={{ color: "#F2E8CF" }}>{restaurant.address}</p>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-5 cayenne-glow group relative overflow-hidden"
              style={{ background: "#FF4D00", color: "#0D0D0D" }}
            >
              <span className="absolute inset-0 perforated opacity-10" />
              <span className="font-display text-lg md:text-xl relative">GET DIRECTIONS →</span>
            </a>
          </div>

          {/* Back link */}
          <div className="pb-10">
            <Link to="/" className="label-mono hover:text-cayenne transition-colors" style={{ color: "rgba(242,232,207,0.6)" }}>
              ← BACK TO THE ATLAS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}