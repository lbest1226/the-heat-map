import React from "react";

export default function SiteFooter() {
  return (
    <footer className="relative pt-20 pb-12 px-6 md:px-16 lg:px-24" style={{ background: "#0D0D0D", borderTop: "1px solid #333" }}>
      <div className="grid md:grid-cols-3 gap-12 mb-16">
        {/* Brand */}
        <div>
          <h3 className="display-large leading-none" style={{ color: "#F2E8CF" }}>
            THE<br/><span style={{ color: "#FF4D00" }}>HEAT</span><br/>MAP
          </h3>
          <p className="mt-4 text-sm max-w-xs" style={{ color: "rgba(242,232,207,0.5)" }}>
            A scorched archive of Nashville's cast-iron legacy. Built for the heat-seekers.
          </p>
        </div>

        {/* Navigate */}
        <div>
          <span className="label-mono block mb-4" style={{ color: "#FF4D00" }}>
            NAVIGATE
          </span>
          <ul className="space-y-2">
            <li><a href="#top" className="text-sm hover:text-cayenne transition-colors" style={{ color: "rgba(242,232,207,0.7)" }}>Ignition</a></li>
            <li><a href="#atlas" className="text-sm hover:text-cayenne transition-colors" style={{ color: "rgba(242,232,207,0.7)" }}>Atlas of Heat</a></li>
            <li><a href="#map" className="text-sm hover:text-cayenne transition-colors" style={{ color: "rgba(242,232,207,0.7)" }}>Final Destination</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <span className="label-mono block mb-4" style={{ color: "#FF4D00" }}>
            TRANSMISSION
          </span>
          <ul className="space-y-2 font-mono text-sm" style={{ color: "rgba(242,232,207,0.7)" }}>
            <li>
              <a href="mailto:hello@theheatmap.co" className="hover:text-cayenne transition-colors">
                hello@theheatmap.co
              </a>
            </li>
            <li>Nashville, TN 37203</li>
            <li>36.1627°N · 86.7816°W</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t" style={{ borderColor: "#333" }}>
        <span className="label-mono" style={{ color: "rgba(242,232,207,0.4)" }}>
          © {new Date().getFullYear()} THE HEAT MAP · NASHVILLE
        </span>
        <span className="label-mono" style={{ color: "rgba(242,232,207,0.4)" }}>
          BUILT ON GREASE & FIRE
        </span>
      </div>
    </footer>
  );
}