"use client";

import Link from "next/link";
import { useState } from "react";

/* ── Modal ── */
function LegalModal({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      <div
        className="bg-[#0f0f0f] w-full sm:max-w-2xl lg:max-w-3xl max-h-[88vh] sm:max-h-[82vh] rounded-t-2xl sm:rounded-2xl border border-gray-800 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-gray-800 flex-shrink-0">
          <h2 className="text-white font-bold text-lg sm:text-xl">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2a2a2a] hover:bg-red-600 text-gray-400 hover:text-white transition-all duration-200 text-sm"
          >
            ✕
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-5 sm:px-8 py-6 text-gray-400 text-sm sm:text-base leading-relaxed space-y-5 flex-1">
          {children}
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-8 py-4 border-t border-gray-800 flex-shrink-0 text-center">
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-2.5 rounded-full text-sm transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Terms & Conditions ── */
function TermsContent() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      body: "By accessing and using NIHACS services, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.",
    },
    {
      title: "2. Course Enrollment",
      body: "Enrollment is subject to availability and completion of the registration process. We reserve the right to refuse enrollment at our sole discretion. Course fees must be paid in full before access is granted.",
    },
    {
      title: "3. Intellectual Property",
      body: "All course materials, content, logos, and resources provided by NIHACS are protected by copyright and intellectual property laws. Reproduction or distribution without explicit written permission is prohibited.",
    },
    {
      title: "4. Code of Conduct",
      body: "Students must use knowledge gained ethically and legally. Any use of skills for unauthorized access, malicious activities, or illegal purposes is strictly prohibited and will result in immediate termination of enrollment.",
    },
    {
      title: "5. Refund Policy",
      body: "Refund requests must be submitted within 7 days of enrollment. No refunds will be issued after course materials have been accessed or downloaded. Refunds are processed within 10 business days of approval.",
    },
    {
      title: "6. Disclaimer of Warranties",
      body: "NIHACS provides services on an 'as is' and 'as available' basis. We make no warranties, expressed or implied, regarding the accuracy, reliability, or completeness of our course content.",
    },
    {
      title: "7. Limitation of Liability",
      body: "NIHACS shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, even if we have been advised of the possibility of such damages.",
    },
    {
      title: "8. Governing Law",
      body: "These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of Indian courts.",
    },
    {
      title: "9. Modifications",
      body: "NIHACS reserves the right to modify these Terms at any time. Continued use of our services after changes constitutes acceptance. We encourage you to review these terms periodically.",
    },
    {
      title: "10. Contact",
      body: "For questions regarding these Terms and Conditions, please contact us at legal@nihacs.com.",
    },
  ];

  return (
    <>
      <p className="text-gray-500 text-xs">Last updated: January 1, 2026</p>
      <p>
        Please read these Terms and Conditions carefully before using{" "}
        <span className="text-white font-semibold">NIHACS</span> services. These
        terms govern your use of our platform and courses.
      </p>
      {sections.map((s, i) => (
        <div key={i}>
          <h3 className="text-white font-semibold mb-1">{s.title}</h3>
          <p>{s.body}</p>
        </div>
      ))}
    </>
  );
}

/* ── Footer ── */
const Footer = () => {
  const [modal, setModal] = useState(null);

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/nihacs.official?igsh=MWk3enp0anJpNmEwbw==",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/share/17w65RjHsW/?mibextid=wwXIfr",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@nihacs",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/nihacs",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Modals */}
      {modal === "terms" && (
        <LegalModal title="Terms & Conditions" onClose={() => setModal(null)}>
          <TermsContent />
        </LegalModal>
      )}

      {/* Footer - Added mt-20 for spacing + relative z-10 for proper stacking */}
      <footer className="bg-black text-white relative z-10 mt-2">
        {/* Red dot indicator */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-red-600 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          {/* Social Icons */}
          <div className="flex justify-center gap-3 sm:gap-4 mb-8">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2a2a2a] rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 flex-shrink-0"
                aria-label={social.name}
              >
                {social.icon}
              </Link>
            ))}
          </div>

          {/* Courses, Address & Quick Links */}
          <div className="bg-[#1a1a1a] rounded-2xl sm:rounded-3xl py-6 sm:py-8 px-4 sm:px-8 mb-8 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
              {/* Quick Links Column */}
              <div>
                <h3 className="text-red-600 text-sm font-semibold uppercase tracking-wider mb-4">
                  Our Company
                </h3>
                <ul className="space-y-2">
                  {[
                    { label: "Home", href: "/" },
                    { label: "About", href: "/about-us" },
                    { label: "Blog", href: "/blog" },
                    { label: "Contact", href: "/contact" },
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-red-600">›</span>
                      <Link
                        href={item.href}
                        className="text-gray-400 text-sm hover:text-red-600 transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Courses Column */}
              <div>
                <h3 className="text-red-600 text-sm font-semibold uppercase tracking-wider mb-4">
                  Our Courses
                </h3>
                <ul className="space-y-2">
                  {[
                    {
                      label: "Web Penetration Testing And Bug Bounty Hunting",
                      href: "/courses",
                    },
                    { label: "Basic Ethical Hacking", href: "/courses" },
                    { label: "Bachelor in Cybersecurity", href: "/courses" },
                    {
                      label: "Master in Cybersecurity And Ethical Hacking",
                      href: "/courses",
                    },
                    { label: "Diploma in Cybersecurity", href: "/courses" },
                  ].map((course, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">›</span>
                      <Link
                        href={course.href}
                        className="text-gray-400 text-sm hover:text-red-600 transition-colors"
                      >
                        {course.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Address Column */}
              <div>
                <h3 className="text-red-600 text-sm font-semibold uppercase tracking-wider mb-4">
                  Contact Us
                </h3>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-4 h-4 text-red-600 mt-0.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>
                      Savitri Cinema Complex, Block E, Greater Kailash II,
                      Greater Kailash, New Delhi, Delhi 110048
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-red-600 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"
                      />
                    </svg>
                    <a
                      href="tel:+917428594749"
                      className="hover:text-red-600 transition-colors"
                    >
                      +91 7428114918
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-red-600 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a
                      href="mailto:info@nihacs.com"
                      className="hover:text-red-600 transition-colors"
                    >
                      info@nihacs.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Brand + Map */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 mb-8">
            {/* Brand */}
            <div className="text-center lg:text-left flex-shrink-0">
              <img
                src="/logo/logo.png"
                alt="NIHACS"
                style={{
                  height: "clamp(3rem, 15vw, 10rem)",
                  width: "auto",
                  maxWidth: "100%",
                  objectFit: "contain",
                  display: "inline-block",
                }}
              />
            </div>

            {/* Map */}
            <div className="relative w-full lg:w-96 h-44 sm:h-52 lg:h-56 rounded-xl overflow-hidden shadow-lg group flex-shrink-0">
              <iframe
                src="https://www.google.com/maps?q=28.5415141,77.240201&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, pointerEvents: "none" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="NIHACS Location"
              />
              <a
                href="https://www.google.com/maps/place/National+Institute+of+Hacking+and+cyber+security+Institute/@28.5415141,77.240201,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 bg-black/40 hover:bg-black/10 transition-all duration-300 flex items-center justify-center"
              >
                <span className="text-white text-base font-semibold group-hover:opacity-0 transition-opacity duration-300 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  View Location
                </span>
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-gray-500">
            <p>Made in India © 2026</p>

            {/* Legal links */}
            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                href="/privacy-policy"
                className="hover:text-red-500 transition-colors duration-200 underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-700">|</span>
              <button
                onClick={() => setModal("terms")}
                className="hover:text-red-500 transition-colors duration-200 underline underline-offset-2 cursor-pointer"
              >
                Terms & Conditions
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;