'use client';
// src/components/home/HighlightsSection.tsx
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const highlights = [
  {
    icon: '🌊',
    title: '250m dal Mare',
    description:
      'La spiaggia è a soli pochi minuti a piedi. Svegliatevi e andate al mare senza pensieri, ogni mattina.',
    color: 'bg-brand-50 border-brand-200',
    iconBg: 'bg-brand-100',
  },
  {
    icon: '🌿',
    title: 'Giardino Privato',
    description:
      'Ampio spazio verde esclusivo con zona relax, area pranzo all\'aperto e barbecue per cene indimenticabili.',
    color: 'bg-olive-50 border-olive-200',
    iconBg: 'bg-olive-100',
  },
  {
    icon: '🏠',
    title: 'Comfort Completo',
    description:
      'Wi-Fi, aria condizionata, lavatrice, cucina attrezzata. Tutto il necessario per sentirsi a casa.',
    color: 'bg-cream-100 border-gold-200',
    iconBg: 'bg-cream-200',
  },
  {
    icon: '🚗',
    title: 'Parcheggio Privato',
    description:
      'Posto auto privato per 2 veicoli incluso nel soggiorno. Nessun problema di parcheggio in estate.',
    color: 'bg-terra-50 border-terra-200',
    iconBg: 'bg-terra-100',
  },
];

export default function HighlightsSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="highlights" ref={ref} className="py-20 md:py-28 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="section-subtitle mb-3">Perché sceglierci</p>
          <h2 className="section-title">La villa perfetta per la tua vacanza</h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-base">
            Villa Versilia combina posizione privilegiata, spazi ampi e tutti i comfort moderni
            per regalarti una vacanza senza compromessi in Toscana.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map((item, i) => (
            <div
              key={item.title}
              className={`p-6 border ${item.color} transition-all duration-700 hover:-translate-y-1 hover:shadow-card-hover ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className={`w-12 h-12 ${item.iconBg} flex items-center justify-center text-2xl mb-4`}>
                {item.icon}
              </div>
              <h3 className="font-display text-xl text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <Link href="/prenotazione" className="btn-primary mr-4">
            Verifica Disponibilità
          </Link>
          <Link href="/la-villa" className="btn-secondary">
            Scopri tutti i dettagli
          </Link>
        </div>
      </div>
    </section>
  );
}
