// @ts-nocheck
// src/components/villa/VillaAmenities.tsx
const groups = [
  { title: 'Alloggio', emoji: '🏠', items: ['3 camere da letto','2 bagni completi','Soggiorno luminoso','Cucina attrezzata','Sala da pranzo','Fino a 10 ospiti'] },
  { title: 'Comfort', emoji: '❄️', items: ['Aria condizionata','Wi-Fi gratuito','Lavatrice','TV','Biancheria inclusa','Asciugacapelli'] },
  { title: 'Cucina', emoji: '🍳', items: ['Piano cottura','Lavastoviglie','Frigorifero','Macchina caffè','Stoviglie complete'] },
  { title: 'Spazi esterni', emoji: '🌿', items: ['Giardino privato','Zona barbecue','Area pranzo esterna','Spazio relax','Tavolo e sedie','Illuminazione esterna'] },
  { title: 'Parcheggio', emoji: '🚗', items: ['Parcheggio privato x2','Cancello automatico','Gratuito','Sempre disponibile'] },
  { title: 'Posizione', emoji: '📍', items: ['250m dalla spiaggia','Ristoranti vicini','Stabilimenti balneari','Centro paese a piedi','Farmacia vicina','Bus e taxi'] },
];

export default function VillaAmenities() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-subtitle mb-3">Tutto incluso</p>
          <h2 className="section-title">Servizi & Dotazioni</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {groups.map((g) => (
            <div key={g.title} className="border border-line-200 p-6 hover:border-gold-300 transition-colors">
              <div className="text-2xl mb-2">{g.emoji}</div>
              <h3 className="font-display text-base text-gray-900 mb-3">{g.title}</h3>
              <ul className="space-y-1.5">
                {g.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="w-1 h-1 bg-gold-400 rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
