/**
 * Formata o valor numérico exibido (string vinda do CMS) para manter centavos
 * visíveis: padrão BR com vírgula (7.529,00) ou US$ com ponto decimal.
 */
function isMoedaUsd(moedaRaw?: string): boolean {
  const moeda = String(moedaRaw || "")
    .trim()
    .toLowerCase();
  return (
    moeda === "$" ||
    moeda === "us$" ||
    moeda === "us" ||
    moeda.includes("usd") ||
    moeda.includes("dolar") ||
    moeda.includes("dólar")
  );
}

function padDecimalComma(intPart: string, decPart: string): string {
  if (decPart.length === 0) return `${intPart},00`;
  if (decPart.length === 1) return `${intPart},${decPart}0`;
  if (decPart.length === 2) return `${intPart},${decPart}`;
  return `${intPart},${decPart.slice(0, 2)}`;
}

/** Valores em R$, EUR etc.: milhar com ponto, decimais com vírgula. */
function formatValorVirgulaDecimal(valor: string): string {
  const s = valor.trim();
  if (!s) return s;
  if (!s.includes(",")) {
    return `${s},00`;
  }
  const i = s.lastIndexOf(",");
  return padDecimalComma(s.slice(0, i), s.slice(i + 1));
}

/** Valores em US$: ponto como separador decimal. */
function formatValorPontoDecimalUsd(valor: string): string {
  const s = valor.trim();
  if (!s) return s;
  if (s.includes(",")) {
    return s;
  }
  const dot = s.lastIndexOf(".");
  if (dot === -1) {
    return `${s}.00`;
  }
  const intPart = s.slice(0, dot);
  const decPart = s.slice(dot + 1);
  if (decPart.length === 0) return `${intPart}.00`;
  if (decPart.length === 1) return `${s}0`;
  if (decPart.length === 2) return s;
  return `${intPart}.${decPart.slice(0, 2)}`;
}

/**
 * Garante duas casas após o separador decimal (`,00` em padrão BR ou `.00` em US$).
 */
export function formatPrecoExibicao(
  valor: string | undefined,
  moedaRaw?: string,
): string {
  const s = String(valor ?? "").trim();
  if (!s) return s;
  if (isMoedaUsd(moedaRaw)) {
    return formatValorPontoDecimalUsd(s);
  }
  return formatValorVirgulaDecimal(s);
}
