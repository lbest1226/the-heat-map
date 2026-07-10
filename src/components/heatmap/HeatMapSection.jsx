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
      












      

      {/* Map */}
      
































































      

      {/* Directions bar */}
      













      
    </section>);

}