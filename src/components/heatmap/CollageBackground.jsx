import React from "react";

export default function CollageBackground({ images }) {
  const tiles = images && images.length ? images : [];

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="grid grid-cols-3 grid-rows-4 md:grid-cols-4 md:grid-rows-3 w-full h-full" style={{ gap: 2 }}>
        {tiles.map((src, i) => (
          <div key={i} className="overflow-hidden" style={{ background: "#141414" }}>
            <img
              src={src}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover"
              style={{ filter: "saturate(0.95) contrast(1.05)" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        ))}
      </div>
      {/* Dark wash so the collage reads as a background and content stays legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(13,13,13,0.7) 0%, rgba(13,13,13,0.64) 45%, rgba(13,13,13,0.82) 100%)",
        }}
      />
    </div>
  );
}