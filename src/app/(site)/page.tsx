// src/app/(site)/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Bed, Bath, Users, Wifi, Car, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Villa Versilia Relais — Casa Vacanze a 250m dal Mare | Lido di Camaiore',
  description: 'Villa Versilia Relais: casa vacanze con giardino privato a Lido di Camaiore, Versilia. 3 camere, 2 bagni, cucina attrezzata, barbecue, parcheggio. A soli 250m dal mare.',
  keywords: 'villa vacanze lido di camaiore, casa vacanze versilia, affitto versilia giardino, villa versilia mare',
};

const galleryImages = [
  { src: '/images/villa/villa-versilia-esterno-facciata.jpg',           alt: 'Villa Versilia – Facciata esterna',          span: 'col-span-2 row-span-2' },
  { src: '/images/villa/villa-versilia-soggiorno-completo.jpg',         alt: 'Soggiorno luminoso',                         span: '' },
  { src: '/images/villa/villa-versilia-cucina-tavolo-pranzo.jpg',       alt: 'Cucina attrezzata',                          span: '' },
  { src: '/images/villa/villa-versilia-giardino-zona-relax-rattan.jpg', alt: 'Giardino privato con zona relax',            span: 'col-span-2' },
];

const highlights = [
  { icon: MapPin, label: '250m dal mare', sub: '3 minuti a piedi' },
  { icon: Bed,    label: '3 camere',      sub: 'Fino a 8 ospiti' },
  { icon: Bath,   label: '2 bagni',       sub: 'Con doccia' },
  { icon: Users,  label: 'Famiglie',      sub: 'Ideale per gruppi' },
  { icon: Wifi,   label: 'Wi-Fi incluso', sub: 'Fibra ottica' },
  { icon: Car,    label: 'Parcheggio',    sub: '2 auto private' },
];

const amenities = [
  'Giardino privato', 'Barbecue', 'Aria condizionata', 'Lavatrice',
  'Lavastoviglie', 'Forno e microonde', 'Smart TV', 'Biancheria inclusa',
];

const testimonials = [
  { name: 'Famiglia Marini', location: 'Milano', rating: 5, text: 'Villa perfetta per la nostra famiglia. Il giardino è enorme, i bambini hanno adorato lo spazio. A tre minuti dal mare. Torneremo sicuramente.' },
  { name: 'Laura & Marco', location: 'Torino', rating: 5, text: 'Accogliente, pulita, completamente attrezzata. La cucina ha tutto quello che serve. Posizione ideale per visitare la Versilia.' },
  { name: 'Famiglia Conti', location: 'Roma', rating: 5, text: 'Tre generazioni in vacanza insieme — nonni, genitori e nipoti. La villa ci ha ospitati tutti comodamente. Servizio eccellente.' },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/villa/villa-versilia-vista-aerea-mare.jpg"
            alt="Villa Versilia – Vista aerea con il mare di Lido di Camaiore"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-2xl">
            <span className="inline-block mb-4 font-accent italic text-gold-400 text-lg">
              Lido di Camaiore · Versilia, Toscana
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-semibold text-white leading-[1.05] mb-6">
              Villa<br />Versilia<br />
              <em className="text-gold-300 not-italic">Relais</em>
            </h1>
            <p className="text-white/70 text-lg font-light mb-8 max-w-lg leading-relaxed">
              Casa vacanze con giardino privato a soli 250 metri dal mare.
              3 camere, 2 bagni, cucina completa, barbecue e parcheggio per 2 auto.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/prenotazione"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-white text-xs font-bold tracking-widest uppercase transition-all duration-200 shadow-gold hover:shadow-gold-lg">
                ✦ Prenota ora
              </Link>
              <Link href="/la-villa"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white hover:bg-white/10 text-xs font-bold tracking-widest uppercase transition-all duration-200">
                Scopri la Villa →
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-brand-900/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 md:grid-cols-6 divide-x divide-white/10">
              {highlights.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="py-4 px-3 md:px-5 text-center">
                  <Icon className="w-4 h-4 text-gold-400 mx-auto mb-1" />
                  <div className="text-white text-xs font-bold">{label}</div>
                  <div className="text-white/40 text-xs">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="py-20 md:py-28 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="section-subtitle mb-3">La nostra villa</p>
              <h2 className="section-title mb-6">
                Il tuo rifugio estivo<br />in Versilia
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Villa Versilia Relais è una casa vacanze accogliente e completamente attrezzata,
                situata in Via Adolfo Massei 28, a soli <strong className="text-brand-500">250 metri dalla spiaggia</strong> di
                Lido di Camaiore. Tre camere, due bagni, soggiorno luminoso e una cucina
                dotata di tutto il necessario.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Il grande giardino privato con zona barbecue, area pranzo esterna e spazio
                relax la rende perfetta per famiglie e gruppi fino a 8 persone che cercano
                comfort e libertà senza rinunciare alla vicinanza al mare.
              </p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-8">
                {amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-sage-500 flex-shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
              <Link href="/la-villa"
                className="inline-flex items-center gap-2 text-brand-500 font-bold text-sm tracking-widest uppercase hover:gap-3 transition-all">
                Scopri tutti gli spazi →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img src="/images/villa/villa-versilia-esterno-facciata.jpg" alt="Facciata villa" className="w-full aspect-[4/3] object-cover" />
              <img src="/images/villa/villa-versilia-giardino-terrazza-fiori.jpg" alt="Giardino" className="w-full aspect-[4/3] object-cover mt-6" />
              <img src="/images/villa/villa-versilia-cucina-attrezzata.jpg" alt="Cucina" className="w-full aspect-[4/3] object-cover" />
              <img src="/images/villa/villa-versilia-soggiorno-completo.jpg" alt="Soggiorno" className="w-full aspect-[4/3] object-cover mt-6" />
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="section-subtitle mb-2">Fotogalleria</p>
              <h2 className="section-title">Ogni angolo della villa</h2>
            </div>
            <Link href="/la-villa#galleria"
              className="text-brand-500 font-bold text-xs tracking-widest uppercase hover:text-brand-600 transition-colors">
              Vedi tutte le 37 foto →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 h-[420px]">
            {galleryImages.map((img, i) => (
              <Link key={i} href="/la-villa#galleria"
                className={`relative overflow-hidden group ${img.span}`}>
                <img src={img.src} alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/20 transition-colors duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── AMENITIES ── */}
      <section className="py-20 md:py-28" style={{ background: '#F5EDD8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">Cosa include</p>
            <h2 className="section-title">Tutto il necessario,<br />niente di superfluo</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { icon: '🌊', label: 'Mare',          sub: '250m · 3 min a piedi' },
              { icon: '🌿', label: 'Giardino',      sub: 'Privato e recintato' },
              { icon: '🔥', label: 'Barbecue',      sub: 'Area pranzo esterna' },
              { icon: '❄️', label: 'A/C',           sub: 'In tutte le camere' },
              { icon: '📶', label: 'Wi-Fi fibra',   sub: 'Alta velocità' },
              { icon: '🚗', label: 'Parcheggio',    sub: '2 auto incluse' },
              { icon: '🫧', label: 'Lavatrice',     sub: 'E lavastoviglie' },
              { icon: '🛁', label: '2 Bagni',       sub: 'Con doccia ampia' },
              { icon: '📺', label: 'Smart TV',      sub: 'Soggiorno + camere' },
              { icon: '☕', label: 'Cucina piena',  sub: 'Forno, microonde, tutto' },
              { icon: '🛏', label: '3 Camere',      sub: 'Fino a 8 persone' },
              { icon: '🪴', label: 'Relax outdoor', sub: 'Lettini e ombrelloni' },
            ].map((item) => (
              <div key={item.label} className="bg-white p-5 flex flex-col items-center text-center shadow-card hover:shadow-card-hover transition-shadow">
                <span className="text-2xl mb-2">{item.icon}</span>
                <span className="font-bold text-gray-900 text-sm mb-0.5">{item.label}</span>
                <span className="text-xs text-gray-500">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 md:py-28 bg-deep-sea relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-accent italic text-gold-400 text-lg mb-2">Cosa dicono di noi</p>
            <h2 className="font-display text-4xl font-semibold text-white">Ospiti soddisfatti</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white/8 backdrop-blur border border-white/12 p-7">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-gold-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-white/75 text-sm leading-relaxed italic mb-5">"{t.text}"</p>
                <div>
                  <span className="text-white font-bold text-sm block">{t.name}</span>
                  <span className="text-white/40 text-xs">{t.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="py-20 md:py-28 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-subtitle mb-3">Dove siamo</p>
              <h2 className="section-title mb-6">A 250 metri<br />dalla spiaggia</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Via Adolfo Massei 28, Lido di Camaiore (LU) — nel cuore della Versilia,
                a pochi passi dal mare, dai ristoranti e dai locali della movida.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { place: 'Spiaggia', dist: '250m · 3 min a piedi' },
                  { place: 'Centro Lido di Camaiore', dist: '500m · 6 min a piedi' },
                  { place: 'Viareggio', dist: '8 km · 12 min in auto' },
                  { place: 'Forte dei Marmi', dist: '12 km · 15 min in auto' },
                  { place: 'Lucca', dist: '25 km · 30 min in auto' },
                  { place: 'Pisa (aeroporto)', dist: '30 km · 35 min in auto' },
                ].map((d) => (
                  <div key={d.place} className="flex justify-between items-center py-2 border-b border-line-200">
                    <span className="font-bold text-sm text-gray-800">{d.place}</span>
                    <span className="text-sm text-brand-500 font-medium">{d.dist}</span>
                  </div>
                ))}
              </div>
              <a href="https://maps.google.com/?q=Via+Adolfo+Massei+28+Lido+di+Camaiore"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-500 font-bold text-xs tracking-widest uppercase hover:text-brand-600 transition-colors">
                <MapPin className="w-4 h-4" /> Apri in Google Maps →
              </a>
            </div>
            <div className="aspect-[4/3] overflow-hidden shadow-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2863.4!2d10.22!3d43.92!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sVia+Adolfo+Massei+28%2C+Lido+di+Camaiore!5e0!3m2!1sit!2sit!4v1"
                width="100%" height="100%" style={{ border: 0 }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Villa Versilia su Google Maps"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-3">FAQ</p>
            <h2 className="section-title">Domande frequenti</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'Qual è la capienza massima?', a: 'La villa ospita comodamente fino a 8 persone (3 camere con letti fissi). Su richiesta si aggiunge un letto aggiuntivo per un 9° ospite.' },
              { q: 'Quando si fa il check-in e il check-out?', a: 'Check-in dalle 16:00, check-out entro le 10:00. Orari flessibili possono essere concordati direttamente via WhatsApp.' },
              { q: 'Gli animali sono ammessi?', a: 'Sì, accettiamo animali di piccola e media taglia. Vi chiediamo di comunicarlo al momento della prenotazione.' },
              { q: 'Come funziona il pagamento?', a: 'Si paga una caparra del 30% online con carta di credito tramite Stripe. Il saldo (70%) si paga all\'arrivo in contanti o bonifico.' },
              { q: 'Il parcheggio è incluso?', a: 'Sì, il parcheggio privato per 2 auto è incluso nel prezzo, all\'interno della recinzione della villa.' },
              { q: 'C\'è la biancheria inclusa?', a: 'Sì, lenzuola e asciugamani sono inclusi e cambiati per soggiorni superiori a 7 notti.' },
              { q: 'Si può prenotare per brevi soggiorni?', a: 'Il soggiorno minimo in alta stagione (luglio-agosto) è di 7 notti. In bassa stagione accettiamo da 3 notti.' },
            ].map((faq, i) => (
              <details key={i} className="group border border-line-300 bg-cream-100">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-bold text-gray-900 text-sm">
                  {faq.q}
                  <span className="text-brand-500 text-lg group-open:rotate-45 transition-transform duration-200 flex-shrink-0">+</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-line-200 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINALE ── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/villa/villa-versilia-giardino-terrazza-fiori.jpg"
            alt="Giardino Villa Versilia" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-overlay-full" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <span className="font-accent italic text-gold-300 text-xl block mb-4">
            L'estate inizia qui
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-semibold text-white mb-6">
            Prenota la tua<br />vacanza in Versilia
          </h2>
          <p className="text-white/65 text-lg mb-10 font-light">
            Direttamente con il proprietario · Nessuna commissione · Risposta in poche ore
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/prenotazione"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gold-500 hover:bg-gold-600 text-white text-xs font-bold tracking-widest uppercase transition-all shadow-gold">
              ✦ Verifica disponibilità
            </Link>
            <a href="https://wa.me/393755455596?text=Ciao!%20Vorrei%20informazioni%20su%20Villa%20Versilia"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 border border-white/30 hover:bg-white/20 text-white text-xs font-bold tracking-widest uppercase transition-all">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
