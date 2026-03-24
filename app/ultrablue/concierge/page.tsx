import { UltrablueClosingCta } from "@/components/ultrablue/UltrablueClosingCta";
import { UltrablueFooter } from "@/components/ultrablue/UltrablueFooter";
import { UltrablueHeader } from "@/components/ultrablue/UltrablueHeader";
import { ULTRABLUE_LP_IMAGES } from "@/constants/ultrablue-lp";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Concierge Ultrablue — Cartão Ultrablue BTG Pactual",
  description:
    "Atendimento concierge para montar viagens e experiências exclusivas com curadoria Ultrablue.",
};

export default function UltrablueConciergePage() {
  return (
    <>
      <UltrablueHeader />
      <main className="bg-[#012A5B] text-white">
        <section className="relative z-0 h-[560px] overflow-hidden pt-[5.5rem] sm:pt-24 md:h-[600px]">
          <Image
            src={ULTRABLUE_LP_IMAGES.concierge}
            alt="Concierge Ultrablue"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#012A5B]/75 via-[#012A5B]/60 to-transparent"
            aria-hidden
          />
          <div className="relative z-10 mx-auto flex h-[400px] max-w-[1280px] flex-col justify-end px-5 pb-10 sm:px-8 md:pb-24 lg:px-0">
            <div className="max-w-2xl">
              <Link
                href="/ultrablue"
                className="mb-20 flex items-center gap-1 text-[#E7EEFF] transition hover:text-white md:text-2xl"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
                voltar
              </Link>
              <h1 className="text-center text-4xl font-bold leading-tight tracking-tight md:text-left md:text-5xl">
                Concierge Ultrablue
              </h1>
              <p className="mt-3 text-center text-2xl leading-snug text-white md:text-left md:text-3xl">
                O mundo do jeito que você imagina
              </p>
            </div>
          </div>
        </section>

        <section className="px-5 py-12 lg:px-8">
          <div className="mx-auto max-w-[1280px] border-b border-white/10 pb-8 text-[#E7EEFF]">
            <p className="mb-4 text-lg md:text-2xl">
              Com o Travel Service Ultrablue, nosso time organiza viagens,
              reservas e experiências exclusivas para você.
            </p>
            <p className="text-lg leading-snug md:text-2xl">
              Atendimento de segunda a segunda, das 8h às 20h.
            </p>
          </div>
        </section>
      </main>
      <UltrablueClosingCta />
      <UltrablueFooter />
    </>
  );
}
