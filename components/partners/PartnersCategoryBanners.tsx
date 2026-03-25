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
  { label: "Concierge Partners", href: "/partners#categorias" },
  { label: "Benefícios", href: "/partners#beneficios" },
] as const;

export function PartnersCategoryBanners() {
  return (
    <section
      id="categorias"
      className="scroll-mt-24 relative border-0 lg:border-y border-white/10 bg-btg-navy px-5 py-16 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-x-20 gap-y-4 md:grid-cols-2">
          <div className="group">
            <Image
              src={PARTNERS_LP_IMAGES.experiencias}
              alt="Praia"
              width={620}
              height={166}
            />
            <div className=" bg-[#0B2859] w-full z-10 mt-auto p-6">
              <h3 className="text-2xl font-bold">Experiências</h3>
              <p className="mt-2 max-w-sm text-sm text-white/90">
                Descubra viagens pensadas para cada momento.
              </p>
            </div>
            <div className="mt-4">
              {experienceLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between border-b border-white/15 py-4 text-lg font-medium text-white transition hover:text-[#7eb4ff]"
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
            <Image
              src={PARTNERS_LP_IMAGES.programaPartners}
              alt="Programa Partners"
              width={620}
              height={166}
            />
            <div className="relative  bg-[#0B2859] w-full z-10 mt-auto p-6">
              <h3 className="text-2xl font-bold">Programa Partners</h3>
              <p className="mt-2 max-w-sm text-sm text-white/90">
                Serviços exclusivos para clientes.
              </p>
            </div>
            <div className="mt-4">
              {programLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between border-b border-white/15 py-4 text-lg font-medium text-white transition hover:text-[#7eb4ff]"
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
