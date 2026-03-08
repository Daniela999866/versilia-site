// src/app/api/stripe/create-payment/route.ts
export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { stripe, formatAmountForStripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { check_in, check_out, guest_name, guest_email, guests_count, total, deposit, message, guest_phone } = await req.json();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: guest_email,
      metadata: {
        check_in, check_out, guest_name, guest_email, guest_phone,
        guests_count: String(guests_count), message: message || '',
        total_price: String(total), deposit_paid: String(deposit),
      },
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Villa Versilia – ${check_in} → ${check_out}`,
              description: `Caparra 30% per ${guests_count} ospiti. Saldo €${total - deposit} da pagare all'arrivo.`,
              images: [`${siteUrl}/images/villa/villa-versilia-esterno-facciata.jpg`],
            },
            unit_amount: formatAmountForStripe(deposit),
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/conferma?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/prenotazione?cancelled=true`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
