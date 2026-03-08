'use client';
// src/components/villa/VillaGallery.tsx - FOTO REALI

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export const GALLERY_IMAGES = [
  // ESTERNO
  { src: '/images/villa/villa-versilia-esterno-facciata.jpg',          alt: 'Villa Versilia - Facciata esterna con persiane blu',            category: 'Esterno' },
  { src: '/images/villa/villa-versilia-esterno-ingresso-targa.jpg',    alt: 'Villa Versilia - Ingresso con targa in ceramica',               category: 'Esterno' },
  { src: '/images/villa/villa-versilia-targa-ingresso.jpg',            alt: 'Villa Versilia - Targa decorativa n.28 Via Adolfo Massei',      category: 'Esterno' },
  { src: '/images/villa/villa-versilia-vista-aerea-mare.jpg',          alt: 'Villa Versilia - Vista aerea: posizione a 250m dal mare',       category: 'Esterno' },
  { src: '/images/villa/villa-versilia-esterno-lato-parcheggio.jpg',   alt: 'Villa Versilia - Parcheggio privato 2 auto incluso',            category: 'Esterno' },
  { src: '/images/villa/villa-versilia-esterno-balcone-blu.jpg',       alt: 'Villa Versilia - Esterno con balcone e caratteristiche persiane blu', category: 'Esterno' },
  { src: '/images/villa/villa-versilia-balcone-ringhiera-oro.jpg',     alt: 'Villa Versilia - Balcone con ringhiera dorata e porta blu',     category: 'Esterno' },
  { src: '/images/villa/villa-versilia-balcone-persiane-blu.jpg',      alt: 'Villa Versilia - Balcone superiore con persiane blu',           category: 'Esterno' },
  { src: '/images/villa/villa-versilia-balcone-esterno.jpg',           alt: 'Villa Versilia - Terrazza esterna superiore soleggiata',        category: 'Esterno' },
  // GIARDINO
  { src: '/images/villa/villa-versilia-giardino-terrazza-fiori.jpg',   alt: 'Villa Versilia - Terrazza con ombrelloni e fiori colorati',     category: 'Giardino' },
  { src: '/images/villa/villa-versilia-giardino-panchina-fiori.jpg',   alt: 'Villa Versilia - Giardino con panchina e gerani rosa',          category: 'Giardino' },
  { src: '/images/villa/villa-versilia-giardino-zona-relax-rattan.jpg', alt: 'Villa Versilia - Zona relax con divani rattan e tavolo pranzo', category: 'Giardino' },
  { src: '/images/villa/villa-versilia-giardino-lettini-relax.jpg',    alt: 'Villa Versilia - Zona lettini nel giardino privato',            category: 'Giardino' },
  { src: '/images/villa/villa-versilia-giardino-lettini-olivi.jpg',    alt: 'Villa Versilia - Lettini tra gli ulivi del giardino',           category: 'Giardino' },
  // SOGGIORNO
  { src: '/images/villa/villa-versilia-soggiorno-completo.jpg',        alt: 'Villa Versilia - Soggiorno luminoso con aria condizionata',     category: 'Soggiorno' },
  { src: '/images/villa/villa-versilia-soggiorno-tv-divano.jpg',       alt: 'Villa Versilia - Soggiorno con divano e parete decorativa',     category: 'Soggiorno' },
  { src: '/images/villa/villa-versilia-soggiorno-parete-tv.jpg',       alt: 'Villa Versilia - Soggiorno TV e decorazioni naturali',          category: 'Soggiorno' },
  { src: '/images/villa/villa-versilia-soggiorno-divano-finestra.jpg', alt: 'Villa Versilia - Soggiorno con accesso al balcone',             category: 'Soggiorno' },
  { src: '/images/villa/villa-versilia-soggiorno-porta-scorrevole-scala.jpg', alt: 'Villa Versilia - Porta scorrevole e scala interna',      category: 'Soggiorno' },
  { src: '/images/villa/villa-versilia-scala-interna-marmo.jpg',       alt: 'Villa Versilia - Scala interna in marmo con ringhiera',        category: 'Soggiorno' },
  // CUCINA
  { src: '/images/villa/villa-versilia-cucina-attrezzata.jpg',         alt: 'Villa Versilia - Cucina attrezzata con lavatrice e lavastoviglie', category: 'Cucina' },
  { src: '/images/villa/villa-versilia-cucina-piano-cottura.jpg',      alt: 'Villa Versilia - Piano cottura gas e forno',                   category: 'Cucina' },
  { src: '/images/villa/villa-versilia-cucina-tavolo-pranzo.jpg',      alt: 'Villa Versilia - Cucina aperta con tavolo da pranzo 6 posti',  category: 'Cucina' },
  { src: '/images/villa/villa-versilia-cucina-sala-pranzo.jpg',        alt: 'Villa Versilia - Sala da pranzo con vista giardino',           category: 'Cucina' },
  // CAMERE
  { src: '/images/villa/villa-versilia-camera-blu-matrimoniale-castello.jpg', alt: 'Villa Versilia - Camera azzurra con matrimoniale e letto a castello', category: 'Camere' },
  { src: '/images/villa/villa-versilia-camera-blu-completa.jpg',       alt: 'Villa Versilia - Camera azzurra vista completa',               category: 'Camere' },
  { src: '/images/villa/villa-versilia-camera-blu-letto-matrimoniale.jpg', alt: 'Villa Versilia - Camera azzurra letto matrimoniale',        category: 'Camere' },
  { src: '/images/villa/villa-versilia-camera-blu-dettaglio-letto.jpg', alt: 'Villa Versilia - Camera azzurra biancheria curata',           category: 'Camere' },
  { src: '/images/villa/villa-versilia-camera-blu-letto-asciugamani.jpg', alt: 'Villa Versilia - Camera azzurra con asciugamani inclusi',   category: 'Camere' },
  { src: '/images/villa/villa-versilia-camera-blu-scrivania.jpg',      alt: 'Villa Versilia - Camera azzurra con scrivania e TV',           category: 'Camere' },
  { src: '/images/villa/villa-versilia-camera-blu-castello-vista.jpg', alt: 'Villa Versilia - Camera azzurra vista letto a castello',       category: 'Camere' },
  { src: '/images/villa/villa-versilia-camera-singoli-tende-rosse.jpg', alt: 'Villa Versilia - Camera letti singoli con tende rosse',       category: 'Camere' },
  { src: '/images/villa/villa-versilia-camera-dettaglio-cuscini-rossi.jpg', alt: 'Villa Versilia - Dettaglio letto con cuscini rossi',      category: 'Camere' },
  { src: '/images/villa/villa-versilia-camera-tv-parete.jpg',          alt: 'Villa Versilia - Camera con TV a parete',                     category: 'Camere' },
  { src: '/images/villa/villa-versilia-camera-letto-castello-legno.jpg', alt: 'Villa Versilia - Camera con letto a castello in legno',     category: 'Camere' },
  { src: '/images/villa/villa-versilia-camera-castello-dettaglio.jpg', alt: 'Villa Versilia - Dettaglio letto a castello con cuscini',     category: 'Camere' },
  // BAGNI
  { src: '/images/villa/villa-versilia-bagno-doccia-blu.jpg',          alt: 'Villa Versilia - Bagno con doccia e piastrelle azzurre',       category: 'Bagni' },
];

const CATEGORIES = ['Tutte', 'Esterno', 'Giardino', 'Soggiorno', 'Cucina', 'Camere', 'Bagni'];

export default function VillaGallery() {
  const [filter, setFilter] = useState('Tutte');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === 'Tutte'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === filter);

  const prev = () => setLightbox((l) => (l !== null ? (l === 0 ? filtered.length - 1 : l - 1) : null));
  const next = () => setLightbox((l) => (l !== null ? (l === filtered.length - 1 ? 0 : l + 1) : null));

  return (
    <section id="galleria" className="py-16 md:py-24 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="section-subtitle mb-3">Galleria fotografica</p>
          <h2 className="section-title">Ogni angolo della Villa</h2>
          <p className="text-gray-500 mt-3 text-sm">{GALLERY_IMAGES.length} foto reali della villa</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-200 border ${
                filter === cat
                  ? 'bg-gold-500 text-white border-gold-500'
                  : 'bg-white text-gray-600 border-gold-200 hover:border-gold-400 hover:text-gold-600'
              }`}
            >
              {cat}
              <span className={`ml-1.5 text-xs ${filter === cat ? 'text-gold-100' : 'text-gray-400'}`}>
                ({cat === 'Tutte' ? GALLERY_IMAGES.length : GALLERY_IMAGES.filter(i => i.category === cat).length})
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((img, i) => (
            <button
              key={`${img.src}-${i}`}
              onClick={() => setLightbox(i)}
              className="group relative aspect-square overflow-hidden bg-cream-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60">
                <span className="text-white text-xs font-bold">{img.category}</span>
              </div>
            </button>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">
          Clicca su una foto per ingrandirla · {filtered.length} immagini visualizzate
        </p>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/96 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors rounded-full"
            onClick={() => setLightbox(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <img
            src={filtered[lightbox].src}
            alt={filtered[lightbox].alt}
            className="max-h-[88vh] max-w-[90vw] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight className="w-7 h-7" />
          </button>
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <p className="text-white/70 text-sm">{filtered[lightbox].alt}</p>
            <p className="text-white/40 text-xs mt-1">{lightbox + 1} / {filtered.length}</p>
          </div>
        </div>
      )}
    </section>
  );
}
