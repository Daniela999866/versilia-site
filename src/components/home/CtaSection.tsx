'use client';
// src/components/home/CtaSection.tsx
import Link from 'next/link';
import { Calendar, MessageCircle } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/villa/villa-versilia-giardino-terrazza-fiori.jpg')` }}
      />
      <div className="absolute inset-0 bg-hero-overlay-side" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-accent italic text-gold-300 text-xl mb-4">Pronti a partire?</p>
        <h2 className="font-display text-4xl md:text-6xl text-white mb-6 leading-tight">
          La tua estate in Versilia<br />inizia qui
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
          Prenota direttamente con noi senza commissioni. Risposta garantita entro 2 ore.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/prenotazione"
            className="flex items-center justify-center gap-2 px-10 py-4 bg-gold-500 text-white font-bold text-sm tracking-widest uppercase hover:bg-gold-400 transition-all duration-300 shadow-warm-lg hover:-translate-y-1"
          >
            <Calendar className="w-4 h-4" />
            Prenota Ora
          </Link>
          <a
            href="https://wa.me/393755455596?text=Ciao!%20Vorrei%20informazioni%20su%20Villa%20Versilia%20🏡"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-10 py-4 bg-green-500 text-white font-bold text-sm tracking-widest uppercase hover:bg-green-400 transition-all duration-300 hover:-translate-y-1"
          >
            <MessageCircle className="w-4 h-4" />
            Scrivici su WhatsApp
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          {[
            { icon: '🔒', text: 'Pagamento sicuro Stripe' },
            { icon: '💸', text: 'Zero commissioni' },
            { icon: '⚡', text: 'Risposta in 2 ore' },
            { icon: '❤️', text: 'Ospiti soddisfatti' },
          ].map((b) => (
            <div key={b.text} className="flex items-center gap-2 text-white/70 text-sm">
              <span>{b.icon}</span>
              <span>{b.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
