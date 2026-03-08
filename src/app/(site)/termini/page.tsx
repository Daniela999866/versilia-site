// src/app/(site)/termini/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Termini e Condizioni | Villa Versilia Relais',
  description: 'Termini e condizioni di prenotazione e utilizzo del sito Villa Versilia Relais.',
  robots: { index: false },
};

const sections = [
  {
    title: '1. Oggetto e parti contraenti',
    content: `Il presente contratto regola la locazione turistica breve dell'immobile denominato "Villa Versilia Relais", sito in Via Adolfo Massei 28, 55042 Lido di Camaiore (LU), Italia, tra il locatore (di seguito "Proprietario") e il conduttore (di seguito "Ospite").
    
La locazione è disciplinata ai sensi dell'art. 4 del D.L. 50/2017 e successive modificazioni (locazioni brevi).`,
  },
  {
    title: '2. Prenotazione e conferma',
    content: `La prenotazione si intende confermata solo dopo:
    
• Pagamento della caparra confirmatoria del 30% del totale soggiorno, tramite carta di credito (Stripe);
• Ricezione dell'email di conferma da parte del Proprietario.

Il saldo (70%) dovrà essere corrisposto all'arrivo, in contanti o tramite bonifico bancario anticipato.`,
  },
  {
    title: '3. Prezzi e tariffe',
    content: `I prezzi indicati sul sito si intendono in Euro per notte, per l'intera villa. Include: biancheria (lenzuola e asciugamani), Wi-Fi, parcheggio, uso del giardino e barbecue.

La pulizia finale (€80 una tantum) è inclusa nel prezzo visualizzato al momento della prenotazione. Eventuali servizi extra (culla, lettino, transfer) sono su richiesta e a preventivo.`,
  },
  {
    title: '4. Cancellazione e rimborso',
    content: `Politica di cancellazione:

• Cancellazione gratuita fino a 30 giorni prima del check-in: rimborso integrale della caparra.
• Cancellazione tra 30 e 15 giorni prima: rimborso del 50% della caparra.
• Cancellazione entro 14 giorni dal check-in: nessun rimborso della caparra.
• No-show: nessun rimborso, l'intero importo è dovuto.

In caso di cancellazione da parte del Proprietario per cause di forza maggiore, sarà rimborsato il 100% degli importi versati.`,
  },
  {
    title: '5. Check-in e check-out',
    content: `Check-in: dalle ore 16:00. Check-out: entro le ore 10:00.

Orari diversi devono essere concordati con almeno 24 ore di anticipo via WhatsApp (+39 375 545 5596). Il ritardo nel check-out non concordato sarà addebitato con un supplemento di €30/ora.`,
  },
  {
    title: '6. Utilizzo della proprietà',
    content: `L'Ospite si impegna a:

• Non superare il numero massimo di ospiti dichiarato (8 persone, salvo accordi scritti);
• Rispettare il silenzio notturno dalle 23:00 alle 08:00;
• Non organizzare eventi o feste con amplificazione musicale senza autorizzazione scritta;
• Non subaffittare la proprietà o parti di essa;
• Segnalare immediatamente eventuali danni alla struttura o agli arredi.`,
  },
  {
    title: '7. Deposito cauzionale',
    content: `All'arrivo potrà essere richiesto un deposito cauzionale di €200 in contanti o pre-autorizzazione su carta, a garanzia di eventuali danni. Il deposito sarà restituito integralmente entro 48 ore dal check-out, dedotte eventuali spese per danni documentati.`,
  },
  {
    title: '8. Responsabilità',
    content: `Il Proprietario non è responsabile per furto, perdita o danno a beni personali degli ospiti durante il soggiorno. L'Ospite è responsabile civilmente per i danni causati a persone o cose all'interno della proprietà.

Il Proprietario non è responsabile per interruzioni di servizi pubblici (luce, acqua, internet) causate da eventi esterni.`,
  },
  {
    title: '9. Legge applicabile e foro competente',
    content: `Il presente contratto è regolato dalla legge italiana. Per qualsiasi controversia è competente in via esclusiva il Foro di Lucca.`,
  },
];

export default function TerminiPage() {
  return (
    <div className="pt-28 pb-20 bg-cream-100 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Link href="/" className="text-xs font-bold tracking-widest uppercase text-brand-500 hover:text-brand-600 transition-colors">
            ← Torna alla Home
          </Link>
        </div>

        <h1 className="font-display text-4xl font-semibold text-gray-900 mb-2">
          Termini e Condizioni
        </h1>
        <p className="text-sm text-muted-500 mb-10">
          Condizioni di prenotazione e soggiorno · Ultimo aggiornamento: gennaio 2025
        </p>

        {/* Riepilogo tariffe */}
        <div className="bg-brand-500 text-white p-6 mb-10">
          <p className="text-xs font-bold tracking-widest uppercase text-white/60 mb-3">Riepilogo tariffe</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Caparra', value: '30%' },
              { label: 'Pulizie', value: '€80' },
              { label: 'Check-in', value: '16:00' },
              { label: 'Check-out', value: '10:00' },
            ].map(({ label, value }) => (
              <div key={label}>
                <span className="text-xs text-white/50 block">{label}</span>
                <span className="font-bold text-xl">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {sections.map((s) => (
            <section key={s.title} className="bg-white p-7 shadow-card">
              <h2 className="font-display text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-line-200">
                {s.title}
              </h2>
              <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {s.content}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 p-6 bg-gold-500/10 border border-gold-500/30">
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong>Contatti:</strong> Per qualsiasi chiarimento sui termini contattare il Proprietario a{' '}
            <a href="mailto:villaversiliarelais@gmail.com" className="text-brand-500 font-bold">villaversiliarelais@gmail.com</a>
            {' '}o via WhatsApp al{' '}
            <a href="https://wa.me/393755455596" className="text-brand-500 font-bold">+39 375 545 5596</a>.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-line-300 flex flex-wrap gap-4">
          <Link href="/privacy"
            className="text-xs font-bold tracking-widest uppercase text-brand-500 hover:text-brand-600 transition-colors">
            Privacy Policy →
          </Link>
          <Link href="/prenotazione"
            className="text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-gray-600 transition-colors">
            Prenota →
          </Link>
        </div>
      </div>
    </div>
  );
}
