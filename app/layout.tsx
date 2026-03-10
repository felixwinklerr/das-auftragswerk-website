import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Das Auftragswerk — Automatische Anfragen-Systeme für deutsche Dienstleister",
  description:
    "In 14 Tagen ein funktionierendes Anfragen-System: Landing Page, Google Business, Follow-up Automatisierung. €3.500 einmalig. System gehört Ihnen.",
  openGraph: {
    title: "Das Auftragswerk — Automatische Anfragen-Systeme für deutsche Dienstleister",
    description:
      "In 14 Tagen ein funktionierendes Anfragen-System: Landing Page, Google Business, Follow-up Automatisierung. €3.500 einmalig. System gehört Ihnen.",
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
      </body>
    </html>
  );
}
