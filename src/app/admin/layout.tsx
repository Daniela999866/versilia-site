// src/app/admin/layout.tsx
export const metadata = {
  title: 'Admin – Villa Versilia',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="bg-gray-100 font-sans">
        {children}
      </body>
    </html>
  );
}
