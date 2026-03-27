import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { MetaPixel } from "@/components/MetaPixel";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Das Auftragswerk - Automatische Anfragen-Systeme für deutsche Dienstleister",
  description:
    "In 14 Tagen ein funktionierendes Anfragen-System: Landing Page, Google Business, Follow-up Automatisierung. Einmalig, kein Abo. System gehört Ihnen.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Das Auftragswerk - Automatische Anfragen-Systeme für deutsche Dienstleister",
    description:
      "In 14 Tagen ein funktionierendes Anfragen-System: Landing Page, Google Business, Follow-up Automatisierung. Einmalig, kein Abo. System gehört Ihnen.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <CookieBanner />
        <MetaPixel />
        <Script
          src="https://link.msgsndr.com/js/external-tracking.js"
          data-tracking-id="tk_975727879f944365b4eb9a4e11ff409e"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
