"use client";

import { OfertaCard } from "@/components/ofertas/OfertaCard";
import { ULTRABLUE_LP_IMAGES } from "@/constants/ultrablue-lp";
import type { Oferta } from "@/types/oferta";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";

const HEADER_OFFSET_CLASS = "pt-[5.5rem] sm:pt-24";

/** Qual LP de cartão está em uso — define tokens visuais no `FERIADOS_BRAND`. */
export type FeriadosBrand = "partners" | "ultrablue";

const FERIADOS_BRAND = {
  partners: {
    section: "bg-[#050C1C]",
    backLink:
      "mb-14 flex items-center gap-1 text-sm text-[#C8D4E8] transition hover:text-white md:text-base",
    title:
      "max-w-[920px] text-2xl font-bold leading-[1.25] tracking-tight md:text-3xl lg:text-[2rem] lg:leading-snug",
    border: "border-b border-white/[0.12]",
    scopeActiveText: "text-btg-navy",
  },
  ultrablue: {
    section: "bg-[#F1F4F8] text-[#05132A]",
    backLink:
      "mb-14 flex items-center gap-1 text-sm text-[#05132A] transition hover:text-[#0B2859] md:text-base",
    title:
      "max-w-[920px] text-2xl font-bold leading-[1.25] tracking-tight text-[#0B2859] md:text-3xl lg:text-[2rem] lg:leading-snug",
    border: "border-b border-[#0B2859]/25",
    scopeActiveText: "text-[#0B2859]",
  },
} as const;

export type FeriadosSectionProps = {
  /** Linha de destaque no hero (ex.: feriados de 2026). */
  title: string;
  ofertas: Oferta[];
  /**
   * Título da seção para ofertas sem `nome_feriado` no CMS
   * (ex.: campanha em destaque).
   */
  holidayFallbackLabel?: string;
  /** Rota da LP para o link "Voltar". */
  homeHref: string;
  /** Base da URL de detalhe, sem barra final (ex.: /partners/oferta). */
  ofertaDetailBasePath: string;
  /** Nome do cartão no texto quando não há ofertas. */
  tipoCartaoNome: string;
  brand: FeriadosBrand;
  /** Parágrafo abaixo do título (LP Ultrablue; ex.: banner + texto introdutório). */
  introDescription?: string;
};

function normalizeEscopo(raw?: string): string {
  return String(raw || "")
    .trim()
    .toLowerCase();
}

function matchesEscopo(
  oferta: Oferta,
  escopo: "nacional" | "internacional",
): boolean {
  const v = normalizeEscopo(oferta.acf?.nacional_internacional);
  if (!v) return true;
  if (escopo === "nacional") return v === "nacional";
  return v === "internacional";
}

function nomeFeriadoTrim(oferta: Oferta): string {
  return (oferta.acf?.nome_feriado || "").trim();
}

type HolidaySection = {
  id: string;
  title: string;
  offers: Oferta[];
};

/** Uma seção por feriado; ofertas sem nome entram numa seção com `holidayFallbackLabel`. */
function buildHolidaySections(
  ofertas: Oferta[],
  holidayFallbackLabel: string,
): HolidaySection[] {
  const byName = new Map<string, Oferta[]>();
  const semNome: Oferta[] = [];

  for (const o of ofertas) {
    const n = nomeFeriadoTrim(o);
    if (!n) {
      semNome.push(o);
    } else {
      const list = byName.get(n) ?? [];
      list.push(o);
      byName.set(n, list);
    }
  }

  const sections: HolidaySection[] = [];
  const sortedNames = [...byName.keys()].sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  );

  for (const name of sortedNames) {
    sections.push({
      id: `feriado:${name}`,
      title: name,
      offers: byName.get(name)!,
    });
  }

  if (semNome.length > 0) {
    const titleSemNome =
      sortedNames.length === 0 ? holidayFallbackLabel : "Demais ofertas";
    sections.push({
      id: "feriado:sem-nome",
      title: titleSemNome,
      offers: semNome,
    });
  }

  return sections;
}

/**
 * Nacional: agrupa por estado. Internacional: agrupa por país.
 * Em ambos os casos usa o campo `estado_pais` (preencher estado ou país conforme o escopo).
 */
function groupByEstadoOuPais(ofertas: Oferta[]): Map<string, Oferta[]> {
  const map = new Map<string, Oferta[]>();
  for (const o of ofertas) {
    const raw = (o.acf?.estado_pais || "").trim();
    const key = raw || "Outros destinos";
    const list = map.get(key) ?? [];
    list.push(o);
    map.set(key, list);
  }
  const keys = [...map.keys()].sort((a, b) => {
    if (a === "Outros destinos") return 1;
    if (b === "Outros destinos") return -1;
    return a.localeCompare(b, "pt-BR");
  });
  const ordered = new Map<string, Oferta[]>();
  for (const k of keys) {
    ordered.set(k, map.get(k)!);
  }
  return ordered;
}

function RegionCarousel({
  regionLabel,
  ofertas,
  isFirstInSection,
  ofertaDetailBasePath,
  borderClass,
  brand,
}: {
  regionLabel: string;
  ofertas: Oferta[];
  isFirstInSection: boolean;
  ofertaDetailBasePath: string;
  borderClass: string;
  brand: FeriadosBrand;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByDir = useCallback((dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const delta = Math.min(360, el.clientWidth * 0.85) * dir;
    el.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  const isUb = brand === "ultrablue";
  const ctrlIcon = isUb
    ? "p-1.5 text-[#0B2859] transition hover:opacity-80"
    : "p-1.5 text-white transition hover:opacity-80";

  return (
    <div className={isFirstInSection ? "mt-10" : "mt-20"}>
      <div
        className={`mb-6 flex items-end justify-between gap-6 pb-4 ${borderClass}`}
      >
        <h3
          className={
            isUb
              ? "text-xl font-normal tracking-tight text-[#0B2859] sm:text-2xl"
              : "text-xl font-normal tracking-tight text-white sm:text-2xl"
          }
        >
          {regionLabel}
        </h3>
        <div className="flex shrink-0 gap-[70px]">
          <button
            type="button"
            className={ctrlIcon}
            aria-label={`Anterior — ${regionLabel}`}
            onClick={() => scrollByDir(-1)}
          >
            <ChevronLeft className="h-7 w-7 cursor-pointer" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className={ctrlIcon}
            aria-label={`Próximo — ${regionLabel}`}
            onClick={() => scrollByDir(1)}
          >
            <ChevronRight
              className="h-7 w-7 cursor-pointer"
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-3 pl-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {ofertas.map((oferta) => (
          <div
            key={oferta.id}
            className="w-[min(100%,300px)] shrink-0 snap-start w-full md:w-[280px]"
          >
            <OfertaCard
              oferta={oferta}
              badgeOnImage
              detailHref={
                oferta.slug
                  ? `${ofertaDetailBasePath}/${encodeURIComponent(oferta.slug)}`
                  : undefined
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function FeriadoHolidayBlock({
  section,
  escopo,
  onEscopoChange,
  ofertaDetailBasePath,
  borderClass,
  scopeActiveTextClass,
  brand,
}: {
  section: HolidaySection;
  escopo: "nacional" | "internacional";
  onEscopoChange: (v: "nacional" | "internacional") => void;
  ofertaDetailBasePath: string;
  borderClass: string;
  scopeActiveTextClass: string;
  brand: FeriadosBrand;
}) {
  const filtered = useMemo(
    () => section.offers.filter((o) => matchesEscopo(o, escopo)),
    [section.offers, escopo],
  );

  const byRegiao = useMemo(() => groupByEstadoOuPais(filtered), [filtered]);

  const scopeBtn = (key: "nacional" | "internacional") => {
    const active = escopo === key;
    if (brand === "ultrablue") {
      return active
        ? "bg-[#307AE0] px-7 py-2.5 text-sm cursor-pointer font-semibold text-white shadow-sm"
        : "border border-[#0B2859] bg-transparent border-[#307AE0] px-7 py-2.5 text-sm cursor-pointer font-semibold text-[#307AE0] transition hover:bg-[#0B2859]/5";
    }
    return active
      ? `bg-white px-7 py-2.5 text-sm cursor-pointer font-semibold shadow-sm ${scopeActiveTextClass}`
      : "border border-white/45 bg-transparent px-7 py-2.5 text-sm cursor-pointer font-semibold text-white transition hover:border-white/70";
  };

  const isUb = brand === "ultrablue";

  return (
    <article
      className={`border-b pb-16 last:border-b-0 last:pb-0 ${borderClass}`}
    >
      <div className="flex flex-wrap gap-8 py-10 sm:gap-10">
        <h2
          className={
            isUb
              ? "text-[1.75rem] font-bold leading-tight tracking-tight text-[#0B2859] md:text-4xl md:leading-tight"
              : "text-[1.75rem] font-bold leading-tight tracking-tight md:text-4xl md:leading-tight"
          }
        >
          {section.title}
        </h2>

        <div
          className="inline-flex w-full cursor-pointer shrink-0 gap-2 sm:w-auto"
          role="group"
          aria-label={`Nacional ou internacional — ${section.title}`}
        >
          <button
            type="button"
            className={scopeBtn("nacional")}
            onClick={() => onEscopoChange("nacional")}
          >
            Nacional
          </button>
          <button
            type="button"
            className={scopeBtn("internacional")}
            onClick={() => onEscopoChange("internacional")}
          >
            Internacional
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p
          className={
            isUb ? "max-w-xl text-[#05132A]" : "max-w-xl text-[#E7EEFF]"
          }
        >
          Nenhuma oferta {escopo === "nacional" ? "nacional" : "internacional"}{" "}
          cadastrada para {section.title}. Ajuste o filtro ou publique ofertas
          com &quot;Nacional / Internacional&quot;, além de estado ou país
          preenchidos.
        </p>
      ) : (
        <>
          {[...byRegiao.entries()].map(([region, lista], idx) => (
            <RegionCarousel
              key={region}
              regionLabel={region}
              ofertas={lista}
              isFirstInSection={idx === 0}
              ofertaDetailBasePath={ofertaDetailBasePath}
              borderClass={borderClass}
              brand={brand}
            />
          ))}
        </>
      )}
    </article>
  );
}

/** Bloco compartilhado entre as LPs Partners e Ultrablue; use os wrappers em cada pasta do projeto. */
export function FeriadosSection({
  title,
  ofertas,
  holidayFallbackLabel = "Feriados",
  homeHref,
  ofertaDetailBasePath,
  tipoCartaoNome,
  brand,
  introDescription,
}: FeriadosSectionProps) {
  const t = FERIADOS_BRAND[brand];
  const sections = useMemo(
    () => buildHolidaySections(ofertas, holidayFallbackLabel),
    [ofertas, holidayFallbackLabel],
  );

  const [escopoPorSecao, setEscopoPorSecao] = useState<
    Record<string, "nacional" | "internacional">
  >({});

  return (
    <section className={`${HEADER_OFFSET_CLASS} scroll-mt-24 ${t.section} pb-24`}>
      {brand === "ultrablue" ? (
        <div className="relative min-h-[240px] w-full overflow-hidden sm:min-h-[280px] md:min-h-[320px]">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${ULTRABLUE_LP_IMAGES.defaultBanner})`,
            }}
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#F1F4F8]/95 via-[#F1F4F8]/55 to-[#F1F4F8]/35 sm:from-[#F1F4F8]/85 sm:via-[#F1F4F8]/40"
            aria-hidden
          />
          <div className="relative mx-auto max-w-[1280px] px-5 pb-10 pt-10 md:px-0">
            <Link href={homeHref} className={t.backLink}>
              <ChevronLeft className="h-5 w-5" aria-hidden />
              Voltar
            </Link>
            <h1 className={t.title}>{title}</h1>
            {introDescription ? (
              <p className="mt-8 max-w-2xl text-lg leading-snug text-[#05132A]">
                {introDescription}
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="w-full">
          <div className="mx-auto max-w-[1280px]">
            <div className="px-5 pt-10 md:px-0">
              <Link href={homeHref} className={t.backLink}>
                <ChevronLeft className="h-5 w-5" aria-hidden />
                Voltar
              </Link>
              <h1 className={t.title}>{title}</h1>
            </div>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-[1280px] px-5 md:px-0">
        {ofertas.length === 0 ? (
          <p
            className={
              brand === "ultrablue"
                ? "mt-10 max-w-xl text-[#05132A]"
                : "mt-10 max-w-xl text-[#E7EEFF]"
            }
          >
            Em breve, novas ofertas exclusivas nesta categoria. O operador pode
            publicá-las em{" "}
            <a
              className="underline underline-offset-2"
              href="/dashboard/nova-oferta"
            >
              Nova oferta
            </a>
            , com o tipo de cartão <strong>{tipoCartaoNome}</strong>.
          </p>
        ) : sections.length === 0 ? (
          <p
            className={
              brand === "ultrablue"
                ? "mt-10 max-w-xl text-[#05132A]"
                : "mt-10 max-w-xl text-[#E7EEFF]"
            }
          >
            Não foi possível montar as seções de feriados.
          </p>
        ) : (
          <div className="mt-0">
            {sections.map((section) => (
              <FeriadoHolidayBlock
                key={section.id}
                section={section}
                escopo={escopoPorSecao[section.id] ?? "nacional"}
                onEscopoChange={(v) =>
                  setEscopoPorSecao((prev) => ({
                    ...prev,
                    [section.id]: v,
                  }))
                }
                ofertaDetailBasePath={ofertaDetailBasePath}
                borderClass={t.border}
                scopeActiveTextClass={t.scopeActiveText}
                brand={brand}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
