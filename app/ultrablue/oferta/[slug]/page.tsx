import { OfertaDetalhe } from "@/components/ofertas/OfertaDetalhe";
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
    !tipoCartaoIgual(oferta.acf?.tipo_cartao, TIPO_CARTAO.ULTRABLUE)
  ) {
    return { title: "Oferta" };
  }
  const nome =
    (oferta.acf?.nome_da_oferta || "").trim() ||
    stripTags(oferta.title?.rendered || "");
  return {
    title: nome ? `${nome} · Ultrablue` : "Oferta · Ultrablue",
    description: (oferta.acf?.descricao || "").trim() || undefined,
  };
}

export default async function UltrablueOfertaPage({ params }: PageProps) {
  const { slug } = await params;
  const oferta = await getOfertaBySlug(slug);

  if (
    !oferta ||
    !tipoCartaoIgual(oferta.acf?.tipo_cartao, TIPO_CARTAO.ULTRABLUE)
  ) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-btg-navy">
      <OfertaDetalhe
        oferta={oferta}
        backHref="/ultrablue"
        offsetForFixedHeader={false}
      />
    </main>
  );
}
