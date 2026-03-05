'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

const trainers = [
  { id: 1, name: 'Mr Varnit Jain',  image: '/trainers/varnit.jpeg',  position: 'Cybersecurity Expert' },
  { id: 2, name: 'Mr Kunal Porwal',         image: '/trainers/kunal.jpeg',   position: 'Cybersecurity Expert' },
  { id: 3, name: 'Mr Manjeet Singh', image: '/trainers/manjeet.jpeg', position: 'Software Developer'   },
  { id: 4, name: 'Miss Shagun',      image: '/trainers/Shagun.jpeg',  position: 'AI Expert'            },
];

const TrainerScrollSimple = () => {
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      const c = scrollContainerRef.current;
      if (!c) { ticking.current = false; return; }
      const idx = Math.min(Math.max(0, Math.round(c.scrollTop / c.clientHeight)), trainers.length - 1);
      setActiveIndex(p => p !== idx ? idx : p);
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    const c = scrollContainerRef.current;
    if (!c) return;
    c.addEventListener('scroll', handleScroll, { passive: true });
    return () => c.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToIndex = (i) => {
    const c = scrollContainerRef.current;
    if (!c) return;
    c.scrollTo({ top: c.clientHeight * i, behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative', backgroundColor: '#000', color: '#fff', overflow: 'hidden', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap');

        .trainer-scroll::-webkit-scrollbar { display: none; }
        .trainer-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .t-img { transition: transform 0.5s ease; }
        .t-img:hover { transform: scale(1.04); }
        .t-name-item {
          cursor: pointer;
          transition: opacity 0.3s, transform 0.3s, border-color 0.3s, color 0.3s;
        }

        /* ── DESKTOP (>= 768px) ── */
        .desktop-layout { display: flex; width: 100%; height: 100vh; }
        .mobile-layout  { display: none; }

        .left-col {
          width: 44%;
          display: flex;
          align-items: center;
          padding: 130px 2rem 2rem 3rem;
          flex-shrink: 0;
          box-sizing: border-box;
        }
        .right-col {
          width: 56%;
          position: relative;
          height: 100vh;
        }

        @media (max-width: 1024px) {
          .left-col { padding: 130px 1.5rem 2rem 2rem; width: 42%; }
          .right-col { width: 58%; }
        }

        /* ── MOBILE (< 768px) ── */
        @media (max-width: 767px) {
          .desktop-layout { display: none !important; }
          .mobile-layout  { display: block !important; }
        }
      `}</style>

      {/* ── Header ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
        padding: 'clamp(1rem,3vw,1.8rem) 1rem 1rem',
        background: 'linear-gradient(to bottom, #000 60%, transparent)',
        textAlign: 'center',
      }}>
        <span style={{
          display: 'inline-block', padding: '0.3rem 1rem',
          backgroundColor: '#dc2626', color: '#fff',
          fontSize: '0.68rem', fontWeight: 600, letterSpacing: '1.5px',
          textTransform: 'uppercase', borderRadius: '3px', marginBottom: '0.4rem',
        }}>
          Cyber Security Trainers
        </span>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(2.2rem, 7vw, 5rem)',
          color: '#fff', lineHeight: 1, margin: 0, letterSpacing: 1,
        }}>
          Our Experts
        </h1>
      </div>

      {/* ══════════════════════════════
           DESKTOP LAYOUT
      ══════════════════════════════ */}
      <div className="desktop-layout">

        {/* Left — names */}
        <div className="left-col">
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
            {trainers.map((t, i) => (
              <div
                key={t.id}
                className="t-name-item"
                onClick={() => scrollToIndex(i)}
                style={{
                  paddingLeft: '1rem',
                  borderLeft: `3px solid ${activeIndex === i ? '#dc2626' : 'transparent'}`,
                  opacity: activeIndex === i ? 1 : 0.25,
                  transform: activeIndex === i ? 'scale(1)' : 'scale(0.95)',
                }}
              >
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(1.4rem, 2.8vw, 3rem)',
                  color: activeIndex === i ? '#fff' : '#666',
                  lineHeight: 1.1, letterSpacing: 1,
                }}>
                  {t.name}
                </div>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.65rem',
                  color: activeIndex === i ? '#dc2626' : '#444',
                  marginTop: '0.25rem', letterSpacing: '1px', textTransform: 'uppercase',
                }}>
                  {t.position}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — snapping images (NO dots) */}
        <div className="right-col">
          <div
            ref={scrollContainerRef}
            className="trainer-scroll"
            style={{
              height: '100vh', width: '100%',
              overflowY: 'scroll', scrollSnapType: 'y mandatory',
            }}
          >
            {trainers.map((t) => (
              <div
                key={t.id}
                style={{
                  height: '100vh', scrollSnapAlign: 'start',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '110px 2rem 2rem', boxSizing: 'border-box',
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%', maxWidth: '380px',
                  height: 'calc(100vh - 130px)', maxHeight: '540px',
                  borderRadius: '2px', overflow: 'hidden', flexShrink: 0,
                }}>
                  <img
                    src={t.image} alt={t.name} className="t-img"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem 1.2rem 1.2rem' }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", color: '#fff', fontSize: '1.3rem', letterSpacing: 1 }}>{t.name}</div>
                    <div style={{ fontFamily: "'Space Mono',monospace", color: '#dc2626', fontSize: '0.65rem', marginTop: '0.25rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{t.position}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
           MOBILE LAYOUT
      ══════════════════════════════ */}
      <div
        className="mobile-layout"
        style={{ paddingTop: '100px', paddingBottom: '2rem' }}
      >
        {trainers.map((t) => (
          <div key={t.id} style={{ marginBottom: '0', position: 'relative' }}>

            {/* Full-width image — fills width, portrait height */}
            <div style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '120%',   /* 5:6 portrait ratio */
              overflow: 'hidden',
              backgroundColor: '#111',
            }}>
              <img
                src={t.image} alt={t.name}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'top center',
                  display: 'block',
                }}
              />
              {/* Strong bottom gradient so text is always readable */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)',
              }} />

              {/* Name + position overlaid on image */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '2rem 1.2rem 1.4rem',
              }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: '#fff', fontSize: 'clamp(1.6rem, 6vw, 2.4rem)',
                  letterSpacing: 1, lineHeight: 1.1,
                }}>
                  {t.name}
                </div>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  color: '#dc2626', fontSize: '0.68rem',
                  letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '0.3rem',
                }}>
                  {t.position}
                </div>
              </div>
            </div>

            {/* Thin red divider between cards */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, #dc2626 0%, transparent 60%)' }} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default TrainerScrollSimple;