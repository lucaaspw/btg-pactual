import { OfertaCard } from "@/components/ofertas/OfertaCard";
import type { Oferta } from "@/types/oferta";

type PartnersCuratedOffersProps = {
  ofertas: Oferta[];
};

export function PartnersCuratedOffers({ ofertas }: PartnersCuratedOffersProps) {
  return (
    <section
      id="curadoria"
      className="scroll-mt-24 bg-btg-navy px-5 pb-16 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px]">
        {ofertas.length === 0 ? (
          <p className="mt-10 max-w-xl text-[#E7EEFF]">
            Em breve, novas ofertas exclusivas. O operador pode publicá-las em{" "}
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
