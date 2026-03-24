import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cartão Ultrablue BTG Pactual",
  description:
    "Exclusividade e conveniência para suas viagens com experiências premium.",
};

export default function UltrablueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#012A5B] text-white antialiased">{children}</div>
  );
}
