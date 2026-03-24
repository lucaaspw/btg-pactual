import { ULTRABLUE_LP_IMAGES } from "@/constants/ultrablue-lp";
import Image from "next/image";

const features = [
  {
    imageSrc: ULTRABLUE_LP_IMAGES.whyAtendimento,
    title: "Atendimento dedicado",
    text: "Concierge especializado para planejar cada detalhe da sua viagem com agilidade e cuidado.",
  },
  {
    imageSrc: ULTRABLUE_LP_IMAGES.whySeguro,
    title: "Seguro viagem global",
    text: "Cobertura pensada para você viajar com tranquilidade em qualquer destino.",
  },
  {
    imageSrc: ULTRABLUE_LP_IMAGES.whyAcesso,
    title: "Acesso ao terminal BTG",
    text: "Benefícios em aeroportos, com prioridade no check-in e acesso a salas selecionadas.",
  },
  {
    imageSrc: ULTRABLUE_LP_IMAGES.whySalaVip,
    title: "Salas VIP LoungeKey",
    text: "Acesso a mais de mil salas VIP em aeroportos ao redor do mundo.",
  },
] as const;

export function UltrablueWhy() {
  return (
    <section id="beneficios" className="scroll-mt-24 bg-[#012A5B] py-12 md:px-5 sm:py-16 lg:px-8">
      <div className="mx-auto grid max-w-[1280px] items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="relative mx-auto aspect-[16/10] min-h-[200px] w-full max-w-[520px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.35)] lg:mx-0 lg:min-h-[520px] lg:max-w-none lg:shadow-none">
          <Image
            src={ULTRABLUE_LP_IMAGES.porQueViagem}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="px-5 text-center lg:text-left">
          <h2 className="text-2xl font-bold leading-tight text-white md:text-3xl">
            Por que planejar sua viagem com a gente
          </h2>

          <ul className="mt-10 flex flex-col items-center gap-12 sm:gap-14 lg:mt-20 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-20">
            {features.map(({ imageSrc, title, text }) => (
              <li key={title} className="w-full max-w-md lg:max-w-none">
                <div className="flex flex-col items-center gap-4 text-center lg:flex-row lg:items-start lg:text-left">
                  <Image src={imageSrc} alt="" width={40} height={40} className="h-10 w-10 shrink-0 object-contain" />
                  <div>
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#E7EEFF]">{text}</p>
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
