import { ULTRABLUE_LP_IMAGES } from "@/constants/ultrablue-lp";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const experienceLinks = [
  { label: "Feriados", href: "/ultrablue/feriados" },
  { label: "Roteiros", href: "/ultrablue/roteiros" },
  { label: "Cruzeiros", href: "/ultrablue/cruzeiros" },
] as const;

const programLinks = [
  { label: "Concierge Ultrablue", href: "/ultrablue/concierge" },
  { label: "Benefícios", href: "/ultrablue/beneficios" },
] as const;

export function UltrablueCategoryBanners() {
  return (
    <section
      id="categorias"
      className="scroll-mt-24 relative bg-[#F1F4F8] px-5 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px] lg:border-t lg:border-[#0B2859]/20  py-16">
        <div className="grid gap-x-20 gap-y-4 md:grid-cols-2">
          <div>
            <Image
              src={ULTRABLUE_LP_IMAGES.experiencias}
              alt="Experiências"
              width={620}
              height={166}
            />
            <div className="mt-auto w-full bg-[#0B2859] p-6">
              <h3 className="text-2xl font-light text-white">Experiências</h3>
              <p className="mt-4 max-w-sm text-white/90">
                Descubra viagens pensadas para cada momento.
              </p>
            </div>
            <div className="mt-4">
              {experienceLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between text-xl border-b border-[#0B2859] py-4 text-lg font-bold text-[#0B2859] transition hover:text-[#1E4F99]"
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

          <div>
            <Image
              src={ULTRABLUE_LP_IMAGES.programaUltrablue}
              alt="Programa Ultrablue"
              width={620}
              height={166}
            />
            <div className="mt-auto w-full bg-[#0B2859] p-6">
              <h3 className="text-2xl text-white">Programa Ultrablue</h3>
              <p className="mt-4 text-white/90">
                Serviços exclusivos para clientes.
              </p>
            </div>
            <div className="mt-4">
              {programLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between text-xl border-b border-[#0B2859] py-4 text-lg font-bold text-[#0B2859] transition hover:text-[#1E4F99]"
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
