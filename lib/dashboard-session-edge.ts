import { getDashboardSessionSecret } from "@/lib/dashboard-auth-secret";

function base64UrlToBytes(s: string): Uint8Array | null {
  try {
    const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
    const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
    const raw = atob(b64);
    const out = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) {
      out[i] = raw.charCodeAt(i);
    }
    return out;
  } catch {
    return null;
  }
}

function timingSafeEqualBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let x = 0;
  for (let i = 0; i < a.length; i++) {
    x |= a[i]! ^ b[i]!;
  }
  return x === 0;
}

/** Valida token no Edge (middleware) — mesmo algoritmo que `lib/dashboard-session.ts`. */
export async function verifyDashboardSessionTokenEdge(
  token: string | undefined,
): Promise<boolean> {
  if (!token) return false;
  const secret = getDashboardSessionSecret();
  if (!secret) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadB64, sigB64] = parts;
  if (!payloadB64 || !sigB64) return false;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sigBuf = await crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode(payloadB64),
  );
  const expected = new Uint8Array(sigBuf);
  const decoded = base64UrlToBytes(sigB64);
  if (!decoded) return false;
  if (expected.length !== decoded.length) return false;
  if (!timingSafeEqualBytes(expected, decoded)) return false;

  try {
    const payloadBytes = base64UrlToBytes(payloadB64);
    if (!payloadBytes) return false;
    const json = new TextDecoder().decode(payloadBytes);
    const payload = JSON.parse(json) as { exp?: number };
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
