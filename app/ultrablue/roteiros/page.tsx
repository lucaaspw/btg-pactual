import { UltrablueCategoryOffersSection } from "@/components/ultrablue/UltrablueCategoryOffersSection";
import { UltrablueClosingCta } from "@/components/ultrablue/UltrablueClosingCta";
import { UltrablueFooter } from "@/components/ultrablue/UltrablueFooter";
import { UltrablueHeader } from "@/components/ultrablue/UltrablueHeader";
import { TIPO_CARTAO } from "@/constants/cartoes";
import { TIPO_OFERTA, tipoOfertaIgual } from "@/constants/tipo-oferta";
import { getOfertasPorTipoCartao } from "@/services/ofertas";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roteiros — Cartão Ultrablue BTG Pactual",
  description: "Roteiros exclusivos para clientes Cartão Ultrablue BTG Pactual.",
};

export default async function UltrablueRoteirosPage() {
  const ofertasUltrablue = await getOfertasPorTipoCartao(TIPO_CARTAO.ULTRABLUE);
  const ofertas = ofertasUltrablue.filter((o) =>
    tipoOfertaIgual(o.acf?.tipo_oferta, TIPO_OFERTA.ROTEIRO),
  );

  return (
    <>
      <UltrablueHeader />
      <UltrablueCategoryOffersSection
        title="Descubra roteiros cuidadosamente desenhados para quem valoriza experiências únicas, conforto absoluto e viagens feitas sob medida."
        description="Roteiros"
        ofertas={ofertas}
      />
      <UltrablueClosingCta />
      <UltrablueFooter />
    </>
  );
}
