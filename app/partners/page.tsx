import { PartnersCategoryBanners } from "@/components/partners/PartnersCategoryBanners";
import { PartnersClosingCta } from "@/components/partners/PartnersClosingCta";
import { PartnersCuratedOffers } from "@/components/partners/PartnersCuratedOffers";
import { PartnersFooter } from "@/components/partners/PartnersFooter";
import { PartnersHeader } from "@/components/partners/PartnersHeader";
import { PartnersHero } from "@/components/partners/PartnersHero";
import { PartnersIntro } from "@/components/partners/PartnersIntro";
import { PartnersWhy } from "@/components/partners/PartnersWhy";
import { TIPO_CARTAO } from "@/constants/cartoes";
import { getOfertasPorTipoCartao } from "@/services/ofertas";

export default async function PartnersPage() {
  const ofertas = await getOfertasPorTipoCartao(TIPO_CARTAO.PARTNERS);

  return (
    <>
      <PartnersHeader />
      <PartnersHero />
      <PartnersIntro />
      <PartnersCuratedOffers ofertas={ofertas} />
      <PartnersCategoryBanners />
      <PartnersWhy />
      <PartnersClosingCta />
      <PartnersFooter />
    </>
  );
}
