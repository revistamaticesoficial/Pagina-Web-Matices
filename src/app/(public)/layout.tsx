import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Revista Matices - Cerro de las Rosas, Córdoba",
  description:
    "Revista del Cerro de las Rosas con 34 años de trayectoria. Noticias locales, comercios del barrio y contenido de interés para la comunidad del norte de Córdoba.",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}


