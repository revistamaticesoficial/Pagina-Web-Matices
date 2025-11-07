import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import { AuthProvider } from "@/providers/AuthProvider";
import { Noto_Sans, Gabarito } from "next/font/google";
import "./globals.css";


const gabarito = Gabarito({
  weight: '400',
  subsets: ['latin'],
})


export const metadata: Metadata = {
  title: "Revista Matices - Cerro de las Rosas, Córdoba",
  description: "Revista del Cerro de las Rosas con 35 años de trayectoria. Noticias locales, comercios del barrio y contenido de interés para la comunidad del norte de Córdoba.",
  keywords: "revista, matices, cerro de las rosas, córdoba, noticias locales, comercios, barrio",
  authors: [{ name: "Revista Matices" }],
  openGraph: {
    title: "Revista Matices - Cerro de las Rosas",
    description: "35 años informando al norte de Córdoba",
    type: "website",
    locale: "es_AR",
  },
  icons: {
    icon: "/images/icon.png",
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${gabarito.className} antialiased`}
      >
        <AuthProvider>
          <main className="min-h-screen">
            {children}
          </main>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
