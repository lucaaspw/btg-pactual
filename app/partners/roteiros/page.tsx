import { PartnersCategoryOffersSection } from "@/components/partners/PartnersCategoryOffersSection";
import { PartnersClosingCta } from "@/components/partners/PartnersClosingCta";
import { PartnersFooter } from "@/components/partners/PartnersFooter";
import { PartnersHeader } from "@/components/partners/PartnersHeader";
import { TIPO_OFERTA } from "@/constants/tipo-oferta";
import { getOfertasPartnersPorTipoOferta } from "@/services/ofertas";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roteiros — Cartão Partners BTG Pactual",
  description: "Roteiros exclusivos para clientes Cartão Partners BTG Pactual.",
};

export default async function PartnersRoteirosPage() {
  const ofertas = await getOfertasPartnersPorTipoOferta(TIPO_OFERTA.ROTEIRO);

  return (
    <>
      <PartnersHeader />
      <PartnersCategoryOffersSection
        title="Descubra roteiros cuidadosamente desenhados para quem valoriza experiências únicas, conforto absoluto e viagens feitas sob medida."
        description="Roteiros"
        ofertas={ofertas}
      />
      <PartnersClosingCta />
      <PartnersFooter />
    </>
  );
}
