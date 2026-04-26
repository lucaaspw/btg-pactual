import Image from "next/image";
import { PARTNERS_LP_IMAGES } from "@/constants/partners-lp";

const features: {
  imageSrc: string;
  title: string;
  text: string;
}[] = [
  {
    imageSrc: PARTNERS_LP_IMAGES.whyAtendimento,
    title: "Atendimento dedicado",
    text: "Um concierge exclusivo acompanha você do planejamento ao retorno, garantindo suporte antes, durante e depois da viagem.",
  },
  {
    imageSrc: PARTNERS_LP_IMAGES.whySeguro,
    title: "Seguro viagem global",
    text: "Cobertura Omint para você e até 4 dependentes.",
  },
  {
    imageSrc: PARTNERS_LP_IMAGES.whyAcesso,
    title: "Acesso ao terminal BTG",
    text: "Check-in dedicado, despacho prioritário e concierge exclusivo.",
  },
  {
    imageSrc: PARTNERS_LP_IMAGES.whySalaVip,
    title: "Salas VIP LoungeKey",
    text: "Acessos ilimitados em mais de 1.000 Salas VIP ao redor do mundo, com direito a bebidas, Wi-Fi e convidados.",
  },
];

export function PartnersWhy() {
  return (
    <section
      id="beneficios"
      className="scroll-mt-24 bg-btg-navy lg:px-5 py-12 sm:py-16 lg:px-8"
    >
      <div className="mx-auto flex items-center flex-col lg:flex-row max-w-[1280px] gap-8 lg:gap-14 lg:items-center">
        <div
          className={"relative mx-auto w-full max-w-[530px] overflow-hidden "}
        >
          <Image
            src={PARTNERS_LP_IMAGES.porQueViagem}
            alt="Por que planejar sua viagem com a gente"
            width={530}
            height={550}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="text-center lg:text-left px-5 ">
          <h2 className="text-2xl md:text-3xl font-bold leading-tight text-[#D2E5FF] lg:mb-0">
            Por que planejar sua
            <br className="md:hidden" />
            viagem com a gente
          </h2>

          <ul className="mt-5 flex flex-col items-center gap-12 sm:gap-14 lg:mt-20 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-10">
            {features.map(({ imageSrc, title, text }) => (
              <li key={title} className="w-full max-w-md lg:max-w-none">
                <div className="flex flex-col items-center gap-4 text-center lg:flex-row lg:items-start lg:gap-4 lg:text-left">
                  <Image
                    src={imageSrc}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 shrink-0 object-contain lg:h-8 lg:w-8"
                  />
                  <div>
                    <h3 className="text-lg font-bold mb-5 text-white lg:font-semibold">
                      {title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-light text-[#ffffFF]">
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
