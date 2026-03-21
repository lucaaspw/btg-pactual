/**
 * Valores enviados ao WordPress (ACF `tipo_cartao`) e usados nas rotas públicas.
 * Manter alinhado ao select em `app/dashboard/nova-oferta/page.tsx`.
 */
export const TIPO_CARTAO = {
  PARTNERS: "Partners",
  ULTRABLUE: "Ultrablue",
} as const;

export type TipoCartao = (typeof TIPO_CARTAO)[keyof typeof TIPO_CARTAO];

export function isTipoCartao(valor: string): valor is TipoCartao {
  return (
    valor === TIPO_CARTAO.PARTNERS || valor === TIPO_CARTAO.ULTRABLUE
  );
}

/** Compara o valor gravado no CMS (pode variar em capitalização) com o tipo esperado. */
export function tipoCartaoIgual(
  armazenado: string | undefined,
  esperado: TipoCartao,
): boolean {
  if (!armazenado) return false;
  return armazenado.trim().toLowerCase() === esperado.toLowerCase();
}
