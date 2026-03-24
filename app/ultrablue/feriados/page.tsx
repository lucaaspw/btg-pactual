import { UltrablueCategoryOffersSection } from "@/components/ultrablue/UltrablueCategoryOffersSection";
import { UltrablueClosingCta } from "@/components/ultrablue/UltrablueClosingCta";
import { UltrablueFooter } from "@/components/ultrablue/UltrablueFooter";
import { UltrablueHeader } from "@/components/ultrablue/UltrablueHeader";
import { TIPO_CARTAO } from "@/constants/cartoes";
import { TIPO_OFERTA, tipoOfertaIgual } from "@/constants/tipo-oferta";
import { getOfertasPorTipoCartao } from "@/services/ofertas";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feriados — Cartão Ultrablue BTG Pactual",
  description:
    "Ofertas exclusivas de feriado para clientes Cartão Ultrablue BTG Pactual.",
};

export default async function UltrablueFeriadosPage() {
  const ofertasUltrablue = await getOfertasPorTipoCartao(TIPO_CARTAO.ULTRABLUE);
  const ofertas = ofertasUltrablue.filter((o) =>
    tipoOfertaIgual(o.acf?.tipo_oferta, TIPO_OFERTA.FERIADO),
  );

  return (
    <>
      <UltrablueHeader />
      <UltrablueCategoryOffersSection
        title="Confira destinos selecionados para viajar com exclusividade durante os feriados."
        description="Feriados"
        ofertas={ofertas}
      />
      <UltrablueClosingCta />
      <UltrablueFooter />
    </>
  );
}
