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
    text: "Concierge especializado para planejar cada detalhe da sua viagem com agilidade e cuidado.",
  },
  {
    imageSrc: PARTNERS_LP_IMAGES.whySeguro,
    title: "Seguro viagem global",
    text: "Cobertura pensada para você viajar com tranquilidade em qualquer destino.",
  },
  {
    imageSrc: PARTNERS_LP_IMAGES.whyAcesso,
    title: "Acesso ao terminal BTG",
    text: "Benefícios em aeroportos, com prioridade no check-in e acesso a salas selecionadas.",
  },
  {
    imageSrc: PARTNERS_LP_IMAGES.whySalaVip,
    title: "Salas VIP LoungeKey",
    text: "Acesso a mais de mil salas VIP em aeroportos ao redor do mundo.",
  },
];

export function PartnersWhy() {
  return (
    <section
      id="beneficios"
      className="scroll-mt-24 bg-btg-navy lg:px-5 py-12 sm:py-16 lg:px-8"
    >
      <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-2 lg:gap-14 lg:items-center">
        <div
          className={
            "relative mx-auto w-full max-w-[520px] overflow-hidden " +
            "aspect-[16/10] min-h-[200px] shadow-[0_12px_40px_rgba(0,0,0,0.35)] " +
            "lg:mx-0 lg:max-w-none lg:aspect-auto lg:min-h-[520px] lg:rounded-none lg:shadow-none"
          }
        >
          <Image
            src={PARTNERS_LP_IMAGES.porQueViagem}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="text-center lg:text-left px-5">
          <h2 className="text-2xl font-bold leading-tight text-white md:text-3xl lg:mb-0">
            Por que planejar sua viagem com a gente
          </h2>

          <ul className="mt-10 flex flex-col items-center gap-12 sm:gap-14 lg:mt-20 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-20">
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
                    <h3 className="text-2lg font-bold text-white lg:font-semibold">
                      {title}
                    </h3>
                    <p className="mt-2 text-xl leading-relaxed text-[#E7EEFF]">
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
