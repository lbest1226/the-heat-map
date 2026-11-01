import React from "react";

export default function SiteFooter() {
  return (
    <footer className="relative pt-20 pb-12 px-6 md:px-16 lg:px-24" style={{ background: "#0D0D0D", borderTop: "1px solid #333" }}>
      <div className="grid md:grid-cols-3 gap-12 mb-16">
        {/* Brand */}
        <div>
          <h3 className="display-large leading-none" style={{ color: "#F2E8CF" }}>
            FIND<br /><span style={{ color: "#FF4D00" }}>HOT</span><br />CHICKEN
          </h3>
          <p className="label-mono mt-4 max-w-xs" style={{ color: "rgba(242,232,207,0.5)" }}>
            A Nashvillian's guide to hot chicken
          </p>
        </div>

        {/* Navigate */}
        








        

        {/* Contact */}
        <div>
          <span className="label-mono block mb-4" style={{ color: "#FF4D00" }}>
            TRANSMISSION
          </span>
          <ul className="space-y-2 font-mono text-sm" style={{ color: "rgba(242,232,207,0.7)" }}>
            <li>
              

              
            </li>
            <li>Nashville, TN 37203</li>
            <li>36.1627°N · 86.7816°W</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t" style={{ borderColor: "#333" }}>
        <span className="label-mono" style={{ color: "rgba(242,232,207,0.4)" }}>
          © {new Date().getFullYear()} findHotChicken
        </span>
        <span className="label-mono" style={{ color: "rgba(242,232,207,0.4)" }}>
          BUILT ON GREASE & FIRE
        </span>
      </div>
    </footer>);

}