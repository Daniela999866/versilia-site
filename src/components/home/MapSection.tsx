'use client';
// src/components/home/MapSection.tsx
import { MapPin, Navigation, Clock, Car } from 'lucide-react';

const distances = [
  { icon: '🏖️', place: 'Spiaggia', distance: '250m', time: '3 min a piedi' },
  { icon: '🍽️', place: 'Ristoranti', distance: '100m', time: '2 min a piedi' },
  { icon: '🛒', place: 'Supermercato', distance: '500m', time: '6 min a piedi' },
  { icon: '🚂', place: 'Stazione FS', distance: '2.5km', time: '5 min in auto' },
  { icon: '✈️', place: 'Aeroporto Pisa', distance: '35km', time: '30 min in auto' },
  { icon: '🏛️', place: 'Centro Lucca', distance: '30km', time: '25 min in auto' },
];

export default function MapSection() {
  return (
    <section className="py-20 md:py-28 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <p className="section-subtitle mb-3">Dove siamo</p>
          <h2 className="section-title">Posizione Privilegiata</h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto">
            Via Adolfo Massei 28, Lido di Camaiore — nel cuore della Versilia, a due passi dal mare.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="relative h-[420px] overflow-hidden shadow-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2854.1!2d10.1725!3d43.9400!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sVia+Adolfo+Massei+28%2C+Lido+di+Camaiore!5e0!3m2!1sit!2sit!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Villa Versilia - Via Adolfo Massei 28, Lido di Camaiore"
              />
              {/* Address overlay */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-3 shadow-card flex items-start gap-2 max-w-xs">
                <MapPin className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-bold text-sm text-gray-800">Villa Versilia Relais</div>
                  <div className="text-xs text-gray-500">Via Adolfo Massei 28<br />Lido di Camaiore (LU)</div>
                </div>
              </div>
            </div>

            {/* Get directions CTA */}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Via+Adolfo+Massei+28+Lido+di+Camaiore"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full mt-3 py-3 bg-brand-600 text-white text-sm font-bold tracking-widest uppercase hover:bg-brand-700 transition-colors duration-200"
            >
              <Navigation className="w-4 h-4" />
              Ottieni indicazioni stradali
            </a>
          </div>

          {/* Distances */}
          <div>
            <h3 className="font-display text-xl text-gray-900 mb-5">Distanze utili</h3>
            <div className="space-y-3">
              {distances.map((d) => (
                <div
                  key={d.place}
                  className="flex items-center gap-4 p-4 bg-white shadow-card hover:shadow-card-hover transition-shadow"
                >
                  <span className="text-2xl">{d.icon}</span>
                  <div className="flex-1">
                    <div className="font-bold text-sm text-gray-800">{d.place}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {d.time}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gold-600 text-sm">{d.distance}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Car info */}
            <div className="mt-4 p-4 bg-cream-100 border border-gold-200 flex items-start gap-3">
              <Car className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-500 leading-relaxed">
                <strong className="text-gray-700">Parcheggio privato incluso</strong> per 2 auto,
                direttamente in villa. Nessun problema nei mesi estivi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
