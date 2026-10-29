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
      <ScovilleAxis maxHeat={10} />
      <div className="lg:pl-12 relative z-10">
        <Hero onTalk={() => setChatOpen(true)} />
        <AtlasGrid />
        <Manifesto />
        <HeatMapSection />
        <SiteFooter />
      </div>
      <ConciergeChat open={chatOpen} setOpen={setChatOpen} />
    </div>
  );
}