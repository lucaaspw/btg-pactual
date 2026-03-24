import { OfertaDetalhe } from "@/components/ofertas/OfertaDetalhe";
import { PartnersClosingCta } from "@/components/partners/PartnersClosingCta";
import { PartnersFooter } from "@/components/partners/PartnersFooter";
import { PartnersHeader } from "@/components/partners/PartnersHeader";
import { TIPO_CARTAO, tipoCartaoIgual } from "@/constants/cartoes";
import { getOfertaBySlug } from "@/services/ofertas";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const oferta = await getOfertaBySlug(slug);
  if (
    !oferta ||
    !tipoCartaoIgual(oferta.acf?.tipo_cartao, TIPO_CARTAO.PARTNERS)
  ) {
    return { title: "Oferta" };
  }
  const nome =
    (oferta.acf?.nome_da_oferta || "").trim() ||
    stripTags(oferta.title?.rendered || "");
  return {
    title: nome ? `${nome} · Partners BTG Pactual` : "Oferta · Partners",
    description: (oferta.acf?.descricao || "").trim() || undefined,
  };
}

export default async function PartnersOfertaPage({ params }: PageProps) {
  const { slug } = await params;
  const oferta = await getOfertaBySlug(slug);

  if (
    !oferta ||
    !tipoCartaoIgual(oferta.acf?.tipo_cartao, TIPO_CARTAO.PARTNERS)
  ) {
    notFound();
  }

  return (
    <>
      <PartnersHeader />
      <OfertaDetalhe oferta={oferta} backHref="/partners" />
      <PartnersClosingCta />
      <PartnersFooter />
    </>
  );
}
