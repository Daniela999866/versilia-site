// src/components/villa/VillaRooms.tsx
const rooms = [
  {
    name: 'Camera Blu – Matrimoniale + Castello',
    icon: '🛏️',
    image: '/images/villa/villa-versilia-camera-blu-matrimoniale-castello.jpg',
    details: ['Letto matrimoniale', 'Letto a castello (2 posti)', 'Aria condizionata', 'TV a parete', 'Ideale per famiglie'],
    badge: 'Camera 1',
  },
  {
    name: 'Camera con Letto matrimoniale',
    icon: '🛏️',
    image: '/images/villa/villa-versilia-camera-matrimoniale-tende-rosse.jpg',
    details: ['letto matrimoniale', 'Tende oscuranti', 'Aria condizionata', 'TV a parete', 'Luminosa'],
    badge: 'Camera 2',
  },
  {
    name: 'Camera con Letto a Castello',
    icon: '🛏️',
    image: '/images/villa/villa-versilia-camera-letto-castello-legno.jpg',
    details: ['Letto a castello in legno', 'Perfetta per bambini', 'Aria condizionata', 'Comodissima'],
    badge: 'Camera 3',
  },
  {
    name: 'Bagno con Doccia',
    icon: '🚿',
    image: '/images/villa/villa-versilia-bagno-doccia-blu.jpg',
    details: ['Doccia ampia', 'WC e bidet', 'Asciugamani inclusi'],
    badge: 'Bagno',
  },
  {
    name: 'Cucina & Sala da Pranzo',
    icon: '🍳',
    image: '/images/villa/villa-versilia-cucina-tavolo-pranzo.jpg',
    details: ['Piano cottura gas', 'Macchina caffè', 'Lavastoviglie', 'Lavatrice', 'Tavolo 8-10 posti'],
    badge: 'Cucina',
  },
  {
    name: 'Soggiorno',
    icon: '🛋️',
    image: '/images/villa/villa-versilia-soggiorno-completo.jpg',
    details: ['Divano letto matrimoniale', 'TV Smart', 'Aria condizionata', 'Accesso al balcone', 'Decorazioni naturali'],
    badge: 'Soggiorno',
  },
];

export default function VillaRooms() {
  return (
    <section className="py-16 md:py-24 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-subtitle mb-3">Gli spazi interni</p>
          <h2 className="section-title">Camere & Ambienti</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.name} className="bg-white shadow-card overflow-hidden group hover:shadow-card-hover transition-shadow">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={room.image}
                  alt={`Villa Versilia - ${room.name}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-gold-500 text-white text-xs font-bold tracking-widest uppercase px-3 py-1">{room.badge}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{room.icon}</span>
                  <h3 className="font-display text-lg text-gray-900">{room.name}</h3>
                </div>
                <ul className="space-y-1.5">
                  {room.details.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="w-1 h-1 bg-gold-400 rounded-full" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
