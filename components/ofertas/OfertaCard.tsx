import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Oferta } from "@/types/oferta";

type OfertaCardProps = {
  oferta: Oferta;
  /** Se definido, "Saiba mais" abre a página de detalhe dessa oferta. */
  detailHref?: string;
};

const ctaClassName =
  "mt-auto flex w-full items-center justify-between bg-[#2E73D4] px-4 py-2 text-[1.1rem] font-bold transition hover:bg-[#3A80E4]";

export function OfertaCard({ oferta, detailHref }: OfertaCardProps) {
  const img =
    oferta.acf?.imagem?.sizes?.medium_large || oferta.acf?.imagem?.url || "";

  return (
    <article className="flex h-full flex-col overflow-hidden bg-btg-navy-card text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
      <div
        className="h-[214px] w-full bg-cover bg-center"
        style={{ backgroundImage: img ? `url(${img})` : undefined }}
      />

      <div className="relative flex flex-1 flex-col gap-4 p-4">
        <span className="absolute top-[-9px] left-4 inline-block bg-white px-2 py-0.5 text-xs font-semibold text-btg-navy-card">
          {oferta.acf?.destino_rota || "Destino"}
        </span>

        <h2 className="mt-3 text-xl font-bold leading-tight">
          {oferta.title.rendered ||
            oferta.acf?.nome_da_oferta ||
            "Oferta especial"}
        </h2>

        <p className="mt-3 text-[1.05rem] leading-snug text-[#E7EEFF]">
          {oferta.acf?.descricao ||
            "Confira os detalhes dessa oferta exclusiva."}
        </p>

        <div className="mt-4">
          <p className="text-[1.2rem] leading-none text-[#E7EEFF]">
            A partir de
          </p>
          <p className="mt-2 text-[1.8rem] font-bold leading-none">
            {oferta.acf?.preco
              ? `${String(oferta.acf.moeda || "R$").trim()} ${String(oferta.acf.preco).trim()}`
              : "Consulte"}
          </p>
          <p className="mt-1 text-[0.95rem] leading-snug text-[#E7EEFF]">
            {oferta.acf?.contexto_do_preco || "Confira condições da oferta"}
          </p>
        </div>

        {detailHref ? (
          <Link href={detailHref} className={ctaClassName}>
            <span>Saiba mais</span>
            <ArrowUpRight
              className="h-5 w-5 shrink-0"
              strokeWidth={2}
              aria-hidden
            />
          </Link>
        ) : (
          <button type="button" className={ctaClassName}>
            <span>Saiba mais</span>
            <ArrowUpRight
              className="h-5 w-5 shrink-0"
              strokeWidth={2}
              aria-hidden
            />
          </button>
        )}
      </div>
    </article>
  );
}
