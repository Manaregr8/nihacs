"use client";
import React from "react";

const certs = [
  {
    name: "Certified Ethical Hacker",
    code: "CEH",
    issuer: "EC-Council",
    img: "https://images.credly.com/size/340x340/images/b2790b6a-cca3-4582-a84f-37f8a17e4e31/image.png",
  },
  {
    name: "Offensive Security Certified Professional",
    code: "OSCP",
    issuer: "Offensive Security",
    img: "https://images.credly.com/size/340x340/images/ec81134d-e80b-4eb5-ae07-0eb8e1a60fcd/image.png",
  },
  {
    name: "CompTIA Security+",
    code: "SEC+",
    issuer: "CompTIA",
    img: "https://images.credly.com/size/340x340/images/74790a75-8451-400a-8536-92d792c5184a/CompTIA_Security_2Bce.png",
  },
  {
    name: "CISSP",
    code: "CISSP",
    issuer: "ISC²",
    img: "https://images.credly.com/size/340x340/images/6ee69f11-7614-4e9e-be3a-c02b5f93bb5c/image.png",
  },
  {
    name: "Certified Penetration Testing Specialist",
    code: "CPTS",
    issuer: "HackTheBox",
    img: "https://images.credly.com/size/340x340/images/b5b8b507-b7df-467b-9a5c-79879abf8bc5/image.png",
  },
  {
    name: "CompTIA CySA+",
    code: "CySA+",
    issuer: "CompTIA",
    img: "https://images.credly.com/size/340x340/images/7f7657b9-4d1b-4b8d-b57f-971c8e4f0be3/image.png",
  },
  {
    name: "Certified Cloud Security Professional",
    code: "CCSP",
    issuer: "ISC²",
    img: "https://images.credly.com/size/340x340/images/53acdae5-d69f-4dda-b650-d02ed7a50dd7/image.png",
  },
  {
    name: "AWS Security Specialty",
    code: "AWS-S",
    issuer: "Amazon",
    img: "https://images.credly.com/size/340x340/images/53acdae5-d69f-4dda-b650-d02ed7a50dd7/image.png",
  },
];

// Triplicate for seamless infinite loop
const track = [...certs, ...certs, ...certs];

export default function CertCarousel() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap');
        .fn-bebas { font-family: 'Bebas Neue', sans-serif; }
        .fn-mono  { font-family: 'Space Mono', monospace; }

        .ticker-wrapper {
          overflow: hidden;
          position: relative;
        }
        .ticker-wrapper::before,
        .ticker-wrapper::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 120px;
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
          gap: 16px;
          width: max-content;
          animation: tickerLTR 30s linear infinite;
        }
        .ticker-track-reverse {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: tickerRTL 25s linear infinite;
        }
        .ticker-track:hover,
        .ticker-track-reverse:hover {
          animation-play-state: paused;
        }

        @keyframes tickerLTR {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        @keyframes tickerRTL {
          0%   { transform: translateX(calc(-100% / 3)); }
          100% { transform: translateX(0); }
        }

        .cert-chip {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0a;
          border: 1px solid #1a1a1a;
          border-radius: 2px;
          padding: 14px 20px;
          flex-shrink: 0;
          cursor: default;
          transition: border-color 0.25s, background 0.25s;
        }
        .cert-chip:hover {
          border-color: #dc2626;
          background: rgba(220,38,38,0.04);
        }
        .cert-chip-img {
          width: 90px;
          height: 90px;
          object-fit: contain;
          flex-shrink: 0;
          transition: filter 0.25s, transform 0.25s;
        }
        .cert-chip:hover .cert-chip-img {
          filter: drop-shadow(0 0 10px rgba(220,38,38,0.6));
          transform: scale(1.08);
        }
        .cert-chip-fallback {
          width: 90px;
          height: 90px;
          display: none;
          align-items: center;
          justify-content: center;
          background: rgba(220,38,38,0.1);
          border: 1px solid rgba(220,38,38,0.25);
          border-radius: 2px;
          flex-shrink: 0;
        }
      `}</style>

      <section className="w-full bg-black py-14 overflow-hidden">

        {/* ── Header ── */}
        <div className="max-w-6xl mx-auto px-6 mb-10">
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
          {/* Red gradient divider */}
          <div
            className="h-px mt-5"
            style={{ background: "linear-gradient(90deg,#dc2626 0%,transparent 65%)" }}
          />
        </div>

        {/* ── Row 1 — Left to Right ── */}
        <div className="ticker-wrapper mb-4">
          <div className="ticker-track">
            {track.map((c, i) => (
              <div className="cert-chip" key={`ltr-${i}`}>
                <img
                  src={c.img}
                  alt={c.code}
                  className="cert-chip-img"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling.style.display = "flex";
                  }}
                />
                <div className="cert-chip-fallback">
                  <span className="fn-bebas text-red-600 text-sm">{c.code}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Row 2 — Right to Left ── */}
        <div className="ticker-wrapper">
          <div className="ticker-track-reverse">
            {[...track].reverse().map((c, i) => (
              <div className="cert-chip" key={`rtl-${i}`}>
                <img
                  src={c.img}
                  alt={c.code}
                  className="cert-chip-img"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling.style.display = "flex";
                  }}
                />
                <div className="cert-chip-fallback">
                  <span className="fn-bebas text-red-600 text-sm">{c.code}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}