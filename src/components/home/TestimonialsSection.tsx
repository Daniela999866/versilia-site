'use client';
// src/components/home/TestimonialsSection.tsx
import { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Famiglia Rossi',
    origin: 'Milano',
    stars: 5,
    date: 'Agosto 2024',
    text: 'Vacanza fantastica! La villa è esattamente come descritta, anzi ancora più bella. Il giardino è enorme e il barbecue funziona perfettamente. I bambini hanno adorato gli spazi. Il mare è a soli 3 minuti a piedi. Torneremo sicuramente l\'anno prossimo!',
    avatar: 'FR',
  },
  {
    name: 'Sara & Marco',
    origin: 'Firenze',
    stars: 5,
    date: 'Luglio 2024',
    text: 'Location perfetta, casa pulitissima e dotata di tutto il necessario. Abbiamo trascorso due settimane meravigliose. La cucina è ben attrezzata, il parcheggio privato è comodissimo. Proprietari disponibili e gentili. Consigliatissimo!',
    avatar: 'SM',
  },
  {
    name: 'I Bianchi',
    origin: 'Bologna',
    stars: 5,
    date: 'Settembre 2024',
    text: 'Casa bellissima in posizione ottimale. Siamo stati in 6 e avevamo tutto lo spazio necessario. L\'aria condizionata è fondamentale in estate e funziona alla grande. Il giardino privato ci ha permesso di fare ottime grigliate serali.',
    avatar: 'IB',
  },
  {
    name: 'Giulia T.',
    origin: 'Roma',
    stars: 5,
    date: 'Giugno 2024',
    text: 'Prima vacanza a Lido di Camaiore e non potevo scegliere meglio. La villa ha tutto: spazio, comfort, posizione. La spiaggia è vicinissima e il centro è facilmente raggiungibile a piedi. Super consigliata per famiglie!',
    avatar: 'GT',
  },
];

const colors = ['bg-brand-500', 'bg-gold-500', 'bg-olive-500', 'bg-terra-500'];

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-deep-sea relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand-500/30 to-transparent" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 border border-gold-300 rotate-12" />
        <div className="absolute bottom-10 right-10 w-48 h-48 border border-gold-300 -rotate-6" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-accent italic text-gold-400 text-xl mb-3">Cosa dicono di noi</p>
          <h2 className="font-display text-3xl md:text-5xl text-white mb-4">
            Ospiti felici ogni estate
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-sand-400 text-gold-400" />
              ))}
            </div>
            <span className="text-gray-400 text-sm ml-2">5.0 · Oltre 50 recensioni</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`bg-gray-800/60 border border-gray-700 p-7 backdrop-blur-sm transition-all duration-700 hover:border-gold-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-sand-400 text-gold-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-300 text-sm leading-relaxed mb-5 font-body">
                "{t.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-700">
                <div className={`w-9 h-9 ${colors[i]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.origin} · {t.date}</div>
                </div>
                <div className="ml-auto text-xs text-gray-500 font-accent italic">
                  Ospite verificato ✓
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
