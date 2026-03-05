"use client";
import { useState, useEffect, useRef } from "react";
import Choose from "../../Homesections/Choose.jsx";

// ── Animated counter ───────────────────────────────────
function useCounter(target, duration = 2200, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(ease(progress) * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ── Intersection observer ──────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ── Stat card ──────────────────────────────────────────
function StatCard({ value, suffix, label, sub, delay, inView }) {
  const count = useCounter(value, 2200, inView);
  return (
    <div
      style={{
        background: "#0a0a0a",
        border: "1px solid #1a1a1a",
        borderTop: "2px solid #dc2626",
        borderRadius: 2,
        padding: "32px 28px",
        animation: inView ? `fadeUp 0.6s ease ${delay}ms both` : "none",
        transition: "border-color 0.25s, background 0.25s",
      }}
      onMouseEnter={e => { e.currentTarget.style.background = "rgba(220,38,38,0.03)"; e.currentTarget.style.borderColor = "#dc2626"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "#0a0a0a"; e.currentTarget.style.borderColor = "#1a1a1a"; }}
    >
      <p style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(2.6rem, 5vw, 3.8rem)",
        color: "#dc2626", lineHeight: 1, margin: 0,
      }}>
        {count.toLocaleString()}{suffix}
      </p>
      <p style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "1.1rem", color: "#fff",
        letterSpacing: 1, margin: "8px 0 4px",
      }}>
        {label}
      </p>
      <p style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 10, color: "#444",
        letterSpacing: 1, lineHeight: 1.7, margin: 0,
      }}>
        {sub}
      </p>
    </div>
  );
}

const stats = [
  { value: 12400, suffix: "+", label: "Students Trained",   sub: "Across India & abroad",          delay: 0   },
  { value: 98,    suffix: "%", label: "Placement Rate",     sub: "Industry-leading success rate",   delay: 100 },
  { value: 10,    suffix: "+", label: "Years of Excellence",sub: "Established since 2014",          delay: 200 },
  { value: 200,   suffix: "+", label: "Hiring Partners",    sub: "MNCs, startups & govt. agencies", delay: 300 },
  { value: 50,    suffix: "+", label: "Expert Instructors", sub: "Certified security professionals", delay: 400 },
  { value: 6,     suffix: "",  label: "Govt. Recognitions", sub: "Skill India, NSDC & more",        delay: 500 },
];

const timeline = [
  { year: "2014", title: "Foundation",         desc: "nihacs.com established as a cybersecurity training center with a mission to democratize security education across India." },
  { year: "2017", title: "Govt. Recognition",  desc: "Awarded Skill India & NSDC certification, becoming one of the first officially recognized ethical hacking institutes in the country." },
  { year: "2019", title: "5,000 Milestone",    desc: "Crossed 5,000 trained professionals. Expanded curriculum to include cloud security, forensics, and AI-driven threat intelligence." },
  { year: "2022", title: "Global Alumni",      desc: "nihacs.com alumni now working across 30+ countries, at companies including Deloitte, IBM, CrowdStrike, and government agencies." },
  { year: "2025", title: "12,400+ & Growing",  desc: "Recognized as India's #1 ethical hacking institute. Launched advanced Master's and Bachelor's programs in Cybersecurity." },
];

export default function AboutPage() {
  const [statsRef, statsInView] = useInView();
  const [storyRef, storyInView] = useInView();

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFade {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineGrow {
          from { height: 0; }
          to   { height: 100%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; } 50% { opacity: 0; }
        }

        .red-divider {
          height: 1px;
          margin: 20px 0 32px;
          background: linear-gradient(90deg, #dc2626 0%, transparent 65%);
        }
        .section-label {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: #dc2626;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 10px;
          display: block;
        }
        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.4rem, 6vw, 4.5rem);
          color: #fff;
          letter-spacing: 1px;
          line-height: 1;
          margin: 0;
        }

        /* Timeline */
        .tl-item {
          display: flex;
          gap: 20px;
          position: relative;
          padding-bottom: 32px;
        }
        .tl-item:last-child { padding-bottom: 0; }
        .tl-line {
          position: absolute;
          left: 42px;
          top: 40px;
          bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, #dc2626, #222);
        }
        .tl-item:last-child .tl-line { display: none; }
        .tl-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #dc2626;
          border: 2px solid #dc2626;
          box-shadow: 0 0 8px rgba(220,38,38,0.5);
          flex-shrink: 0;
          margin-top: 6px;
        }
        .tl-year {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.4rem;
          color: #dc2626;
          letter-spacing: 1px;
          width: 52px;
          flex-shrink: 0;
          line-height: 1;
          padding-top: 2px;
        }
        .tl-card {
          flex: 1;
          background: #0a0a0a;
          border: 1px solid #1a1a1a;
          border-radius: 2px;
          padding: 16px 20px;
          transition: border-color 0.2s, background 0.2s;
        }
        .tl-card:hover {
          border-color: #dc2626;
          background: rgba(220,38,38,0.03);
        }

        /* Responsive story grid */
        @media (max-width: 768px) {
          .story-grid { grid-template-columns: 1fr !important; }
          .hero-grid  { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center",
        padding: "120px clamp(1.2rem,5vw,5rem) 80px",
        position: "relative", overflow: "hidden",
        borderBottom: "1px solid #111",
      }}>
        {/* Subtle grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(220,38,38,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }} />

        {/* Glow orbs */}
        <div style={{ position: "absolute", top: "15%", right: "8%",  width: 500, height: 500, background: "radial-gradient(circle, rgba(220,38,38,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 350, height: 350, background: "radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div className="hero-grid" style={{ maxWidth: 1100, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,6vw,6rem)", alignItems: "center", position: "relative", zIndex: 1 }}>

          {/* Left */}
          <div>
            <span className="section-label" style={{ animation: "heroFade 0.6s ease 0s both" }}>
              nihacs.com &nbsp;/&nbsp; about us
            </span>
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 10vw, 7rem)",
              color: "#fff", lineHeight: 0.95,
              letterSpacing: 2, margin: "0 0 24px",
              animation: "heroFade 0.7s ease 0.1s both",
            }}>
              Shaping India's<br />
              <span style={{ color: "#dc2626" }}>Cyber</span><br />
              Defenders
            </h1>
            <p style={{
              fontFamily: "'Space Mono', monospace",
              color: "#555", fontSize: "clamp(0.72rem,1.4vw,0.85rem)",
              lineHeight: 2, maxWidth: 440, margin: "0 0 36px",
              animation: "heroFade 0.7s ease 0.25s both",
            }}>
              nihacs.com is India's most trusted cybersecurity training institution — government recognized, industry approved, and committed to producing world-class ethical hackers and security professionals since 2014.
            </p>

            {/* Mission pill */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "rgba(220,38,38,0.08)",
              border: "1px solid rgba(220,38,38,0.2)",
              borderRadius: 9999, padding: "10px 20px",
              animation: "heroFade 0.7s ease 0.4s both",
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#dc2626", flexShrink: 0 }} />
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#dc2626", letterSpacing: 2, textTransform: "uppercase" }}>
                Skill India &amp; NSDC Recognized Institute
              </span>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap", animation: "heroFade 0.7s ease 0.5s both" }}>
              <a href="/courses" style={{
                fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: 2,
                background: "#dc2626", color: "#fff", padding: "12px 32px",
                borderRadius: 9999, textDecoration: "none",
                boxShadow: "0 4px 20px rgba(220,38,38,0.4)",
                transition: "background 0.2s, transform 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#b91c1c"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#dc2626"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Our Courses
              </a>
              <a href="/contact" style={{
                fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: 2,
                background: "transparent", color: "#fff",
                padding: "12px 32px", borderRadius: 9999,
                border: "1px solid #2a2a2a", textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#dc2626"; e.currentTarget.style.color = "#dc2626"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a2a"; e.currentTarget.style.color = "#fff"; }}
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Right — mission card */}
          <div style={{
            background: "#0a0a0a",
            border: "1px solid #1a1a1a",
            borderTop: "3px solid #dc2626",
            borderRadius: 2, padding: "36px 32px",
            animation: "heroFade 0.8s ease 0.3s both",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 150, height: 150, background: "radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

            <span className="section-label">Our Mission</span>
            <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", color: "#fff", fontSize: "1.8rem", letterSpacing: 1, margin: "0 0 16px", lineHeight: 1.1 }}>
              Making Cybersecurity Education Accessible to Every Indian
            </h3>
            <div className="red-divider" style={{ marginBottom: 20 }} />

            {[
              {  text: "Practical, hands-on curriculum designed with industry experts" },
              {  text: "Government-recognized credentials accepted nationwide" },
              {  text: "Placement support with 200+ hiring partners" },
              {  text: "Lifetime alumni community and content access" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: i < 3 ? 16 : 0 }}>
                <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                <p style={{ fontFamily: "'Space Mono',monospace", color: "#555", fontSize: 11, lineHeight: 1.8, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS
      ══════════════════════════════════════ */}
      <section ref={statsRef} style={{ padding: "88px clamp(1.2rem,5vw,5rem)", background: "#050505", borderBottom: "1px solid #111" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <span className="section-label">By the numbers</span>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <h2 className="section-title">
              Our Impact<br /><span style={{ color: "#dc2626" }}>In Numbers</span>
            </h2>
            <p style={{ fontFamily: "'Space Mono',monospace", color: "#444", fontSize: 11, maxWidth: 300, lineHeight: 1.8, margin: 0 }}>
              Over a decade of measurable results — real students, real careers, real impact.
            </p>
          </div>
          <div className="red-divider" />
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {stats.map((s, i) => (
              <StatCard key={i} {...s} inView={statsInView} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          OUR STORY
      ══════════════════════════════════════ */}
      <section ref={storyRef} style={{ padding: "88px clamp(1.2rem,5vw,5rem)", borderBottom: "1px solid #111" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <span className="section-label">Our Journey</span>
          <div className="story-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "clamp(2rem,6vw,6rem)", alignItems: "flex-start" }}>

            {/* Left */}
            <div style={{ animation: storyInView ? "fadeUp 0.7s ease 0s both" : "none" }}>
              <h2 className="section-title">
                A Decade of<br /><span style={{ color: "#dc2626" }}>Excellence</span>
              </h2>
              <div className="red-divider" />
              <p style={{ fontFamily: "'Space Mono',monospace", color: "#555", fontSize: 12, lineHeight: 2, marginBottom: 20 }}>
                nihacs.com was founded in 2014 with a singular vision — to bridge the massive gap between demand for cybersecurity professionals and quality education in India.
              </p>
              <p style={{ fontFamily: "'Space Mono',monospace", color: "#555", fontSize: 12, lineHeight: 2, marginBottom: 20 }}>
                We started small, but our commitment to practical, industry-aligned training quickly earned us recognition from Skill India and NSDC — making us one of the most credible cybersecurity institutes in the country.
              </p>
              <p style={{ fontFamily: "'Space Mono',monospace", color: "#555", fontSize: 12, lineHeight: 2 }}>
                Today, our alumni are securing networks at Fortune 500 companies, government agencies, and top MNCs across 30+ countries — a testament to the quality of training nihacs.com delivers.
              </p>

              {/* Credential badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 32 }}>
                {["Skill India Certified", "NSDC Approved", "ISO Recognized", "Industry Aligned"].map(b => (
                  <span key={b} style={{
                    fontFamily: "'Space Mono',monospace", fontSize: 9,
                    color: "#dc2626", letterSpacing: 1.5,
                    background: "rgba(220,38,38,0.08)",
                    border: "1px solid rgba(220,38,38,0.2)",
                    borderRadius: 2, padding: "4px 12px",
                    textTransform: "uppercase",
                  }}>{b}</span>
                ))}
              </div>
            </div>

            {/* Right — timeline */}
            <div style={{ animation: storyInView ? "fadeUp 0.7s ease 0.2s both" : "none" }}>
              <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", color: "#fff", fontSize: "1.4rem", letterSpacing: 1, margin: "0 0 28px" }}>
                Key Milestones
              </h3>
              {timeline.map((item, i) => (
                <div key={i} className="tl-item">
                  <div className="tl-line" />
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0, width: 52 }}>
                    <span className="tl-year">{item.year}</span>
                    <div className="tl-dot" />
                  </div>
                  <div className="tl-card">
                    <p style={{ fontFamily: "'Bebas Neue',sans-serif", color: "#fff", fontSize: "1rem", letterSpacing: 1, margin: "0 0 6px" }}>{item.title}</p>
                    <p style={{ fontFamily: "'Space Mono',monospace", color: "#444", fontSize: 10, margin: 0, lineHeight: 1.8 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

              {/* why choose us */}

              <Choose/>
    
              


      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section style={{ padding: "80px clamp(1.2rem,5vw,5rem)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            background: "#0a0a0a",
            border: "1px solid #1a1a1a",
            borderTop: "3px solid #dc2626",
            borderRadius: 2, padding: "clamp(2rem,5vw,3.5rem)",
            display: "flex", flexWrap: "wrap",
            alignItems: "center", justifyContent: "space-between", gap: 24,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: "linear-gradient(to bottom, #dc2626, transparent)" }} />
            <div style={{ position: "absolute", right: 0, bottom: 0, width: 250, height: 250, background: "radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <span className="section-label">Begin Your Journey</span>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", color: "#fff", fontSize: "clamp(1.8rem,4vw,3rem)", letterSpacing: 1, margin: "0 0 8px", lineHeight: 1.1 }}>
                Your Cybersecurity Career Starts Here
              </h2>
              <p style={{ fontFamily: "'Space Mono',monospace", color: "#444", fontSize: 11, margin: 0, lineHeight: 1.8 }}>
                Join 12,400+ professionals who chose nihacs.com to build their career in cybersecurity.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", position: "relative", zIndex: 1 }}>
              <a href="/courses" style={{
                fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: 2,
                background: "#dc2626", color: "#fff", padding: "12px 32px",
                borderRadius: 9999, textDecoration: "none",
                boxShadow: "0 4px 20px rgba(220,38,38,0.4)",
                transition: "background 0.2s, transform 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#b91c1c"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#dc2626"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Enroll Now
              </a>
              <a href="/contact" style={{
                fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: 2,
                background: "transparent", color: "#fff",
                padding: "12px 32px", borderRadius: 9999,
                border: "1px solid #2a2a2a", textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#dc2626"; e.currentTarget.style.color = "#dc2626"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a2a"; e.currentTarget.style.color = "#fff"; }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}