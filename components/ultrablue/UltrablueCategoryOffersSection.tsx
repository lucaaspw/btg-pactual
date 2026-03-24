import { OfertaCard } from "@/components/ofertas/OfertaCard";
import { ULTRABLUE_LP_IMAGES } from "@/constants/ultrablue-lp";
import type { Oferta } from "@/types/oferta";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HEADER_OFFSET_CLASS = "pt-[5.5rem] sm:pt-24";

type UltrablueCategoryOffersSectionProps = {
  title: string;
  description?: string;
  ofertas: Oferta[];
};

export function UltrablueCategoryOffersSection({
  title,
  description,
  ofertas,
}: UltrablueCategoryOffersSectionProps) {
  return (
    <section
      className={`${HEADER_OFFSET_CLASS} scroll-mt-24 bg-[#012A5B] px-5 pb-16 lg:px-8`}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="relative mt-10 h-[220px] overflow-hidden sm:h-[280px]">
          <Image
            src={ULTRABLUE_LP_IMAGES.defaultBanner}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#012A5B]/55 to-transparent" />
        </div>
        <div className="border-b border-[#0B2859] pb-8 pt-10">
          <Link
            href="/ultrablue"
            className="mb-20 flex items-center gap-1 text-sm text-[#E7EEFF] transition hover:text-white md:text-2xl"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
            voltar
          </Link>
          <h1 className="text-xl font-bold tracking-tight md:text-2xl lg:text-3xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-8 max-w-2xl text-lg leading-snug text-[#E7EEFF]">
              {description}
            </p>
          ) : null}
        </div>

        {ofertas.length === 0 ? (
          <p className="mt-10 max-w-xl text-[#E7EEFF]">
            Em breve novas ofertas exclusivas nesta categoria. O operador pode
            publicar em{" "}
            <a
              className="underline underline-offset-2"
              href="/dashboard/nova-oferta"
            >
              Nova oferta
            </a>{" "}
            com tipo de cartão <strong>Ultrablue</strong>.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {ofertas.map((oferta) => (
              <OfertaCard
                key={oferta.id}
                oferta={oferta}
                detailHref={
                  oferta.slug
                    ? `/ultrablue/oferta/${encodeURIComponent(oferta.slug)}`
                    : undefined
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
