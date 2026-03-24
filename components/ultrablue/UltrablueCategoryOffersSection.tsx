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
    <section className=" bg-[#F1F4F8] pb-16 lg:px-0">
      <div className="">
        <div
          className="mt-10 pt-10 px-5 md:px-0 h-[220px] sm:h-[280px]"
          style={{
            backgroundImage: `url(${ULTRABLUE_LP_IMAGES.defaultBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "420px",
          }}
        >
          <div className="mx-auto max-w-[1280px] pb-8 pt-10">
            <Link
              href="/ultrablue"
              className="mb-20 flex items-center gap-1 text-sm text-[#0B2859] transition md:text-2xl"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
              voltar
            </Link>
            <h1 className="text-xl font-bold text-[#0B2859] tracking-tight md:text-2xl lg:text-3xl">
              {title}
            </h1>
          </div>
        </div>
        <div className="mx-auto max-w-[1280px] px-5 md:px-0">
          {description ? (
            <p className="mt-8 pb-5 md:border-b border-[#0B2859] font-bold text-2xl leading-snug text-[#0B2859]">
              {description}
            </p>
          ) : null}
          {ofertas.length === 0 ? (
            <p className="mt-10 max-w-xl text-[#0B2859]">
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
      </div>
    </section>
  );
}
