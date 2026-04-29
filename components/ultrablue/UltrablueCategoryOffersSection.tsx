import { OfertaCard } from "@/components/ofertas/OfertaCard";
import { ULTRABLUE_LP_IMAGES } from "@/constants/ultrablue-lp";
import type { Oferta } from "@/types/oferta";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

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
    <section className="scroll-mt-24 bg-[#F1F4F8] pb-16">
      <div className="">
        <div className="relative min-h-[240px] mt-20 w-full overflow-hidden sm:min-h-[280px] md:min-h-[360px]">
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
          <div className="relative mx-auto max-w-[1280px] px-5 pb-10 pt-10 text-xl lg:px-0">
            <Link
              href="/ultrablue"
              className="mb-14 flex items-center gap-1 text-xl text-[#05132A] transition hover:text-[#0B2859]"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
              voltar
            </Link>
            <h1 className="max-w-[920px] text-2xl font-bold leading-[1.25] tracking-tight text-[#0B2859] md:text-3xl lg:text-4xl lg:leading-snug">
              {title}
            </h1>
          </div>
        </div>
        <div className="px-5 pt-8 lg:px-0 mx-auto max-w-[1280px]">
          {description ? (
            <p className="mt-8 font-bold text-3xl leading-snug text-[#0B2859]">
              {description}
            </p>
          ) : null}
          <hr className="mt-8 border-[#0B2859]/25" />
          {ofertas.length === 0 ? (
            <p className="mt-10 max-w-xl text-[#05132A]">
              Em breve, novas ofertas exclusivas nesta categoria. O operador
              pode publicá-las em{" "}
              <a
                className="underline underline-offset-2"
                href="/dashboard/nova-oferta"
              >
                Nova oferta
              </a>
              , com o tipo de cartão <strong>Ultrablue</strong>.
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
      </div>
    </section>
  );
}
