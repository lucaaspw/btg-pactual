import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PARTNERS_LP_IMAGES } from "@/constants/partners-lp";

const experienceLinks = [
  { label: "Feriados", href: "/partners/feriados" },
  { label: "Roteiros", href: "/partners/roteiros" },
  { label: "Cruzeiros", href: "/partners/cruzeiros" },
] as const;

const programLinks = [
  { label: "Concierge Partners", href: "/partners/concierge" },
  { label: "Benefícios", href: "/partners/beneficios" },
] as const;

export function PartnersCategoryBanners() {
  return (
    <section
      id="categorias"
      className="scroll-mt-24 relative bg-btg-navy px-5 pb-16 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px] border-t border-white/10 pt-16">
        <div className="grid gap-x-20 gap-y-4 md:grid-cols-2">
          <div className="group">
            <div className="relative h-[166px] md:h-[219px] overflow-hidden">
              <Image
                src={PARTNERS_LP_IMAGES.experiencias}
                alt="Praia"
                fill
                className="object-cover"
              />
            </div>

            <div className=" bg-[#0B2859] w-full z-10 mt-auto p-6">
              <h3 className="text-lg md:text-xl text-white font-light">
                Experiências
              </h3>
              <p className="mt-3 max-w-sm text-2xl text-white/90">
                Descubra viagens pensadas para cada momento.
              </p>
            </div>
            <div className="mt-4">
              {experienceLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between border-b border-white/15 py-4 text-2xl font-bold text-[#D2E5FF] transition hover:text-[#7eb4ff]"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0"
                    strokeWidth={1.75}
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="group">
            <div className="relative h-[166px] md:h-[219px] overflow-hidden">
              <Image
                src={PARTNERS_LP_IMAGES.programaPartners}
                alt="Programa Partners"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative  bg-[#0B2859] w-full z-10 mt-auto p-6">
              <h3 className="text-lg md:text-xl text-white font-light">
                Programa Partners
              </h3>
              <p className="mt-3 max-w-sm text-2xl text-white/90">
                Serviços exclusivos para clientes.
              </p>
            </div>
            <div className="mt-4">
              {programLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between border-b border-white/15 py-4 text-2xl font-bold text-[#D2E5FF] transition hover:text-[#7eb4ff]"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0"
                    strokeWidth={1.75}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
