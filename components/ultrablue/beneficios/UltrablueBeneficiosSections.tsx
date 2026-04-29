import { ArrowUpRight, ChevronLeft } from "lucide-react";
import { CONCIERGE_WHATSAPP } from "@/constants/concierge";
import Image from "next/image";
import Link from "next/link";

const terminalBenefits = [
  "20% OFF",
  "Check-in dedicado",
  "Concierge exclusivo",
  "Despacho de bagagens sem filas",
  "Raio-x prioritario",
] as const;

export function UltrablueBeneficiosHero() {
  return (
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
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:items-start lg:gap-10">
          <div className="max-w-[540px]">
            <Link
              href="/ultrablue"
              className="mb-10 flex items-center gap-1 text-xl text-[#05132A] transition hover:text-[#0B2859] md:text-2xl"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
              voltar
            </Link>
            <h1 className="text-center text-5xl font-bold leading-tight tracking-tight text-[#0B2859] md:text-left">
              Beneficios do <br className="lg:hidden" />
              Cartao Ultrablue
            </h1>
            <p className="mt-6 text-center text-2xl leading-snug text-[#05132A] md:text-left">
              Muito mais do que um cartao:
              <br />
              praticidade, economia e experiencias exclusivas no seu dia a dia e
              em suas viagens.
            </p>
          </div>

          <div className="relative mx-auto h-[300px] w-full max-w-[660px] overflow-hidden sm:h-[360px] lg:h-[400px]">
            <Image
              src="/ultrablue_image/card_ultrablue.png"
              alt="Cartao Ultrablue BTG Pactual"
              fill
              className="object-contain object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 660px"
            />
          </div>
          <Link
            href={CONCIERGE_WHATSAPP.ultrablue}
            className="mt-8 flex w-full items-center justify-between gap-2 bg-[#2E73D4] px-8 py-4 text-white transition hover:bg-[#3A80E4] lg:hidden"
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
  );
}

export function UltrablueCashbackSection() {
  return (
    <section className="px-5 pb-16 pt-16 sm:px-8 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="border-b border-[#DFE6F0] pb-6 text-4xl font-bold text-[#0B2859]">
          Cashback
        </h2>
        <p className="mt-8 text-2xl leading-snug text-[#05132A]">
          Ganhe beneficios em todas as compras realizadas com seu cartao
          Ultrablue.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-[#05132A] px-5 py-4 text-[#05132A]">
            <p className="text-2xl leading-tight text-[#05132A]">
              Ate <strong>1,7% de retorno</strong> em compras
            </p>
          </article>
          <article className="rounded-xl border border-[#05132A] px-5 py-4 text-[#05132A]">
            <p className="text-2xl leading-tight text-[#05132A]">
              <strong>3 pontos por dolar</strong> em compras nacionais
            </p>
          </article>
          <article className="rounded-xl border border-[#05132A] px-5 py-4 text-[#05132A]">
            <p className="text-2xl leading-tight text-[#05132A]">
              <strong>3,5 pontos por dolar</strong> em compras internacionais
            </p>
          </article>
        </div>
        <p className="mt-8 text-2xl leading-snug text-[#05132A]">
          Os beneficios podem ser utilizados para potencializar suas
          experiencias e sua rotina.
        </p>
      </div>
    </section>
  );
}

export function UltrablueIofAndTerminalSection() {
  return (
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
              Reducao de <strong>4.38% para 1.1% no IOF</strong> em compras
              internacionais.
            </p>
            <p className="hidden lg:block mt-8 max-w-[560px] border-t border-[#DFE6F0] pt-6 text-2xl leading-snug text-[#05132A]">
              Mais previsibilidade e vantagens no uso do seu cartao no exterior.
            </p>
          </article>

          <div className="relative h-[200px] overflow-hidden md:h-[380px] sm:h-[420px] lg:h-[420px]">
            <Image
              src="/ultrablue_image/iof_reduzido.jpg"
              alt="Economia em viagens internacionais"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 670px"
            />
          </div>
          <p className="lg:hidden mt-2 max-w-[560px] text-2xl leading-snug text-[#05132A]">
            Reducao de <strong>4.38% para 1.1% no IOF</strong> em compras
            internacionais.
          </p>
          <p className="lg:hidden mt-2 max-w-[560px] border-t border-[#DFE6F0] pt-6 text-2xl leading-snug text-[#05132A]">
            Mais previsibilidade e vantagens no uso do seu cartao no exterior.
          </p>
        </div>

        <div className="mt-10 lg:border-t border-[#DFE6F0]">
          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
            <h2 className="text-4xl lg:hidden font-bold leading-tight text-[#0B2859]">
              Acesso ao Terminal BTG
            </h2>
            <p className="mt-5 lg:hidden text-2xl text-[#05132A]">
              Uma experiencia diferenciada antes mesmo de embarcar.
            </p>
            <div className="relative h-[200px] overflow-hidden sm:h-[560px] md:h-[520px] lg:h-[550px]">
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
                Uma experiencia diferenciada antes mesmo de embarcar.
              </p>
              <p className="mt-6 text-2xl font-semibold text-[#0B2859]">
                Beneficios incluem:
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
  );
}

export function UltrablueLoungekeySection() {
  return (
    <section className="px-5 pb-14 sm:px-8 sm:pb-16 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="text-4xl font-bold leading-tight text-[#0B2859]">
          Salas VIP Loungekey
        </h2>
        <hr className="mt-6 border-[#DFE6F0]" />
        <p className="mt-5 text-2xl text-[#05132A]">
          Acesse mais de{" "}
          <strong>1.000 salas VIP em aeroportos ao redor do mundo</strong>, com
          bebidas, wi-fi, conforto e privacidade.
        </p>
        <p className="mt-5 text-2xl font-bold text-[#05132A]">
          Inclui ate 12 convidados por ano.
        </p>
      </div>
    </section>
  );
}
