import { TIPO_CARTAO, type TipoCartao } from "@/constants/cartoes";

export type Landing = "partners" | "ultrablue";

function firstHostLabel(hostname: string): string {
  return hostname.split(":")[0]?.split(".")[0]?.toLowerCase() ?? "";
}

export function landingFromHostname(hostname: string): Landing | null {
  const label = firstHostLabel(hostname);
  if (label === "partners") return "partners";
  if (label === "ultrablue") return "ultrablue";
  return null;
}

export function landingFromHostHeader(host: string | null): Landing | null {
  return landingFromHostname(host ?? "");
}

export function tipoCartaoFromLanding(landing: Landing | null): TipoCartao | null {
  if (landing === "partners") return TIPO_CARTAO.PARTNERS;
  if (landing === "ultrablue") return TIPO_CARTAO.ULTRABLUE;
  return null;
}
