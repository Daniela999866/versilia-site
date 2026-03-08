'use client';
// src/app/(site)/conferma/page.tsx
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Calendar, Users, Mail, Phone, MapPin, Home } from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';

function ConfermaContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('booking_id');
  const sessionId = searchParams.get('session_id');
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) return;
    const fetchBooking = async () => {
      try {
        const res = await fetch(`/api/bookings/${bookingId}`);
        if (res.ok) {
          const data = await res.json();
          setBooking(data.booking);
        }
      } catch (err) {
        console.error('Failed to fetch booking:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      {/* Success icon */}
      <div className="w-24 h-24 bg-green-100 flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-12 h-12 text-green-500" />
      </div>

      <h1 className="font-display text-4xl text-gray-900 mb-3">
        Prenotazione Confermata!
      </h1>
      <p className="font-accent italic text-brand-500 text-xl mb-6">
        Benvenuti a Villa Versilia
      </p>
      <p className="text-gray-500 mb-10">
        Hai ricevuto un'email di conferma all'indirizzo {booking?.guest_email || 'fornito'}.
        Controlla anche la cartella spam.
      </p>

      {booking && (
        <div className="bg-cream-100 border border-gold-200/40 p-6 text-left mb-8">
          <h2 className="font-bold text-gray-800 mb-4 text-sm tracking-widest uppercase">
            Dettagli Prenotazione
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-gold-500" />
              <span><strong>Check-in:</strong> {formatDate(booking.check_in)}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-gold-500" />
              <span><strong>Check-out:</strong> {formatDate(booking.check_out)}</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-gold-500" />
              <span><strong>Ospiti:</strong> {booking.guests_count}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gold-500" />
              <span><strong>Email:</strong> {booking.guest_email}</span>
            </div>
            <div className="flex items-center gap-3 pt-2 border-t border-gold-200/40">
              <span className="font-bold text-gray-700">Totale:</span>
              <span className="text-gold-600 font-bold">{formatCurrency(booking.total_price)}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-700">Pagato:</span>
              <span className="text-green-600 font-bold">{formatCurrency(booking.deposit_paid)}</span>
            </div>
            {booking.total_price - booking.deposit_paid > 0 && (
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-700">Saldo:</span>
                <span>{formatCurrency(booking.total_price - booking.deposit_paid)} · da pagare all'arrivo</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-brand-50 border border-brand-200 p-5 text-left mb-8">
        <h3 className="font-bold text-brand-800 mb-2 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Come raggiungerci
        </h3>
        <p className="text-brand-700 text-sm">
          Via Adolfo Massei 28, Lido di Camaiore (LU) · Versilia, Toscana
        </p>
        <p className="text-brand-500 text-xs mt-2">
          Le istruzioni dettagliate per l'accesso ti saranno inviate 48 ore prima del check-in.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/" className="btn-secondary flex items-center gap-2">
          <Home className="w-4 h-4" />
          Torna alla Home
        </Link>
        <a
          href="https://wa.me/393755455596?text=Ciao!%20Ho%20appena%20prenotato%20Villa%20Versilia"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-sm tracking-widest uppercase transition-colors"
        >
          Scrivici su WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function ConfermaPage() {
  return (
    <section className="min-h-screen bg-cream-100">
      <div className="pt-20">
        <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" /></div>}>
          <ConfermaContent />
        </Suspense>
      </div>
    </section>
  );
}
