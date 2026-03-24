import { PartnersClosingCta } from "@/components/partners/PartnersClosingCta";
import { PartnersFooter } from "@/components/partners/PartnersFooter";
import { PartnersHeader } from "@/components/partners/PartnersHeader";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const conciergeFeatures = [
  {
    title: "Viagens sob medida",
    description:
      "Curamos roteiros personalizados e experiências exclusivas ao redor do mundo.",
    image: "/concierge_image/viagem_media.png",
  },
  {
    title: "Hotéis com benefícios especiais",
    description:
      "Upgrade, early check-in, late check-out e vantagens em redes renomadas.",
    image: "/concierge_image/hoteis_beneficios.png",
  },
  {
    title: "Eventos & experiências",
    description:
      "Ingressos para shows, eventos esportivos, finais internacionais e atrações únicas.",
    image: "/concierge_image/eventos_experiencia.png",
  },
  {
    title: "Concierge & lifestyle",
    description:
      "Reservas em restaurantes premiados e acesso a experiências exclusivas.",
    image: "/concierge_image/banner_concierge.png",
  },
] as const;

const travelExamples = [
  {
    label: "Almoço privativo na Grande Muralha da China",
    image: "/concierge_image/almoco_privativo.png",
  },
  {
    label: "Visita exclusiva ao Museu do Louvre fora do horário regular",
    image: "/concierge_image/visita_executiva.png",
  },
  {
    label: "Experiências de glamping na Antártica",
    image: "/concierge_image/experiencia_glamping.png",
  },
  {
    label: "Cruzeiros de luxo pelos rios europeus",
    image: "/concierge_image/cruzeiros_luxo.png",
  },
] as const;

const premiumPartners = [
  {
    name: "Four Seasons Hotels and Resorts",
    image:
      "/concierge_image/four-seasons-hotels-and-resorts-logo-png-transparent.png",
    width: 155,
    height: 155,
  },
  {
    name: "Six Senses",
    image: "/concierge_image/SixSenses_logo_small.png",
    width: 152,
    height: 120,
  },
  {
    name: "Mandarin Oriental",
    image: "/concierge_image/Mandarin_Oriental_Hotel_Group_logo.png",
    width: 115,
    height: 90,
  },
  {
    name: "Jumeirah",
    image: "/concierge_image/Jumeirah_Group_logo.png",
    width: 133,
    height: 47,
  },
  {
    name: "Aman",
    image: "/concierge_image/Aman_Resorts_logo.png",
    width: 92,
    height: 26,
  },
  {
    name: "Silversea",
    image: "/concierge_image/silversea-logo-png-transparent.png",
    width: 151,
    height: 151,
  },
  {
    name: "Four Seasons Hotels and Resorts 2",
    image:
      "/concierge_image/four-seasons-hotels-and-resorts-logo-png-transparent 1.png",
    width: 135,
    height: 135,
  },
  {
    name: "Emirates",
    image: "/concierge_image/Emirates_logo.png",
    width: 119,
    height: 82,
  },
] as const;

export const metadata: Metadata = {
  title: "Concierge Partners — Cartão Partners BTG Pactual",
  description:
    "Atendimento concierge para montar viagens e experiências exclusivas com curadoria Partners.",
};

export default function PartnersConciergePage() {
  return (
    <>
      <PartnersHeader />

      <main className="bg-btg-navy text-white">
        <section className="relative z-0 h-[480px] overflow-hidden pt-[5.5rem] sm:h-[520px] sm:pt-24 md:h-[600px]">
          <Image
            src="/concierge_image/banner_concierge.png"
            alt="Concierge Partners"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b  md:bg-gradient-to-r from-btg-navy/75 via-btg-navy/60 to-transparent md:from-btg-navy/55 md:via-btg-navy/15"
            aria-hidden
          />
          <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col justify-end px-5 pb-10 sm:px-8 sm:pb-14 md:h-[400px] md:pb-24 lg:px-0">
            <div className="max-w-2xl">
              <Link
                href="/partners"
                className="flex text-2xl mb-20 items-center gap-1 text-[#E7EEFF] transition hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
                voltar
              </Link>
              <h1 className="text-4xl text-center md:text-left font-bold leading-tight tracking-tight drop-shadow-md md:text-5xl">
                Concierge Partners
              </h1>
              <p className="mt-3 text-center md:text-left leading-snug text-white text-2xl md:mt-4 md:text-3xl">
                O mundo do jeito que você imagina
              </p>
            </div>
          </div>
        </section>

        <section className="px-5 lg:px-8">
          <div className="mx-auto max-w-[1280px] border-b border-white/10 pt-8 pb-8 text-[#E7EEFF] sm:pt-10 md:pt-12">
            <p className="mb-4 text-lg md:text-2xl">
              Com o Travel Service Partners - em parceria com a PRIMETOUR,
              referencia em turismo de luxo no Brasil - nosso time organiza
              viagens, reservas e experiencias exclusivas para voce.
            </p>
            <p className="leading-snug text-lg md:text-2xl">
              Atendimento de segunda a segunda, das 8h as 20h.
            </p>
            <h2 className="mt-8 text-2xl font-bold sm:mt-10 md:text-4xl">
              O que o Concierge faz por você
            </h2>
          </div>
        </section>

        <section className="px-5 pt-4 pb-12 sm:pt-6 sm:pb-14 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
              {conciergeFeatures.map((item) => (
                <article
                  key={item.title}
                  className="overflow-hidden bg-[#10408D]"
                >
                  <div className="relative h-[180px] sm:h-[200px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="px-4 py-4 sm:py-5">
                    <h3 className="mb-2 text-xl font-semibold text-white sm:mb-3 sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="text-base font-light sm:text-lg">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-12 sm:py-14 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="text-2xl pb-6 border-b border-white/10 font-bold md:text-3xl">
              Consultoria completa para sua viagem
            </h2>
            <p className="mt-6 text-[#E7EEFF] text-lg md:text-2xl">
              Nossa equipe esta preparada para elaborar roteiros personalizados
              que atendam aos seus desejos e preferencias. Da escolha do hotel
              ideal a organizacao de experiencias exclusivas no destino, cada
              detalhe e planejado para proporcionar uma viagem unica.
            </p>
            <p className="mt-5 text-lg font-semibold text-[#E7EEFF] sm:text-xl md:text-2xl">
              Exemplos de experiencias que podemos organizar:
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
              {travelExamples.map((item) => (
                <article key={item.label} className="overflow-hidden">
                  <div className="relative h-[180px] sm:h-[200px]">
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="p-4 text-center text-base sm:text-lg">
                    {item.label}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pt-2 pb-10 sm:pb-12 md:py-14 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="border-b border-white/10 pb-6 text-2xl font-bold md:text-3xl">
              Cuidamos de toda a logistica de sua viagem
            </h2>
            <p className="mt-6 text-lg md:text-2xl">
              Realizamos a emissao de passagens aereas nacionais e
              internacionais, oferecendo consultoria especializada sobre rotas,
              assentos e utilizacao de milhas.
            </p>
            <p className="mt-5 text-lg md:text-2xl">
              Caso necessario, tambem auxiliamos com remarcacoes e ajustes de
              itinerario.
            </p>
          </div>
        </section>

        <section className="px-5 py-14 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="text-2xl border-b border-white/10 pb-6 font-bold md:text-3xl">
              A elite do turismo mundial tambem e Partners
            </h2>

            <div className="mt-8 grid grid-cols-2 items-center justify-center gap-x-4 gap-y-4 pt-6 sm:gap-x-6 sm:gap-y-5 sm:pt-8 md:grid-cols-4 lg:grid-cols-8">
              {premiumPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="flex items-center justify-center px-1 py-1"
                >
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    width={partner.width}
                    height={partner.height}
                    className="h-auto w-full max-w-[120px] object-contain sm:max-w-[140px] md:max-w-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <PartnersClosingCta />
      <PartnersFooter />
    </>
  );
}
