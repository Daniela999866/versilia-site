'use client';
// src/components/layout/Header.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone } from 'lucide-react';

const NAV_LINKS = [
  { href: '/la-villa',      label: 'La Villa' },
  { href: '/la-villa#galleria', label: 'Galleria' },
  { href: '/prenotazione',  label: 'Disponibilità' },
];

export default function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ${
          scrolled
            ? 'bg-brand-800 shadow-brand py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

          {/* ── LOGO ── */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className={`relative transition-all duration-300 ${scrolled ? 'w-9 h-9' : 'w-11 h-11'}`}>
              <Image
                src="/images/brand/logo.jpg"
                alt="Villa Versilia — Lido di Camaiore, Tuscany"
                fill
                className="object-contain rounded-sm"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-white font-semibold tracking-wide leading-none block"
                style={{ fontSize: scrolled ? '0.95rem' : '1.05rem' }}>
                Villa Versilia
              </span>
              <span className="font-accent italic text-gold-400 leading-none block"
                style={{ fontSize: scrolled ? '0.62rem' : '0.68rem' }}>
                Lido di Camaiore · Tuscany
              </span>
            </div>
          </Link>

          {/* ── NAV DESKTOP ── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-xs font-bold tracking-widest uppercase text-white/65 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── CTA + PHONE ── */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+393755455596"
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="font-bold tracking-wide">+39 375 545 5596</span>
            </a>
            <Link
              href="/prenotazione"
              className="flex items-center gap-2 px-5 py-2.5 bg-gold-500 hover:bg-gold-600 text-white text-xs font-bold tracking-widest uppercase transition-all duration-200 shadow-gold hover:shadow-gold-lg"
            >
              Prenota ora
            </Link>
          </div>

          {/* ── HAMBURGER ── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      <div className={`fixed inset-0 z-30 bg-brand-900 flex flex-col transition-all duration-300 md:hidden ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Logo top */}
        <div className="flex items-center gap-3 px-6 pt-8 pb-6 border-b border-white/10">
          <div className="relative w-12 h-12">
            <Image src="/images/brand/logo.jpg" alt="Villa Versilia" fill className="object-contain rounded-sm" />
          </div>
          <div>
            <span className="font-display text-white font-semibold text-lg block">Villa Versilia</span>
            <span className="font-accent italic text-gold-400 text-xs block">Lido di Camaiore · Tuscany</span>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-6 py-6 gap-1 flex-1">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between py-4 text-sm font-bold tracking-widest uppercase text-white/65 hover:text-white border-b border-white/10 transition-colors"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {link.label}
              <span className="text-white/20 text-xs">→</span>
            </Link>
          ))}
        </nav>

        {/* Mobile CTA */}
        <div className="px-6 pb-10 space-y-3">
          <a
            href="https://wa.me/393755455596"
            className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] text-white text-xs font-bold tracking-widest uppercase"
            onClick={() => setMenuOpen(false)}
          >
            💬 WhatsApp
          </a>
          <Link
            href="/prenotazione"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-4 bg-gold-500 hover:bg-gold-600 text-white text-xs font-bold tracking-widest uppercase"
          >
            ✦ Prenota ora
          </Link>
          <a
            href="tel:+393755455596"
            className="flex items-center justify-center gap-2 w-full py-3 text-white/40 text-xs font-bold tracking-widest uppercase"
          >
            <Phone className="w-3.5 h-3.5" />
            +39 375 545 5596
          </a>
        </div>
      </div>
    </>
  );
}
