import { runDashboardAuthMiddleware } from "@/lib/middleware-dashboard-auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type Landing = "partners" | "ultrablue";

/** Pastas em /public servidas na raiz — não podem ir para /partners/... ou /ultrablue/... */
const PUBLIC_ROOT_PREFIXES = [
  "/partners_image",
  "/ultrablue_image",
  "/concierge_image",
  "/beneficios_image",
] as const;

function firstHostLabel(hostname: string): string {
  return hostname.split(":")[0]?.split(".")[0]?.toLowerCase() ?? "";
}

function landingFromHost(hostname: string): Landing | null {
  const label = firstHostLabel(hostname);
  if (label === "partners") return "partners";
  if (label === "ultrablue") return "ultrablue";
  return null;
}

function shouldPassthrough(pathname: string): boolean {
  if (pathname.startsWith("/api")) return true;
  if (pathname.startsWith("/_next")) return true;
  if (pathname.startsWith("/dashboard")) return true;
  if (
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return true;
  }
  if (pathname.startsWith("/.well-known")) return true;
  for (const prefix of PUBLIC_ROOT_PREFIXES) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) return true;
  }
  return false;
}

/**
 * Remove `/partners` ou `/ultrablue` do path quando o usuário abre link “completo”
 * no subdomínio (ex.: partners.site.com/partners/cruzeiros).
 */
function stripVisibleProductPrefix(pathname: string, landing: Landing): string {
  const prefix = landing === "partners" ? "/partners" : "/ultrablue";
  if (pathname === prefix) return "/";
  if (pathname.startsWith(`${prefix}/`)) {
    const rest = pathname.slice(prefix.length);
    return rest.length > 0 ? rest : "/";
  }
  return pathname;
}

function rewritePath(pathname: string, landing: Landing): string {
  const clean = stripVisibleProductPrefix(pathname, landing);
  const base = landing === "partners" ? "/partners" : "/ultrablue";
  if (clean === "/") return base;
  return `${base}${clean}`;
}

export async function proxy(request: NextRequest) {
  const dashboardResponse = await runDashboardAuthMiddleware(request);
  if (dashboardResponse) {
    return dashboardResponse;
  }

  const host = request.headers.get("host") ?? "";
  const hostname = host.split(":")[0] ?? "";
  const landing = landingFromHost(hostname);

  if (!landing) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (shouldPassthrough(pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = rewritePath(pathname, landing);
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Ignora arquivos estáticos com extensão comum; o resto passa pelo proxy
     * (inclui rotas sem extensão e RSC).
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:ico|png|jpg|jpeg|gif|svg|webp|avif|woff2?|ttf|eot)$).*)",
  ],
};
