import { createHmac, timingSafeEqual } from "node:crypto";
import { getDashboardSessionSecret } from "@/lib/dashboard-auth-secret";
import { DASHBOARD_SESSION_COOKIE } from "@/lib/dashboard-constants";

export { DASHBOARD_SESSION_COOKIE };

const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

function timingSafeStringEq(a: string, b: string): boolean {
  try {
    const ba = Buffer.from(a, "utf8");
    const bb = Buffer.from(b, "utf8");
    if (ba.length !== bb.length) return false;
    return timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}

export function verifyDashboardCredentials(
  username: string,
  password: string,
): boolean {
  const u = process.env.BTG_USERNAME ?? "";
  const p = process.env.BTG_PASSWORD ?? "";
  if (!u || !p) return false;
  return timingSafeStringEq(username, u) && timingSafeStringEq(password, p);
}

/** Assina cookie (somente em runtime Node — API routes). */
export function signDashboardSessionToken(): string {
  const secret = getDashboardSessionSecret();
  if (!secret) throw new Error("Dashboard auth secret not configured.");
  const exp = Date.now() + SESSION_MS;
  const payloadB64 = Buffer.from(JSON.stringify({ exp }), "utf8").toString(
    "base64url",
  );
  const sig = createHmac("sha256", secret)
    .update(payloadB64)
    .digest("base64url");
  return `${payloadB64}.${sig}`;
}

/** Valida token (runtime Node — ex.: POST /api/ofertas). */
export function verifyDashboardSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const secret = getDashboardSessionSecret();
  if (!secret) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadB64, sigB64] = parts;
  if (!payloadB64 || !sigB64) return false;
  const expectedSig = createHmac("sha256", secret)
    .update(payloadB64)
    .digest("base64url");
  if (expectedSig.length !== sigB64.length) return false;
  if (!timingSafeEqual(Buffer.from(expectedSig), Buffer.from(sigB64))) {
    return false;
  }
  try {
    const json = Buffer.from(payloadB64, "base64url").toString("utf8");
    const payload = JSON.parse(json) as { exp?: number };
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function dashboardSessionCookieOptions(): {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax";
  path: string;
  maxAge: number;
} {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(SESSION_MS / 1000),
  };
}
