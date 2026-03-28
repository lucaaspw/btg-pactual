/**
 * Helpers compartilhados entre rotas `/api/ofertas` (criar, listar, editar).
 */

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/jpg", "image/png"]);

export function getWpAuthHeader(): string | null {
  const user = process.env.WP_API_USER;
  const appPassword = process.env.WP_API_APP_PASSWORD;

  if (user && appPassword) {
    const normalizedPassword = appPassword.replace(/\s+/g, "");
    const basic = Buffer.from(`${user}:${normalizedPassword}`).toString("base64");
    return `Basic ${basic}`;
  }

  return null;
}

/**
 * ACF Date Picker (d/m/Y): o REST espera a mesma convenção.
 * Inputs type=date enviam YYYY-MM-DD — convertemos para dd/mm/aaaa.
 */
export function toAcfDate(value: string): string {
  const v = value.trim();
  if (!v) return "";
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  if (iso) {
    const [, y, m, d] = iso;
    return `${d}/${m}/${y}`;
  }
  return v;
}

export function normalizeMoeda(value: string): string {
  const moeda = value.trim().toLowerCase();
  if (!moeda) return "R$";
  if (
    moeda === "$" ||
    moeda === "us$" ||
    moeda === "us" ||
    moeda.includes("usd") ||
    moeda.includes("dolar") ||
    moeda.includes("dólar")
  ) {
    return "US$";
  }
  if (moeda.includes("eur") || moeda.includes("euro")) {
    return "EUR";
  }
  return "R$";
}

/** Converte data ACF (d/m/Y ou ISO) para valor de input type="date". */
export function acfDateToHtmlDate(value: string | undefined): string {
  if (!value || typeof value !== "string") return "";
  const v = value.trim();
  const dmY = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(v);
  if (dmY) {
    const [, d, m, y] = dmY;
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(v);
  if (iso) return v.slice(0, 10);
  return "";
}

/** Extrai ID numérico do campo ACF imagem (objeto REST, ID ou string). */
export function imagemAcfToMediaId(
  imagem: unknown,
): number | null {
  if (typeof imagem === "number" && Number.isFinite(imagem) && imagem > 0) {
    return Math.floor(imagem);
  }
  if (typeof imagem === "string" && /^\d+$/.test(imagem)) {
    return Number(imagem);
  }
  if (imagem && typeof imagem === "object" && "id" in imagem) {
    const id = (imagem as { id?: unknown }).id;
    if (typeof id === "number" && id > 0) return id;
    if (typeof id === "string" && /^\d+$/.test(id)) return Number(id);
  }
  return null;
}
