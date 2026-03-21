import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Oferta } from "@/types/oferta";

const HEADER_OFFSET_CLASS = "pt-[5.5rem] sm:pt-24";

/** Ícones estáticos da página de detalhe (public/partners_image). */
const OFERTA_DETALHE_ICONES = {
  calendar: "/partners_image/calendar-icon.png",
  cash: "/partners_image/cash-icon.png",
  baggage: "/partners_image/bagage-icon.png",
  drink: "/partners_image/drink-icon.png",
} as const;

const iconeDetalheClass =
  "h-7 w-7 shrink-0 object-contain md:h-8 md:w-8";

function heroSrc(oferta: Oferta): string {
  const img = oferta.acf?.imagem;
  if (!img) return "";
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
  if (!a && !b) return "Consulte disponibilidade";
  if (a && b) return `${a} a ${b}`;
  return a || b;
}

function ValorBloco({ acf }: { acf: Oferta["acf"] }) {
  const moeda = String(acf.moeda || "R$").trim();
  const preco = String(acf.preco || "").trim();
  const taxas = (acf.taxas || "").trim();
  const ctx = (acf.contexto_do_preco || "").trim();

  if (!preco) {
    return (
      <p className="mt-4 text-base leading-relaxed text-[#E7EEFF] md:text-lg">
        Consulte valores
      </p>
    );
  }

  const destaque = `${moeda} ${preco}${taxas ? ` (${taxas})` : ""}`;

  return (
    <div className="mt-4 space-y-1 text-center">
      <p className="text-base text-[#E7EEFF] md:text-lg">A partir de</p>
      <p className="text-lg font-bold leading-snug text-white md:text-xl">
        {destaque}
      </p>
      {ctx ? (
        <p className="pt-0.5 text-base leading-relaxed text-[#E7EEFF] md:text-lg">
          {ctx}
        </p>
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
  /** Quando `false`, não aplica padding extra para header fixo (ex.: página Ultrablue). */
  offsetForFixedHeader?: boolean;
};

function CabecalhoBloco({
  iconSrc,
  titulo,
}: {
  iconSrc: string;
  titulo: string;
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
      <h2 className="text-lg font-bold text-white md:text-xl">{titulo}</h2>
    </div>
  );
}

export function OfertaDetalhe({
  oferta,
  backHref,
  offsetForFixedHeader = true,
}: OfertaDetalheProps) {
  const topPad = offsetForFixedHeader ? HEADER_OFFSET_CLASS : "pt-8 sm:pt-10";
  const acf = oferta.acf;
  const destino = (acf?.destino_rota || "").trim();
  const titulo =
    (acf?.nome_da_oferta || "").trim() || oferta.title?.rendered || "Oferta";
  const img = heroSrc(oferta);

  const acomodacaoTexto = (acf?.acomodacao || "").trim();
  const descricao = (acf?.descricao || "").trim();
  const blocoAcomodacao = acomodacaoTexto || descricao;

  const incluiRaw = (acf?.inclui_no_pacote || "").trim();
  const incluiLinhas = parseIncluiLinhas(incluiRaw);

  const blocos: Bloco[] = [
    {
      iconSrc: OFERTA_DETALHE_ICONES.calendar,
      titulo: "Quando",
      corpo: (
        <p className="mt-4 text-base leading-relaxed text-[#E7EEFF] md:text-lg">
          {formatQuando(acf?.data_de_inicio, acf?.data_final)}
        </p>
      ),
    },
    {
      iconSrc: OFERTA_DETALHE_ICONES.cash,
      titulo: "Valor",
      corpo: <ValorBloco acf={acf} />,
    },
  ];

  if (blocoAcomodacao) {
    blocos.push({
      iconSrc: OFERTA_DETALHE_ICONES.baggage,
      titulo: "Acomodação",
      corpo: (
        <p className="mt-4 text-base leading-relaxed text-[#E7EEFF] md:text-lg">
          {blocoAcomodacao}
        </p>
      ),
    });
  }

  if (incluiLinhas.length > 0) {
    blocos.push({
      iconSrc: OFERTA_DETALHE_ICONES.drink,
      titulo: "Inclui no pacote",
      corpo: (
        <div className="mt-4 space-y-3 text-center">
          {incluiLinhas.map((linha) => (
            <p
              key={linha}
              className="text-base leading-relaxed text-[#E7EEFF] md:text-lg"
            >
              {linha}
            </p>
          ))}
        </div>
      ),
    });
  }

  return (
    <article className={`${topPad} bg-btg-navy px-5 pb-16 lg:px-8`}>
      <div className="mx-auto max-w-[1280px]">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 text-sm font-medium text-[#E7EEFF] transition hover:text-white"
        >
          <ChevronLeft
            className="h-4 w-4 shrink-0"
            strokeWidth={2}
            aria-hidden
          />
          voltar
        </Link>

        {destino ? (
          <p className="mt-10 text-center text-base text-[#E7EEFF] md:text-lg">
            {destino}
          </p>
        ) : null}

        <h1 className="mt-3 text-center text-2xl font-bold leading-tight text-white md:text-4xl md:leading-tight">
          {titulo}
        </h1>

        {img ? (
          <div className="relative mt-10 aspect-[21/9] min-h-[200px] w-full overflow-hidden rounded-lg bg-black/20 md:min-h-[280px]">
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

        <div className="mx-auto mt-14 max-w-2xl divide-y divide-white/10">
          {blocos.map(({ iconSrc, titulo: t, corpo }, i) => (
            <section key={`${t}-${i}`} className="py-10 text-center md:py-12">
              <CabecalhoBloco iconSrc={iconSrc} titulo={t} />
              {corpo}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
