/**
 * Segredo para assinar o cookie de sessão do painel.
 * Em produção, prefira BTG_AUTH_SECRET (valor aleatório longo) em vez de derivar de usuário/senha.
 */
export function getDashboardSessionSecret(): string {
  const override = process.env.BTG_AUTH_SECRET?.trim();
  if (override) return override;
  const u = process.env.BTG_USERNAME ?? "";
  const p = process.env.BTG_PASSWORD ?? "";
  if (!u || !p) return "";
  return `btg-dashboard-session-v1|${u}|${p}`;
}

export function isDashboardAuthConfigured(): boolean {
  return getDashboardSessionSecret().length > 0;
}
