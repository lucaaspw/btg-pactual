import { UltrablueClosingCta } from "@/components/ultrablue/UltrablueClosingCta";
import { UltrablueFooter } from "@/components/ultrablue/UltrablueFooter";
import { UltrablueHeader } from "@/components/ultrablue/UltrablueHeader";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const cashbackItems = [
  "Até 1,7% de retorno em compras",
  "3 pontos por dólar em compras nacionais",
  "3,5 pontos por dólar em compras internacionais",
] as const;

const terminalBenefits = [
  "20% OFF",
  "Check-in dedicado",
  "Concierge exclusivo",
  "Despacho de bagagens sem filas",
  "Raio-x prioritário",
] as const;

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
        <section className="relative overflow-hidden bg-[#EFF2F6] px-5 pb-10 pt-[5.5rem] sm:px-8 sm:pb-12 sm:pt-24 lg:px-8">
          <Image
            src="/ultrablue_image/banner_default.jpg"
            alt="Background Ultrablue"
            fill
            className="object-cover absolute inset-0 object-bottom"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
          <div className="relative mx-auto max-w-[1280px] pb-10 pt-10 sm:pb-12">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-10">
              <div className="max-w-[540px]">
                <Link
                  href="/ultrablue"
                  className="mb-10 flex items-center gap-1 text-[1.2rem] text-[#05132A] transition hover:text-[#0B2859] md:text-2xl"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                  Voltar
                </Link>
                <h1 className="text-center text-5xl font-bold leading-tight tracking-tight text-[#0B2859] md:text-left">
                  Benefícios do <br className="lg:hidden" />
                  Cartão Ultrablue
                </h1>
                <p className="mt-6 text-center text-2xl leading-snug text-[#05132A] md:text-left">
                  Muito mais do que um cartão:
                  <br />
                  praticidade, economia e experiências exclusivas no seu dia a
                  dia e em suas viagens.
                </p>
              </div>

              <div className="relative mx-auto h-[300px] w-full max-w-[660px] overflow-hidden sm:h-[360px] lg:h-[520px]">
                <Image
                  src="/ultrablue_image/card_ultrablue.png"
                  alt="Cartão Ultrablue BTG Pactual"
                  fill
                  className="object-contain object-center"
                  priority
                  sizes="(max-width: 1024px) 100vw, 660px"
                />
              </div>
              <Link
                href="https://api.whatsapp.com/send?phone=551148621688&text=Ultrablue%20BTG%20Pactual%3A%20Sele%C3%A7%C3%A3o%20para%20a%20P%C3%A1scoa%20com%20benef%C3%ADcios%20exclusivos%20-%20C%C3%B3digo%20U0206"
                className="mt-8 w-full flex items-center justify-between gap-2 bg-[#2E73D4] px-8 py-4 lg:hidden text-white transition hover:bg-[#3A80E4]"
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

        <section className="px-5 pb-16 pt-16 sm:px-8 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="border-b border-[#DFE6F0] pb-6 text-4xl font-bold text-[#0B2859]">
              Cashback
            </h2>
            <p className="mt-8 text-2xl leading-snug text-[#05132A]">
              Ganhe benefícios em todas as compras realizadas com seu cartão
              Ultrablue.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              <article className="rounded-xl border border-[#05132A] px-5 py-4 text-[#05132A]">
                <p className="text-2xl leading-tight text-[#05132A]">
                  Até <strong>1,7% de retorno</strong> em compras
                </p>
              </article>
              <article className="rounded-xl border border-[#05132A] px-5 py-4 text-[#05132A]">
                <p className="text-2xl leading-tight text-[#05132A]">
                  <strong>3 pontos por dólar</strong> em compras nacionais
                </p>
              </article>
              <article className="rounded-xl border border-[#05132A] px-5 py-4 text-[#05132A]">
                <p className="text-2xl leading-tight text-[#05132A]">
                  <strong>3,5 pontos por dólar</strong> em compras
                  internacionais
                </p>
              </article>
            </div>
            <p className="mt-8 text-2xl leading-snug text-[#05132A]">
              Os benefícios podem ser utilizados para potencializar suas
              experiências e sua rotina.
            </p>
          </div>
        </section>

        <section className="px-5 pb-14 sm:px-8 sm:pb-16 lg:px-8">
          <div className="mx-auto max-w-[1280px] lg:border-t border-[#DFE6F0]">
            <div className="grid grid-cols-1 items-stretch gap-6 pb-10 lg:grid-cols-2 lg:gap-8">
              <article className="flex h-full flex-col justify-center">
                <h2 className="text-4xl font-bold leading-tight text-[#0B2859]">
                  IOF Reduzido
                </h2>
                <p className="mt-5 text-2xl text-[#05132A]">
                  Viaje com mais economia.
                </p>
                <p className="hidden lg:block mt-8 max-w-[560px] text-2xl leading-snug text-[#05132A]">
                  Redução de <strong>4.38% para 1.1% no IOF</strong> em compras
                  internacionais.
                </p>
                <p className="hidden lg:block mt-8 max-w-[560px] border-t border-[#DFE6F0] pt-6 text-2xl leading-snug text-[#05132A]">
                  Mais previsibilidade e vantagens no uso do seu cartão no
                  exterior.
                </p>
              </article>

              <div className="relative h-[200px] md:h-[380px] overflow-hidden sm:h-[420px] lg:h-[420px]">
                <Image
                  src="/ultrablue_image/iof_reduzido.jpg"
                  alt="Economia em viagens internacionais"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 670px"
                />
              </div>
              <p className="lg:hidden mt-2 max-w-[560px] text-2xl leading-snug text-[#05132A]">
                Redução de <strong>4.38% para 1.1% no IOF</strong> em compras
                internacionais.
              </p>
              <p className="lg:hidden mt-2 max-w-[560px] border-t border-[#DFE6F0] pt-6 text-2xl leading-snug text-[#05132A]">
                Mais previsibilidade e vantagens no uso do seu cartão no
                exterior.
              </p>
            </div>

            <div className="mt-10 lg:border-t border-[#DFE6F0]">
              <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
                <h2 className="text-4xl lg:hidden font-bold leading-tight text-[#0B2859]">
                  Acesso ao Terminal BTG
                </h2>
                <p className="mt-5 lg:hidden text-2xl text-[#05132A]">
                  Uma experiência diferenciada antes mesmo de embarcar.
                </p>
                <div className="relative h-[200px] md:h-[380px] overflow-hidden sm:h-[560px] md:h-[520px] lg:h-[550px]">
                  <Image
                    src="/beneficios_image/acesso_terminal.png"
                    alt="Terminal BTG"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 640px"
                  />
                </div>

                <article className="flex h-full flex-col justify-center py-6">
                  <h2 className="text-4xl hidden lg:block font-bold leading-tight text-[#0B2859]">
                    Acesso ao Terminal BTG
                  </h2>
                  <p className="mt-5 hidden lg:block text-2xl text-[#05132A]">
                    Uma experiência diferenciada antes mesmo de embarcar.
                  </p>
                  <p className="mt-6 text-2xl font-semibold text-[#0B2859]">
                    Benefícios incluem:
                  </p>

                  <ul className="mt-3">
                    {terminalBenefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="border-b border-[#DFE6F0] py-3 text-2xl text-[#05132A] last:border-b-0"
                      >
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </section>
        <section className="px-5 pb-14 sm:px-8 sm:pb-16 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="text-4xl font-bold leading-tight text-[#0B2859]">
              Salas VIP Loungekey
            </h2>
            <hr className="mt-6  border-[#DFE6F0]" />
            <p className="mt-5 text-2xl text-[#05132A]">
              Acesse mais de{" "}
              <strong>1.000 salas VIP em aeroportos ao redor do mundo</strong>,
              com bebidas, wi-fi, conforto e privacidade.
            </p>
            <p className="mt-5 text-2xl font-bold text-[#05132A]">
              Inclui até 12 convidados por ano.
            </p>
          </div>
        </section>
      </main>
      <UltrablueClosingCta />
      <UltrablueFooter />
    </>
  );
}
