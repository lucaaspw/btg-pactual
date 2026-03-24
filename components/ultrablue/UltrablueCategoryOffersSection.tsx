import { OfertaCard } from "@/components/ofertas/OfertaCard";
import { ULTRABLUE_LP_IMAGES } from "@/constants/ultrablue-lp";
import type { Oferta } from "@/types/oferta";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

/** Espaço abaixo do header fixo (alinhado ao hero / páginas Partners). */
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
      className={`${HEADER_OFFSET_CLASS} scroll-mt-24 bg-[#F1F4F8] px-5 pb-16 lg:px-8`}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="relative min-h-[240px] overflow-hidden md:border-b border-[#0B2859]/25 sm:min-h-[280px] md:min-h-[300px]">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${ULTRABLUE_LP_IMAGES.defaultBanner})`,
            }}
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#F1F4F8]/95 via-[#F1F4F8]/55 to-[#F1F4F8]/35 sm:from-[#F1F4F8]/85 sm:via-[#F1F4F8]/40"
            aria-hidden
          />
          <div className="relative pb-8 pt-10">
            <Link
              href="/ultrablue"
              className="mb-20 flex items-center gap-1 text-sm text-[#0B2859] transition hover:text-[#0B2859] md:text-2xl"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
              voltar
            </Link>
            <h1 className="text-xl font-bold tracking-tight text-[#0B2859] md:text-2xl lg:text-3xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-8 max-w-2xl text-lg leading-snug text-[#05132A]">
                {description}
              </p>
            ) : null}
          </div>
        </div>

        {ofertas.length === 0 ? (
          <p className="mt-10 max-w-xl text-[#05132A]">
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
