import { ULTRABLUE_LP_IMAGES } from "@/constants/ultrablue-lp";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const HEADER_OFFSET_CLASS = "pt-[5.5rem] sm:pt-24";

export function UltrablueHero() {
  return (
    <section
      id="hero"
      className={`relative z-0 h-[580px] overflow-hidden ${HEADER_OFFSET_CLASS}`}
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
        <div
          className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#012A5B]/90 via-[#012A5B]/20 to-transparent"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex h-[300px] max-w-[1280px] flex-col justify-end px-5 pb-8 sm:px-8 md:h-[320px] md:pb-12 lg:px-0">
        <h1 className="max-w-3xl text-4xl text-white font-bold leading-tight tracking-tight md:text-5xl">
          Cartão Ultrablue
          <br />
          BTG Pactual
        </h1>
        <p className="mt-3 text-xl text-[#D2E5FF] md:text-2xl">
          É tempo de ir além
        </p>
      </div>

      <div className="absolute bottom-2 left-0 right-0 hidden flex-col items-center justify-center gap-2 px-5 md:px-0">
        <p className="text-center text-lg text-white">
          Conheça nossas experiências
        </p>
        <ChevronDown className="h-6 w-6" aria-hidden />
      </div>
    </section>
  );
}
