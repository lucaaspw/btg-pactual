import { UltrablueClosingCta } from "@/components/ultrablue/UltrablueClosingCta";
import { UltrablueFooter } from "@/components/ultrablue/UltrablueFooter";
import { UltrablueHeader } from "@/components/ultrablue/UltrablueHeader";
import {
  UltrablueCashbackSection,
  UltrablueBeneficiosHero,
  UltrablueIofAndTerminalSection,
  UltrablueLoungekeySection,
} from "@/components/ultrablue/beneficios/UltrablueBeneficiosSections";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Benefícios Ultrablue — Cartão Ultrablue BTG Pactual",
  description:
    "Conheça os benefícios do Cartão Ultrablue com vantagens exclusivas para viagens e experiências.",
};

export default function UltrablueBeneficiosPage() {
  return (
    <>
      <UltrablueHeader />
      <main className="bg-white text-[#05132A]">
        <UltrablueBeneficiosHero />
        <UltrablueCashbackSection />
        <UltrablueIofAndTerminalSection />
        <UltrablueLoungekeySection />
      </main>
      <UltrablueClosingCta />
      <UltrablueFooter />
    </>
  );
}
