// src/app/(site)/la-villa/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import VillaGallery from '@/components/villa/VillaGallery';
import VillaRules from '@/components/villa/VillaRules';

export const metadata: Metadata = {
  title: 'La Villa – Spazi, Camere e Servizi | Villa Versilia Relais',
  description: 'Scopri Villa Versilia Relais: 3 camere, 2 bagni, cucina attrezzata, giardino privato con barbecue a Lido di Camaiore. Fino a 8 ospiti a 250m dal mare.',
};

const rooms = [
  {
    title: 'Camera Azzurra — Matrimoniale + Castello',
    desc: 'La camera più grande della villa. Letto matrimoniale king-size e letto a castello a doppio posto, ideale per famiglie con figli. Aria condizionata, TV a parete, armadio.',
    features: ['Letto matrimoniale', 'Letto a castello (2p)', 'Aria condizionata', 'TV a parete'],
    img: '/images/villa/villa-versilia-camera-blu-matrimoniale-castello.jpg',
  },
  {
    title: 'Camera con Letti Singoli',
    desc: 'Camera luminosa con due letti singoli, tende oscuranti e aria condizionata. Perfetta per bambini o amici. TV a parete.',
    features: ['2 letti singoli', 'Tende oscuranti', 'Aria condizionata', 'TV a parete'],
    img: '/images/villa/villa-versilia-camera-singoli-tende-rosse.jpg',
  },
  {
    title: 'Camera con Letto a Castello in Legno',
    desc: 'Camera accogliente con letto a castello in legno massello, amato dai bambini. Aria condizionata e ampio armadio.',
    features: ['Letto a castello legno', 'Aria condizionata', 'Armadio', 'Luminosa'],
    img: '/images/villa/villa-versilia-camera-letto-castello-legno.jpg',
  },
];

const spaces = [
  {
    title: 'Soggiorno',
    desc: 'Ampio soggiorno con divano, Smart TV, porta scorrevole in legno e scala in marmo con ringhiera decorativa. Aria condizionata.',
    img: '/images/villa/villa-versilia-soggiorno-completo.jpg',
  },
  {
    title: 'Cucina',
    desc: 'Cucina completamente attrezzata con piano cottura a gas, forno, lavastoviglie, lavatrice, microonde, bollitore e macchina del caffè. Tavolo da pranzo 6-8 posti.',
    img: '/images/villa/villa-versilia-cucina-tavolo-pranzo.jpg',
  },
  {
    title: 'Bagno Principale',
    desc: 'Bagno con doccia ampia e piastrelle azzurre, WC, bidet e scaldasalviette. Asciugamani inclusi.',
    img: '/images/villa/villa-versilia-bagno-doccia-blu.jpg',
  },
  {
    title: 'Terrazza & Giardino',
    desc: 'Grande giardino privato con zona barbecue, tavolo pranzo esterno, divani rattan, panchine, ombrelloni e lettini sotto gli ulivi. Completamente recintato.',
    img: '/images/villa/villa-versilia-giardino-zona-relax-rattan.jpg',
  },
];

export default function LaVillaPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative h-[55vh] min-h-[420px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/villa/villa-versilia-esterno-facciata.jpg"
            alt="Villa Versilia – Facciata esterna con persiane blu" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-overlay-full" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <span className="font-accent italic text-gold-300 text-base block mb-2">
            Via Adolfo Massei 28 · Lido di Camaiore
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-semibold text-white">La Villa</h1>
        </div>
      </section>

      {/* ── DESCRIZIONE ── */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="section-subtitle mb-3">La struttura</p>
              <h2 className="section-title mb-6">250 metri<br />da un mare perfetto</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Villa Versilia Relais è una casa vacanze indipendente su due livelli, immersa
                  in un ampio giardino privato nel quartiere residenziale di Lido di Camaiore,
                  a soli 250 metri dalla spiaggia.
                </p>
                <p>
                  La proprietà occupa un lotto d'angolo, con accesso carrabile da Via Adolfo Massei
                  (civico 28) e parcheggio privato per due automobili all'interno della recinzione.
                  Il giardino, completamente recintato, garantisce privacy assoluta.
                </p>
                <p>
                  Gli interni combinano comfort contemporaneo e atmosfera mediterranea:
                  cucina in legno naturale con piastrelle salvia, soggiorno con porta scorrevole
                  e scala in marmo con ringhiera decorativa, camere con persiane blu e biancheria curata.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { src: '/images/villa/villa-versilia-targa-ingresso.jpg', alt: 'Targa Villa Versilia' },
                { src: '/images/villa/villa-versilia-balcone-ringhiera-oro.jpg', alt: 'Balcone con ringhiera dorata' },
                { src: '/images/villa/villa-versilia-giardino-lettini-olivi.jpg', alt: 'Giardino con ulivi' },
                { src: '/images/villa/villa-versilia-scala-interna-marmo.jpg', alt: 'Scala interna in marmo' },
              ].map((img) => (
                <img key={img.src} src={img.src} alt={img.alt}
                  className="w-full aspect-square object-cover shadow-card" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CAMERE ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-3">Camere da letto</p>
            <h2 className="section-title">3 camere · fino a 8 ospiti</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rooms.map((room, i) => (
              <div key={i} className="bg-cream-100 overflow-hidden shadow-card group hover:shadow-card-hover transition-shadow">
                <div className="relative h-56 overflow-hidden">
                  <img src={room.img} alt={room.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-brand-500 text-white text-xs font-bold tracking-widest uppercase px-3 py-1">
                      Camera {i + 1}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">{room.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{room.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {room.features.map((f) => (
                      <span key={f} className="text-xs bg-white border border-line-300 text-gray-600 px-2 py-1">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPAZI ── */}
      <section className="py-20" style={{ background: '#F5EDD8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-3">Gli ambienti</p>
            <h2 className="section-title">Ogni spazio, curato</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {spaces.map((space, i) => (
              <div key={i} className="bg-white flex gap-0 overflow-hidden shadow-card group hover:shadow-card-hover transition-shadow">
                <div className="relative w-40 flex-shrink-0 overflow-hidden">
                  <img src={space.img} alt={space.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">{space.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{space.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERIA ── */}
      <VillaGallery />

      {/* ── REGOLE ── */}
      <VillaRules />

      {/* ── CTA ── */}
      <section className="py-16 bg-deep-sea text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-display text-3xl font-semibold text-white mb-4">
            Pronto a prenotare?
          </h2>
          <p className="text-white/60 mb-8 text-sm">
            Direttamente con il proprietario · Nessuna commissione
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/prenotazione"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-white text-xs font-bold tracking-widest uppercase transition-all shadow-gold">
              ✦ Prenota ora
            </Link>
            <a href="https://wa.me/393755455596"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/25 text-white hover:bg-white/10 text-xs font-bold tracking-widest uppercase transition-all">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
