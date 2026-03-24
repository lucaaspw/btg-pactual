"use client";

import { OfertaCard } from "@/components/ofertas/OfertaCard";
import type { Oferta } from "@/types/oferta";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const HEADER_OFFSET_CLASS = "pt-[5.5rem] sm:pt-24";
const OUTROS_TAB = "Outros";

type PartnersFeriadosSectionProps = {
  /** Linha de destaque no hero (ex.: feriados de 2026). */
  title: string;
  ofertas: Oferta[];
  /**
   * Título do feriado à esquerda quando não há `nome_feriado` no CMS
   * (mantém a mesma hierarquia visual do layout).
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

type HolidayUi =
  | { kind: "none" }
  | { kind: "single_heading"; label: string }
  | { kind: "tabs"; tabs: string[] };

function buildHolidayUi(ofertas: Oferta[]): HolidayUi {
  const names = new Set<string>();
  let hasEmpty = false;
  for (const o of ofertas) {
    const n = nomeFeriadoTrim(o);
    if (!n) hasEmpty = true;
    else names.add(n);
  }
  const sorted = [...names].sort((a, b) => a.localeCompare(b, "pt-BR"));

  if (sorted.length === 0) {
    return { kind: "none" };
  }
  if (sorted.length === 1 && !hasEmpty) {
    return { kind: "single_heading", label: sorted[0]! };
  }

  const tabs = [...sorted];
  if (hasEmpty) {
    tabs.push(OUTROS_TAB);
  }
  return { kind: "tabs", tabs };
}

function matchesHolidayTab(oferta: Oferta, tab: string): boolean {
  if (tab === OUTROS_TAB) {
    return !nomeFeriadoTrim(oferta);
  }
  return nomeFeriadoTrim(oferta) === tab;
}

function groupByRegiao(ofertas: Oferta[]): Map<string, Oferta[]> {
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
}: {
  regionLabel: string;
  ofertas: Oferta[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByDir = useCallback((dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const delta = Math.min(360, el.clientWidth * 0.85) * dir;
    el.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  return (
    <div className="mt-20 first:mt-14">
      <div className="mb-6 flex items-end justify-between gap-6 border-b border-white/[0.12] pb-4">
        <h2 className="text-xl font-normal tracking-tight text-white sm:text-2xl">
          {regionLabel}
        </h2>
        <div className="flex shrink-0 gap-0.5">
          <button
            type="button"
            className="p-1.5 text-white transition hover:opacity-80"
            aria-label={`Anterior — ${regionLabel}`}
            onClick={() => scrollByDir(-1)}
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className="p-1.5 text-white transition hover:opacity-80"
            aria-label={`Próximo — ${regionLabel}`}
            onClick={() => scrollByDir(1)}
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
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
            className="w-[min(100%,300px)] shrink-0 snap-start sm:w-[280px]"
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

export function PartnersFeriadosSection({
  title,
  ofertas,
  holidayFallbackLabel = "Feriados",
}: PartnersFeriadosSectionProps) {
  const holidayUi = useMemo(() => buildHolidayUi(ofertas), [ofertas]);

  const defaultTab = useMemo(() => {
    if (holidayUi.kind === "tabs") {
      return holidayUi.tabs[0] ?? "";
    }
    if (holidayUi.kind === "single_heading") {
      return holidayUi.label;
    }
    return "";
  }, [holidayUi]);

  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const [escopo, setEscopo] = useState<"nacional" | "internacional">(
    "nacional",
  );

  useEffect(() => {
    setSelectedTab(defaultTab);
  }, [defaultTab]);

  const filtered = useMemo(() => {
    let list = ofertas.filter((o) => matchesEscopo(o, escopo));

    if (holidayUi.kind === "tabs") {
      list = list.filter((o) => matchesHolidayTab(o, selectedTab));
    } else if (holidayUi.kind === "single_heading") {
      list = list.filter((o) => nomeFeriadoTrim(o) === holidayUi.label);
    }

    return list;
  }, [ofertas, escopo, holidayUi, selectedTab]);

  const byRegiao = useMemo(() => groupByRegiao(filtered), [filtered]);

  const tabButtonClass = (active: boolean) =>
    [
      "px-6 py-2.5 text-sm font-semibold transition",
      active
        ? "bg-white text-btg-navy"
        : "border border-white/45 bg-transparent text-white hover:bg-white/5",
    ].join(" ");

  const scopeBtn = (key: "nacional" | "internacional") => {
    const active = escopo === key;
    return active
      ? "bg-white px-7 py-2.5 text-sm font-semibold text-btg-navy shadow-sm"
      : "border border-white/45 bg-transparent px-7 py-2.5 text-sm font-semibold text-white transition hover:border-white/70";
  };

  return (
    <section
      className={`${HEADER_OFFSET_CLASS} scroll-mt-24 bg-btg-navy px-5 pb-24 lg:px-8`}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="border-b border-white/[0.12] pt-10 pb-10">
          <Link
            href="/partners"
            className="mb-14 flex items-center gap-1 text-sm text-[#C8D4E8] transition hover:text-white md:text-base"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
            voltar
          </Link>
          <h1 className="max-w-[920px] text-2xl font-bold leading-[1.25] tracking-tight text-white md:text-3xl lg:text-[2rem] lg:leading-snug">
            {title}
          </h1>
        </div>

        <div
          className={`flex flex-col gap-8 border-b border-white/[0.12] py-10 sm:flex-row sm:items-center sm:justify-between sm:gap-10`}
        >
          {holidayUi.kind === "single_heading" ? (
            <h2 className="text-[1.75rem] font-bold leading-tight tracking-tight text-white md:text-4xl md:leading-tight">
              {holidayUi.label}
            </h2>
          ) : holidayUi.kind === "tabs" ? (
            <div
              className="flex flex-wrap items-center gap-2"
              role="tablist"
              aria-label="Feriados"
            >
              {holidayUi.tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={selectedTab === tab}
                  className={tabButtonClass(selectedTab === tab)}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          ) : (
            <h2 className="text-[1.75rem] font-bold leading-tight tracking-tight text-white md:text-4xl md:leading-tight">
              {holidayFallbackLabel}
            </h2>
          )}

          <div
            className="inline-flex w-full shrink-0 items-center justify-center border border-white/25 p-1 sm:w-auto"
            role="group"
            aria-label="Nacional ou internacional"
          >
            <button
              type="button"
              className={scopeBtn("nacional")}
              onClick={() => setEscopo("nacional")}
            >
              Nacional
            </button>
            <button
              type="button"
              className={scopeBtn("internacional")}
              onClick={() => setEscopo("internacional")}
            >
              Internacional
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 max-w-xl text-[#E7EEFF]">
            {ofertas.length === 0
              ? "Em breve novas ofertas exclusivas nesta categoria. O operador pode publicar em "
              : "Nenhuma oferta neste filtro. Tente outro feriado ou Nacional / Internacional. "}
            {ofertas.length === 0 ? (
              <>
                <a
                  className="underline underline-offset-2"
                  href="/dashboard/nova-oferta"
                >
                  Nova oferta
                </a>{" "}
                com tipo de cartão <strong>Partners</strong>.
              </>
            ) : null}
          </p>
        ) : (
          <>
            {[...byRegiao.entries()].map(([region, lista]) => (
              <RegionCarousel
                key={region}
                regionLabel={region}
                ofertas={lista}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
