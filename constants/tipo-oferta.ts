/**
 * Valores do ACF `tipo_oferta` — alinhado ao select em `app/dashboard/nova-oferta/page.tsx`.
 */
export const TIPO_OFERTA = {
  FERIADO: "Feriado",
  ROTEIRO: "Roteiro",
  CRUZEIRO: "Cruzeiro",
} as const;

export type TipoOferta = (typeof TIPO_OFERTA)[keyof typeof TIPO_OFERTA];

export function tipoOfertaIgual(
  armazenado: string | undefined,
  esperado: TipoOferta,
): boolean {
  if (!armazenado) return false;
  return armazenado.trim().toLowerCase() === esperado.toLowerCase();
}
