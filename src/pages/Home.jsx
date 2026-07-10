import React from "react";
import Hero from "@/components/heatmap/Hero";
import ScovilleAxis from "@/components/heatmap/ScovilleAxis";
import AtlasGrid from "@/components/heatmap/AtlasGrid";
import Manifesto from "@/components/heatmap/Manifesto";
import HeatMapSection from "@/components/heatmap/HeatMapSection";
import SiteFooter from "@/components/heatmap/SiteFooter";
import ConciergeChat from "@/components/heatmap/ConciergeChat";

export default function Home() {
  const handleExplore = () => {
    document.getElementById("atlas")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="top" className="relative">
      <ScovilleAxis maxHeat={10} />
      <div className="lg:pl-12">
        <Hero onExplore={handleExplore} />
        <AtlasGrid />
        <Manifesto />
        <HeatMapSection />
        <SiteFooter />
      </div>
      <ConciergeChat />
    </div>
  );
}