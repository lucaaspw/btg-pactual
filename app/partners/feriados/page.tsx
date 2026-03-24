import { PartnersFeriadosSection } from "@/components/partners/PartnersFeriadosSection";
import { PartnersClosingCta } from "@/components/partners/PartnersClosingCta";
import { PartnersFooter } from "@/components/partners/PartnersFooter";
import { PartnersHeader } from "@/components/partners/PartnersHeader";
import { TIPO_OFERTA } from "@/constants/tipo-oferta";
import { getOfertasPartnersPorTipoOferta } from "@/services/ofertas";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feriados — Cartão Partners BTG Pactual",
  description:
    "Ofertas exclusivas de feriado para clientes Cartão Partners BTG Pactual.",
};

export default async function PartnersFeriadosPage() {
  const ofertas = await getOfertasPartnersPorTipoOferta(TIPO_OFERTA.FERIADO);

  return (
    <>
      <PartnersHeader />
      <PartnersFeriadosSection
        title="Confira destinos selecionados para viajar com exclusividade durante os feriados de 2026"
        ofertas={ofertas}
        holidayFallbackLabel="Páscoa"
      />
      <PartnersClosingCta />
      <PartnersFooter />
    </>
  );
}
