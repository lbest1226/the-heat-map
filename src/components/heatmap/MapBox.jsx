import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { RESTAURANTS } from "@/data/restaurants";
import { Link } from "react-router-dom";

delete L.Icon.Default.prototype._get_iconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
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
    iconAnchor: [size / 2, size / 2],
  });
}

export default function MapBox() {
  return (
    <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-xl" style={{ border: "1px solid #333" }}>
      <MapContainer
        center={[36.175, -86.74]}
        zoom={12}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ background: "#0D0D0D" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution="cb1_4yvk_1_cdef53b92f222a82ec918257"
        />
        {RESTAURANTS.map((r) => (
          <Marker
            key={r.rank}
            position={[r.lat, r.lng]}
            icon={customIcon(r.heat_level)}
          >
            <Popup>
              <div style={{ minWidth: "160px" }}>
                <div style={{ color: "#FF4D00", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  № {String(r.rank).padStart(2, "0")} · HEAT {r.heat_level}/10
                </div>
                <div style={{ color: "#F2E8CF", fontWeight: "700", marginTop: "4px", fontSize: "0.9rem", lineHeight: "1.2" }}>
                  {r.name}
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
                    textDecoration: "none",
                  }}
                >
                  VIEW SPECS →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <span className="absolute top-3 right-3 z-[500] label-mono pointer-events-none" style={{ color: "rgba(242,232,207,0.6)" }}>
        findHotChicken · {RESTAURANTS.length} SPOTS
      </span>
    </div>
  );
}