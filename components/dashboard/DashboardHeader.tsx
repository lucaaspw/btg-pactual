"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);
  const onLoginRoute = pathname === "/dashboard/login";

  async function handleLogout() {
    setLeaving(true);
    try {
      await fetch("/api/auth/dashboard", { method: "DELETE" });
    } finally {
      router.replace("/dashboard/login");
      router.refresh();
      setLeaving(false);
    }
  }

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
          <Link href="/partners" className="text-sm text-white">
            Ofertas Partners
          </Link>
          <Link href="/ultrablue" className="text-sm text-white">
            Ofertas Ultrablue
          </Link>
          <span className="hidden text-white/25 sm:inline" aria-hidden>
            |
          </span>
          <Link href="/dashboard/ofertas" className="text-sm text-white">
            Todas as ofertas
          </Link>
        </div>
        {!onLoginRoute ? (
          <button
            type="button"
            onClick={() => void handleLogout()}
            disabled={leaving}
            className="text-sm text-[#9ca8b8] underline-offset-2 transition hover:text-white hover:underline disabled:opacity-50"
          >
            {leaving ? "Saindo…" : "Sair"}
          </button>
        ) : null}
      </div>
    </header>
  );
}
