import { PartnersCategoryOffersSection } from "@/components/partners/PartnersCategoryOffersSection";
import { PartnersClosingCta } from "@/components/partners/PartnersClosingCta";
import { PartnersFooter } from "@/components/partners/PartnersFooter";
import { PartnersHeader } from "@/components/partners/PartnersHeader";
import { TIPO_OFERTA } from "@/constants/tipo-oferta";
import { getOfertasPartnersPorTipoOferta } from "@/services/ofertas";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cruzeiros — Cartão Partners BTG Pactual",
  description:
    "Ofertas de cruzeiro exclusivas para clientes Cartão Partners BTG Pactual.",
};

export default async function PartnersCruzeirosPage() {
  const ofertas = await getOfertasPartnersPorTipoOferta(TIPO_OFERTA.CRUZEIRO);

  return (
    <>
      <PartnersHeader />
      <PartnersCategoryOffersSection
        title="Explore o mundo a bordo de cruzeiros selecionados, com serviços impecáveis, destinos extraordinários e experiências inesquecíveis."
        description="Cruzeiros"
        ofertas={ofertas}
      />
      <PartnersClosingCta />
      <PartnersFooter />
    </>
  );
}
