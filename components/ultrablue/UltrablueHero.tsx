import { ULTRABLUE_LP_IMAGES } from "@/constants/ultrablue-lp";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const HEADER_OFFSET_CLASS = "pt-[5.5rem] sm:pt-24";

export function UltrablueHero() {
  return (
    <section
      id="hero"
      className={`relative z-0 h-[600px] overflow-hidden ${HEADER_OFFSET_CLASS}`}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={ULTRABLUE_LP_IMAGES.hero}
          alt="Cartão Ultrablue BTG Pactual"
          fill
          priority
          className="hidden object-cover object-center md:block"
          sizes="100vw"
        />
        <Image
          src={ULTRABLUE_LP_IMAGES.heroMobile}
          alt="Cartão Ultrablue BTG Pactual"
          fill
          priority
          className="object-cover object-center md:hidden"
          sizes="100vw"
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-btg-navy/75 via-btg-navy/25 to-transparent md:from-btg-navy md:via-btg-navy/40"
        aria-hidden
      />

      <div
        className={`relative z-10 mx-auto flex max-w-[1280px] flex-col justify-end px-5 pt-20 md:pb-16 sm:px-8 md:h-[400px] md:pb-24 lg:px-0`}
      >
        <div>
          <h1 className="max-w-3xl text-center text-4xl font-bold leading-tight tracking-tight text-white md:text-left md:text-5xl lg:text-[3.25rem]">
            Cartão Ultrablue
            <br />
            BTG Pactual
          </h1>
          <p className="mt-4 max-w-2xl text-center text-xl leading-snug text-[#D2E5FF] md:text-left md:text-2xl">
            É tempo de ir além
          </p>
        </div>
      </div>

      <div className="absolute lg:hidden bottom-3 left-0 right-0 flex flex-col items-center justify-center gap-2 px-5 lg:px-0">
        <p className="text-center text-lg text-white">
          Conheça nossas experiências
        </p>
        <ChevronDown className="h-6 w-6" aria-hidden />
      </div>
    </section>
  );
}
