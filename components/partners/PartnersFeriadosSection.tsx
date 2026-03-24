"use client";

import { OfertaCard } from "@/components/ofertas/OfertaCard";
import type { Oferta } from "@/types/oferta";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const HEADER_OFFSET_CLASS = "pt-[5.5rem] sm:pt-24";

type PartnersFeriadosSectionProps = {
  /** Linha de destaque no hero (ex.: feriados de 2026). */
  title: string;
  ofertas: Oferta[];
  /**
   * Título da seção para ofertas sem `nome_feriado` no CMS
   * (ex.: campanha em destaque).
   */
  holidayFallbackLabel?: string;
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
}: {
  regionLabel: string;
  ofertas: Oferta[];
  isFirstInSection: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByDir = useCallback((dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const delta = Math.min(360, el.clientWidth * 0.85) * dir;
    el.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  return (
    <div className={isFirstInSection ? "mt-10" : "mt-20"}>
      <div className="mb-6 flex items-end justify-between gap-6 border-b border-white/[0.12] pb-4">
        <h3 className="text-xl font-normal tracking-tight text-white sm:text-2xl">
          {regionLabel}
        </h3>
        <div className="flex shrink-0 gap-[70px]">
          <button
            type="button"
            className="p-1.5 text-white transition hover:opacity-80"
            aria-label={`Anterior — ${regionLabel}`}
            onClick={() => scrollByDir(-1)}
          >
            <ChevronLeft className="h-7 w-7 cursor-pointer" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className="p-1.5 text-white transition hover:opacity-80"
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
                  ? `/partners/oferta/${encodeURIComponent(oferta.slug)}`
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
}: {
  section: HolidaySection;
  escopo: "nacional" | "internacional";
  onEscopoChange: (v: "nacional" | "internacional") => void;
}) {
  const filtered = useMemo(
    () => section.offers.filter((o) => matchesEscopo(o, escopo)),
    [section.offers, escopo],
  );

  const byRegiao = useMemo(() => groupByEstadoOuPais(filtered), [filtered]);

  const scopeBtn = (key: "nacional" | "internacional") => {
    const active = escopo === key;
    return active
      ? "bg-white px-7 py-2.5 text-sm cursor-pointer font-semibold text-btg-navy shadow-sm"
      : "border border-white/45 bg-transparent px-7 py-2.5 text-sm cursor-pointer font-semibold text-white transition hover:border-white/70";
  };

  return (
    <article className="border-b border-white/[0.12] pb-16 last:border-b-0 last:pb-0">
      <div className="flex flex-wrap gap-8 py-10 sm:gap-10">
        <h2 className="text-[1.75rem] font-bold leading-tight tracking-tight md:text-4xl md:leading-tight">
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
        <p className="max-w-xl text-[#E7EEFF]">
          Nenhuma oferta {escopo === "nacional" ? "nacional" : "internacional"}{" "}
          cadastrada para {section.title}. Ajuste o filtro ou publique ofertas
          com &quot;Nacional / Internacional&quot; e estado ou país preenchidos.
        </p>
      ) : (
        <>
          {[...byRegiao.entries()].map(([region, lista], idx) => (
            <RegionCarousel
              key={region}
              regionLabel={region}
              ofertas={lista}
              isFirstInSection={idx === 0}
            />
          ))}
        </>
      )}
    </article>
  );
}

export function PartnersFeriadosSection({
  title,
  ofertas,
  holidayFallbackLabel = "Feriados",
}: PartnersFeriadosSectionProps) {
  const sections = useMemo(
    () => buildHolidaySections(ofertas, holidayFallbackLabel),
    [ofertas, holidayFallbackLabel],
  );

  const [escopoPorSecao, setEscopoPorSecao] = useState<
    Record<string, "nacional" | "internacional">
  >({});

  useEffect(() => {
    setEscopoPorSecao((prev) => {
      const next = { ...prev };
      for (const s of sections) {
        if (next[s.id] === undefined) {
          next[s.id] = "nacional";
        }
      }
      return next;
    });
  }, [sections]);

  return (
    <section
      className={`${HEADER_OFFSET_CLASS} scroll-mt-24 bg-[#050C1C] px-5 pb-24 lg:px-8`}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="pt-10 pb-10">
          <Link
            href="/partners"
            className="mb-14 flex items-center gap-1 text-sm text-[#C8D4E8] transition hover:text-white md:text-base"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
            voltar
          </Link>
          <h1 className="max-w-[920px] text-2xl font-bold leading-[1.25] tracking-tight md:text-3xl lg:text-[2rem] lg:leading-snug">
            {title}
          </h1>
        </div>

        {ofertas.length === 0 ? (
          <p className="mt-10 max-w-xl text-[#E7EEFF]">
            Em breve novas ofertas exclusivas nesta categoria. O operador pode
            publicar em{" "}
            <a
              className="underline underline-offset-2"
              href="/dashboard/nova-oferta"
            >
              Nova oferta
            </a>{" "}
            com tipo de cartão <strong>Partners</strong>.
          </p>
        ) : sections.length === 0 ? (
          <p className="mt-10 max-w-xl text-[#E7EEFF]">
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
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
