import React, { useState } from "react";
import Hero from "@/components/heatmap/Hero";
import ScovilleAxis from "@/components/heatmap/ScovilleAxis";
import AtlasGrid from "@/components/heatmap/AtlasGrid";
import Manifesto from "@/components/heatmap/Manifesto";
import HeatMapSection from "@/components/heatmap/HeatMapSection";
import SiteFooter from "@/components/heatmap/SiteFooter";
import ConciergeChat from "@/components/heatmap/ConciergeChat";
import CollageBackground from "@/components/heatmap/CollageBackground";
import { COLLAGE_IMAGES } from "@/data/restaurants";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div id="top" className="relative">
      <CollageBackground images={COLLAGE_IMAGES} />
      {/* Dark backdrop spanning the whole page */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.32) 40%, rgba(13,13,13,0.88) 100%)",
        }}
      />
      <ScovilleAxis maxHeat={10} />
      <div className="lg:pl-12 relative z-10">
        <Hero onTalk={() => setChatOpen(true)} />
        <AtlasGrid />
        <Manifesto />
        <HeatMapSection />
      </div>
      <SiteFooter />
      <ConciergeChat open={chatOpen} setOpen={setChatOpen} />
    </div>
  );
}