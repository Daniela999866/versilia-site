// src/app/layout.tsx
import type { Metadata } from 'next';
// Fonts loaded via globals.css @import (Google Fonts CDN)
import { Toaster } from 'react-hot-toast';
import './globals.css';

// Font variables injected via CSS — see globals.css

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.villaversilia.it'),
  title: {
    default: 'Villa Versilia – Casa Vacanze a 250m dal Mare | Forte dei Marmi',
    template: '%s | Villa Versilia',
  },
  description:
    'Villa Versilia: splendida casa vacanze a soli 250 metri dal mare in Versilia, Toscana. 3 camere da letto, grande giardino privato, barbecue. Ideale per famiglie fino a 10 persone. Prenota direttamente senza commissioni.',
  keywords: [
    'villa versilia',
    'casa vacanze versilia',
    'affitto forte dei marmi',
    'villa mare toscana',
    'case vacanze versilia',
    'villa con giardino forte dei marmi',
    'affitto estivo versilia',
    'villa 3 camere versilia',
    'vacanze toscana mare',
    'villa privata versilia',
  ],
  authors: [{ name: 'Villa Versilia' }],
  creator: 'Villa Versilia',
  publisher: 'Villa Versilia',
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://www.villaversilia.it',
    siteName: 'Villa Versilia',
    title: 'Villa Versilia – Il tuo rifugio a 250 metri dal mare',
    description:
      'Splendida villa con giardino privato e barbecue a 250m dalla spiaggia in Versilia, Toscana.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Villa Versilia - Casa Vacanze',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Villa Versilia – Casa Vacanze in Versilia',
    description: 'Villa con giardino a 250m dal mare, Forte dei Marmi, Toscana.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.villaversilia.it',
    languages: {
      'it-IT': 'https://www.villaversilia.it',
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="it"
      className="font-sans"
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#c8942e" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LodgingBusiness',
              name: 'Villa Versilia',
              description:
                'Casa vacanze con giardino privato a 250 metri dal mare in Versilia, Toscana.',
              url: 'https://www.villaversilia.it',
              telephone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Via Marina',
                addressLocality: 'Forte dei Marmi',
                addressRegion: 'Toscana',
                postalCode: '55042',
                addressCountry: 'IT',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 43.9635,
                longitude: 10.1725,
              },
              amenityFeature: [
                { '@type': 'LocationFeatureSpecification', name: 'WiFi gratuito', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Giardino privato', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Barbecue', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Parcheggio', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Aria condizionata', value: true },
              ],
              numberOfRooms: 3,
              occupancy: {
                '@type': 'QuantitativeValue',
                minValue: 1,
                maxValue: 10,
              },
              checkinTime: '16:00',
              checkoutTime: '10:00',
            }),
          }}
        />
      </head>
      <body className="font-body bg-cream-100 text-gray-900 antialiased">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#333',
              fontFamily: 'var(--font-lato)',
              fontSize: '14px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
              borderRadius: '8px',
              border: '1px solid #f0deb8',
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
