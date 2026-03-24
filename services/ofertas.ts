import { TIPO_CARTAO, tipoCartaoIgual, type TipoCartao } from "@/constants/cartoes";
import {
  tipoOfertaIgual,
  type TipoOferta,
} from "@/constants/tipo-oferta";
import type { Oferta } from "@/types/oferta";

const OFERTAS_FIELDS = "id,title,slug,acf";
const OFERTAS_QUERY = `_fields=${OFERTAS_FIELDS}&per_page=100`;

async function fetchOfertasJson(): Promise<unknown> {
  const base = process.env.NEXT_PUBLIC_WP_URL?.replace(/\/$/, "");
  if (!base) {
    throw new Error("NEXT_PUBLIC_WP_URL nao configurada.");
  }

  const res = await fetch(
    `${base}/wp-json/wp/v2/btg_pactual?${OFERTAS_QUERY}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(`Falha ao buscar ofertas (${res.status}).`);
  }

  return res.json();
}

/** Uma oferta por slug (publicado no CPT `btg_pactual`). */
export async function getOfertaBySlug(slug: string): Promise<Oferta | null> {
  const s = slug.trim();
  if (!s) return null;

  const base = process.env.NEXT_PUBLIC_WP_URL?.replace(/\/$/, "");
  if (!base) {
    throw new Error("NEXT_PUBLIC_WP_URL nao configurada.");
  }

  const res = await fetch(
    `${base}/wp-json/wp/v2/btg_pactual?slug=${encodeURIComponent(s)}&${OFERTAS_QUERY}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as unknown;
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return data[0] as Oferta;
}

/** Todas as ofertas publicadas no CPT `btg_pactual`. */
export async function getOfertas(): Promise<Oferta[]> {
  const data = await fetchOfertasJson();
  return Array.isArray(data) ? (data as Oferta[]) : [];
}

/** Ofertas cujo ACF `tipo_cartao` corresponde ao cartão (Partners ou Ultrablue). */
export async function getOfertasPorTipoCartao(
  tipo: TipoCartao,
): Promise<Oferta[]> {
  const todas = await getOfertas();
  return todas.filter((o) => tipoCartaoIgual(o.acf?.tipo_cartao, tipo));
}

/** Ofertas Partners filtradas por `tipo_oferta` (Feriado, Roteiro, Cruzeiro). */
export async function getOfertasPartnersPorTipoOferta(
  tipo: TipoOferta,
): Promise<Oferta[]> {
  const partners = await getOfertasPorTipoCartao(TIPO_CARTAO.PARTNERS);
  return partners.filter((o) => tipoOfertaIgual(o.acf?.tipo_oferta, tipo));
}
