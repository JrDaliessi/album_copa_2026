import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Porta Figurinhas Copa 2026 | Personalizado com seu Nome",
  description:
    "Porta-figurinhas temático da Copa do Mundo 2026. Disponível em 4 cores exclusivas com opção de personalização. Peça o seu agora pelo WhatsApp!",
  keywords: ["porta figurinhas", "copa 2026", "álbum copa 2026", "figurinhas personalizado"],
  openGraph: {
    title: "Porta Figurinhas Copa 2026",
    description: "4 cores exclusivas + personalização com nome. Peça agora!",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07090F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="min-h-full flex flex-col antialiased bg-[#07090F]">
        {children}
      </body>
    </html>
  );
}
