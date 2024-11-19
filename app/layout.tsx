import type { Metadata } from "next";
import { plusJakartaSans, christopherSignature, montserrat } from './fonts'
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Castelul Cantacuzino",
  description: "Explore and book your visit to Castelul Cantacuzino",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${christopherSignature.variable} ${montserrat.variable}`}>
      <body className="bg-black min-h-screen flex flex-col">
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
