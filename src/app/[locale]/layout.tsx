import Footer from '@/components/ui/Footer';
import type { Metadata } from "next";
import "../globals.css";

// Importante per la generazione statica
export function generateStaticParams() {
  return [
    {locale: 'it'},
    {locale: 'en'}
  ];
}

export const metadata: Metadata = {
  title: "Ronin Character Generator",
  description: "Generate a character for a ronin-themed adventure.",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  // Await dei params prima di usarli
  const { locale } = await params;

  return (
    <html lang={locale} className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=IM+Fell+English:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased" style={{ position: 'relative', minHeight: '100vh' }}>
        {/* Immagine PNG ruotata in alto a destra */}
        <img
          src="/img/compwith_ronin.png"
          alt="Ronin"
          className="ronin-img-topright"
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
