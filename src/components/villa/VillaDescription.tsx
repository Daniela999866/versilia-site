// src/components/villa/VillaDescription.tsx
import Link from 'next/link';

export default function VillaDescription() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main text */}
          <div className="lg:col-span-2">
            <p className="section-subtitle mb-3">La nostra casa</p>
            <h2 className="section-title mb-7">
              Benvenuti a Villa Versilia
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Villa Versilia è un'accogliente casa vacanze situata a circa 250 metri dal mare,
                nel cuore della splendida Versilia, ideale per una vacanza all'insegna del relax
                tra mare e comfort.
              </p>
              <p>
                La villa dispone di <strong className="text-gray-800">3 camere da letto</strong>,{' '}
                <strong className="text-gray-800">2 bagni</strong>, un luminoso soggiorno e una
                cucina completamente attrezzata — perfetta per soggiorni in famiglia o con amici.
              </p>
              <p>
                All'esterno gli ospiti possono godere di un{' '}
                <strong className="text-gray-800">ampio giardino privato</strong> con zona barbecue,
                ideale per pranzi e cene all'aperto o per rilassarsi dopo una giornata al mare.
              </p>
              <p>
                La casa è dotata di <strong className="text-gray-800">aria condizionata</strong>,{' '}
                <strong className="text-gray-800">Wi-Fi</strong> e{' '}
                <strong className="text-gray-800">lavatrice</strong> per garantire il massimo comfort
                durante il soggiorno. È inoltre disponibile{' '}
                <strong className="text-gray-800">parcheggio privato per 2 auto</strong>.
              </p>
              <p>
                Grazie alla posizione privilegiata, la spiaggia è facilmente raggiungibile a piedi
                in pochi minuti. Lido di Camaiore offre spiagge meravigliose, stabilimenti balneari
                attrezzati, ristoranti e una vivace passeggiata sul lungomare.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/prenotazione" className="btn-primary">
                Prenota Ora
              </Link>
            </div>
          </div>

          {/* Sidebar info */}
          <div className="space-y-4">
            {/* Quick facts */}
            <div className="bg-cream-100 border border-gold-200 p-6">
              <h3 className="font-display text-lg text-gray-900 mb-4">In breve</h3>
              <ul className="space-y-3">
                {[
                  { label: 'Tipo', value: 'Casa vacanze intera' },
                  { label: 'Ospiti', value: 'Fino a 8- 10persone' },
                  { label: 'Camere', value: '3 camere da letto' },
                  { label: 'Bagni', value: '2 bagni completi' },
                  { label: 'Distanza mare', value: '~250 metri' },
                  { label: 'Parcheggio', value: 'Privato, 2 auto' },
                  { label: 'Check-in', value: 'Dalle 15:30' },
                  { label: 'Check-out', value: 'Entro le 10:30' },
                ].map((item) => (
                  <li key={item.label} className="flex justify-between text-sm border-b border-line-200 pb-2 last:border-0">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="font-bold text-gray-800 text-right">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact card */}
            <div className="bg-gray-900 text-white p-6">
              <h3 className="font-display text-lg mb-3">Hai domande?</h3>
              <p className="text-gray-400 text-sm mb-4">
                Siamo disponibili ogni giorno per rispondere alle tue domande.
              </p>
              <a
                href="https://wa.me/393755455596"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white text-sm font-bold tracking-widest uppercase hover:bg-green-400 transition-colors"
              >
                💬 WhatsApp
              </a>
              <a
                href="mailto:villaversiliarelais@gmail.com"
                className="flex items-center justify-center gap-2 w-full py-3 mt-2 bg-gold-500 text-white text-sm font-bold tracking-widest uppercase hover:bg-gold-400 transition-colors"
              >
                ✉️ Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
