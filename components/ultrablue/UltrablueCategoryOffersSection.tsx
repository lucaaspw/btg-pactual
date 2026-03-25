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
        <div className="relative min-h-[240px] overflow-hidden pt-20 pb-20 sm:min-h-[280px] md:min-h-[460px] lg:min-h-[554px]">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${ULTRABLUE_LP_IMAGES.defaultBanner})`,
            }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-[1280px] pb-0 md:pb-8 pt-10 px-5 lg:px-0">
            <Link
              href="/ultrablue"
              className="mb-20 text-xl flex items-center gap-1 text-xl text-[#0B2859] transition hover:text-[#0B2859] md:text-2xl"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
              voltar
            </Link>
            <h1 className="text-xl font-bold tracking-tight text-[#0B2859] md:text-2xl lg:text-5xl">
              {title}
            </h1>
          </div>
        </div>
        <div className="px-5 pt-8 lg:px-0 mx-auto max-w-[1280px]">
          {description ? (
            <p className="mt-8 font-bold text-3xl leading-snug text-[#05132A]">
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
