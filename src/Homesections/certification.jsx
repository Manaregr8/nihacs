"use client";
import React from "react";

const certs = [
  {
    name: "Bachelors of VOC. STD In Cyber Security",
    code: "WSPT",
    issuer: "National Institute of Hacking & Cyber Security",
    img: "certificate/4.png",
    tag: "Bachelors Degree",
    partners: ["Skill India", "Meta Business Partner"],
    color: "#f70404",
  },
  {
    name: "Master in Cyber Security",
    code: "BEH",
    issuer: "National Institute of Hacking & Cyber Security",
    img: "certificate/5.png",
    tag: "Master Degree ",
    partners: ["Skill India", "Meta Business Partner"],
    color: "#f70404",
  },
  {
    name: "Diploma in Cyber Security",
    code: "DCS",
    issuer: "National Institute of Hacking & Cyber Security",
    img: "certificate/6.png",
    tag: "Diploma Certificate",
    partners: ["Skill India", "Meta Business Partner"],
    color: "#f70404",
  },
  {
    name: "Web Security And Presentation Testing",
    code: "B.VOC",
    issuer: "National Institute of Hacking & Cyber Security",
    img: "certificate/7.png",
    tag: "Degree Certificate",
    partners: ["Skill India", "Meta Business Partner"],
    color: "#f70404",
  },
  {
    name: "Basic Ethical Hacking",
    code: "M.SC",
    issuer: "National Institute of Hacking & Cyber Security",
    img: "certificate/8.png",
    tag: "Masters Certificate",
    partners: ["Skill India", "Meta Business Partner"],
    color: "#f70404",
  },
];

const track = [...certs, ...certs, ...certs];

export default function CertCarousel() {
  const [failedImgs, setFailedImgs] = React.useState({});

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
        .fn-bebas    { font-family: 'Bebas Neue', sans-serif; }
        .fn-mono     { font-family: 'Space Mono', monospace; }
        .fn-cormorant{ font-family: 'Cormorant Garamond', serif; }

        .ticker-wrapper {
          overflow: hidden;
          position: relative;
        }
        .ticker-wrapper::before,
        .ticker-wrapper::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 180px;
          z-index: 2;
          pointer-events: none;
        }
        .ticker-wrapper::before {
          left: 0;
          background: linear-gradient(90deg, #000 0%, transparent 100%);
        }
        .ticker-wrapper::after {
          right: 0;
          background: linear-gradient(270deg, #000 0%, transparent 100%);
        }

        .ticker-track {
          display: flex;
          gap: 28px;
          width: max-content;
          animation: tickerLTR 60s linear infinite;
          align-items: center;
          padding: 20px 0 28px;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }

        @keyframes tickerLTR {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }

        /* ── Certificate Card ── */
        .cert-card {
          flex-shrink: 0;
          width: 420px;
          background: #0a0a0a;
          border: 1px solid #222;
          border-radius: 8px;
          overflow: hidden;
          cursor: default;
          transition: transform 0.35s cubic-bezier(.22,.68,0,1.2), box-shadow 0.35s, border-color 0.35s;
          position: relative;
        }
        .cert-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(200,168,75,0.06) 0%, transparent 60%);
          pointer-events: none;
          z-index: 1;
        }
        .cert-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 24px 60px rgba(200,168,75,0.18), 0 0 0 1px rgba(200,168,75,0.3);
          border-color: rgba(200,168,75,0.5);
        }

        /* Image section */
        .cert-img-area {
          width: 100%;
          height: 260px;
          overflow: hidden;
          position: relative;
          background: #111;
        }
        .cert-img-area img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: transform 0.5s ease;
          display: block;
        }
        .cert-card:hover .cert-img-area img {
          transform: scale(1.05);
        }

        /* Gold overlay bar at top of image */
        .cert-img-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #c8a84b, #f0d080, #c8a84b);
          z-index: 2;
        }

        /* Fallback badge */
        .cert-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: linear-gradient(135deg, #0f0f0f 0%, #1a1a0f 100%);
        }

        /* Info section */
        .cert-info {
          padding: 18px 22px 20px;
          position: relative;
          z-index: 2;
        }
        .cert-tag {
          display: inline-block;
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #ff0000;
          border: 1px solid rgba(200,168,75,0.35);
          border-radius: 2px;
          padding: 3px 8px;
          margin-bottom: 10px;
        }
        .cert-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 0.06em;
          color: #fff;
          line-height: 1.15;
          margin-bottom: 6px;
        }
        .cert-issuer {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          color: #555;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          line-height: 1.5;
        }
        .cert-footer {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .cert-partners {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .cert-partner-badge {
          font-family: 'Space Mono', monospace;
          font-size: 8px;
          color: #444;
          border: 1px solid #222;
          border-radius: 2px;
          padding: 2px 6px;
          letter-spacing: 0.05em;
        }
        .cert-gold-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ff0000;
          flex-shrink: 0;
        }

        /* Divider */
        .gold-divider {
          height: 1px;
          background: linear-gradient(90deg, #dc2626 0%, transparent 65%);
          margin-top: 20px;
        }
      `}</style>

      <section className="w-full bg-black py-14 overflow-hidden">

        {/* ── Header ── */}
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <p className="fn-mono text-red-600 text-xs tracking-widest uppercase mb-2">
            nihacs.com
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
            <h2 className="fn-bebas text-white text-5xl sm:text-6xl tracking-wide leading-none">
              Certifications
            </h2>
            <p className="fn-mono text-neutral-600 text-xs max-w-xs leading-relaxed">
              Industry-recognized credentials trusted by security professionals worldwide.
            </p>
          </div>
          <div className="gold-divider" />
        </div>

        {/* ── Single Row Ticker ── */}
        <div className="ticker-wrapper">
          <div className="ticker-track">
            {track.map((c, i) => (
              <div className="cert-card" key={`cert-${i}`}>

                {/* Image area */}
                <div className="cert-img-area">
                  <div className="cert-img-bar" />
                  {failedImgs[`${c.code}-${i}`] ? (
                    <div className="cert-fallback">
                      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <polygon
                          points="40,5 72,20 72,60 40,75 8,60 8,20"
                          fill="rgba(200,168,75,0.08)"
                          stroke="#c8a84b"
                          strokeWidth="1.2"
                        />
                        <polygon
                          points="40,14 63,26 63,54 40,66 17,54 17,26"
                          fill="none"
                          stroke="rgba(200,168,75,0.3)"
                          strokeWidth="0.6"
                          strokeDasharray="3,3"
                        />
                        <text x="40" y="44" textAnchor="middle"
                          fontFamily="'Bebas Neue',sans-serif"
                          fontSize={c.code.length > 4 ? "11" : "15"}
                          fill="#c8a84b" letterSpacing="1">
                          {c.code}
                        </text>
                      </svg>
                      <span style={{
                        fontFamily:"'Space Mono',monospace",
                        fontSize:"10px",
                        color:"#444",
                        letterSpacing:"0.1em",
                        textTransform:"uppercase",
                        textAlign:"center",
                        padding:"0 20px"
                      }}>
                        {c.name}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={c.img}
                      alt={c.name}
                      onError={() =>
                        setFailedImgs((p) => ({ ...p, [`${c.code}-${i}`]: true }))
                      }
                    />
                  )}
                </div>

                {/* Info section */}
                <div className="cert-info">
                  <div className="cert-tag">{c.tag}</div>
                  <div className="cert-name">{c.name}</div>
                  <div className="cert-issuer">{c.issuer}</div>
                  <div className="cert-footer">
                    <div className="cert-partners">
                      {c.partners.map((p, pi) => (
                        <span className="cert-partner-badge" key={pi}>{p}</span>
                      ))}
                    </div>
                    <div className="cert-gold-dot" />
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}