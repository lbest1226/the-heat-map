import React from "react";
import { useParams, Link } from "react-router-dom";
import { RESTAURANTS, heatLevelToLabel } from "@/data/restaurants";

function StatBar({ label, value }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="label-mono" style={{ color: "rgba(242,232,207,0.5)" }}>{label}</span>
        <span className="label-mono" style={{ color: "#FF4D00" }}>{value}/10</span>
      </div>
      <div className="h-3 relative" style={{ background: "#333" }}>
        <div
          className="h-full"
          style={{ width: `${(value / 10) * 100}%`, background: "linear-gradient(90deg, #F2E8CF, #FF4D00)" }}
        />
      </div>
    </div>
  );
}

export default function RestaurantDetail() {
  const { id } = useParams();
  const restaurant = RESTAURANTS.find((r) => String(r.rank) === String(id));

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: "#0D0D0D" }}>
        <h1 className="display-large" style={{ color: "#FF4D00" }}>404°</h1>
        <p className="label-mono mt-4" style={{ color: "rgba(242,232,207,0.5)" }}>THIS SPOT BURNED DOWN OR NEVER EXISTED</p>
        <Link to="/" className="mt-8 label-mono" style={{ color: "#FF4D00" }}>← BACK TO findHotChicken</Link>
      </div>
    );
  }

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${restaurant.lat},${restaurant.lng}`;
  const isUrl = /^https?:\/\//i.test(restaurant.address || "");
  const secondaryPhoto = restaurant.photos?.[1];

  return (
    <div className="min-h-screen" style={{ background: "#0D0D0D" }}>
      {/* Top bar */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 border-b"
        style={{ background: "rgba(13,13,13,0.95)", borderColor: "#333", backdropFilter: "blur(10px)" }}
      >
        <Link to="/" className="label-mono hover:text-cayenne transition-colors" style={{ color: "rgba(242,232,207,0.7)" }}>
          ← findHotChicken
        </Link>
        <span className="label-mono hidden sm:inline" style={{ color: "#FF4D00" }}>
          № {String(restaurant.rank).padStart(2, "0")} / {String(RESTAURANTS.length).padStart(2, "0")}
        </span>
      </div>

      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-57px)]">
        {/* Left: hero image */}
        <div className="relative lg:sticky lg:top-[57px] lg:h-[calc(100vh-57px)] h-[50vh] overflow-hidden">
          <img
            src={restaurant.image_url}
            alt={restaurant.name}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.85) contrast(1.1)" }}
            onError={(e) => { e.currentTarget.style.opacity = 0.15; }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,13,13,0.3) 0%, transparent 30%, rgba(13,13,13,0.85) 100%)" }} />

          <div className="absolute top-6 right-6 text-right">
            <span className="label-mono block" style={{ color: "rgba(242,232,207,0.5)" }}>SPICE LEVEL</span>
            <span className="font-display text-6xl md:text-7xl leading-none" style={{ color: "#FF4D00" }}>{restaurant.heat_level}</span>
            <span className="font-display text-2xl" style={{ color: "rgba(242,232,207,0.5)" }}>/10</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <span className="label-mono" style={{ color: "#FF4D00" }}>{restaurant.neighborhood}</span>
            <h1 className="font-display text-3xl md:text-5xl mt-2 leading-[0.9]" style={{ color: "#F2E8CF" }}>
              {restaurant.name.toUpperCase()}
            </h1>
          </div>
        </div>

        {/* Right: brief */}
        <div className="p-6 md:p-10 lg:p-14 space-y-10">
          <div>
            <span className="label-mono" style={{ color: "#FF4D00" }}>{heatLevelToLabel(restaurant.heat_level)}</span>
            <div className="grid grid-cols-2 gap-px mt-4" style={{ background: "#333" }}>
              {[
                { k: "NEIGHBORHOOD", v: restaurant.neighborhood },
                { k: "SPICE", v: `${restaurant.heat_level} / 10` },
                { k: "FLAVOR", v: `${restaurant.overall_flavor} / 10` },
                { k: "SMOKE", v: `${restaurant.smoke_level} / 10` },
              ].map((item) => (
                <div key={item.k} className="p-3" style={{ background: "#0D0D0D" }}>
                  <div className="label-mono mb-1" style={{ color: "rgba(242,232,207,0.4)" }}>{item.k}</div>
                  <div className="font-mono text-sm" style={{ color: "#F2E8CF" }}>{item.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <StatBar label="SPICE" value={restaurant.heat_level} />
            <StatBar label="OVERALL FLAVOR" value={restaurant.overall_flavor} />
            <StatBar label="SMOKE" value={restaurant.smoke_level} />
          </div>

          {restaurant.description && (
            <div>
              <h2 className="font-mono text-sm uppercase tracking-widest mb-3" style={{ color: "#FF4D00" }}>// WORTH KNOWING</h2>
              <p className="text-lg leading-relaxed" style={{ color: "rgba(242,232,207,0.85)" }}>{restaurant.description}</p>
            </div>
          )}

          {secondaryPhoto && (
            <div>
              <h2 className="font-mono text-sm uppercase tracking-widest mb-3" style={{ color: "#FF4D00" }}>// ANOTHER LOOK</h2>
              <img
                src={secondaryPhoto}
                alt={`${restaurant.name} — another look`}
                className="w-full h-64 object-cover"
                style={{ filter: "brightness(0.9) contrast(1.05)", border: "1px solid #333" }}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
          )}

          <div className="pt-6 border-t" style={{ borderColor: "#333" }}>
            <span className="label-mono block mb-2" style={{ color: "rgba(242,232,207,0.5)" }}>LOCATION</span>
            {isUrl ? (
              <a
                href={restaurant.address}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-5 cayenne-glow"
                style={{ background: "#FF4D00", color: "#0D0D0D" }}
              >
                <span className="font-display text-lg md:text-xl">FIND THEM ONLINE →</span>
              </a>
            ) : (
              <>
                <p className="font-mono text-sm mb-6" style={{ color: "#F2E8CF" }}>{restaurant.address}</p>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-5 cayenne-glow"
                  style={{ background: "#FF4D00", color: "#0D0D0D" }}
                >
                  <span className="font-display text-lg md:text-xl">GET DIRECTIONS →</span>
                </a>
              </>
            )}
          </div>

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