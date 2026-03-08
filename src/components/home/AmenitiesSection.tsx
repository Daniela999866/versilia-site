'use client';
// src/components/home/AmenitiesSection.tsx
import { useEffect, useRef, useState } from 'react';

const amenityGroups = [
  {
    title: 'Alloggio',
    icon: '🏠',
    items: ['3 camere da letto', '2 bagni completi', 'Soggiorno luminoso', 'Cucina attrezzata', 'Sala da pranzo', 'Fino a 8 ospiti'],
  },
  {
    title: 'Comfort',
    icon: '❄️',
    items: ['Aria condizionata', 'Wi-Fi gratuito', 'Lavatrice', 'Televisore', 'Biancheria inclusa', 'Asciugacapelli'],
  },
  {
    title: 'Spazi Esterni',
    icon: '🌿',
    items: ['Giardino privato', 'Zona barbecue', 'Area pranzo esterna', 'Spazio relax', 'Ombrelloni & sdraio', 'Illuminazione esterna'],
  },
  {
    title: 'Parcheggio & Posizione',
    icon: '📍',
    items: ['Parcheggio privato x2', '250m dalla spiaggia', 'Ristoranti vicini', 'Stabilimenti balneari', 'Centro Lido di Camaiore', 'Accessibile a piedi'],
  },
];

export default function AmenitiesSection() {
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
    <section ref={ref} className="py-20 md:py-28 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="section-subtitle mb-3">Tutto incluso</p>
          <h2 className="section-title">Servizi & Dotazioni</h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto text-base">
            Abbiamo pensato a tutto per rendere il tuo soggiorno confortevole e senza pensieri.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenityGroups.map((group, i) => (
            <div
              key={group.title}
              className={`bg-white p-7 shadow-card border-t-4 border-gold-400 transition-all duration-700 hover:shadow-card-hover ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-3xl mb-3">{group.icon}</div>
              <h3 className="font-display text-lg text-gray-900 mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1 h-1 bg-gold-400 rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Nota aggiuntiva */}
        <div className={`mt-10 p-6 bg-brand-50 border border-brand-200 flex flex-col md:flex-row items-center gap-4 transition-all duration-700 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-4xl">🏖️</div>
          <div>
            <h4 className="font-display text-lg text-gray-900 mb-1">
              La spiaggia è a 250 metri
            </h4>
            <p className="text-gray-500 text-sm">
              Da Villa Versilia raggiungi il mare a piedi in soli 3 minuti. Lido di Camaiore offre
              spiagge meravigliose, stabilimenti attrezzati e una vivace passeggiata sul lungomare.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
