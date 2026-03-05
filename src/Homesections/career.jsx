"use client";
import React, { useState, useEffect } from "react";

const careers = [
  { role: "Ethical Hacker", salary: "₹5–12 LPA", usd: "$18K–$45K", growth: "+22%", demand: 92, companies: ["HCL", "Wipro", "Infosys", "TCS", "IBM"] },
  { role: "Cybersecurity Analyst", salary: "₹6–15 LPA", usd: "$22K–$55K", growth: "+31%", demand: 97, companies: ["Deloitte", "PwC", "Accenture", "KPMG", "EY"] },
  { role: "SOC Analyst", salary: "₹4–8 LPA", usd: "$15K–$30K", growth: "+18%", demand: 85, companies: ["Microsoft", "Cisco", "IBM", "HP", "Dell"] },
  { role: "Network Security Engineer", salary: "₹5–10 LPA", usd: "$18K–$38K", growth: "+19%", demand: 78, companies: ["Cisco", "Juniper", "Fortinet", "Palo Alto", "Check Point"] },
  { role: "Penetration Tester", salary: "₹6–18 LPA", usd: "$22K–$65K", growth: "+35%", demand: 95, companies: ["Rapid7", "CrowdStrike", "Synack", "Bugcrowd", "HackerOne"] },
  { role: "Cyber Forensic Expert", salary: "₹7–20 LPA", usd: "$25K–$72K", growth: "+28%", demand: 88, companies: ["CBI", "NIA", "Interpol", "Cellebrite", "Magnet Forensics"] },
  { role: "Cloud Security Architect", salary: "₹15–35 LPA", usd: "$55K–$130K", growth: "+42%", demand: 99, companies: ["AWS", "Google", "Azure", "Zscaler", "Cloudflare"] },
  { role: "Bug Bounty Hunter", salary: "₹3–50 LPA", usd: "$10K–$200K+", growth: "+60%", demand: 90, companies: ["HackerOne", "Bugcrowd", "Intigriti", "Synack", "Meta"] },
];

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

function DemandBar({ value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 64, height: 4, background: "#1a1a1a", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ width: `${value}%`, height: "100%", background: "linear-gradient(90deg,#dc2626,#f87171)", borderRadius: 2 }} />
      </div>
      <span style={{ fontFamily: "monospace", fontSize: 10, color: "#555" }}>{value}%</span>
    </div>
  );
}

function MobileCard({ c, i }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{
        borderBottom: "1px solid #141414",
        borderLeft: `3px solid ${open ? "#dc2626" : "#1a1a1a"}`,
        padding: 16,
        cursor: "pointer",
        transition: "border-left-color 0.2s, background 0.2s",
        background: open ? "rgba(220,38,38,0.03)" : "transparent",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", color: open ? "#dc2626" : "#2a2a2a", fontSize: 18, flexShrink: 0 }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", color: "#fff", fontSize: 15, lineHeight: 1.2 }}>
            {c.role}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", color: "#ef4444", fontSize: 15 }}>{c.salary}</span>
          <span style={{ color: "#555", fontSize: 11, display: "inline-block", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
        </div>
      </div>

      {open && (
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontFamily: "monospace", fontSize: 9, color: "#444", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>USD</p>
              <p style={{ fontFamily: "monospace", fontSize: 11, color: "#666" }}>{c.usd}</p>
            </div>
            <div>
              <p style={{ fontFamily: "monospace", fontSize: 9, color: "#444", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>Growth</p>
              <span style={{ fontFamily: "monospace", fontSize: 10, color: "#4ade80", background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", padding: "2px 8px", borderRadius: 2 }}>{c.growth}</span>
            </div>
            <div>
              <p style={{ fontFamily: "monospace", fontSize: 9, color: "#444", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Demand</p>
              <DemandBar value={c.demand} />
            </div>
          </div>
          <div>
            <p style={{ fontFamily: "monospace", fontSize: 9, color: "#444", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Top Hirers</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {c.companies.map(co => (
                <span key={co} style={{ background: "#111", border: "1px solid #222", borderRadius: 2, padding: "2px 8px", fontFamily: "monospace", fontSize: 9, color: "#666" }}>{co}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CareerTable() {
  const width = useWindowWidth();
  const isMobile  = width < 520;
  const isTablet  = width >= 520 && width < 820;
  const isMedium  = width >= 820 && width < 1080;
  const isDesktop = width >= 1080;

  const cols = isTablet
    ? "2rem 1.4fr 1fr 0.6fr"
    : isMedium
    ? "2rem 1.4fr 1fr 0.9fr 0.65fr 0.6fr"
    : "2rem 1.4fr 1fr 0.9fr 0.65fr 0.6fr 1.5fr";

  const headers = [
    "#", "Job Role", "Salary (IN)",
    ...(!isTablet ? ["Salary (USD)"] : []),
    ...(!isTablet ? ["Growth"] : []),
    "Demand",
    ...(isDesktop ? ["Top Hirers"] : []),
  ];

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap');`}</style>

      <section style={{ background: "#000", padding: "clamp(32px,6vw,64px) clamp(12px,4vw,24px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: 36 }}>
            <p style={{ fontFamily: "'Space Mono',monospace", color: "#dc2626", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>nihacs.com</p>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div>
                <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", color: "#fff", fontSize: "clamp(2rem,6vw,3.8rem)", letterSpacing: 1, lineHeight: 1, margin: 0 }}>
                  Career Opportunities
                </h2>
                <p style={{ fontFamily: "'Space Mono',monospace", color: "#3a3a3a", fontSize: 11, marginTop: 8, lineHeight: 1.7 }}>
                  Avg. salaries &amp; top hiring companies after a Cyber Security course.
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontFamily: "'Bebas Neue',sans-serif", color: "#dc2626", fontSize: 42, lineHeight: 1 }}>{careers.length}</p>
                <p style={{ fontFamily: "'Space Mono',monospace", color: "#333", fontSize: 9, letterSpacing: 2, textTransform: "uppercase" }}>Career Paths</p>
              </div>
            </div>
            <div style={{ height: 1, marginTop: 20, background: "linear-gradient(90deg,#dc2626 0%,transparent 65%)" }} />
          </div>

          {/* Card */}
          <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderTop: "3px solid #dc2626", borderRadius: 2, overflow: "hidden" }}>

            {/* MOBILE — accordion */}
            {isMobile && careers.map((c, i) => <MobileCard key={i} c={c} i={i} />)}

            {/* TABLET / DESKTOP — grid */}
            {!isMobile && (
              <>
                {/* Head */}
                <div style={{ display: "grid", gridTemplateColumns: cols, padding: "10px 20px", borderBottom: "1px solid #141414", background: "rgba(255,255,255,0.015)", gap: 12, alignItems: "center" }}>
                  {headers.map(h => (
                    <span key={h} style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#333", letterSpacing: 2, textTransform: "uppercase" }}>{h}</span>
                  ))}
                </div>

                {/* Rows */}
                {careers.map((c, i) => (
                  <div
                    key={i}
                    style={{ display: "grid", gridTemplateColumns: cols, padding: "14px 20px", borderBottom: "1px solid #0e0e0e", alignItems: "center", gap: 12, transition: "background 0.18s", cursor: "default" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(220,38,38,0.03)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", color: "#252525", fontSize: 18 }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", color: "#fff", fontSize: 15, lineHeight: 1.3 }}>{c.role}</span>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", color: "#ef4444", fontSize: 17 }}>{c.salary}</span>
                    {!isTablet && <span style={{ fontFamily: "monospace", color: "#555", fontSize: 10 }}>{c.usd}</span>}
                    {!isTablet && (
                      <span style={{ fontFamily: "monospace", fontSize: 10, color: "#4ade80", background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.18)", padding: "2px 8px", borderRadius: 2, whiteSpace: "nowrap" }}>
                        {c.growth}
                      </span>
                    )}
                    <DemandBar value={c.demand} />
                    {isDesktop && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {c.companies.map(co => (
                          <span key={co} style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 2, padding: "2px 7px", fontFamily: "monospace", fontSize: 9, color: "#4a4a4a" }}>{co}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {/* Footer
            <div style={{ padding: "10px 20px", borderTop: "1px solid #111", background: "rgba(255,255,255,0.01)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <p style={{ fontFamily: "monospace", color: "#252525", fontSize: 10 }}>© nihacs.com · Salaries based on India market 2024</p>
              <div style={{ display: "flex", gap: 14 }}>
                {[["#dc2626", "Demand"], ["#4ade80", "Growth"]].map(([color, label]) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
                    <span style={{ fontFamily: "monospace", color: "#333", fontSize: 9 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div> */}
          </div>

        </div>
      </section>
    </>
  );
}