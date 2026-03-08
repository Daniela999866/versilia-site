// src/app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import { sendBookingConfirmation } from '@/lib/email';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const m = session.metadata;

    try {
      // Salva prenotazione
      const { data: booking, error } = await supabaseAdmin
        .from('bookings')
        .insert([{
          check_in: m.check_in,
          check_out: m.check_out,
          guest_name: m.guest_name,
          guest_email: m.guest_email,
          guest_phone: m.guest_phone,
          guests_count: parseInt(m.guests_count),
          message: m.message,
          total_price: parseFloat(m.total_price),
          deposit_paid: parseFloat(m.deposit_paid),
          status: 'confirmed',
          stripe_session_id: session.id,
          payment_intent_id: session.payment_intent,
        }])
        .select().single();

      if (error) throw error;

      // Invia email di conferma
      await sendBookingConfirmation(booking);

      console.log('✅ Prenotazione confermata:', booking.id);
    } catch (err) {
      console.error('❌ Errore salvataggio prenotazione:', err);
      return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

export const dynamic = 'force-dynamic';
