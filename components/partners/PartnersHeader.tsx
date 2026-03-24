"use client";

import { ArrowUpRight } from "lucide-react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const nav = [
  { label: "Feriados", href: "/partners/feriados" },
  { label: "Roteiros", href: "/partners/roteiros" },
  { label: "Cruzeiros", href: "/partners/cruzeiros" },
  { label: "Concierge Partners", href: "/partners/concierge" },
  { label: "Benefícios", href: "/partners/beneficios" },
] as const;
const mobileNav = [{ label: "Homepage", href: "/partners" }, ...nav] as const;

/** Após rolar um pouco, o fundo fecha para o conteúdo não “vazar” por trás do menu. */
const SCROLL_SOLID_PX = 48;

export function PartnersHeader() {
  const [solid, setSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > SCROLL_SOLID_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-[100] transition-colors duration-300 ${
        solid
          ? "border-b border-white/10 bg-btg-navy shadow-[0_1px_0_rgba(0,0,0,0.2)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-4 sm:px-5 lg:px-0">
        <Link href="/partners" className="shrink-0">
          <Image
            src="/partners_image/btgpactual_logo.png"
            alt="BTG Pactual"
            width={160}
            height={40}
            className="w-auto h-14"
            priority
          />
        </Link>

        <button
          type="button"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center text-white transition hover:text-[#b8d4ff] lg:hidden"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        <nav
          className="hidden items-center gap-x-6 text-sm text-white lg:flex"
          aria-label="Principal"
        >
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="drop-shadow-sm text-sm lg:text-xl transition hover:text-[#b8d4ff]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href="/partners#contato"
          className="hidden shrink-0 items-center gap-2 bg-[#2E73D4] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#3A80E4] lg:inline-flex"
        >
          Quero falar com meu concierge
          <ArrowUpRight
            className="h-4 w-4 shrink-0"
            strokeWidth={2}
            aria-hidden
          />
        </a>
      </div>

      <div
        className={`lg:hidden ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`fixed inset-0 z-[110] bg-btg-navy-deep/45 transition-opacity duration-300 ease-out ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`fixed z-[120] top-0 w-full flex flex-col bg-[#1c4a99] px-6 py-6 text-white shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="flex items-start justify-between">
            <span className="text-white/35">Menu</span>
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center text-white/90 transition hover:text-white"
            >
              <X className="h-8 w-8" strokeWidth={1.25} />
            </button>
          </div>

          <nav
            className="mt-4 flex flex-1 flex-col items-center justify-center gap-10"
            aria-label="Menu mobile"
          >
            {mobileNav.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`text-[1rem] font-semibold leading-none text-white transition-all duration-300 hover:text-[#d8e8ff] ${
                  mobileOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-1 opacity-0"
                }`}
                style={{
                  transitionDelay: mobileOpen ? `${index * 35}ms` : "0ms",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href="/partners#contato"
            onClick={() => setMobileOpen(false)}
            className={`inline-flex w-full mt-5 items-center justify-between gap-2 bg-[#3a87e6] px-5 py-3.5 text-white transition-all duration-300 hover:bg-[#5098ef] ${
              mobileOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-2 opacity-0"
            }`}
            style={{ transitionDelay: mobileOpen ? "160ms" : "0ms" }}
          >
            Quero falar com meu concierge
            <ArrowUpRight
              className="h-7 w-7 shrink-0"
              strokeWidth={2}
              aria-hidden
            />
          </a>
        </div>
      </div>
    </header>
  );
}
