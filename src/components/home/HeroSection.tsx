'use client';
// src/components/home/HeroSection.tsx
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, MapPin, Star, Users } from 'lucide-react';

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/villa/hero-main.jpg?nocache=20260314')`,
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/65" />
        {/* Warm tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-sand-900/10 via-transparent to-sea-900/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-20 pb-24 text-center">

        {/* Badge */}
        <div
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm border border-white/30 text-white text-xs font-bold tracking-widest uppercase mb-6">
            <MapPin className="w-3 h-3" />
            Lido di Camaiore · Versilia · Toscana
          </span>
        </div>

        {/* Title */}
        <h1
          className={`transition-all duration-700 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white text-shadow-lg max-w-5xl leading-tight mb-4 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '350ms' }}
        >
          Villa Versilia
        </h1>

        {/* Subtitle */}
        <p
          className={`transition-all duration-700 font-accent italic text-2xl md:text-3xl text-gold-200 mb-4 text-shadow ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '450ms' }}
        >
          Il tuo rifugio a 250 metri dal mare
        </p>

        {/* Description */}
        <p
          className={`transition-all duration-700 font-body text-white/80 text-base md:text-lg max-w-2xl leading-relaxed mb-10 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '550ms' }}
        >
          Un'accogliente casa vacanze nel cuore della splendida Versilia. Giardino privato,
          barbecue, aria condizionata e parcheggio — tutto quello che serve per una vacanza indimenticabile.
        </p>

        {/* Stats row */}
        <div
          className={`transition-all duration-700 flex flex-wrap justify-center gap-6 md:gap-10 mb-10 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '650ms' }}
        >
          {[
            { icon: '🛏', label: '3 Camere', sub: 'da letto' },
            { icon: '👥', label: '8–10 Ospiti', sub: 'massimo' },
            { icon: '🌊', label: '250m', sub: 'dal mare' },
            { icon: '🌿', label: 'Giardino', sub: 'privato' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl mb-0.5">{stat.icon}</div>
              <div className="text-white font-bold text-sm tracking-wide">{stat.label}</div>
              <div className="text-white/60 text-xs">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div
          className={`transition-all duration-700 flex flex-col sm:flex-row gap-4 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '750ms' }}
        >
          <Link
            href="/prenotazione"
            className="px-10 py-4 bg-gold-500 text-white font-bold text-sm tracking-widest uppercase hover:bg-gold-400 transition-all duration-300 shadow-gold-lg hover:-translate-y-1"
          >
            Prenota Ora
          </Link>
          <Link
            href="/la-villa"
            className="px-10 py-4 bg-white/15 backdrop-blur-sm border border-white/50 text-white font-bold text-sm tracking-widest uppercase hover:bg-white/25 transition-all duration-300"
          >
            Scopri la Villa
          </Link>
        </div>

        {/* Rating */}
        <div
          className={`transition-all duration-700 flex items-center gap-2 mt-8 ${visible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '900ms' }}
        >
          <div className="flex">
            {[1,2,3,4,5].map((i) => (
              <Star key={i} className="w-4 h-4 fill-sand-300 text-gold-300" />
            ))}
          </div>
          <span className="text-white/70 text-sm">Ospiti soddisfatti dal 2018</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-8 animate-bounce">
        <button
          onClick={() => document.getElementById('highlights')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-white/60 hover:text-white transition-colors"
          aria-label="Scorri verso il basso"
        >
          <ChevronDown className="w-7 h-7" />
        </button>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#fdfaf5" />
        </svg>
      </div>
    </section>
  );
}
