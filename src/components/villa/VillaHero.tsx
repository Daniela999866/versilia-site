// src/components/villa/VillaHero.tsx
export default function VillaHero() {
  return (
    <section className="relative h-[55vh] min-h-[360px] flex items-end overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/villa/villa-versilia-vista-aerea-mare.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
        <p className="font-accent italic text-gold-300 text-lg mb-2">Lido di Camaiore · Versilia</p>
        <h1 className="font-display text-5xl md:text-6xl text-white text-shadow-lg">
          La Villa
        </h1>
        <p className="text-white/80 mt-2 text-lg">
          Via Adolfo Massei 28 · 3 camere · 2 bagni · giardino privato · 250m dal mare
        </p>
      </div>
    </section>
  );
}
