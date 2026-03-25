import { OfertaCard } from "@/components/ofertas/OfertaCard";
import type { Oferta } from "@/types/oferta";

type UltrablueCuratedOffersProps = {
  ofertas: Oferta[];
};

export function UltrablueCuratedOffers({
  ofertas,
}: UltrablueCuratedOffersProps) {
  return (
    <section
      id="curadoria"
      className="relative -mt-px scroll-mt-24 bg-[#F1F4F8] px-5 pb-16 md:mt-0 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px]">
        {ofertas.length === 0 ? (
          <p className="mt-10 max-w-xl text-[#05132A]">
            Em breve, novas ofertas exclusivas. O operador pode publicá-las em{" "}
            <a
              className="underline underline-offset-2"
              href="/dashboard/nova-oferta"
            >
              Nova oferta
            </a>
            , com o tipo de cartão <strong>Ultrablue</strong>.
          </p>
        ) : (
          <div className="pt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
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
