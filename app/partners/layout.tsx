import { Manrope } from "next/font/google";
import type { Metadata } from "next";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-partners",
});

export const metadata: Metadata = {
  title: "Cartão Partners BTG Pactual",
  description:
    "O melhor do planeta para suas viagens, com experiências exclusivas e curadoria do Concierge.",
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${manrope.className} min-h-screen bg-btg-navy text-white antialiased`}
    >
      {children}
    </div>
  );
}
