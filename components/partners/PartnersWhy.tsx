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
      className="scroll-mt-24 bg-btg-navy px-5 py-16 lg:px-8"
    >
      <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-2 lg:gap-14 lg:items-center">
        <div className="relative aspect-[4/5] min-h-[320px] overflow-hidden lg:aspect-auto lg:min-h-[520px]">
          <Image
            src={PARTNERS_LP_IMAGES.porQueViagem}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold leading-tight mb-10 md:text-xl">
            Por que planejar sua viagem com a gente
          </h2>

          <ul className="mt-20 grid lg:gap-y-20 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10">
            {features.map(({ imageSrc, title, text }) => (
              <li key={title}>
                <div className="flex gap-4">
                  <Image
                    src={imageSrc}
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 shrink-0 object-contain"
                  />
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#E7EEFF]">
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
