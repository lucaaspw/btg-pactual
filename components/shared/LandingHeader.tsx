"use client";

import { CONCIERGE_WHATSAPP } from "@/constants/concierge";
import {
  LANDING_HEADER_BRANDS,
  type LandingHeaderBrandId,
} from "@/constants/landing-header";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/** Após rolar um pouco, o fundo fecha para o conteúdo não “vazar” por trás do menu. */
const SCROLL_SOLID_PX = 48;

type LandingHeaderProps = {
  brand: LandingHeaderBrandId;
};

export function LandingHeader({ brand }: LandingHeaderProps) {
  const cfg = LANDING_HEADER_BRANDS[brand];
  const conciergeHref = CONCIERGE_WHATSAPP[cfg.conciergeBrand];
  const mobileNav = [
    { label: "Homepage", href: cfg.homeHref },
    ...cfg.nav,
  ] as const;

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

  const headerShell = solid ? cfg.headerWhenSolid : cfg.headerWhenTransparent;
  const iconCls = cfg.menuIconClass;

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-[100] transition-colors duration-300 ${headerShell}`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-4 sm:px-5 lg:px-0">
        <Link href={cfg.homeHref} className="shrink-0">
          <Image
            src={cfg.logo.src}
            alt={cfg.logo.alt}
            width={cfg.logo.width}
            height={cfg.logo.height}
            className={cfg.logo.className}
            priority
          />
        </Link>

        <button
          type="button"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className={`inline-flex h-10 w-10 items-center justify-center text-white transition lg:hidden ${cfg.menuToggleHoverClass}`}
        >
          {mobileOpen ? (
            <X className={iconCls} />
          ) : (
            <Menu className={iconCls} />
          )}
        </button>

        <nav
          className="hidden items-center gap-x-6 text-sm text-white lg:flex"
          aria-label="Principal"
        >
          {cfg.nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cfg.desktopNavLinkClass}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={conciergeHref}
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
          className={`fixed inset-0 z-[110] transition-opacity duration-300 ease-out ${cfg.overlayClass} ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`fixed top-0 z-[120] flex w-full flex-col px-6 py-6 text-white shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${cfg.mobilePanelClass} ${
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
            href={conciergeHref}
            onClick={() => setMobileOpen(false)}
            className={`mt-5 inline-flex w-full items-center justify-between gap-2 bg-[#3a87e6] px-5 py-3.5 text-white transition-all duration-300 hover:bg-[#5098ef] ${
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
