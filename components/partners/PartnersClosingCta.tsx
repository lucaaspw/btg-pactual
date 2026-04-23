import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

function conciergeHref() {
  const mail = process.env.NEXT_PUBLIC_PARTNERS_CONCIERGE_EMAIL?.trim();
  if (mail) return `mailto:${mail}`;
  return "mailto:concierge@btgpactual.com";
}

export function PartnersClosingCta() {
  return (
    <section
      id="contato"
      className="scroll-mt-24 bg-[#0B2859] px-5 py-20 text-center lg:px-8"
    >
      <div className="mx-auto ">
        <h2 className="text-2xl font-bold md:text-3xl">Quer saber mais?</h2>
        <p className="mt-4 text-lg text-[#E7EEFF]">
          Nossa equipe está à disposição para tirar dúvidas e personalizar sua
          viagem do jeito que precisar.
        </p>
        <Link
          href={conciergeHref()}
          className="mt-8 inline-flex items-center gap-2 bg-[#2E73D4] px-8 py-4 text-xl md:text-2xl font-semibold text-white shadow-lg transition hover:bg-[#3A80E4]"
        >
          Quero falar com meu concierge
          <ArrowUpRight
            className="h-5 w-5 shrink-0"
            strokeWidth={2}
            aria-hidden
          />
        </Link>
      </div>
    </section>
  );
}
