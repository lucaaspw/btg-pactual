import { UltrablueCategoryOffersSection } from "@/components/ultrablue/UltrablueCategoryOffersSection";
import { UltrablueClosingCta } from "@/components/ultrablue/UltrablueClosingCta";
import { UltrablueFooter } from "@/components/ultrablue/UltrablueFooter";
import { UltrablueHeader } from "@/components/ultrablue/UltrablueHeader";
import { TIPO_CARTAO } from "@/constants/cartoes";
import { TIPO_OFERTA, tipoOfertaIgual } from "@/constants/tipo-oferta";
import { getOfertasPorTipoCartao } from "@/services/ofertas";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cruzeiros — Cartão Ultrablue BTG Pactual",
  description:
    "Ofertas de cruzeiro exclusivas para clientes Cartão Ultrablue BTG Pactual.",
};

export default async function UltrablueCruzeirosPage() {
  const ofertasUltrablue = await getOfertasPorTipoCartao(TIPO_CARTAO.ULTRABLUE);
  const ofertas = ofertasUltrablue.filter((o) =>
    tipoOfertaIgual(o.acf?.tipo_oferta, TIPO_OFERTA.CRUZEIRO),
  );

  return (
    <>
      <UltrablueHeader />
      <UltrablueCategoryOffersSection
        title="Explore o mundo a bordo de cruzeiros selecionados, com serviços impecáveis, destinos extraordinários e experiências inesquecíveis."
        description="Cruzeiros"
        ofertas={ofertas}
      />
      <UltrablueClosingCta />
      <UltrablueFooter />
    </>
  );
}
