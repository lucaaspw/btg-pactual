import type { Metadata } from "next";

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
    <div className="min-h-screen bg-btg-navy text-white antialiased">
      {children}
    </div>
  );
}
