'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const menuItems = [
    { name: 'Our Courses', href: '/courses' },
    { name: 'About', href: '/about-us' },
    { name: 'Blog', href: '/blog' },
    { name: 'Get in touch!', href: '/contact' },
  ];

  const headingStyle = {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontWeight: 900,
    letterSpacing: '-0.05em',
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isMenuOpen ? 'bg-transparent' : 'bg-black/95 backdrop-blur-sm'
        }`}
      >
        <nav className="container mx-auto px-4 md:px-6 py-4 md:py-5">
          <div className="flex items-center justify-between relative">

            {/* Left — Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                <img
                  src="/logo/logo.png"
                  alt="Brand Logo"
                  className="h-9 sm:h-10 w-auto max-w-[140px] sm:max-w-[160px]"
                />
              </Link>
            </div>

            {/* Center — Animated circle logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link href="/" className="block">
                <div
                  className="rounded-full overflow-hidden shadow-lg"
                  style={{ width: 'clamp(3.2rem, 7vw, 6rem)', height: 'clamp(3.2rem, 7vw, 6rem)' }}
                >
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                    <source src="/gif/gif1.mp4" type="video/mp4" />
                  </video>
                </div>
              </Link>
            </div>

            {/* Right — Desktop buttons + hamburger */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">

              {/* Desktop only buttons */}
              <Link
                href="/blog"
                className="hidden md:inline-flex px-5 py-2.5 rounded-full font-semibold bg-white text-black hover:bg-[#ff1e00] hover:text-white transition-colors duration-300 text-base whitespace-nowrap"
                style={headingStyle}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="hidden md:inline-flex px-5 py-2.5 rounded-full font-semibold bg-white text-black hover:bg-[#ff1e00] hover:text-white transition-colors duration-300 text-base whitespace-nowrap"
                style={headingStyle}
              >
                Get in touch!
              </Link>

              {/* Hamburger — always visible */}
              <button
                onClick={toggleMenu}
                className="w-10 h-10 sm:w-11 sm:h-11 bg-[#ff1e00] rounded-full flex items-center justify-center hover:bg-white transition-colors focus:outline-none relative z-[60] flex-shrink-0"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                  <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-0' : ''}`} />
                  <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                </div>
              </button>
            </div>

          </div>
        </nav>
      </header>

      {/* Full-page overlay menu */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-all duration-500 ease-in-out flex flex-col ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex-1 flex items-center justify-center px-6">
          <nav className="text-center w-full max-w-4xl">
            <ul className="space-y-8 sm:space-y-10 md:space-y-8">
              {menuItems.map((item, index) => (
                <li
                  key={item.name}
                  style={{ transitionDelay: isMenuOpen ? `${index * 80}ms` : '0ms' }}
                  className={`transform transition-all duration-500 ${
                    isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <Link
                    href={item.href}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white hover:text-[#ff1e00] transition-colors duration-300 block py-1"
                    style={headingStyle}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/YOUR_PHONE_NUMBER"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
        style={{ backgroundColor: '#25D366' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-7 h-7"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
};

export default Header;