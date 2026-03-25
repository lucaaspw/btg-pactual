import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { formatPrecoExibicao } from "@/lib/format-preco";
import type { Oferta } from "@/types/oferta";

const HEADER_OFFSET_CLASS = "pt-[5.5rem] sm:pt-24";

/**
 * Tipografia e espaçamentos iguais em Partners e Ultrablue (só as cores mudam por marca).
 */
const DETALHE_LAYOUT = {
  backLink:
    "flex mt-20 mb-20 items-center gap-1 text-sm transition md:text-2xl",
  blockTitle: "text-lg font-bold md:text-xl",
  h1: "mt-3 text-center text-2xl font-bold leading-tight md:text-4xl md:leading-tight",
  destino: "mt-10 text-center text-base md:text-lg",
  body: "mt-4 text-base leading-relaxed md:text-lg",
  valorLead: "text-base md:text-lg",
  valorPrice: "text-lg font-bold leading-snug md:text-xl",
  section: "py-10 text-center md:py-12",
  articlePad: "px-5 pb-16 lg:px-8",
  heroWrap:
    "relative mt-10 aspect-[21/9] min-h-[200px] w-full overflow-hidden bg-black/20 md:min-h-[280px]",
} as const;

const OFERTA_DETALHE_ICONES = {
  partners: {
    calendar: "/partners_image/calendar-icon.png",
    cash: "/partners_image/cash-icon.png",
    baggage: "/partners_image/bagage-icon.png",
    drink: "/partners_image/drink-icon.png",
  },
  ultrablue: {
    calendar: "/ultrablue_image/icon_calendar-blue.png",
    cash: "/ultrablue_image/icon_cash-blue.png",
    baggage: "/ultrablue_image/icon_bagage-blue.png",
    drink: "/ultrablue_image/icon_drink-blue.png",
  },
} as const;

export type OfertaDetalheBrand = "partners" | "ultrablue";

const DETALHE_BRAND = {
  partners: {
    shell: "bg-btg-navy text-white",
    muted: "text-[#E7EEFF]",
    title: "text-white",
    blockTitle: `${DETALHE_LAYOUT.blockTitle} text-white`,
    backLink: `${DETALHE_LAYOUT.backLink} text-[#E7EEFF] hover:text-white`,
    divider: "divide-white/10",
  },
  ultrablue: {
    shell: "bg-[#F1F4F8] text-[#05132A]",
    muted: "text-[#05132A]/85",
    title: "text-[#0B2859]",
    blockTitle: `${DETALHE_LAYOUT.blockTitle} text-[#0B2859]`,
    backLink: `${DETALHE_LAYOUT.backLink} text-[#05132A] hover:text-[#0B2859]`,
    divider: "divide-[#0B2859]/25",
  },
} as const;

const iconeDetalheClass = "h-7 w-7 shrink-0 object-contain md:h-8 md:w-8";

function heroSrc(oferta: Oferta): string {
  const img = oferta.acf?.imagem;
  if (!img || typeof img !== "object") return "";
  return (
    img.sizes?.large ||
    img.sizes?.full ||
    img.sizes?.medium_large ||
    img.url ||
    ""
  );
}

function formatQuando(inicio?: string, fim?: string): string {
  const a = (inicio || "").trim();
  const b = (fim || "").trim();
  if (!a && !b) return "";
  if (a && b) return `${a} até ${b}`;
  return a || b;
}

function texto(value?: string): string {
  return (value || "").trim();
}

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
  if (moeda.includes("eur") || moeda.includes("euro")) {
    return "EUR";
  }
  return "R$";
}

function ValorBloco({
  acf,
  brand,
}: {
  acf: Oferta["acf"];
  brand: OfertaDetalheBrand;
}) {
  const moeda = formatMoeda(acf.moeda);
  const preco = formatPrecoExibicao(String(acf.preco || "").trim(), acf.moeda);
  const taxas = (acf.taxas || "").trim();
  const ctx = (acf.contexto_do_preco || "").trim();

  const destaque = `${moeda} ${preco}${taxas ? ` (${taxas})` : ""}`;
  const t = DETALHE_BRAND[brand];
  const priceClass = brand === "ultrablue" ? "text-[#0B2859]" : "text-white";

  return (
    <div className="mt-4 space-y-1 text-center">
      <p className={`${DETALHE_LAYOUT.valorLead} ${t.muted}`}>A partir de</p>
      <p className={`${DETALHE_LAYOUT.valorPrice} ${priceClass}`}>{destaque}</p>
      {ctx ? (
        <p className={`pt-0.5 ${DETALHE_LAYOUT.body} ${t.muted}`}>{ctx}</p>
      ) : null}
    </div>
  );
}

function parseIncluiLinhas(text: string): string[] {
  const t = text.trim();
  if (!t) return [];
  if (t.includes("\n")) {
    return t
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return t
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
}

type Bloco = {
  iconSrc: string;
  titulo: string;
  corpo: ReactNode;
};

type OfertaDetalheProps = {
  oferta: Oferta;
  backHref: string;
  brand: OfertaDetalheBrand;
  /** Quando `false`, não aplica padding extra para header fixo (ex.: página Ultrablue). */
  offsetForFixedHeader?: boolean;
};

function CabecalhoBloco({
  iconSrc,
  titulo,
  titleClassName,
}: {
  iconSrc: string;
  titulo: string;
  titleClassName: string;
}) {
  return (
    <div className="flex items-center justify-center gap-2.5 md:gap-3">
      <Image
        src={iconSrc}
        alt=""
        width={32}
        height={32}
        className={iconeDetalheClass}
      />
      <h2 className={titleClassName}>{titulo}</h2>
    </div>
  );
}

export function OfertaDetalhe({
  oferta,
  backHref,
  brand,
  offsetForFixedHeader = true,
}: OfertaDetalheProps) {
  const topPad = offsetForFixedHeader ? HEADER_OFFSET_CLASS : "pt-8 sm:pt-10";
  const tokens = DETALHE_BRAND[brand];
  const acf = oferta.acf;
  const destino = texto(acf?.destino_rota);
  const titulo =
    texto(acf?.nome_da_oferta) || oferta.title?.rendered || "Oferta";
  const img = heroSrc(oferta);

  const preco = texto(acf?.preco);
  const acomodacaoTexto = texto(acf?.contexto_do_preco);
  const quando = formatQuando(acf?.data_de_inicio, acf?.data_final);

  const incluiRaw = (
    acf?.inclui_no_pacote ||
    acf?.incluso_no_pacote ||
    ""
  ).trim();
  const incluiLinhas = parseIncluiLinhas(incluiRaw);

  const bodyClass = `${DETALHE_LAYOUT.body} ${tokens.muted}`;
  const icones = OFERTA_DETALHE_ICONES[brand];
  const blocos: Bloco[] = [];

  if (quando) {
    blocos.push({
      iconSrc: icones.calendar,
      titulo: "Quando",
      corpo: <p className={bodyClass}>{quando}</p>,
    });
  }

  if (preco) {
    blocos.push({
      iconSrc: icones.cash,
      titulo: "Valor",
      corpo: <ValorBloco acf={acf} brand={brand} />,
    });
  }

  if (acomodacaoTexto) {
    blocos.push({
      iconSrc: icones.baggage,
      titulo: "Acomodação",
      corpo: <p className={bodyClass}>{acomodacaoTexto}</p>,
    });
  }

  if (incluiLinhas.length > 0) {
    blocos.push({
      iconSrc: icones.drink,
      titulo: "Inclui no pacote",
      corpo: (
        <div className="mt-4 space-y-3 text-center">
          {incluiLinhas.map((linha) => (
            <p key={linha} className={bodyClass}>
              {linha}
            </p>
          ))}
        </div>
      ),
    });
  }

  return (
    <article
      className={`${topPad} ${DETALHE_LAYOUT.articlePad} ${tokens.shell}`}
    >
      <div className="mx-auto max-w-[1280px]">
        <Link href={backHref} className={tokens.backLink}>
          <ChevronLeft className="h-5 w-5" aria-hidden />
          Voltar
        </Link>

        {destino ? (
          <p className={`${DETALHE_LAYOUT.destino} ${tokens.muted}`}>
            {destino}
          </p>
        ) : null}

        <h1 className={`${DETALHE_LAYOUT.h1} ${tokens.title}`}>{titulo}</h1>

        {img ? (
          <div className={DETALHE_LAYOUT.heroWrap}>
            <Image
              src={img}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
          </div>
        ) : null}

        <div className={`mx-auto mt-14 max-w-2xl divide-y ${tokens.divider}`}>
          {blocos.map(({ iconSrc, titulo: t, corpo }, i) => (
            <section key={`${t}-${i}`} className={DETALHE_LAYOUT.section}>
              <CabecalhoBloco
                iconSrc={iconSrc}
                titulo={t}
                titleClassName={tokens.blockTitle}
              />
              {corpo}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
