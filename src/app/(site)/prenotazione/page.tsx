'use client';
// @ts-nocheck
import { useState, Suspense } from 'react';
import { format, parseISO, differenceInDays } from 'date-fns';
import { it } from 'date-fns/locale';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';
import { Calendar, Users, User, Mail, Phone, MessageSquare, CreditCard, ShieldCheck, ArrowRight, Info, CheckCircle2 } from 'lucide-react';

function BookingForm() {
  const [form, setForm] = useState({
    check_in: '',
    check_out: '',
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    guests_count: 2,
    message: '',
  });

  const [priceData, setPriceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [paymentType, setPaymentType] = useState('deposit');
  const [step, setStep] = useState(1);

  const fetchPrice = async (ci, co) => {
    if (!ci || !co) return;
    if (differenceInDays(parseISO(co), parseISO(ci)) < 1) return;
    setLoadingPrice(true);
    try {
      const res = await fetch(`/api/prices?check_in=${ci}&check_out=${co}`);
      const data = await res.json();
      setPriceData(data);
    } catch {
      setPriceData(null);
    } finally {
      setLoadingPrice(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: name === 'guests_count' ? Number(value) : value };
    setForm(updated);
    if (name === 'check_in' || name === 'check_out') {
      const ci = name === 'check_in' ? value : form.check_in;
      const co = name === 'check_out' ? value : form.check_out;
      fetchPrice(ci, co);
    }
  };

  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    if (!form.check_in || !form.check_out) return toast.error('Seleziona le date');
    if (differenceInDays(parseISO(form.check_out), parseISO(form.check_in)) < 1) return toast.error('Il check-out deve essere dopo il check-in');
    setStep(2);
  };

  const handleSubmitStep2 = (e) => {
    e.preventDefault();
    if (!form.guest_name || !form.guest_email || !form.guest_phone) return toast.error('Compila tutti i campi obbligatori');
    setStep(3);
  };

  const handlePay = async () => {
    if (!priceData) return toast.error('Errore nel calcolo prezzi');
    setLoading(true);
    try {
      const bookingRes = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, total_price: priceData.total, deposit_amount: priceData.deposit, deposit_paid: 0 }),
      });
      const { booking, error } = await bookingRes.json();
      if (!bookingRes.ok || error) throw new Error(error || 'Errore prenotazione');
      const payRes = await fetch('/api/stripe/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ booking_id: booking.id, payment_type: paymentType }),
      });
      const { url, error: payError } = await payRes.json();
      if (!payRes.ok || payError) throw new Error(payError || 'Errore pagamento');
      window.location.href = url;
    } catch (err) {
      toast.error(err.message || 'Errore. Riprova.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-center gap-2 mb-10">
        {[{ n: 1, label: 'Date & Ospiti' }, { n: 2, label: 'I tuoi dati' }, { n: 3, label: 'Pagamento' }].map(({ n, label }, i) => (
          <div key={n} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 ${step >= n ? 'text-gold-600' : 'text-gray-300'}`}>
              <div className={`w-7 h-7 flex items-center justify-center text-sm font-bold ${step > n ? 'bg-green-500 text-white' : step === n ? 'bg-gold-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                {step > n ? <CheckCircle2 className="w-4 h-4" /> : n}
              </div>
              <span className={`text-sm font-bold hidden sm:block ${step >= n ? 'text-gray-700' : 'text-gray-300'}`}>{label}</span>
            </div>
            {i < 2 && <div className={`w-8 h-px ${step > n ? 'bg-gold-400' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">

          {step === 1 && (
            <form onSubmit={handleSubmitStep1} className="bg-white shadow-card p-8">
              <h2 className="font-display text-2xl text-gray-900 mb-6 pb-4 border-b border-line-200">Seleziona date e ospiti</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="label-field">Check-in *</label>
                    <input type="date" name="check_in" value={form.check_in} onChange={handleChange} min={format(new Date(), 'yyyy-MM-dd')} required className="input-field" />
                  </div>
                  <div>
                    <label className="label-field">Check-out *</label>
                    <input type="date" name="check_out" value={form.check_out} onChange={handleChange} min={form.check_in || format(new Date(), 'yyyy-MM-dd')} required className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="label-field">Numero ospiti * (max 10)</label>
                  <select name="guests_count" value={form.guests_count} onChange={handleChange} required className="input-field">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'persona' : 'persone'}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 text-sm text-amber-700">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>Caparra 30% del totale. Tassa soggiorno €1,50/persona/notte non inclusa. Pulizie incluse.</p>
                </div>
                <button type="submit" className="btn-primary w-full mt-2">Continua <ArrowRight className="w-4 h-4" /></button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmitStep2} className="bg-white shadow-card p-8">
              <h2 className="font-display text-2xl text-gray-900 mb-6 pb-4 border-b border-line-200">I tuoi dati</h2>
              <div className="space-y-5">
                <div>
                  <label className="label-field">Nome e Cognome *</label>
                  <input type="text" name="guest_name" value={form.guest_name} onChange={handleChange} placeholder="Mario Rossi" required className="input-field" />
                </div>
                <div>
                  <label className="label-field">Email *</label>
                  <input type="email" name="guest_email" value={form.guest_email} onChange={handleChange} placeholder="mario.rossi@email.com" required className="input-field" />
                </div>
                <div>
                  <label className="label-field">Telefono / WhatsApp *</label>
                  <input type="tel" name="guest_phone" value={form.guest_phone} onChange={handleChange} placeholder="+39 333 1234567" required className="input-field" />
                </div>
                <div>
                  <label className="label-field">Messaggio (opzionale)</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Richieste speciali, orario di arrivo..." rows={3} className="input-field resize-none" />
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1">← Indietro</button>
                  <button type="submit" className="btn-primary flex-1">Continua <ArrowRight className="w-4 h-4" /></button>
                </div>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="bg-white shadow-card p-8">
              <h2 className="font-display text-2xl text-gray-900 mb-6 pb-4 border-b border-line-200">Scegli come pagare</h2>
              <div className="space-y-4 mb-6">
                <label className={`flex items-start gap-4 p-5 border-2 cursor-pointer transition-all ${paymentType === 'deposit' ? 'border-gold-500 bg-cream-100' : 'border-gray-200'}`}>
                  <input type="radio" value="deposit" checked={paymentType === 'deposit'} onChange={() => setPaymentType('deposit')} className="mt-1" />
                  <div>
                    <div className="font-bold text-gray-800">Paga solo la caparra (30%)</div>
                    <div className="text-2xl font-display text-gold-600 my-1">{priceData ? formatCurrency(priceData.deposit) : '—'}</div>
                    <div className="text-xs text-gray-500">Saldo di {priceData ? formatCurrency(priceData.remaining) : '—'} da pagare all'arrivo</div>
                  </div>
                </label>
                <label className={`flex items-start gap-4 p-5 border-2 cursor-pointer transition-all ${paymentType === 'full' ? 'border-gold-500 bg-cream-100' : 'border-gray-200'}`}>
                  <input type="radio" value="full" checked={paymentType === 'full'} onChange={() => setPaymentType('full')} className="mt-1" />
                  <div>
                    <div className="font-bold text-gray-800">Paga il totale adesso</div>
                    <div className="text-2xl font-display text-gold-600 my-1">{priceData ? formatCurrency(priceData.total) : '—'}</div>
                    <div className="text-xs text-green-600 font-bold">✓ Nessun pagamento richiesto all'arrivo</div>
                  </div>
                </label>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Pagamento sicuro tramite Stripe.
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="btn-secondary">← Indietro</button>
                <button onClick={handlePay} disabled={loading || !priceData} className="btn-primary flex-1 disabled:opacity-50">
                  {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Elaborazione...</> : <><CreditCard className="w-4 h-4" /> Paga {priceData ? formatCurrency(paymentType === 'deposit' ? priceData.deposit : priceData.total) : ''}</>}
                </button>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="bg-cream-100 border border-gold-200 p-6 sticky top-24">
            <h3 className="font-display text-lg text-gray-900 mb-4 pb-3 border-b border-gold-200">Riepilogo</h3>
            {form.check_in && form.check_out && (
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between"><span className="text-gray-500">Check-in</span><span className="font-bold">{format(parseISO(form.check_in), 'dd MMM yyyy', { locale: it })}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Check-out</span><span className="font-bold">{format(parseISO(form.check_out), 'dd MMM yyyy', { locale: it })}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Ospiti</span><span className="font-bold">{form.guests_count}</span></div>
              </div>
            )}
            {loadingPrice ? (
              <div className="space-y-2 animate-pulse">{[1,2,3].map((i) => <div key={i} className="h-5 bg-cream-200 rounded" />)}</div>
            ) : priceData ? (
              <div className="space-y-2 text-sm">
                {priceData.discount_percentage > 0 && (
                  <>
                    <div className="flex justify-between text-gray-400"><span>Prezzo pieno</span><span className="line-through">{formatCurrency(priceData.subtotal_before_discount)}</span></div>
                    <div className="flex justify-between text-green-600 font-bold"><span>Sconto {priceData.discount_percentage}%</span><span>-{formatCurrency(priceData.subtotal_before_discount - priceData.subtotal)}</span></div>
                  </>
                )}
                <div className="flex justify-between text-gray-500 py-1 border-t border-gold-200 mt-3"><span>{priceData.nights} notti</span><span>{formatCurrency(priceData.subtotal)}</span></div>
                <div className="flex justify-between text-gray-500"><span>Pulizie</span><span className="text-green-600 font-bold">Incluse ✅</span></div>
                <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t-2 border-gold-500 mt-2"><span>Totale</span><span className="text-gold-600">{formatCurrency(priceData.total)}</span></div>
                <div className="text-xs text-amber-600 mt-2">⚠️ Tassa soggiorno: €1,50/persona/notte (non inclusa)</div>
              </div>
            ) : (
              <p className="text-sm text-gray-400">Seleziona le date per vedere il prezzo</p>
            )}
            <div className="mt-5 pt-4 border-t border-gold-200 text-xs text-gray-500 space-y-1">
              <p>📍 Via Adolfo Massei 28, Lido di Camaiore</p>
              <p>🌊 250m dalla spiaggia</p>
              <p>👥 Max 10 ospiti · Check-in 15:30</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400 mb-2">Hai dubbi? Contattaci!</p>
            <a href="https://wa.me/393755455596" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-green-600 hover:text-green-700 transition-colors">
              💬 WhatsApp +39 375 545 5596
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PrenotazionePage() {
  return (
    <>
      <section className="bg-gray-900 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 text-center pt-6">
          <p className="font-accent italic text-gold-300 text-xl mb-2">Prenota direttamente</p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-3">Prenota Villa Versilia</h1>
          <p className="text-white/60">Nessuna commissione · Conferma immediata · Pagamento sicuro</p>
        </div>
      </section>
      <section className="bg-cream-100 min-h-screen">
        <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" /></div>}>
          <BookingForm />
        </Suspense>
      </section>
    </>
  );
}
