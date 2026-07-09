import React, { useRef, useEffect, useState } from "react";
import { HERO_IMAGE } from "@/data/restaurants";

export default function Hero({ onExplore }) {
  const btnRef = useRef(null);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.18;
        const dy = (e.clientY - cy) * 0.18;
        setBtnPos({ x: dx, y: dy });
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between" style={{ background: "#0D0D0D" }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Nashville hot chicken wing glistening with cayenne oil"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.45) contrast(1.2) saturate(1.2)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,13,13,0.6) 0%, rgba(13,13,13,0.3) 40%, rgba(13,13,13,0.85) 100%)" }} />
      </div>

      {/* Magnetic button cursor follower */}
      <div
        className="absolute pointer-events-none z-30 w-4 h-4 rounded-full transition-transform duration-100"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: "translate(-50%, -50%)",
          background: "#FF4D00",
          boxShadow: "0 0 16px rgba(255,77,0,0.9)",
        }}
      />

      {/* Top metadata bar */}
      <div className="relative z-20 flex items-center justify-between px-6 md:px-16 pt-8">
        <span className="label-mono" style={{ color: "#F2E8CF" }}>
          HEAT MAP NASHVILLE
        </span>
        <span className="label-mono hidden md:inline" style={{ color: "rgba(242,232,207,0.5)" }}>
          NASHVILLE · 36.1627°N 86.7816°W
        </span>
        <span className="label-mono" style={{ color: "#FF4D00" }}>
          EST. 1930
        </span>
      </div>

      {/* Split headline */}
      <div className="relative z-20 px-6 md:px-16 lg:px-20 flex-1 flex flex-col justify-center py-16">
        <div className="flex items-start gap-4">
          <span className="label-mono mt-4 hidden sm:block" style={{ color: "rgba(242,232,207,0.4)" }}>
            01 / IGNITION
          </span>
          <h1 className="display-mega" style={{ color: "#F2E8CF" }}>
            HEAT
          </h1>
        </div>
        <div className="flex justify-end items-end gap-4 mt-auto">
          <h1 className="display-mega" style={{ color: "#F2E8CF", WebkitTextStroke: "2px #FF4D00", color: "transparent" }}>
            MAP
          </h1>
        </div>
      </div>

      {/* Bottom row: MAP + magnetic explore button */}
      <div className="relative z-20 px-6 md:px-16 lg:px-20 pb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <span className="label-mono block mb-2" style={{ color: "rgba(242,232,207,0.5)" }}>
            ↓ SCROLL TO IGNITE
          </span>
          <h2 className="display-large" style={{ color: "#FF4D00" }}>
            NASHVILLE
          </h2>
          <p className="label-mono mt-3 max-w-xs" style={{ color: "rgba(242,232,207,0.5)" }}>
            A Nashvillian's guide to hot chicken
          </p>
        </div>

        <button
          ref={btnRef}
          onClick={onExplore}
          className="group relative flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full border-2 transition-all duration-200 hover:scale-105"
          style={{
            borderColor: "#FF4D00",
            background: "rgba(13,13,13,0.5)",
            transform: `translate(${btnPos.x}px, ${btnPos.y}px)`,
          }}
          aria-label="Explore the Scoville scale"
        >
          <span className="absolute inset-0 rounded-full perforated opacity-30" />
          <span className="flex flex-col items-center text-center px-2">
            <span className="label-mono" style={{ color: "#FF4D00" }}>
              EXPLORE
            </span>
            <span className="label-mono text-[0.6rem] mt-1" style={{ color: "rgba(242,232,207,0.6)" }}>
              THE SCOVILLE
            </span>
          </span>
          {/* Rotating ring */}
          <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: "12s" }} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#FF4D00" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.5" />
          </svg>
        </button>
      </div>
    </section>
  );
}