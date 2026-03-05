"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Carouselcourses from "../Homesections/carouselcourses";
import { FormModal } from "../Homesections/form/page";

/* ────────── CONFIG ────────── */
const GRAY_WORDS  = ["SECURE",  "PROTECT", "DEFEND"];
const WHITE_WORDS = ["STUFF",   "DATA",    "SYSTEMS"];
const STAGGER_MS  = 45;   // delay between each letter starting its flip
const FLIP_MS     = 100;  // duration of each letter's scale transition
const PAUSE_MS    = 2800;

const CYBER_TAGS = [
  "Ethical Hacking","Bug Bounty","Penetration Testing","CTF",
  "Malware Analysis","OSINT","Reverse Engineering","Red Teaming",
  "Cryptography","Web Exploitation",
];

/* ─── Single letter flip ───────────────────────────────────────────────────
   Phase lifecycle:  idle → squish → unsquish → idle
   "squish"   : scaleX 1→0  (exit old char)
   "unsquish" : scaleX 0→1  (enter new char)
*/
function Letter({ char, flipping, delay, onDone }) {
  const [scale, setScale]   = useState(1);
  const [shown, setShown]   = useState(char);
  const nextCharRef          = useRef(char);
  const timerRef             = useRef(null);

  // When a new char comes in while flipping===true, kick off the animation
  useEffect(() => {
    nextCharRef.current = char;
    if (!flipping) {
      setShown(char);
      setScale(1);
      return;
    }

    // Clear any previous timer
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      // Step 1: squish to 0
      setScale(0);
    }, delay);

    return () => clearTimeout(timerRef.current);
  }, [char, flipping, delay]);

  const handleTransitionEnd = () => {
    if (scale === 0) {
      // Mid-flip: swap character, then unsquish
      setShown(nextCharRef.current);
      // Use rAF to ensure DOM paint before reversing
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setScale(1));
      });
    } else if (scale === 1 && flipping) {
      onDone();
    }
  };

  return (
    <span
      style={{
        display:         "inline-block",
        transform:       `scaleX(${scale})`,
        transition:      `transform ${FLIP_MS}ms cubic-bezier(0.4,0,0.6,1)`,
        transformOrigin: "center",
        whiteSpace:      "pre",
        minWidth:        shown === " " ? "0.3em" : undefined,
      }}
      onTransitionEnd={handleTransitionEnd}
    >
      {shown || "\u00A0"}
    </span>
  );
}

/* ─── A full word row ──────────────────────────────────────────────────────
   Keeps a stable array of letter slots; pads/trims as word length changes.
*/
function FlipRow({ word, color, style = {} }) {
  const [slots, setSlots]     = useState(() => word.split("").map(c => ({ char: c, key: 0 })));
  const [flipping, setFlipping] = useState(false);
  const prevWordRef             = useRef(word);
  const doneRef                 = useRef(0);
  const totalRef                = useRef(word.length);
  const pendingWord             = useRef(word);

  useEffect(() => {
    if (word === prevWordRef.current) return;
    pendingWord.current = word;
    prevWordRef.current = word;

    const maxLen = Math.max(slots.length, word.length);
    totalRef.current = maxLen;
    doneRef.current  = 0;

    // Build new slots array padded to maxLen
    const newSlots = Array.from({ length: maxLen }, (_, i) => ({
      char: word[i] ?? "\u00A0",
      key:  (slots[i]?.key ?? 0) + 1,
    }));

    setSlots(newSlots);
    setFlipping(true);
  }, [word]);

  const handleLetterDone = useCallback(() => {
    doneRef.current += 1;
    if (doneRef.current >= totalRef.current) {
      // Trim trailing nbsp slots now that animation is complete
      setSlots(pendingWord.current.split("").map((c, i) => ({
        char: c,
        key:  (i + 1) * 100, // stable key after trim
      })));
      setFlipping(false);
      doneRef.current = 0;
    }
  }, []);

  return (
    <div style={{ display: "inline-block", color, ...style }}>
      {slots.map((slot, i) => (
        <Letter
          key={`${i}-${slot.key}`}
          char={slot.char}
          flipping={flipping}
          delay={i * STAGGER_MS}
          onDone={handleLetterDone}
        />
      ))}
    </div>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────────── */
export default function Hero() {
  const [idx, setIdx]       = useState(0);
  const timerRef            = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setIdx(i => (i + 1) % GRAY_WORDS.length);
    }, PAUSE_MS);
    return () => clearTimeout(timerRef.current);
  }, [idx]);

  const curGray  = GRAY_WORDS[idx];
  const curWhite = WHITE_WORDS[idx];

  const bigType = {
    fontSize:      "clamp(2.8rem, 9vw, 9.5rem)",
    fontWeight:    900,
    letterSpacing: "clamp(-0.04em, -0.055em, -0.03em)",
    lineHeight:    0.92,
    margin:        0,
    fontFamily:    '"Arial Black", "Helvetica Neue", Arial, sans-serif',
  };

  return (
    <section
      style={{
        background:     "black",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        padding:        "clamp(5.5rem, 6vw, 4rem) clamp(1rem, 4vw, 2rem)",
        position:       "relative",
        overflow:       "hidden",
        fontFamily:     '"Arial Black", "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* grain overlay */}
      <div
        style={{
          position:        "absolute",
          inset:           0,
          opacity:         0.028,
          pointerEvents:   "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize:  "200px 200px",
        }}
      />

      <div
        style={{
          position:  "relative",
          zIndex:    1,
          textAlign: "center",
          width:     "100%",
          maxWidth:  "clamp(320px, 92%, 1100px)",
        }}
      >
        {/* LET'S */}
        <div
          style={{
            ...bigType,
            color:         "rgba(255,255,255,0.13)",
            fontSize:      "clamp(3.2rem, 7vw, 7rem)",
            paddingBottom: "clamp(0.04em, 0.8vw, 0.12em)",
          }}
        >
          LET&apos;S
        </div>

        {/* GRAY flipping word + dashes */}
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            gap:            "clamp(0.15em, 0.7vw, 0.28em)",
            flexWrap:       "wrap",
            minHeight:      "1.15em",
          }}
        >
                <FlipRow
            word={curGray}
            color="rgba(150,156,168,0.88)"
            style={bigType}
          />

          
        </div>

        {/* WHITE flipping word */}
        <div style={{ minHeight: "1.15em", paddingTop: "clamp(0.04em, 0.6vw, 0.1em)" }}>
          <FlipRow
            word={curWhite}
            color="#ffffff"
            style={bigType}
          />
        </div>

        {/* description */}
        <p
          style={{
            marginTop:   "clamp(1rem, 3.5vw, 2rem)",
            color:       "rgba(255,255,255,0.45)",
            fontSize:    "clamp(0.9rem, 2.2vw, 1.25rem)",
            lineHeight:  1.65,
            maxWidth:    "clamp(300px, 88%, 540px)",
            marginLeft:  "auto",
            marginRight: "auto",
            fontFamily:  '"Helvetica Neue", Arial, sans-serif',
            fontWeight:  400,
          }}
        >
          Master the Art of Defense. Empowering the next generation of Cybersecurity and Development experts.
        </p>

        {/* Course tags */}
        <div
          style={{
            display:         "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap:             "12px",
            marginTop:       "1.5rem",
            maxWidth:        "750px",
            marginInline:    "auto",
          }}
        >
          <Carouselcourses />
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
            <FormModal label="Start Hacking"  />

          <a
            href="/courses"
            style={{
              display:        "inline-block",
              marginTop:      "clamp(1.2rem, 4vw, 2rem)",
              background:     "#ffffff",
              color:          "black",
              fontWeight:     800,
              fontSize:       "clamp(0.9rem, 2.2vw, 1.1rem)",
              padding:        "clamp(0.75rem, 2vw, 1rem) clamp(1.6rem, 5vw, 2.4rem)",
              borderRadius:   9999,
              textDecoration: "none",
              fontFamily:     '"Helvetica Neue", Arial, sans-serif',
              transition:     "transform .25s ease, box-shadow .25s ease",
              boxShadow:      "0 3px 16px rgba(255,30,0,0.6)",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.07)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(255,30,0,0.75)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)";    e.currentTarget.style.boxShadow = "0 3px 16px rgba(255,30,0,0.6)"; }}
          >
            Explore Courses
          </a>
        </div>

      </div>
    </section>
  );
}