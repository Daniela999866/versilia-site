// src/app/(site)/privacy/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Villa Versilia Relais',
  description: 'Informativa sul trattamento dei dati personali ai sensi del GDPR (Reg. UE 2016/679) per Villa Versilia Relais.',
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20 bg-cream-100 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Link href="/" className="text-xs font-bold tracking-widest uppercase text-brand-500 hover:text-brand-600 transition-colors">
            ← Torna alla Home
          </Link>
        </div>

        <h1 className="font-display text-4xl font-semibold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-500 mb-10">
          Informativa ai sensi dell'art. 13 del Regolamento UE 2016/679 (GDPR)
          · Ultimo aggiornamento: gennaio 2025
        </p>

        <div className="prose prose-sm max-w-none space-y-8 text-gray-600">

          <section>
            <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">1. Titolare del trattamento</h2>
            <p className="leading-relaxed">
              Il titolare del trattamento dei dati personali è il proprietario di Villa Versilia Relais,
              con sede in Via Adolfo Massei 28, 55042 Lido di Camaiore (LU), Italia.<br />
              Email: <a href="mailto:villaversiliarelais@gmail.com" className="text-brand-500">villaversiliarelais@gmail.com</a><br />
              Tel/WhatsApp: <a href="tel:+393755455596" className="text-brand-500">+39 375 545 5596</a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">2. Dati raccolti e finalità</h2>
            <p className="leading-relaxed mb-3">Raccogliamo i seguenti dati personali:</p>
            <ul className="list-none space-y-2">
              {[
                ['Dati di prenotazione', 'Nome, cognome, email, telefono, date soggiorno, numero ospiti — per gestire la prenotazione e comunicare con l\'ospite.'],
                ['Dati di pagamento', 'Processati esclusivamente tramite Stripe (PCI DSS compliant). Non archiviamo dati della carta.'],
                ['Dati di navigazione', 'IP, browser, pagine visitate — raccolti automaticamente per finalità tecniche e di sicurezza.'],
                ['Comunicazioni', 'Messaggi inviati via email o WhatsApp — conservati per rispondere alle richieste.'],
              ].map(([tipo, desc]) => (
                <li key={tipo as string} className="bg-white p-4 border-l-2 border-brand-300">
                  <strong className="text-gray-900 block text-sm">{tipo as string}</strong>
                  <span className="text-sm">{desc as string}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">3. Base giuridica</h2>
            <p className="leading-relaxed">
              Il trattamento è fondato sull'esecuzione del contratto di locazione turistica (art. 6 par. 1 lett. b GDPR)
              e sul legittimo interesse del titolare per la sicurezza del sito (art. 6 par. 1 lett. f GDPR).
              Per le comunicazioni di marketing, il trattamento si basa sul consenso esplicito (art. 6 par. 1 lett. a GDPR).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">4. Conservazione dei dati</h2>
            <p className="leading-relaxed">
              I dati di prenotazione sono conservati per 10 anni per ottemperare agli obblighi fiscali e contabili.
              I dati di navigazione sono conservati per 12 mesi. Le comunicazioni email/WhatsApp per 24 mesi dalla
              chiusura della conversazione.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">5. Condivisione dei dati</h2>
            <p className="leading-relaxed">
              I dati non vengono venduti né ceduti a terzi per finalità commerciali.
              Vengono condivisi esclusivamente con:
            </p>
            <ul className="mt-3 space-y-1 text-sm list-disc list-inside">
              <li><strong>Stripe Inc.</strong> — processore di pagamenti (sede UE)</li>
              <li><strong>Supabase Inc.</strong> — hosting database (infrastruttura EU)</li>
              <li><strong>Vercel Inc.</strong> — hosting sito web</li>
              <li><strong>Autorità fiscali italiane</strong> — per obblighi di legge</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">6. I tuoi diritti (GDPR)</h2>
            <p className="leading-relaxed mb-3">Hai diritto di:</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {['Accesso ai tuoi dati', 'Rettifica', 'Cancellazione ("diritto all\'oblio")', 'Portabilità', 'Limitazione del trattamento', 'Opposizione al trattamento'].map((d) => (
                <div key={d} className="bg-white border border-line-300 px-3 py-2 text-gray-700">{d}</div>
              ))}
            </div>
            <p className="mt-4 text-sm">
              Per esercitare i tuoi diritti, scrivici a{' '}
              <a href="mailto:villaversiliarelais@gmail.com" className="text-brand-500 font-bold">villaversiliarelais@gmail.com</a>.
              Risponderemo entro 30 giorni. Hai anche diritto di proporre reclamo al{' '}
              <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener" className="text-brand-500">
                Garante per la Protezione dei Dati Personali
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">7. Cookie</h2>
            <p className="leading-relaxed">
              Il sito utilizza cookie tecnici strettamente necessari al funzionamento.
              Non utilizziamo cookie di profilazione o di terze parti a fini pubblicitari.
              I cookie di sessione vengono eliminati alla chiusura del browser.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-line-300 flex flex-wrap gap-4">
          <Link href="/termini"
            className="text-xs font-bold tracking-widest uppercase text-brand-500 hover:text-brand-600 transition-colors">
            Termini e Condizioni →
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
