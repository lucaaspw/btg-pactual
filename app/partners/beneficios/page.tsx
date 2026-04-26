import { PartnersClosingCta } from "@/components/partners/PartnersClosingCta";
import { PartnersFooter } from "@/components/partners/PartnersFooter";
import { PartnersHeader } from "@/components/partners/PartnersHeader";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const cashbackItems = [
  "4 pontos a cada US$ 1,00 gasto em compras nacionais",
  "7 pontos a cada US$ 1,00 gasto em compras internacionais",
] as const;

const terminalBenefits = [
  "Check-in dedicado",
  "Concierge exclusivo",
  "Despacho de bagagens sem filas",
  "Raio-x prioritário",
] as const;

export const metadata: Metadata = {
  title: "Benefícios Partners — Cartão Partners BTG Pactual",
  description:
    "Conheça os benefícios do Cartão Partners com vantagens exclusivas para viagens e experiências.",
};

export default function PartnersBeneficiosPage() {
  return (
    <>
      <PartnersHeader />

      <main className="bg-btg-navy text-white">
        <section className="px-5 pt-[5.5rem] pb-10 sm:px-8 sm:pt-24 sm:pb-12 lg:px-8">
          <div className="mx-auto max-w-[1280px] pb-10 sm:pb-12">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-10">
              <div className="max-w-[540px]">
                <Link
                  href="/partners"
                  className="flex mb-10 mt-10 items-center gap-1 text-2xl text-[#E7EEFF] transition hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                  voltar
                </Link>
                <h1 className="text-4xl font-bold text-center md:text-left leading-tight tracking-tight md:text-5xl">
                  Benefícios do
                  <br className="md:hidden" />
                  Cartão Partners
                </h1>
                <p className="mt-6 text-2xl text-center md:text-left leading-snug text-[#E7EEFF]">
                  Muito mais do que um cartão:
                  <br />
                  vantagens exclusivas para suas viagens e experiências ao redor
                  do mundo.
                </p>
              </div>

              <div className="relative mx-auto h-[300px] w-full max-w-[660px] overflow-hidden sm:h-[360px] lg:h-[520px]">
                <Image
                  src="/beneficios_image/cartao_btg_partners.png"
                  alt="Cartão Partners BTG Pactual"
                  fill
                  className="object-contain object-center"
                  priority
                  sizes="(max-width: 1024px) 100vw, 660px"
                />
              </div>
              <Link
                href="https://api.whatsapp.com/send?phone=551148621680&text=Cart%C3%A3o%20Partners%3A%20Sele%C3%A7%C3%A3o%20para%20a%20P%C3%A1scoa%20com%20benef%C3%ADcios%20exclusivos%20-%20C%C3%B3digo%20P0202"
                className="inline-flex md:hidden items-center gap-2 bg-[#2E73D4] px-8 py-4 text-xl font-semibold text-white shadow-lg transition hover:bg-[#3A80E4]"
              >
                Quero falar com meu concierge
                <ArrowUpRight
                  className="h-5 w-5 shrink-0"
                  strokeWidth={2}
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </section>

        <section className="px-5 lg:pb-[170px] sm:px-8 pb-16 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="lg:border-b border-white/10 pb-6 text-3xl font-bold">
              Cashback
            </h2>
            <p className="mt-8 text-xl leading-snug text-[#E7EEFF]">
              Ganhe pontos a cada compra realizada com seu cartão Partners.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {cashbackItems.map((item) => (
                <article
                  key={item}
                  className="border border-[#5F7BA7] rounded-xl px-5 py-8"
                >
                  <p className="text-[1.2rem] leading-tight text-[#E7EEFF]">
                    {item}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-8 text-xl leading-snug text-[#E7EEFF]">
              Os pontos podem ser utilizados em programas de fidelidade e
              experiências.
            </p>
          </div>
        </section>

        <section className="px-5 pb-14 sm:px-8 sm:pb-16 lg:px-8">
          <div className="mx-auto max-w-[1280px] lg:border-t border-white/10">
            <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8 pb-10">
              <article className="flex h-full flex-col justify-center">
                <h2 className="text-3xl font-bold leading-tight">
                  Seguro Viagem Global
                </h2>
                <p className="mt-5 text-xl text-[#E7EEFF]">
                  Viaje com tranquilidade.
                </p>
                <p className="mt-8 max-w-[560px] hidden lg:block text-[1.35rem] leading-snug text-[#E7EEFF]">
                  O cartão Partners oferece{" "}
                  <strong>seguro viagem global</strong> da Omint, garantindo
                  cobertura para você e até <strong>4 dependentes</strong>{" "}
                  durante suas viagens.
                </p>
              </article>

              <div className="relative h-[219px] md:h-[380px] overflow-hidden lg:h-[420px]">
                <Image
                  src="/beneficios_image/seguro_viagem_global.png"
                  alt="Família em viagem na praia"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 670px"
                />
              </div>
              <article className="flex h-full flex-col justify-center">
                <p className="max-w-[560px] block lg:hidden text-[1.35rem] leading-snug text-[#E7EEFF]">
                  O cartão Partners oferece{" "}
                  <strong>seguro viagem global</strong> da Omint, garantindo
                  cobertura para você e até <strong>4 dependentes</strong>{" "}
                  durante suas viagens.
                </p>
              </article>
            </div>

            <div className="mt-10 lg:border-t border-white/10">
              <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
                <h2 className="text-3xl lg:hidden font-bold leading-tight">
                  Acesso ao Terminal BTG
                </h2>
                <p className="mt-5 text-xl lg:hidden text-[#E7EEFF]">
                  Uma experiência diferenciada antes mesmo de embarcar.
                </p>
                <div className="relative h-[219px] md:h-[520px] overflow-hidden lg:h-[550px]">
                  <Image
                    src="/beneficios_image/acesso_terminal.png"
                    alt="Terminal BTG"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 640px"
                  />
                </div>

                <article className="flex h-full flex-col justify-center py-6">
                  <h2 className="text-3xl hidden lg:block font-bold leading-tight">
                    Acesso ao Terminal BTG
                  </h2>
                  <p className="mt-5 text-xl hidden lg:block text-[#E7EEFF]">
                    Uma experiência diferenciada antes mesmo de embarcar.
                  </p>
                  <p className="md:mt-6 text-[1.35rem] font-semibold text-white">
                    Benefícios incluem:
                  </p>

                  <ul className="mt-3">
                    {terminalBenefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="border-b border-white/10 py-3 text-xl md:text-2xl font-light text-[#FFFFFF] last:border-b-0"
                      >
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>

            <article className="mt-10">
              <h2 className="lg:border-b border-white/10 pb-5 text-3xl font-bold">
                Salas VIP Loungekey
              </h2>
              <p className="mt-6 text-[1.35rem] leading-snug text-[#E7EEFF]">
                Acesse mais de <strong>1.000 salas VIP</strong> em aeroportos ao
                redor do mundo, com bebidas, wi-fi, conforto e privacidade.
              </p>
              <p className="mt-6 text-[1.35rem] leading-snug text-[#E7EEFF]">
                Inclui até <strong>12 convidados</strong> por ano.
              </p>
            </article>
          </div>
        </section>
      </main>

      <PartnersClosingCta />
      <PartnersFooter />
    </>
  );
}
