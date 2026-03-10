'use client';
// src/components/home/FaqSection.tsx
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "Qual è l'orario di check-in e check-out?",
    a: "Il check-in è disponibile dalle ore 15:30, il check-out entro le ore 10:30. Per esigenze particolari è possibile concordare orari diversi direttamente con noi via WhatsApp.",
  },
  {
    q: "Quante persone può ospitare la villa?",
    a: "La villa è ideale per famiglie o gruppi fino a 8-10 persone, con 3 camere da letto e possibilità di aggiungere letti supplementari su richiesta.",
  },
  {
    q: "Il parcheggio è incluso?",
    a: "Sì! La villa dispone di parcheggio privato per 2 auto, incluso nel prezzo del soggiorno. Nessun problema di parcheggio nei mesi estivi.",
  },
  {
    q: "La spiaggia è davvero vicina?",
    a: "Assolutamente sì. La spiaggia dista circa 250 metri — circa 3 minuti a piedi. Lido di Camaiore offre spiagge bellissime con stabilimenti attrezzati e spiaggia libera.",
  },
  {
    q: "Come funziona il pagamento?",
    a: "Al momento della prenotazione viene richiesta una caparra del 30% tramite carta di credito (Stripe). Il saldo rimanente può essere pagato all'arrivo in contanti o tramite bonifico bancario.",
  },
  {
    q: "È possibile portare animali domestici?",
    a: "La villa accetta animali domestici di piccola taglia previo accordo con i proprietari. Contattaci prima di prenotare per verificare la disponibilità.",
  },
  {
    q: "Cosa è incluso nel prezzo?",
    a: "Il prezzo include: uso esclusivo della villa, giardino e parcheggio, biancheria da letto e da bagno, Wi-Fi, aria condizionata, e le spese di pulizia finale.",
  },
  {
    q: "Come si raggiunge la villa?",
    a: "Via Adolfo Massei 28, Lido di Camaiore (LU). In auto: A11 uscita Viareggio, poi direzione Lido di Camaiore. In treno: stazione di Viareggio a 5 km, poi taxi o autobus. Le istruzioni dettagliate vengono inviate prima del check-in.",
  },
  {
    q: "Qual è la politica di cancellazione?",
    a: "Cancellazione gratuita fino a 7 giorni prima del check-in con rimborso completo della caparra. Tra 15 e 30 giorni rimborso del 50%. Sotto i 15 giorni la caparra non è rimborsabile. Per soggiorni di luglio/agosto si applicano condizioni speciali.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="section-subtitle mb-3">Hai domande?</p>
          <h2 className="section-title">Domande Frequenti</h2>
          <p className="mt-4 text-gray-500 text-base">
            Non trovi la risposta? Scrivici su{' '}
            <a href="https://wa.me/393755455596" className="text-gold-600 font-bold underline underline-offset-2">
              WhatsApp
            </a>{' '}
            o via{' '}
            <a href="mailto:villaversiliarelais@gmail.com" className="text-gold-600 font-bold underline underline-offset-2">
              email
            </a>
            .
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-line-200 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-cream-100 transition-colors duration-200 gap-4"
              >
                <span className="font-display text-gray-900 text-base pr-4">{faq.q}</span>
                <span className="flex-shrink-0 w-6 h-6 bg-cream-200 flex items-center justify-center">
                  {open === i
                    ? <Minus className="w-3.5 h-3.5 text-gold-600" />
                    : <Plus className="w-3.5 h-3.5 text-gold-600" />}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? 'max-h-48' : 'max-h-0'
                }`}
              >
                <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-line-100 pt-4">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
