'use client';
// src/components/booking/BookingForm.tsx
import { useState, useEffect } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { it } from 'date-fns/locale';
import { format, differenceInDays, parseISO, isBefore, startOfDay } from 'date-fns';
import { Calendar, Users, User, Phone, Mail, MessageSquare, CreditCard, Loader2, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import 'react-day-picker/dist/style.css';

interface PriceData {
  nights: number; price_per_night: number; subtotal: number;
  cleaning_fee: number; total: number; deposit: number; remaining: number;
}

export default function BookingForm() {
  const [range, setRange] = useState<DateRange | undefined>();
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [step, setStep] = useState<'dates' | 'form'>('dates');
  const [form, setForm] = useState({
    guest_name: '', guest_email: '', guest_phone: '',
    guests_count: '2', message: '',
  });

  // Carica date bloccate
  useEffect(() => {
    fetch('/api/availability')
      .then((r) => r.json())
      .then(({ blocked_dates, booked_dates }) => {
        const all = [...(blocked_dates || []), ...(booked_dates || [])];
        setBlockedDates(all.map((d: string) => parseISO(d)));
      });
  }, []);

  // Calcola prezzo quando le date cambiano
  useEffect(() => {
    if (!range?.from || !range?.to) { setPriceData(null); return; }
    const nights = differenceInDays(range.to, range.from);
    if (nights < 1) return;

    setLoadingPrice(true);
    const ci = format(range.from, 'yyyy-MM-dd');
    const co = format(range.to, 'yyyy-MM-dd');
    fetch(`/api/prices?check_in=${ci}&check_out=${co}`)
      .then((r) => r.json())
      .then((data) => { setPriceData(data); setLoadingPrice(false); })
      .catch(() => setLoadingPrice(false));
  }, [range]);

  const isDisabled = (date: Date) => {
    if (isBefore(date, startOfDay(new Date()))) return true;
    return blockedDates.some((d) =>
      format(d, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const handleDateSelect = (r: DateRange | undefined) => {
    setRange(r);
    if (r?.from && r?.to) setStep('form');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!range?.from || !range?.to || !priceData) return;
    if (!form.guest_name || !form.guest_email || !form.guest_phone) {
      toast.error('Compila tutti i campi obbligatori');
      return;
    }

    setLoadingPayment(true);
    try {
      const res = await fetch('/api/stripe/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          check_in: format(range.from, 'yyyy-MM-dd'),
          check_out: format(range.to, 'yyyy-MM-dd'),
          ...form,
          total: priceData.total,
          deposit: priceData.deposit,
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error || 'Errore pagamento');
    } catch (err: any) {
      toast.error(err.message || 'Errore. Riprova o contattaci su WhatsApp.');
      setLoadingPayment(false);
    }
  };

  const formatEur = (n: number) =>
    new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(n);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* ── Sinistra: Calendario + Form ── */}
      <div className="lg:col-span-2 space-y-6">

        {/* Calendario */}
        <div className="bg-white p-6 shadow-card">
          <h2 className="font-display text-2xl text-gray-900 mb-1 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gold-500" />
            Scegli le date
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            Seleziona check-in e check-out. Le date grigie sono già occupate.
          </p>

          <div className="flex justify-center overflow-x-auto">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={handleDateSelect}
              disabled={isDisabled}
              numberOfMonths={2}
              locale={it}
              modifiersClassNames={{
                selected: 'rdp-day_selected',
                range_start: 'rdp-day_selected',
                range_end: 'rdp-day_selected',
                range_middle: 'bg-cream-200 text-gold-700',
                disabled: 'rdp-day_disabled',
                today: 'rdp-day_today',
              }}
              styles={{
                caption: { fontFamily: 'var(--font-playfair)' },
              }}
            />
          </div>

          {range?.from && range?.to && (
            <div className="mt-4 p-3 bg-brand-50 border border-brand-200 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-brand-500 flex-shrink-0" />
              <div className="text-sm">
                <span className="font-bold text-gray-800">
                  {format(range.from, 'dd MMM yyyy', { locale: it })}
                </span>
                {' → '}
                <span className="font-bold text-gray-800">
                  {format(range.to, 'dd MMM yyyy', { locale: it })}
                </span>
                {priceData && (
                  <span className="text-gray-500 ml-2">· {priceData.nights} notti</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Form dati ospite */}
        {step === 'form' && range?.from && range?.to && (
          <form onSubmit={handleSubmit} className="bg-white p-6 shadow-card space-y-5">
            <h2 className="font-display text-2xl text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-gold-500" />
              I tuoi dati
            </h2>

            {/* Nome */}
            <div>
              <label className="label-field">Nome completo *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text" required placeholder="Mario Rossi"
                  className="input-field pl-10"
                  value={form.guest_name}
                  onChange={(e) => setForm({ ...form, guest_name: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Email */}
              <div>
                <label className="label-field">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email" required placeholder="mario@email.it"
                    className="input-field pl-10"
                    value={form.guest_email}
                    onChange={(e) => setForm({ ...form, guest_email: e.target.value })}
                  />
                </div>
              </div>

              {/* Telefono */}
              <div>
                <label className="label-field">Telefono *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel" required placeholder="+39 333 1234567"
                    className="input-field pl-10"
                    value={form.guest_phone}
                    onChange={(e) => setForm({ ...form, guest_phone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Ospiti */}
            <div>
              <label className="label-field">Numero ospiti *</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  className="input-field pl-10 appearance-none"
                  value={form.guests_count}
                  onChange={(e) => setForm({ ...form, guests_count: e.target.value })}
                >
                  {[1,2,3,4,5,6,7,8].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'ospite' : 'ospiti'}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Messaggio */}
            <div>
              <label className="label-field">Messaggio (opzionale)</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <textarea
                  rows={3} placeholder="Orario di arrivo, richieste speciali, animali..."
                  className="input-field pl-10 resize-none"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loadingPayment || !priceData}
              className="w-full flex items-center justify-center gap-3 py-4 bg-gold-500 text-white font-bold text-sm tracking-widest uppercase hover:bg-gold-600 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-warm hover:shadow-warm-lg"
            >
              {loadingPayment ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Reindirizzamento...</>
              ) : (
                <><CreditCard className="w-5 h-5" /> Paga la Caparra · {priceData ? formatEur(priceData.deposit) : '...'}</>
              )}
            </button>

            <p className="text-center text-xs text-gray-400">
              🔒 Pagamento sicuro via Stripe · La caparra è il 30% del totale
            </p>
          </form>
        )}
      </div>

      {/* ── Destra: Riepilogo prezzi ── */}
      <div className="space-y-4">
        {/* Info box */}
        <div className="bg-white p-6 shadow-card">
          <div className="relative h-44 overflow-hidden mb-5 -mx-6 -mt-6">
            <img
              src="/images/villa/villa-versilia-esterno-facciata.jpg"
              alt="Villa Versilia"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-3 left-4">
              <p className="text-white font-display text-lg">Villa Versilia</p>
              <p className="text-white/70 text-xs">Lido di Camaiore · 250m dal mare</p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            {[
              { icon: '🛏', text: '3 camere · 2 bagni' },
              { icon: '👥', text: 'Fino a 8 ospiti' },
              { icon: '🌿', text: 'Giardino privato + barbecue' },
              { icon: '🚗', text: 'Parcheggio privato 2 auto' },
              { icon: '❄️', text: 'Wi-Fi · Aria condizionata' },
              { icon: '✅', text: 'Check-in 16:00 · Check-out 10:00' },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-2">
                <span>{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Riepilogo prezzo */}
        {(loadingPrice || priceData) && (
          <div className="bg-white p-6 shadow-card border-t-4 border-gold-400">
            <h3 className="font-display text-lg text-gray-900 mb-4">Riepilogo</h3>

            {loadingPrice ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="w-6 h-6 animate-spin text-gold-500" />
              </div>
            ) : priceData ? (
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{formatEur(priceData.price_per_night)} × {priceData.nights} notti</span>
                  <span className="text-gray-800 font-bold">{formatEur(priceData.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Pulizia finale</span>
                  <span className="text-gray-800">{formatEur(priceData.cleaning_fee)}</span>
                </div>
                <div className="border-t border-line-200 pt-3 flex justify-between">
                  <span className="font-bold text-gray-800">Totale</span>
                  <span className="font-bold text-gray-900 text-lg">{formatEur(priceData.total)}</span>
                </div>
                <div className="bg-cream-100 border border-gold-200 p-3 rounded-sm">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gold-700 font-bold">Caparra ora (30%)</span>
                    <span className="text-gold-700 font-bold text-base">{formatEur(priceData.deposit)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Saldo all'arrivo</span>
                    <span>{formatEur(priceData.remaining)}</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Contatto diretto */}
        <div className="bg-deep-sea text-white p-5">
          <p className="font-bold text-sm mb-1">Preferisci parlare con noi?</p>
          <p className="text-gray-400 text-xs mb-4">Siamo disponibili ogni giorno per aiutarti.</p>
          <a
            href="https://wa.me/393755455596?text=Ciao!%20Vorrei%20prenotare%20Villa%20Versilia"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white text-xs font-bold tracking-widest uppercase hover:bg-green-400 transition-colors"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
