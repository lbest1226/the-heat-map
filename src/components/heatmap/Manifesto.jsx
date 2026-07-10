import React from "react";
import { SCORCHED_BG } from "@/data/restaurants";

export default function Manifesto() {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden" style={{ background: "#0D0D0D" }}>
      {/* Background texture */}
      <div className="absolute inset-0 opacity-20">
        <img src={SCORCHED_BG} alt="" className="w-full h-full object-cover hidden" />
      </div>

      <div className="relative px-6 md:px-16 lg:px-24">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: label */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 hidden">
            <span className="label-mono" style={{ color: "#FF4D00" }}>
              03 / THE GOSPEL
            </span>
            <h2 className="display-large mt-6" style={{ color: "#F2E8CF" }}>
              CAST<br />IRON<br />BLOOD<br />LINE
            </h2>
          </div>

          {/* Right: body */}
          <div className="lg:col-span-7 lg:col-start-6 space-y-8">
            <p className="text-2xl md:text-3xl font-light leading-snug hidden" style={{ color: "#F2E8CF" }}>
              In 1930, a woman scorned took her revenge with a jar of cayenne. She scorched a plate of fried chicken meant to punish — and instead birthed a legend.
            </p>
            <p className="text-lg leading-relaxed hidden" style={{ color: "rgba(242,232,207,0.7)" }}>
              That chicken belonged to Thornton Prince. He loved it. He served it. And from a shack in East Nashville, a culinary bloodline was forged in grease and fire — one that would define a city for the next century.
            </p>
            <p className="text-lg leading-relaxed hidden" style={{ color: "rgba(242,232,207,0.7)" }}>
              The rules are unwritten but absolute: a bird brined, dredged, fried in cast iron, then lacquered in a paste of cayenne and lard. White bread beneath. Pickles atop. The bread exists to soak the oil-slick runoff; the pickles are the only relief from the scorch. There is no debate. There is only heat.
            </p>

            {/* Data clusters */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px mt-12" style={{ background: "#333" }}>
              {[
              { k: "ORIGIN YEAR", v: "1930" },
              { k: "SCOVILLE CEILING", v: "400K+" },
              { k: "SPOTS ARCHIVED", v: "07" },
              { k: "CORE SPICE", v: "CAYENNE" },
              { k: "VESSEL", v: "CAST IRON" },
              { k: "RELIEF", v: "PICKLE" }].
              map((item) =>
              <div key={item.k} className="p-4 hidden" style={{ background: "#0D0D0D" }}>
                  <div className="label-mono mb-2" style={{ color: "rgba(242,232,207,0.4)" }}>
                    {item.k}
                  </div>
                  <div className="font-display text-lg" style={{ color: "#FF4D00" }}>
                    {item.v}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}