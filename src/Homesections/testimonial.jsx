"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

const CybersecurityTestimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const autoPlayRef = useRef(null);
  const isAnimatingRef = useRef(false);

  const testimonials = [
    {
      id: 1, name: "Rahul Verma", role: "Security Analyst",
      content: "This cybersecurity course completely transformed my career. The hands-on labs and real-world scenarios prepared me for actual threats I face daily. Best investment I've made!",
      image: "/studentpics/1.jpeg", rating: 5, date: "15 Jan 2024", tag: "Career Change"
    },
    {
      id: 2, name: "Manjeet Sharma", role: "Penetration Tester",
      content: "The ethical hacking modules were incredibly comprehensive. I went from beginner to landing my dream job in just 6 months. The instructors are industry experts who know their craft.",
      image: "/studentpics/2.jpeg", rating: 5, date: "22 Dec 2023", tag: "Job Placement"
    },
    {
      id: 3, name: "Naveen Kumar", role: "IT Security Manager",
      content: "Outstanding course content covering everything from network security to incident response. The certification helped me secure a 30% salary increase within three months.",
      image: "/studentpics/3.jpeg", rating: 5, date: "08 Jan 2024", tag: "Salary Growth"
    },
    {
      id: 4, name: "Baldev Singh", role: "Cybersecurity Consultant", company: "TechGuard Consulting",
      content: "The practical approach to teaching complex concepts made learning enjoyable. The community support and mentorship were invaluable throughout my entire journey.",
      image: "/studentpics/4.jpeg", rating: 5, date: "30 Nov 2023", tag: "Community"
    },
    {
      id: 5, name: "Roma Gupta", role: "SOC Analyst",
      content: "From threat detection to malware analysis, this course covered it all. The 24/7 lab access allowed me to practice at my own pace. Highly recommended for anyone serious!",
      image: "/studentpics/5.jpeg", rating: 5, date: "19 Dec 2023", tag: "Skill Building"
    },
    {
      id: 6, name: "Rohit Mehra", role: "Security Engineer",
      content: "The instructors' real-world experience shines through every lesson. I gained practical skills that I use every single day in my role as a security engineer. Worth every penny!",
      image: "/studentpics/6.jpeg", rating: 5, date: "05 Jan 2024", tag: "Practical Skills"
    }
  ];

  const total = testimonials.length;
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) { 
      clearInterval(autoPlayRef.current); 
      autoPlayRef.current = null; 
    }
  }, []);

  const navigate = useCallback((direction) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setCurrentIndex(prev => 
      direction === 'next' 
        ? (prev + 1) % total 
        : (prev - 1 + total) % total
    );
    setTimeout(() => { isAnimatingRef.current = false; }, 500);
  }, [total]);

  const goNext = useCallback(() => navigate('next'), [navigate]);
  const goPrev = useCallback(() => navigate('prev'), [navigate]);

  const goTo = useCallback((index) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setCurrentIndex(index);
    setTimeout(() => { isAnimatingRef.current = false; }, 500);
  }, []);

  useEffect(() => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(goNext, 5000);
    return () => stopAutoPlay();
  }, [currentIndex, goNext, stopAutoPlay]);

  const handleDragStart = (e) => {
    setDragStart(e.type === 'touchstart' ? e.touches[0].clientX : e.clientX);
    stopAutoPlay();
  };
  
  const handleDragEnd = (e) => {
    if (dragStart === null) return;
    const end = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    if (Math.abs(dragStart - end) > 50) {
      dragStart - end > 0 ? goNext() : goPrev();
    }
    setDragStart(null);
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ 
        color: i < rating ? '#ef4444' : '#2a2a2a', 
        fontSize: isMobile ? '1rem' : '0.88rem',
        marginRight: '2px'
      }}>★</span>
    ));

  const getDesktopCardStyle = (index) => {
    let offset = (index - currentIndex + total) % total;
    if (offset > total / 2) offset -= total;
    const abs = Math.abs(offset);
    const xPercent = isTablet ? offset * 58 : offset * 40;
    const scale = isTablet
      ? (abs === 0 ? 1 : abs === 1 ? 0.85 : 0.70)
      : (abs === 0 ? 1 : abs === 1 ? 0.87 : abs === 2 ? 0.74 : 0.6);
    const opacity = isTablet
      ? (abs === 0 ? 1 : abs === 1 ? 0.65 : abs === 2 ? 0.25 : 0)
      : (abs === 0 ? 1 : abs === 1 ? 0.80 : abs === 2 ? 0.45 : 0);
    const zIndex = abs === 0 ? 50 : 10 - abs * 2;
    const rotateY = isTablet ? offset * -6 : offset * -8;
    return {
      transform: `translateX(${xPercent}%) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity, 
      zIndex,
      pointerEvents: abs <= 2 ? 'auto' : 'none',
    };
  };

  const cardWidth = isTablet ? '52%' : '34%';
  const cardMarginLeft = isTablet ? '-26%' : '-17%';
  const stageHeight = isTablet ? '580px' : '560px';
  const current = testimonials[currentIndex];

  const CardBody = ({ t, isCenter = true }) => (
    <div className="flex flex-col h-full">
      {/* Photo Section */}
      <div className="relative overflow-hidden bg-[#0d0d0d] shrink-0" 
           style={{ height: isMobile ? '220px' : isTablet ? '220px' : '240px' }}>
        <img
          src={t.image} 
          alt={t.name}
          className="w-full h-full"
          style={{
            objectFit: 'cover', 
            objectPosition: 'top center', 
            display: 'block',
            filter: isCenter ? 'none' : 'brightness(0.28) saturate(0.35)',
            transition: 'filter .55s ease',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="t-tag">{t.tag}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className={`flex-1 flex flex-col ${isMobile ? 'p-4' : 'p-5'}`}>
        {/* Stars */}
        <div className="mb-3 flex">{renderStars(t.rating)}</div>
        
        {/* Quote */}
        <p className={`italic mb-4 flex-1 ${isMobile ? 'text-[0.9rem] leading-[1.6]' : 'text-[0.85rem] leading-[1.7]'}`}
           style={{ 
             color: isCenter ? '#c2c2c2' : '#444', 
             transition: 'color .4s',
           }}>
          "{t.content}"
        </p>
        
        {/* Author Info */}
        <div className="flex items-center gap-3 mt-auto pt-3 border-t border-[#1a1a1a]">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-red-600 shrink-0">
            <img 
              src={t.image} 
              alt={t.name}
              className="w-full h-full"
              style={{ objectFit: 'cover', objectPosition: 'top' }} 
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className={`font-bold truncate ${isMobile ? 'text-[0.9rem]' : 'text-[0.83rem]'}`} 
                 style={{ color: isCenter ? '#fff' : '#444' }}>
              {t.name}
            </div>
            <div className={`font-semibold ${isMobile ? 'text-[0.75rem]' : 'text-[0.7rem]'}`} 
                 style={{ color: isCenter ? '#dc2626' : '#2e2e2e' }}>
              {t.role}
            </div>
          </div>
          <div className={`shrink-0 ${isMobile ? 'text-[0.65rem]' : 'text-[0.61rem]'}`} 
               style={{ color: '#4a4a4a' }}>
            {t.date}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-[#080808] overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Bebas+Neue&display=swap');
        .t-bebas { font-family: 'Bebas Neue', sans-serif; }
        .t-dm    { font-family: 'DM Sans', 'Segoe UI', sans-serif; }

        .t-nav {
          width: ${isMobile ? '44px' : '42px'}; 
          height: ${isMobile ? '44px' : '42px'}; 
          border-radius: 50%;
          border: 1px solid #252525; 
          background: rgba(17, 17, 17, 0.9); 
          color: #fff;
          font-size: ${isMobile ? '1.2rem' : '1rem'}; 
          cursor: pointer;
          display: flex; 
          align-items: center; 
          justify-content: center;
          transition: all .2s ease;
          flex-shrink: 0; 
          position: relative; 
          z-index: 30; 
          user-select: none;
          backdrop-filter: blur(4px);
        }
        .t-nav:hover  { background: #dc2626; border-color: #dc2626; transform: scale(1.08); }
        .t-nav:active { background: #b91c1c; transform: scale(0.95); }

        .t-dot {
          height: 7px; 
          width: 7px; 
          border-radius: 4px; 
          border: none;
          background: #272727; 
          cursor: pointer; 
          padding: 0;
          transition: all .3s ease; 
          z-index: 30; 
          position: relative;
        }
        .t-dot.on { 
          width: ${isMobile ? '28px' : '24px'}; 
          background: #dc2626; 
        }

        /* Mobile Card Slider */
        .t-mobile-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 0 ${isMobile ? '16px' : '0'};
        }
        
        .t-mobile-track {
          position: relative;
          width: 100%;
          height: ${isMobile ? '520px' : 'auto'};
        }
        
        .t-mobile-card {
          position: absolute; 
          top: 0; 
          left: ${isMobile ? '16px' : '0'}; 
          right: ${isMobile ? '16px' : '0'};
          border-radius: ${isMobile ? '20px' : '16px'}; 
          overflow: hidden;
          background: #111; 
          border: 1px solid #2a2a2a;
          box-shadow: 0 12px 40px rgba(0,0,0,.6);
          transition: all .5s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          z-index: 1;
          height: ${isMobile ? '520px' : 'auto'};
        }
        
        .t-mobile-card.active {
          opacity: 1; 
          transform: translateX(0) scale(1);
          pointer-events: auto;
          z-index: 10;
        }
        
        .t-mobile-card.prev { 
          opacity: 0; 
          transform: translateX(-40px) scale(0.95); 
          z-index: 5;
        }
        
        .t-mobile-card.next { 
          opacity: 0; 
          transform: translateX(40px) scale(0.95); 
          z-index: 5;
        }

        /* Desktop 3D card */
        .t-card3d {
          position: absolute; 
          left: 50%;
          border-radius: 16px; 
          overflow: hidden;
          background: #111; 
          border: 1px solid #1e1e1e; 
          cursor: pointer;
          transition: transform .55s cubic-bezier(.33,1,.68,1), opacity .55s ease;
        }
        .t-card3d.center {
          border-color: #2a2a2a; 
          cursor: default;
          box-shadow: 0 20px 60px rgba(0,0,0,.75), 0 0 0 1px rgba(220,38,38,.1);
        }

        .t-tag {
          display: inline-block; 
          padding: ${isMobile ? '0.25rem 0.7rem' : '0.2rem 0.6rem'};
          background: rgba(220,38,38,0.15); 
          border: 1px solid rgba(220,38,38,0.3);
          color: #ef4444; 
          font-size: ${isMobile ? '0.65rem' : '0.6rem'}; 
          font-weight: 700;
          letter-spacing: 1px; 
          text-transform: uppercase; 
          border-radius: 20px;
        }

        .t-thumb {
          width: ${isMobile ? '48px' : '40px'}; 
          height: ${isMobile ? '48px' : '40px'}; 
          border-radius: 50%; 
          overflow: hidden;
          cursor: pointer; 
          border: 2px solid transparent; 
          opacity: .45; 
          flex-shrink: 0;
          transition: all .25s ease;
        }
        .t-thumb:hover { opacity: 1; transform: scale(1.1); }
        .t-thumb.on    { border-color: #dc2626; opacity: 1; transform: scale(1.05); }
        .t-thumb img   { width:100%; height:100%; object-fit:cover; object-position:top; display:block; }

        .t-stat {
          background: #0f0f0f; 
          border: 1px solid #1a1a1a; 
          border-radius: 12px;
          padding: ${isMobile ? '0.75rem' : '0.85rem'}; 
          text-align: center; 
          transition: border-color .25s;
        }
        .t-stat:hover { border-color: #dc2626; }

        .t-cta {
          background: #dc2626; 
          color: #fff; 
          border: none;
          padding: ${isMobile ? '0.9rem 1.5rem' : '0.8rem 1.8rem'}; 
          border-radius: 8px;
          font-size: ${isMobile ? '0.85rem' : '0.82rem'}; 
          font-weight: 700; 
          cursor: pointer;
          letter-spacing: .8px; 
          text-transform: uppercase; 
          white-space: nowrap;
          transition: all .2s;
          width: ${isMobile ? '100%' : 'auto'};
        }
        .t-cta:hover { background: #b91c1c; transform: translateY(-2px); }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 t-dm">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <span className="t-tag mb-3 inline-block">Student Success Stories</span>
          <h1 className="t-bebas text-[2.2rem] sm:text-[3.5rem] lg:text-[5rem] text-white tracking-[2px] leading-[0.95] mb-3">
            REAL STORIES.<br />
            <span className="text-red-600">REAL RESULTS.</span>
          </h1>
          <p className={`text-[#4a4a4a] max-w-[440px] mx-auto leading-[1.7] ${isMobile ? 'text-[0.85rem] px-4' : 'text-sm sm:text-[0.92rem]'}`}>
            Join thousands of professionals who launched or leveled up their cybersecurity careers.
          </p>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-8 sm:mb-12 ${isMobile ? 'px-2' : ''}`}>
          {[
            { val: '12,400+', lbl: 'Students Enrolled' },
            { val: '94%',     lbl: 'Job Placement' },
            { val: '4.9★',    lbl: 'Average Rating' },
            { val: '180+',    lbl: 'Industry Partners' },
          ].map((s, i) => (
            <div key={i} className="t-stat">
              <div className={`t-bebas leading-none mb-1 ${isMobile ? 'text-[1.3rem]' : 'text-[1.5rem] sm:text-[1.9rem]'} ${i % 2 === 0 ? 'text-white' : 'text-red-600'}`}>
                {s.val}
              </div>
              <div className={`text-[#4a4a4a] font-semibold tracking-[.8px] uppercase ${isMobile ? 'text-[0.6rem]' : 'text-[0.62rem]'}`}>
                {s.lbl}
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE SLIDER */}
        {isMobile && (
          <div className="t-mobile-container">
            <div
              className="t-mobile-track"
              onTouchStart={handleDragStart}
              onTouchEnd={handleDragEnd}
              onMouseDown={handleDragStart}
              onMouseUp={handleDragEnd}
            >
              {testimonials.map((t, i) => {
                let positionClass = 'next';
                if (i === currentIndex) positionClass = 'active';
                else if (i === (currentIndex - 1 + total) % total) positionClass = 'prev';
                
                return (
                  <div key={t.id} className={`t-mobile-card ${positionClass}`}>
                    <CardBody t={t} isCenter={true} />
                  </div>
                );
              })}
            </div>

            {/* Mobile Controls */}
            <div className="flex justify-center items-center gap-3 mt-6">
              <button type="button" className="t-nav" onClick={goPrev} aria-label="Previous">
                ‹
              </button>
              <div className="flex gap-2 items-center">
                {testimonials.map((_, i) => (
                  <button 
                    key={i} 
                    type="button"
                    className={`t-dot${i === currentIndex ? ' on' : ''}`}
                    onClick={() => goTo(i)} 
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <button type="button" className="t-nav" onClick={goNext} aria-label="Next">
                ›
              </button>
            </div>
          </div>
        )}

        {/* DESKTOP/TABLET 3D CAROUSEL */}
        {!isMobile && (
          <div className="relative">
            <div
              className="relative"
              style={{ height: stageHeight }}
              onMouseDown={handleDragStart}
              onMouseUp={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchEnd={handleDragEnd}
            >
              {testimonials.map((t, index) => {
                const cs = getDesktopCardStyle(index);
                const isCenter = index === currentIndex;
                return (
                  <div
                    key={t.id}
                    className={`t-card3d${isCenter ? ' center' : ''}`}
                    style={{ 
                      ...cs, 
                      width: cardWidth, 
                      marginLeft: cardMarginLeft, 
                      top: isCenter ? 0 : '24px' 
                    }}
                    onClick={() => !isCenter && goTo(index)}
                  >
                    <CardBody t={t} isCenter={isCenter} />
                  </div>
                );
              })}
            </div>

            {/* Desktop Controls */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button type="button" className="t-nav" onClick={goPrev}>‹</button>
              <div className="flex gap-2 items-center">
                {testimonials.map((_, i) => (
                  <button 
                    key={i} 
                    type="button"
                    className={`t-dot${i === currentIndex ? ' on' : ''}`}
                    onClick={() => goTo(i)} 
                  />
                ))}
              </div>
              <button type="button" className="t-nav" onClick={goNext}>›</button>
            </div>
          </div>
        )}

        {/* Avatar Strip */}
        <div className={`mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#141414] ${isMobile ? 'px-4' : ''}`}>
          <p className={`text-center font-bold uppercase mb-4 ${isMobile ? 'text-[0.65rem] tracking-[2px] text-[#2a2a2a]' : 'text-[0.62rem] tracking-[2.5px] text-[#2a2a2a]'}`}>
            Browse All Stories
          </p>
          <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
            {testimonials.map((t, i) => (
              <button
                key={t.id} 
                className={`t-thumb${i === currentIndex ? ' on' : ''}`} 
                onClick={() => goTo(i)}
                aria-label={`View ${t.name}'s story`}
              >
                <img src={t.image} alt={t.name} />
              </button>
            ))}
          </div>
          <p className={`text-center mt-3 font-bold text-red-600 ${isMobile ? 'text-[0.85rem]' : 'text-[0.78rem]'}`}>
            {current.name}
            <span className="text-[#3a3a3a] font-normal"> · {current.role}</span>
            {current.company && (
              <span className="text-[#2a2a2a] hidden sm:inline"> · {current.company}</span>
            )}
          </p>
        </div>

        {/* CTA Banner */}
        <div className={`mt-8 sm:mt-12 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl ${isMobile ? 'p-5' : 'p-5 sm:p-8 lg:p-10'} flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden`}>
          <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-red-600 to-transparent" />
          <div className={`${isMobile ? 'text-center' : ''}`}>
            <h3 className={`t-bebas text-white tracking-[1px] mb-1 ${isMobile ? 'text-[1.4rem]' : 'text-[1.55rem] sm:text-[2rem]'}`}>
              YOUR SUCCESS STORY STARTS TODAY
            </h3>
            <p className={`text-[#4a4a4a] leading-[1.6] ${isMobile ? 'text-[0.85rem]' : 'text-[0.82rem]'}`}>
              Join 12,400+ students already transforming their cybersecurity careers.
            </p>
          </div>
          <button type="button" className="t-cta">
            Enroll Now →
          </button>
        </div>

      </div>
    </div>
  );
}; 

export default CybersecurityTestimonial;