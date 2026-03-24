"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const nav = [
  { label: "Feriados", href: "/ultrablue/feriados" },
  { label: "Roteiros", href: "/ultrablue/roteiros" },
  { label: "Cruzeiros", href: "/ultrablue/cruzeiros" },
  { label: "Concierge Partners", href: "/ultrablue/concierge" },
  { label: "Benefícios", href: "/ultrablue/beneficios" },
] as const;

const mobileNav = [{ label: "Homepage", href: "/ultrablue" }, ...nav] as const;
const SCROLL_SOLID_PX = 48;

export function UltrablueHeader() {
  const [solid, setSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > SCROLL_SOLID_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          ? "border-b border-white/20 bg-[#0056B8]"
          : "border-b border-transparent  bg-[#0056B8]"
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-4 sm:px-5 lg:px-0">
        <Link href="/ultrablue" className="shrink-0">
          <Image
            src="/partners_image/btgpactual_logo.png"
            alt="BTG Pactual"
            width={160}
            height={40}
            className="h-14 w-auto"
            priority
          />
        </Link>

        <button
          type="button"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center text-white transition hover:text-[#D6EAFF] lg:hidden"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        <nav className="hidden items-center gap-x-6 text-sm text-white lg:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm transition hover:text-[#D6EAFF] lg:text-xl"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href="/ultrablue#contato"
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

      {mobileOpen ? (
        <div className="fixed inset-0 z-[120] bg-[#0A3C79] px-6 py-6 lg:hidden">
          <div className="flex items-start justify-between">
            <span className="text-white/45">Menu</span>
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center text-white"
            >
              <X className="h-8 w-8" strokeWidth={1.25} />
            </button>
          </div>

          <nav
            className="mt-10 flex flex-col items-center gap-8"
            aria-label="Menu mobile"
          >
            {mobileNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-semibold text-white transition hover:text-[#D6EAFF]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
