// src/lib/email.ts
import nodemailer from 'nodemailer';
import { Booking } from '@/types';
import { formatDate, formatCurrency } from './utils';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || 587),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendBookingConfirmation(booking: Booking): Promise<void> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const guestHtml = `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prenotazione Confermata - Villa Versilia</title>
  <style>
    body { font-family: Georgia, serif; background: #fdfaf5; margin: 0; padding: 20px; color: #333; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #2aa4f4, #0d67cc); padding: 40px; text-align: center; }
    .header h1 { color: white; font-size: 28px; margin: 0; letter-spacing: 2px; }
    .header p { color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px; }
    .body { padding: 40px; }
    .greeting { font-size: 18px; color: #444; margin-bottom: 20px; }
    .details-box { background: #f8f0e0; border-radius: 8px; padding: 24px; margin: 24px 0; border-left: 4px solid #c8942e; }
    .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5c88a; }
    .detail-row:last-child { border-bottom: none; font-weight: bold; font-size: 16px; }
    .detail-label { color: #666; }
    .detail-value { color: #333; font-weight: 600; }
    .highlight { background: #eef9ff; border-radius: 8px; padding: 16px; margin: 16px 0; text-align: center; font-size: 14px; color: #0d67cc; }
    .footer { background: #2d2d2d; padding: 24px; text-align: center; }
    .footer p { color: #999; font-size: 12px; margin: 4px 0; }
    .footer a { color: #c8942e; text-decoration: none; }
    .btn { display: inline-block; background: #c8942e; color: white; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-size: 14px; margin: 16px 0; letter-spacing: 1px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>VILLA VERSILIA</h1>
      <p>Il tuo rifugio a 250 metri dal mare · Versilia, Toscana</p>
    </div>
    <div class="body">
      <p class="greeting">Caro/a ${booking.guest_name},</p>
      <p>La tua prenotazione è <strong>confermata</strong>! Non vediamo l'ora di accoglierti in Villa Versilia. ☀️</p>

      <div class="details-box">
        <div class="detail-row">
          <span class="detail-label">📅 Check-in</span>
          <span class="detail-value">${formatDate(booking.check_in)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">📅 Check-out</span>
          <span class="detail-value">${formatDate(booking.check_out)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">👥 Ospiti</span>
          <span class="detail-value">${booking.guests_count} persone</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">💰 Totale</span>
          <span class="detail-value">${formatCurrency(booking.total_price)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">✅ Caparra pagata</span>
          <span class="detail-value">${formatCurrency(booking.deposit_paid)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">⏳ Saldo da pagare</span>
          <span class="detail-value">${formatCurrency(booking.total_price - booking.deposit_paid)}</span>
        </div>
      </div>

      <div class="highlight">
        🏠 Il saldo rimanente (<strong>${formatCurrency(booking.total_price - booking.deposit_paid)}</strong>) può essere pagato all'arrivo o tramite bonifico.
      </div>

      <p><strong>Come raggiungerci:</strong><br>
      Via Marina, Forte dei Marmi, Versilia (LU), Toscana<br>
      Le istruzioni dettagliate e i codici di accesso ti saranno inviati 48 ore prima del check-in.</p>

      <p>Per qualsiasi informazione:</p>
      <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}" class="btn">💬 Contattaci su WhatsApp</a>

    </div>
    <div class="footer">
      <p><strong style="color:#c8942e">VILLA VERSILIA</strong></p>
      <p>Forte dei Marmi, Versilia, Toscana, Italia</p>
      <p><a href="mailto:info@villaversilia.it">info@villaversilia.it</a> · <a href="${siteUrl}">${siteUrl}</a></p>
    </div>
  </div>
</body>
</html>`;

  const adminHtml = `
<h2>Nuova prenotazione ricevuta!</h2>
<p><strong>Nome:</strong> ${booking.guest_name}</p>
<p><strong>Email:</strong> ${booking.guest_email}</p>
<p><strong>Telefono:</strong> ${booking.guest_phone}</p>
<p><strong>Check-in:</strong> ${formatDate(booking.check_in)}</p>
<p><strong>Check-out:</strong> ${formatDate(booking.check_out)}</p>
<p><strong>Ospiti:</strong> ${booking.guests_count}</p>
<p><strong>Totale:</strong> ${formatCurrency(booking.total_price)}</p>
<p><strong>Caparra pagata:</strong> ${formatCurrency(booking.deposit_paid)}</p>
${booking.message ? `<p><strong>Messaggio:</strong> ${booking.message}</p>` : ''}
<p><a href="${siteUrl}/admin/dashboard">Vai al pannello admin</a></p>`;

  // Email all'ospite
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: booking.guest_email,
    subject: `✅ Prenotazione confermata - Villa Versilia (${formatDate(booking.check_in)} - ${formatDate(booking.check_out)})`,
    html: guestHtml,
  });

  // Email all'admin
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_USER,
    subject: `🏠 Nuova prenotazione: ${booking.guest_name} - ${formatDate(booking.check_in)}`,
    html: adminHtml,
  });
}

export async function sendBookingCancellation(booking: Booking): Promise<void> {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: booking.guest_email,
    subject: `Prenotazione cancellata - Villa Versilia`,
    html: `
      <h2>Prenotazione cancellata</h2>
      <p>Caro/a ${booking.guest_name},</p>
      <p>La tua prenotazione per il periodo ${formatDate(booking.check_in)} - ${formatDate(booking.check_out)} è stata cancellata.</p>
      <p>Per rimborsi o informazioni, contattaci a info@villaversilia.it</p>
    `,
  });
}
