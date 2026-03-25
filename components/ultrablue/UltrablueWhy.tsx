import { ULTRABLUE_LP_IMAGES } from "@/constants/ultrablue-lp";
import Image from "next/image";

const features = [
  {
    imageSrc: ULTRABLUE_LP_IMAGES.whyConcierge,
    title: "Concierge exclusivo",
    text: "Um time de especialistas para cuidar da sua rotina, viagens e experiências",
  },
  {
    imageSrc: ULTRABLUE_LP_IMAGES.whyCashback,
    title: "Cashback em compras",
    text: "Retorno em compras nacionais e internacionais",
  },
  {
    imageSrc: ULTRABLUE_LP_IMAGES.whyIof,
    title: "IOF reduzido",
    text: "Mais economia em compras no exterior",
  },
  {
    imageSrc: ULTRABLUE_LP_IMAGES.whySalaVip,
    title: "Salas VIP LoungeKey",
    text: "Acesso a mais de 1.000 salas VIP no mundo",
  },
] as const;

export function UltrablueWhy() {
  return (
    <section
      id="beneficios"
      className="scroll-mt-24 bg-[#F1F4F8] md:py-16 pb-10 lg:px-8"
    >
      <div className="mx-auto grid max-w-[1280px] items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="relative mx-auto aspect-[4/3] min-h-[220px] w-full max-w-[520px] overflow-hidden lg:mx-0">
          <Image
            src={ULTRABLUE_LP_IMAGES.porQueViagem}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="text-center px-5 lg:text-left">
          <h2 className="text-2xl font-bold leading-tight text-[#0B2859] md:text-3xl lg:mb-0">
            Por que ter o Ultrablue com você
          </h2>

          <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-20 lg:gap-x-8 lg:gap-y-10">
            {features.map(({ imageSrc, title, text }) => (
              <li key={title} className="w-full">
                <div className="flex items-center flex-col md:flex-row md:items-start gap-3 text-center md:text-left">
                  <Image
                    src={imageSrc}
                    alt=""
                    width={32}
                    height={32}
                    className="mt-1 h-9 w-9 shrink-0 object-contain"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-center md:text-left text-[#10408D] ">
                      {title}
                    </h3>
                    <p className="mt-1 text-xl leading-relaxed text-center md:text-left text-[#05132A] md:text-xl">
                      {text}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
