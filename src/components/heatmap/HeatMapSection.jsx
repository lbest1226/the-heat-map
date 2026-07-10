import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { RESTAURANTS } from "@/data/restaurants";
import { Link } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

function customIcon(heat) {
  const size = 20 + heat * 2;
  return L.divIcon({
    className: "custom-heat-marker",
    html: `<div style="
      width:${size}px;height:${size}px;border-radius:50%;
      background:#FF4D00;border:2px solid #0D0D0D;
      box-shadow:0 0 ${heat * 2}px rgba(255,77,0,0.8);
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
}

export default function HeatMapSection() {
  const [selected, setSelected] = useState(RESTAURANTS[0]);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`;

  return (
    <section id="map" className="relative" style={{ background: "#0D0D0D" }}>
      {/* Header */}
      <div className="py-20 md:py-24 px-6 md:px-16 lg:px-24 hidden">
        <div className="flex items-baseline gap-4 mb-4">
          <span className="label-mono" style={{ color: "#FF4D00" }}>
            04 / FINAL DESTINATION
          </span>
          <div className="flex-1 h-px" style={{ background: "#333" }} />
        </div>
        <h2 className="display-large max-w-4xl" style={{ color: "#F2E8CF" }}>
          THE GROUND TRUTH
        </h2>
        <p className="mt-6 max-w-2xl text-lg" style={{ color: "rgba(242,232,207,0.7)" }}>
          Digital discovery ends here. Tap a marker to lock your target — then get your boots on the ground.
        </p>
      </div>

      {/* Map */}
      <div className="relative h-[60vh] md:h-[70vh] w-full hidden" style={{ borderTop: "1px solid #333" }}>
        <MapContainer
          center={[36.175, -86.74]}
          zoom={12}
          className="w-full h-full"
          style={{ background: "#0D0D0D" }}>
          
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution="" />
          
          {RESTAURANTS.map((r) =>
          <Marker
            key={r.rank}
            position={[r.lat, r.lng]}
            icon={customIcon(r.heat_level)}
            eventHandlers={{ click: () => setSelected(r) }}>
            
              <Popup>
                <div style={{ minWidth: "160px" }}>
                  <div style={{ color: "#FF4D00", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    № {String(r.rank).padStart(2, "0")} · HEAT {r.heat_level}/10
                  </div>
                  <div style={{ color: "#F2E8CF", fontWeight: "700", marginTop: "4px", fontSize: "0.9rem", lineHeight: "1.2" }}>
                    {r.name}
                  </div>
                  <div style={{ color: "rgba(242,232,207,0.6)", fontSize: "0.7rem", marginTop: "4px" }}>
                    {r.neighborhood}
                  </div>
                  <Link
                  to={`/spot/${r.rank}`}
                  style={{
                    display: "inline-block",
                    marginTop: "8px",
                    color: "#FF4D00",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none"
                  }}>
                  
                    VIEW SPECS →
                  </Link>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>

        {/* Selected overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-[500] pointer-events-none">
          <div className="p-6 md:p-8" style={{ background: "linear-gradient(0deg, rgba(13,13,13,0.98) 0%, transparent 100%)" }}>
            <div className="max-w-3xl">
              <span className="label-mono" style={{ color: "rgba(242,232,207,0.5)" }}>
                LOCKED TARGET
              </span>
              <h3 className="font-display text-2xl md:text-4xl mt-2 leading-tight" style={{ color: "#F2E8CF" }}>
                {selected.name.toUpperCase()}
              </h3>
              <p className="font-mono text-sm mt-2" style={{ color: "rgba(242,232,207,0.6)" }}>
                {selected.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Directions bar */}
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block w-full text-center py-6 md:py-8 cayenne-glow group"
        style={{ background: "#FF4D00", color: "#0D0D0D" }}>
        
        <div className="absolute inset-0 perforated opacity-10" />
        <span className="font-display text-xl md:text-3xl tracking-tight relative">
          GET DIRECTIONS →
        </span>
        <span className="label-mono block mt-1 relative opacity-70">
          {selected.neighborhood.toUpperCase()} · {selected.wait_time.toUpperCase()}
        </span>
      </a>
    </section>);

}