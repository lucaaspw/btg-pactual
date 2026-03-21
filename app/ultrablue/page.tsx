import { OfertaCard } from "@/components/ofertas/OfertaCard";
import { TIPO_CARTAO } from "@/constants/cartoes";
import { getOfertasPorTipoCartao } from "@/services/ofertas";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BTG Pactual — Ultrablue",
  description: "Ofertas exclusivas para clientes Ultrablue.",
};

export default async function UltrabluePage() {
  const ofertas = await getOfertasPorTipoCartao(TIPO_CARTAO.ULTRABLUE);

  return (
    <main className="min-h-screen bg-btg-navy px-6 py-10">
      <header className="mx-auto mb-10 max-w-[1280px]">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#7eb4ff]">
          Cartão Ultrablue
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
          Suas ofertas
        </h1>
        <p className="mt-2 max-w-2xl text-[#E7EEFF]">
          Conteúdo publicado pelo dashboard com tipo de cartão{" "}
          <strong>Ultrablue</strong>.
        </p>
      </header>

      {ofertas.length === 0 ? (
        <p className="mx-auto max-w-[1280px] text-[#E7EEFF]">
          Nenhuma oferta Ultrablue publicada ainda. Cadastre em{" "}
          <a className="underline" href="/dashboard/nova-oferta">
            Nova oferta
          </a>
          .
        </p>
      ) : (
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
    </main>
  );
}
