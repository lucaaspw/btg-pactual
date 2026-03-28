import { DASHBOARD_SESSION_COOKIE } from "@/lib/dashboard-constants";
import { verifyDashboardSessionTokenEdge } from "@/lib/dashboard-session-edge";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Protege `/dashboard/*` (exceto login) e `POST /api/ofertas`.
 * Deve rodar no Edge — não importar módulos com `node:crypto`.
 */
export async function runDashboardAuthMiddleware(
  request: NextRequest,
): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl;

  if (pathname === "/dashboard/login") {
    const token = request.cookies.get(DASHBOARD_SESSION_COOKIE)?.value;
    const ok = await verifyDashboardSessionTokenEdge(token);
    if (ok) {
      const next = request.nextUrl.searchParams.get("next");
      const dest =
        next && next.startsWith("/") && !next.startsWith("//")
          ? next
          : "/dashboard";
      return NextResponse.redirect(new URL(dest, request.url));
    }
    return null;
  }
  if (pathname.startsWith("/api/auth/dashboard")) {
    return null;
  }

  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get(DASHBOARD_SESSION_COOKIE)?.value;
    const ok = await verifyDashboardSessionTokenEdge(token);
    if (ok) {
      return null;
    }
    const login = new URL("/dashboard/login", request.url);
    login.searchParams.set(
      "next",
      `${pathname}${request.nextUrl.search}`,
    );
    return NextResponse.redirect(login);
  }

  if (pathname.startsWith("/api/ofertas")) {
    if (request.method === "OPTIONS") {
      return null;
    }
    const token = request.cookies.get(DASHBOARD_SESSION_COOKIE)?.value;
    const ok = await verifyDashboardSessionTokenEdge(token);
    if (ok) {
      return null;
    }
    return NextResponse.json(
      { error: "Não autorizado. Faça login no painel." },
      { status: 401 },
    );
  }

  return null;
}
