import { useState } from "react";

// ─────────────────────────────────────────────
//  NihacsForm — Tailwind CSS version
//  nihacs.com | Black & Red-600 theme
// ─────────────────────────────────────────────

export function NihacsForm({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap');
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
        .font-mono-nihacs { font-family: 'Space Mono', monospace; }
        .nihacs-input {
          background: #0d0d0d;
          border: 1px solid #222;
          color: #fff;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .nihacs-input::placeholder { color: #333; }
        .nihacs-input:focus {
          outline: none;
          border-color: #dc2626;
          box-shadow: 0 0 0 2px rgba(220,38,38,0.15);
        }
        .nihacs-btn-submit { transition: background 0.18s, transform 0.12s; }
        .nihacs-btn-submit:hover { background: #b91c1c; transform: translateY(-1px); }
        .nihacs-btn-submit:active { transform: translateY(0); }
        .pop-in { animation: popIn 0.35s cubic-bezier(.34,1.56,.64,1) both; }
        @keyframes popIn {
          from { transform: scale(0.6); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>

   <div className="relative w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-sm p-8 shadow-2xl"
  style={{ borderTop: "4px solid #dc2626" }}>

  {/* Close button */}
  {onClose && (
    <button
      onClick={onClose}
      className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-neutral-800 text-neutral-500 rounded-sm hover:border-red-600 hover:text-red-600 transition-colors text-sm font-mono-nihacs"
    >✕</button>
  )}

  {submitted ? (
    <div className="flex flex-col items-center text-center py-6">
      <div className="pop-in w-14 h-14 rounded-full border-2 border-red-600 flex items-center justify-center text-red-600 text-2xl mb-5">✓</div>
      <h3 className="font-bebas text-white text-3xl tracking-widest mb-2">Message Received</h3>
      <p className="font-mono-nihacs text-neutral-500 text-xs leading-relaxed mb-8">We'll get back to you shortly.</p>
      <button onClick={() => setSubmitted(false)}
        className="nihacs-btn-submit w-full bg-red-600 text-white font-bebas tracking-widest text-lg py-3 rounded-sm">
        Send Another
      </button>
    </div>
  ) : (
    /* ── Landscape: side-by-side | Portrait: stacked ── */
    <div className="flex flex-col md:flex-row md:gap-10">

      {/* LEFT — Header + branding */}
      <div className="flex flex-col justify-center md:w-2/5 mb-6 md:mb-0">
        <p className="font-mono-nihacs text-red-600 text-xs tracking-widest uppercase mb-1">nihacs.com</p>
        <h2 className="font-bebas text-white text-4xl md:text-5xl tracking-wide leading-none mb-4">Get In Touch</h2>

        {/* Red divider — horizontal on mobile, vertical on desktop */}
        <div className="md:hidden h-px w-full mb-4" style={{ background: "linear-gradient(90deg,#dc2626 0%,transparent 100%)" }} />
        <div className="hidden md:block w-px self-stretch absolute left-[40%]" style={{ background: "linear-gradient(180deg,#dc2626 0%,transparent 100%)", height: "80%" }} />

        <p className="font-mono-nihacs text-neutral-500 text-xs leading-relaxed hidden md:block">
          Have a question or project in mind? Fill out the form and we'll get back to you shortly.
        </p>

        <div className="hidden md:flex items-center gap-2 mt-6">
          <div className="w-2 h-2 rounded-full bg-red-600" />
          <span className="font-mono-nihacs text-neutral-600 text-xs tracking-widest">HACKING AND CYBER SECURITY</span>
        </div>
      </div>

      {/* RIGHT — Form fields */}
      <div className="md:w-3/5">
        <form onSubmit={submit} className="space-y-4">

          {/* Name + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-mono-nihacs block text-red-600 text-xs tracking-widest uppercase mb-1.5">Name</label>
              <input name="name" required placeholder="John Doe" value={form.name} onChange={handle}
                className="nihacs-input font-mono-nihacs w-full px-3 py-2.5 text-sm rounded-sm" />
            </div>
            <div>
              <label className="font-mono-nihacs block text-red-600 text-xs tracking-widest uppercase mb-1.5">Phone</label>
              <input name="phone" type="tel" placeholder="+91 00000 00000" value={form.phone} onChange={handle}
                className="nihacs-input font-mono-nihacs w-full px-3 py-2.5 text-sm rounded-sm" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="font-mono-nihacs block text-red-600 text-xs tracking-widest uppercase mb-1.5">Email</label>
            <input name="email" type="email" required placeholder="you@email.com" value={form.email} onChange={handle}
              className="nihacs-input font-mono-nihacs w-full px-3 py-2.5 text-sm rounded-sm" />
          </div>

          {/* Message */}
          <div>
            <label className="font-mono-nihacs block text-red-600 text-xs tracking-widest uppercase mb-1.5">Message</label>
            <textarea name="message" rows={3} placeholder="Tell us about your project..." value={form.message} onChange={handle}
              className="nihacs-input font-mono-nihacs w-full px-3 py-2.5 text-sm rounded-sm resize-y" />
          </div>

          {/* Submit */}
          <button type="submit"
            className="nihacs-btn-submit w-full bg-red-600 text-white font-bebas tracking-widest text-lg py-3 rounded-sm mt-2">
            Send Message →
          </button>

          <p className="font-mono-nihacs text-center text-neutral-700 text-xs tracking-widest pt-1">
            © nihacs.com — All rights reserved
          </p>
        </form>
      </div>

    </div>
  )}
</div>
    </>
  );
}

// ─────────────────────────────────────────────
//  FormModal — overlay trigger
//  Drop <FormModal /> on ANY button on your site
// ─────────────────────────────────────────────

export function FormModal({ label = "Contact Us" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
    <button
  onClick={() => setOpen(true)}
  style={{
    display:        "inline-block",
    marginTop:      "clamp(1.2rem, 4vw, 2rem)",
    background:     "#ff1e00",
    color:          "white",
    fontWeight:     800,
    fontSize:       "clamp(0.9rem, 2.2vw, 1.1rem)",
    padding:        "clamp(0.75rem, 2vw, 1rem) clamp(1.6rem, 5vw, 2.4rem)",
    borderRadius:   9999,
    border:         "none",
    cursor:         "pointer",
    fontFamily:     '"Helvetica Neue", Arial, sans-serif',
    transition:     "transform .25s ease, box-shadow .25s ease",
    boxShadow:      "0 3px 16px rgba(255,30,0,0.6)",
  }}
  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.07)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(255,30,0,0.75)"; }}
  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)";    e.currentTarget.style.boxShadow = "0 3px 16px rgba(255,30,0,0.6)"; }}
>
  {label}
</button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/85"
          style={{ animation: "fadeIn 0.2s ease" }}
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <NihacsForm onClose={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────
//  Default export — preview
// ─────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-12 p-10">
      <div className="flex flex-col items-center gap-3">
        <p className="font-mono-nihacs text-neutral-600 text-xs tracking-widest uppercase">Modal trigger — use anywhere</p>
        <FormModal label="Contact Us →" />
      </div>
      <NihacsForm />
    </div>
  );
}