import { OfertaCard } from "@/components/ofertas/OfertaCard";
import type { Oferta } from "@/types/oferta";

type UltrablueCuratedOffersProps = {
  ofertas: Oferta[];
};

export function UltrablueCuratedOffers({ ofertas }: UltrablueCuratedOffersProps) {
  return (
    <section id="curadoria" className="scroll-mt-24 bg-[#012A5B] px-5 pb-16 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        {ofertas.length === 0 ? (
          <p className="mt-10 max-w-xl text-[#E7EEFF]">
            Em breve novas ofertas exclusivas. O operador pode publicar em{" "}
            <a className="underline underline-offset-2" href="/dashboard/nova-oferta">
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
