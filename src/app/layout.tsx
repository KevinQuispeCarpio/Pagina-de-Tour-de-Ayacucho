import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ayacucho Tour | Agencia de Viajes Premium",
  description: "Descubre la magia de Ayacucho con nuestras experiencias turísticas premium. Reserva tours, explora destinos históricos y disfruta de la mejor gastronomía.",
  keywords: ["Ayacucho", "Tours Ayacucho", "Viajes", "Turismo Perú", "Semana Santa Ayacucho", "Wari", "Quinua"],
  authors: [{ name: "Ayacucho Tour" }],
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://ayacuchotour.com",
    title: "Ayacucho Tour | Experiencias Premium",
    description: "Explora la vasta riqueza cultural y natural de Ayacucho. Reserva online y vive la aventura.",
    siteName: "Ayacucho Tour",
    images: [{
      url: "https://images.unsplash.com/photo-1526392060635-9d60198d3de3?q=80&w=1200&auto=format&fit=crop",
      width: 1200,
      height: 630,
      alt: "Plaza de Ayacucho"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayacucho Tour | Agencia de Viajes Premium",
    description: "Descubre la magia de Ayacucho con nuestras experiencias turísticas premium.",
    images: ["https://images.unsplash.com/photo-1526392060635-9d60198d3de3?q=80&w=1200&auto=format&fit=crop"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
