import {
  DASHBOARD_SESSION_COOKIE,
  dashboardSessionCookieOptions,
  signDashboardSessionToken,
  verifyDashboardCredentials,
} from "@/lib/dashboard-session";
import { isDashboardAuthConfigured } from "@/lib/dashboard-auth-secret";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isDashboardAuthConfigured()) {
    return NextResponse.json(
      {
        error:
          "Autenticação do painel não configurada. Defina BTG_USERNAME e BTG_PASSWORD (ou BTG_AUTH_SECRET) no servidor.",
      },
      { status: 503 },
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = (await request.json()) as { username?: string; password?: string };
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const username = String(body.username ?? "").trim();
  const password = String(body.password ?? "");

  if (!verifyDashboardCredentials(username, password)) {
    return NextResponse.json(
      { error: "Usuário ou senha inválidos." },
      { status: 401 },
    );
  }

  let token: string;
  try {
    token = signDashboardSessionToken();
  } catch {
    return NextResponse.json(
      { error: "Falha ao criar sessão." },
      { status: 500 },
    );
  }

  const res = NextResponse.json({ ok: true });
  const opts = dashboardSessionCookieOptions();
  res.cookies.set(DASHBOARD_SESSION_COOKIE, token, opts);
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(DASHBOARD_SESSION_COOKIE, "", {
    ...dashboardSessionCookieOptions(),
    maxAge: 0,
  });
  return res;
}
