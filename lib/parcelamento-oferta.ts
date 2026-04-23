/** Valor persistido no ACF / formulário: "1" … "10". */
export type ParcelamentoValor = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";

const PARCELAS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export const OPCOES_PARCELAMENTO_FORM = PARCELAS.map((n) => ({
  value: String(n) as ParcelamentoValor,
  label: n === 1 ? "1x (à vista)" : `${n}x`,
}));

/** Normaliza valor vindo do CMS ou do formulário para string "1"–"10". */
export function normalizeParcelamento(raw: string | undefined): ParcelamentoValor {
  const n = Number.parseInt(String(raw ?? "").trim(), 10);
  if (!Number.isFinite(n) || n < 1) return "1";
  if (n > 10) return "10";
  return String(n) as ParcelamentoValor;
}

/** Só considera “informado” se o CMS enviou algum valor (string/número não vazio). */
function parcelamentoInformadoNoCms(raw: unknown): boolean {
  if (raw === null || raw === undefined) return false;
  const s = String(raw).trim();
  return s.length > 0;
}

/**
 * Texto antes do preço nos cards/detalhe (ex.: "6x de ").
 * Só exibe quando existe `parcelamento` no ACF e o valor é ≥ 2x.
 */
export function prefixoParcelamentoPreco(raw: unknown): string {
  if (!parcelamentoInformadoNoCms(raw)) return "";
  const n = Number.parseInt(String(raw).trim(), 10);
  if (!Number.isFinite(n) || n < 2) return "";
  const capped = Math.min(10, n);
  return `${capped}x de `;
}
