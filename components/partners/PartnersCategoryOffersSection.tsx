import { OfertaCard } from "@/components/ofertas/OfertaCard";
import type { Oferta } from "@/types/oferta";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

/** Espaço abaixo do header fixo (alinhado ao hero da home Partners). */
const HEADER_OFFSET_CLASS = "pt-[5.5rem] sm:pt-24";

type PartnersCategoryOffersSectionProps = {
  title: string;
  description?: string;
  ofertas: Oferta[];
};

export function PartnersCategoryOffersSection({
  title,
  description,
  ofertas,
}: PartnersCategoryOffersSectionProps) {
  return (
    <section
      className={`${HEADER_OFFSET_CLASS} scroll-mt-24 bg-btg-navy px-5 pb-16 lg:px-8`}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="border-b border-white/10 pt-10 pb-8">
          <Link
            href="/partners"
            className="flex md:text-2xl mb-10 items-center gap-1 text-xl text-[#E7EEFF] transition hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
            voltar
          </Link>
          <h1 className="max-w-[920px] text-2xl font-bold leading-[1.25] tracking-tight md:text-3xl lg:text-4xl lg:leading-snug">
            {title}
          </h1>
          {description ? (
            <p className="mt-8 max-w-2xl text-[1.75rem] font-bold leading-tight tracking-tight md:text-4xl md:leading-tight text-[#d2e5ff]">
              {description}
            </p>
          ) : null}
        </div>

        {ofertas.length === 0 ? (
          <p className="mt-10 max-w-xl text-[#E7EEFF]">
            Em breve, novas ofertas exclusivas nesta categoria. O operador pode
            publicá-las em{" "}
            <a
              className="underline underline-offset-2"
              href="/dashboard/nova-oferta"
            >
              Nova oferta
            </a>
            , com o tipo de cartão <strong>Partners</strong>.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {ofertas.map((oferta) => (
              <OfertaCard
                key={oferta.id}
                oferta={oferta}
                detailHref={
                  oferta.slug
                    ? `/partners/oferta/${encodeURIComponent(oferta.slug)}`
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
