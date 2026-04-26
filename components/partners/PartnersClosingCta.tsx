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
          href="https://api.whatsapp.com/send?phone=551148621680&text=Cart%C3%A3o%20Partners%3A%20Sele%C3%A7%C3%A3o%20para%20a%20P%C3%A1scoa%20com%20benef%C3%ADcios%20exclusivos%20-%20C%C3%B3digo%20P0202"
          className="mt-8 inline-flex items-center gap-2 bg-[#2E73D4] px-8 py-4 md:text-xl text-white shadow-lg transition hover:bg-[#3A80E4]"
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
