import { UltrablueFeriadosSection } from "@/components/ultrablue/UltrablueFeriadosSection";
import { UltrablueClosingCta } from "@/components/ultrablue/UltrablueClosingCta";
import { UltrablueFooter } from "@/components/ultrablue/UltrablueFooter";
import { UltrablueHeader } from "@/components/ultrablue/UltrablueHeader";
import { TIPO_OFERTA } from "@/constants/tipo-oferta";
import { getOfertasUltrabluePorTipoOferta } from "@/services/ofertas";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feriados — Cartão Ultrablue BTG Pactual",
  description:
    "Ofertas exclusivas de feriado para clientes Cartão Ultrablue BTG Pactual.",
};

export default async function UltrablueFeriadosPage() {
  const ofertas = await getOfertasUltrabluePorTipoOferta(TIPO_OFERTA.FERIADO);

  return (
    <>
      <UltrablueHeader />
      <UltrablueFeriadosSection
        title="Confira destinos selecionados para viajar com exclusividade durante os feriados de 2026"
        ofertas={ofertas}
        holidayFallbackLabel="Páscoa"
      />
      <UltrablueClosingCta />
      <UltrablueFooter />
    </>
  );
}
