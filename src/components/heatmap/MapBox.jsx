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

export default function MapBox() {
  return null;


















































}