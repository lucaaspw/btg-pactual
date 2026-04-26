import Image from "next/image";
import { PARTNERS_LP_IMAGES } from "@/constants/partners-lp";
import { ChevronDown } from "lucide-react";

/** Espaço reservado para o header fixo (logo + nav + CTA). */
const HEADER_OFFSET_CLASS = "pt-[5.5rem] sm:pt-24";

export function PartnersHero() {
  return (
    <section
      id="hero"
      className={`relative z-0 h-[600px] overflow-hidden bg-btg-navy ${HEADER_OFFSET_CLASS}`}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={PARTNERS_LP_IMAGES.hero}
          alt="Resort à beira-mar ao entardecer"
          fill
          priority
          className="hidden object-cover object-center md:block"
          sizes="100vw"
        />
        <Image
          src={PARTNERS_LP_IMAGES.heroMobile}
          alt="Resort à beira-mar ao entardecer"
          fill
          priority
          className="object-cover object-center md:hidden"
          sizes="100vw"
        />
        {/* Leitura do título à esquerda + leve fechamento na base para o navy da próxima seção */}
        <div
          className="absolute inset-y-0 bg-gradient-to-t md:left-0 z-10 md:w-1/2 md:max-w-[50vw] md:bg-gradient-to-r from-[#05132A] via-[#05132A]/75 to-[#05132A]/0"
          aria-hidden
        />
      </div>

      <div
        className={`relative z-10 mx-auto flex max-w-[1280px] flex-col justify-end px-5 pt-10 md:pb-16 sm:px-8 md:h-[400px] md:pb-24 lg:px-0`}
      >
        <div>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-center md:text-left md:text-5xl lg:text-[3.25rem]">
            Cartão Partners
            <br />
            BTG Pactual
          </h1>
          <p className="mt-4 max-w-2xl text-center md:text-left text-xl leading-snug text-white md:text-2xl">
            O melhor do planeta para
            <br />
            suas viagens, com
            <br />
            experiências exclusivas
          </p>
        </div>
      </div>
      <div className="absolute bottom-3 left-0 right-0 px-5 lg:hidden lg:px-0 flex flex-col items-center justify-center gap-2">
        <p className="text-center text-white text-lg ">
          Conheça nossas experiências
        </p>
        <ChevronDown className="h-6 w-6" aria-hidden />
      </div>
    </section>
  );
}
