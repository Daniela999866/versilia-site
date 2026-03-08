'use client';
// src/components/home/GalleryPreview.tsx
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const galleryImages = [
  { src: '/images/villa/villa-versilia-esterno-facciata.jpg',           alt: 'Facciata Villa Versilia',          span: 'col-span-2 row-span-2', label: 'Esterno' },
  { src: '/images/villa/villa-versilia-soggiorno-completo.jpg',         alt: 'Soggiorno luminoso',               span: 'col-span-1 row-span-1', label: 'Soggiorno' },
  { src: '/images/villa/villa-versilia-cucina-tavolo-pranzo.jpg',       alt: 'Cucina attrezzata',                span: 'col-span-1 row-span-1', label: 'Cucina' },
  { src: '/images/villa/villa-versilia-camera-blu-matrimoniale-castello.jpg', alt: 'Camera matrimoniale',        span: 'col-span-1 row-span-1', label: 'Camera' },
  { src: '/images/villa/villa-versilia-giardino-zona-relax-rattan.jpg', alt: 'Giardino privato e zona relax',   span: 'col-span-2 row-span-1', label: 'Giardino' },
];

export default function GalleryPreview() {
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
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <p className="section-subtitle mb-2">Fotogalleria</p>
            <h2 className="section-title">Scopri ogni angolo</h2>
          </div>
          <Link href="/la-villa#galleria" className="flex items-center gap-2 text-gold-600 font-bold text-sm tracking-widest uppercase hover:gap-3 transition-all duration-200">
            Vedi tutte le 37 foto <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className={`grid grid-cols-3 grid-rows-3 gap-3 h-[500px] md:h-[600px] transition-all duration-700 delay-200 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {galleryImages.map((img, i) => (
            <Link key={i} href="/la-villa#galleria" className={`${img.span} relative overflow-hidden group cursor-pointer`}>
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block bg-white/90 text-gray-800 text-xs font-bold tracking-widest uppercase px-3 py-1">{img.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
