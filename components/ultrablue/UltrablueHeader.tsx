"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const nav = [
  { label: "Feriados", href: "/ultrablue/feriados" },
  { label: "Roteiros", href: "/ultrablue/roteiros" },
  { label: "Cruzeiros", href: "/ultrablue/cruzeiros" },
  { label: "Concierge Ultrablue", href: "/ultrablue/concierge" },
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
          ? "border-b border-white/20 bg-[#0056B8] shadow-[0_1px_0_rgba(0,0,0,0.2)]"
          : "border-b border-transparent bg-[#10408D]"
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

        <nav
          className="hidden items-center gap-x-6 text-sm text-white lg:flex"
          aria-label="Principal"
        >
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
          href="https://api.whatsapp.com/send?phone=551148621688&text=Ultrablue%20BTG%20Pactual%3A%20Sele%C3%A7%C3%A3o%20para%20a%20P%C3%A1scoa%20com%20benef%C3%ADcios%20exclusivos%20-%20C%C3%B3digo%20U0206"
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
          className={`fixed inset-0 z-[110] bg-[#05132A]/45 transition-opacity duration-300 ease-out ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`fixed top-0 z-[120] flex w-full flex-col bg-[#0A3C79] px-6 py-6 text-white shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
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
            href="https://api.whatsapp.com/send?phone=551148621688&text=Ultrablue%20BTG%20Pactual%3A%20Sele%C3%A7%C3%A3o%20para%20a%20P%C3%A1scoa%20com%20benef%C3%ADcios%20exclusivos%20-%20C%C3%B3digo%20U0206"
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
