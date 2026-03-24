import { UltrablueCategoryBanners } from "@/components/ultrablue/UltrablueCategoryBanners";
import { UltrablueClosingCta } from "@/components/ultrablue/UltrablueClosingCta";
import { UltrablueCuratedOffers } from "@/components/ultrablue/UltrablueCuratedOffers";
import { UltrablueFooter } from "@/components/ultrablue/UltrablueFooter";
import { UltrablueHeader } from "@/components/ultrablue/UltrablueHeader";
import { UltrablueHero } from "@/components/ultrablue/UltrablueHero";
import { UltrablueIntro } from "@/components/ultrablue/UltrablueIntro";
import { UltrablueWhy } from "@/components/ultrablue/UltrablueWhy";
import { TIPO_CARTAO } from "@/constants/cartoes";
import { getOfertasPorTipoCartao } from "@/services/ofertas";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cartão Ultrablue BTG Pactual",
  description:
    "Exclusividade e conveniência para suas viagens com experiências premium.",
};

export default async function UltrabluePage() {
  const ofertas = await getOfertasPorTipoCartao(TIPO_CARTAO.ULTRABLUE);

  return (
    <>
      <UltrablueHeader />
      <UltrablueHero />
      <UltrablueIntro />
      <UltrablueCuratedOffers ofertas={ofertas} />
      <UltrablueCategoryBanners />
      <UltrablueWhy />
      <UltrablueClosingCta />
      <UltrablueFooter />
    </>
  );
}
