"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const nav = [
  { label: "Feriados", href: "#curadoria" },
  { label: "Roteiros", href: "#curadoria" },
  { label: "Cruzeiros", href: "#curadoria" },
  { label: "Concierge Partners", href: "#categorias" },
  { label: "Benefícios", href: "#beneficios" },
] as const;

/** Após rolar um pouco, o fundo fecha para o conteúdo não “vazar” por trás do menu. */
const SCROLL_SOLID_PX = 48;

export function PartnersHeader() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > SCROLL_SOLID_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-[100] transition-colors duration-300 ${
        solid
          ? "border-b border-white/10 bg-btg-navy shadow-[0_1px_0_rgba(0,0,0,0.2)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 py-4 sm:px-5 lg:px-0">
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

        <nav
          className="order-3 flex w-full flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white md:order-none md:w-auto"
          aria-label="Principal"
        >
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="drop-shadow-sm transition hover:text-[#b8d4ff]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          className="inline-flex shrink-0 items-center gap-2 bg-[#2E73D4] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#3A80E4]"
        >
          Quero falar com meu concierge
          <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
        </a>
      </div>
    </header>
  );
}
