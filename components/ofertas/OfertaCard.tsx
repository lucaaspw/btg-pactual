import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { formatPrecoExibicao } from "@/lib/format-preco";
import type { Oferta } from "@/types/oferta";

type OfertaCardProps = {
  oferta: Oferta;
  /** Se definido, "Saiba mais" abre a página de detalhe dessa oferta. */
  detailHref?: string;
  /** Badge do destino sobre o canto inferior esquerdo da foto (ex.: página Feriados). */
  badgeOnImage?: boolean;
};

const ctaClassName =
  "mt-auto flex w-full items-center justify-between bg-[#2E73D4] px-4 py-2 text-[1.1rem] font-bold transition hover:bg-[#3A80E4]";

const ctaFeriadosClassName =
  "mt-auto flex w-full items-center justify-between bg-[#2E73D4] px-4 py-3 text-base font-bold transition hover:bg-[#3A80E4]";

function formatMoeda(raw?: string): string {
  const moeda = String(raw || "")
    .trim()
    .toLowerCase();
  if (!moeda) return "R$";
  if (
    moeda === "$" ||
    moeda === "us$" ||
    moeda === "us" ||
    moeda.includes("usd") ||
    moeda.includes("dolar") ||
    moeda.includes("dólar")
  ) {
    return "US$";
  }
  return "R$";
}

export function OfertaCard({
  oferta,
  detailHref,
  badgeOnImage = false,
}: OfertaCardProps) {
  const imagem = oferta.acf?.imagem;
  const img =
    imagem && typeof imagem === "object"
      ? imagem.sizes?.medium_large || imagem.url || ""
      : "";
  const contextoPreco = (oferta.acf?.contexto_do_preco || "").trim();
  const moeda = formatMoeda(oferta.acf?.moeda);
  const badge = (
    <span className="inline-block bg-white px-2.5 py-1 text-[11px] font-semibold leading-none text-btg-navy">
      {oferta.acf?.destino_rota || "Destino"}
    </span>
  );

  const ctaClass = badgeOnImage ? ctaFeriadosClassName : ctaClassName;

  return (
    <article
      className={`flex h-full flex-col overflow-hidden bg-btg-navy-card text-white ${
        badgeOnImage
          ? "shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
          : "shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
      }`}
    >
      <div className="relative h-[200px] w-full">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: img ? `url(${img})` : undefined }}
        />
        {badgeOnImage ? (
          <div className="absolute bottom-[-9px] left-5">{badge}</div>
        ) : null}
      </div>

      <div
        className={`relative flex flex-1 flex-col ${badgeOnImage ? "gap-3 p-5" : "gap-4 p-4"}`}
      >
        {!badgeOnImage ? (
          <span className="absolute top-[-9px] left-4 inline-block bg-white px-2 py-0.5 text-xs font-semibold text-btg-navy-card">
            {oferta.acf?.destino_rota || "Destino"}
          </span>
        ) : null}

        <h2
          className={`font-bold leading-tight ${
            badgeOnImage
              ? "text-lg leading-snug sm:text-[1.125rem]"
              : "mt-3 text-xl"
          }`}
        >
          {oferta.title.rendered ||
            oferta.acf?.nome_da_oferta ||
            "Oferta especial"}
        </h2>

        <p
          className={
            badgeOnImage
              ? "text-sm leading-relaxed text-[#C8D4E8]"
              : "mt-3 text-[1.05rem] leading-snug text-[#E7EEFF]"
          }
        >
          {oferta.acf?.descricao ||
            "Confira os detalhes dessa oferta exclusiva."}
        </p>

        <div className={badgeOnImage ? "mt-1" : "mt-4"}>
          <p
            className={
              badgeOnImage
                ? "text-[11px] font-medium uppercase tracking-[0.06em] text-[#A8B8D0]"
                : "text-[1.2rem] leading-none text-[#E7EEFF]"
            }
          >
            A partir de
          </p>
          <p
            className={
              badgeOnImage
                ? "mt-1.5 text-[1.65rem] font-bold leading-none tracking-tight"
                : "mt-2 text-[1.8rem] font-bold leading-none"
            }
          >
            {moeda === "US$" ? "3x de " : ""}
            {oferta.acf?.preco
              ? `${moeda} ${formatPrecoExibicao(String(oferta.acf.preco), oferta.acf?.moeda)}`
              : "Consulte"}
          </p>
          {contextoPreco ? (
            <p
              className={
                badgeOnImage
                  ? "mt-1.5 text-xs leading-snug text-[#B4C4DC]"
                  : "mt-1 text-[0.95rem] leading-snug text-[#E7EEFF]"
              }
            >
              {contextoPreco}
            </p>
          ) : null}
        </div>

        {detailHref ? (
          <Link href={detailHref} className={ctaClass}>
            <span>Saiba mais</span>
            <ArrowUpRight
              className="h-5 w-5 shrink-0"
              strokeWidth={badgeOnImage ? 1.75 : 2}
              aria-hidden
            />
          </Link>
        ) : (
          <button type="button" className={ctaClass}>
            <span>Saiba mais</span>
            <ArrowUpRight
              className="h-5 w-5 shrink-0"
              strokeWidth={badgeOnImage ? 1.75 : 2}
              aria-hidden
            />
          </button>
        )}
      </div>
    </article>
  );
}
