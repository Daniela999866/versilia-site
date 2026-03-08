'use client';
// src/components/home/AboutSection.tsx
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

const features = [
  '3 camere da letto confortevoli',
  '2 bagni completi',
  'Soggiorno luminoso',
  'Cucina completamente attrezzata',
  'Giardino privato con barbecue',
  'Area pranzo all\'aperto',
  'Wi-Fi gratuito',
  'Aria condizionata',
  'Lavatrice',
  'Parcheggio privato 2 auto',
  '250 metri dalla spiaggia',
  'Ideale per 6–8 persone',
];

export default function AboutSection() {
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
    <section ref={ref} className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image side */}
          <div
            className={`relative transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            {/* Main image */}
            <div className="relative aspect-[4/3] overflow-hidden shadow-warm-lg">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url('/images/villa/villa-versilia-esterno-balcone-blu.jpg')` }}
              />
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -right-6 bg-gold-500 text-white p-6 shadow-warm-lg hidden md:block">
              <div className="font-display text-4xl font-bold">250m</div>
              <div className="text-gold-200 text-sm font-bold tracking-widest uppercase mt-1">Dal mare</div>
            </div>
            {/* Decorative border */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-gold-200 -z-10" />
          </div>

          {/* Text side */}
          <div
            className={`transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
          >
            <p className="section-subtitle mb-3">La nostra villa</p>
            <h2 className="section-title mb-6">
              Un'oasi di relax<br />nel cuore della Versilia
            </h2>

            <p className="text-gray-500 leading-relaxed mb-4">
              Villa Versilia è un'accogliente casa vacanze situata a circa 250 metri dal mare,
              nel cuore della splendida Versilia, ideale per una vacanza all'insegna del relax
              tra mare e comfort.
            </p>
            <p className="text-gray-500 leading-relaxed mb-6">
              La villa dispone di 3 camere da letto, 2 bagni, un luminoso soggiorno e una
              cucina completamente attrezzata — perfetta per soggiorni in famiglia o con amici.
              All'esterno, un ampio giardino privato con zona barbecue è ideale per pranzi e
              cene all'aperto, o per rilassarsi dopo una giornata al mare.
            </p>

            {/* Feature checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
              {features.map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-olive-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-olive-600" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-gray-600">{f}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/la-villa" className="btn-primary">
                Esplora la Villa
              </Link>
              <Link href="/disponibilita" className="btn-secondary">
                Controlla Disponibilità
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
