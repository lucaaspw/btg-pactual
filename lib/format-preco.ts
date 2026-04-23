const numeroPtBr = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Interpreta string numérica vinda do CMS (BR, US ou só dígitos) e devolve o valor em unidade monetária.
 * - `1.234,56` → 1234.56
 * - `1,234.56` → 1234.56
 * - `1234,5` / `1234.50` → decimais
 * - `1.234` (só pontos, 3 dígitos após o último) → milhar BR → 1234
 */
function parsePrecoParaNumero(valor: string): number | null {
  const s = String(valor ?? "")
    .trim()
    .replace(/\s/g, "");
  if (!s) return null;

  let work = s.replace(/[^\d.,\-+]/g, "");
  let sign = 1;
  if (work.startsWith("-")) {
    sign = -1;
    work = work.slice(1);
  } else if (work.startsWith("+")) {
    work = work.slice(1);
  }
  work = work.replace(/[^\d.,]/g, "");
  if (!/^\d/.test(work)) return null;

  const lastComma = work.lastIndexOf(",");
  const lastDot = work.lastIndexOf(".");

  let integral = "";
  let fractional = "00";

  if (lastComma !== -1 && lastDot !== -1) {
    if (lastComma > lastDot) {
      integral = work.slice(0, lastComma).replace(/\./g, "");
      fractional = work.slice(lastComma + 1).replace(/\D/g, "");
    } else {
      integral = work.slice(0, lastDot).replace(/,/g, "");
      fractional = work.slice(lastDot + 1).replace(/\D/g, "");
    }
  } else if (lastComma !== -1) {
    const after = work.slice(lastComma + 1);
    if (/^\d{1,2}$/.test(after)) {
      integral = work.slice(0, lastComma).replace(/\./g, "");
      fractional = after;
    } else {
      integral = work.replace(/,/g, "");
    }
  } else if (lastDot !== -1) {
    const parts = work.split(".");
    const last = parts[parts.length - 1] ?? "";
    if (last.length <= 2 && parts.length >= 2) {
      integral = parts.slice(0, -1).join("") || "0";
      fractional = last;
    } else {
      integral = parts.join("");
    }
  } else {
    integral = work;
  }

  const frac2 = (fractional.replace(/\D/g, "") + "00").slice(0, 2);
  const n = Number.parseFloat(`${integral || "0"}.${frac2}`);
  if (!Number.isFinite(n)) return null;
  return sign * n;
}

/**
 * Formata o valor para exibição: sempre padrão numérico brasileiro (`00.000,00`),
 * independentemente de a moeda ser R$ ou US$ (prefixo fica no componente).
 */
export function formatPrecoExibicao(
  valor: string | undefined,
  _moedaRaw?: string,
): string {
  const s = String(valor ?? "").trim();
  if (!s) return s;
  const n = parsePrecoParaNumero(s);
  if (n === null) return s;
  return numeroPtBr.format(n);
}
