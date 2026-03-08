// src/components/villa/VillaRules.tsx
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

const rules = {
  allowed: [
    'Animali domestici di piccola/media taglia (da comunicare)',
    'Feste private in giardino (fino alle 23:00)',
    'Bambini di tutte le età',
    'Fumatori (solo in giardino)',
    'Uso del barbecue incluso',
  ],
  notAllowed: [
    'Feste con musica ad alto volume dopo le 23:00',
    'Subaffitto a terzi',
    'Più di 8 ospiti senza accordo preventivo',
    'Fumo all\'interno della villa',
  ],
  checkin: [
    { icon: Clock, label: 'Check-in', value: 'Dalle 16:00', note: 'Orario flessibile su richiesta' },
    { icon: Clock, label: 'Check-out', value: 'Entro le 10:00', note: 'Late check-out su disponibilità' },
    { icon: AlertCircle, label: 'Soggiorno minimo', value: '7 notti (lug-ago)', note: '3 notti in bassa stagione' },
  ],
};

export default function VillaRules() {
  return (
    <section className="py-20 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-subtitle mb-3">Regole della casa</p>
          <h2 className="section-title">Serene vacanze per tutti</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Consentito */}
          <div className="bg-white p-7 shadow-card">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-sage-500" /> Consentito
            </h3>
            <ul className="space-y-3">
              {rules.allowed.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-sage-500 mt-0.5 flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Non consentito */}
          <div className="bg-white p-7 shadow-card">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-400" /> Non consentito
            </h3>
            <ul className="space-y-3">
              {rules.notAllowed.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Orari */}
          <div className="bg-white p-7 shadow-card">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-500" /> Orari & soggiorno
            </h3>
            <div className="space-y-5">
              {rules.checkin.map(({ icon: Icon, label, value, note }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-400 block">{label}</span>
                    <span className="font-bold text-gray-900 text-sm block">{value}</span>
                    <span className="text-xs text-gray-400">{note}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-line-200">
              <p className="text-xs text-gray-500 leading-relaxed">
                Per qualsiasi necessità o accordo speciale, contattaci via{' '}
                <a href="https://wa.me/393755455596" className="text-brand-500 font-bold">WhatsApp</a>.
                Risposta garantita entro poche ore.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
