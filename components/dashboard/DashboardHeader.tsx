"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardHeader() {
  const pathname = usePathname();
  const isNovaOferta = pathname === "/dashboard/nova-oferta";

  return (
    <header className="border-b border-white/10 bg-btg-navy-deep text-white">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-y-3 gap-x-4 px-4 py-5 md:px-6">
        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
          <Link
            href="/dashboard"
            className="flex shrink-0 items-baseline font-semibold tracking-tight"
          >
            <span className="text-white">btg</span>
            <span className="text-[#f2b541]">pactual</span>
          </Link>
          <span className="hidden text-white/25 sm:inline" aria-hidden>
            |
          </span>
          <span className="truncate text-sm text-[#9ca8b8] sm:text-base">
            Painel de Ofertas
          </span>
        </div>
      </div>
    </header>
  );
}
