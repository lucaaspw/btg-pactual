"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextRaw = searchParams.get("next");
  const nextPath =
    nextRaw && nextRaw.startsWith("/") && !nextRaw.startsWith("//")
      ? nextRaw
      : "/dashboard";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(
          typeof data.error === "string"
            ? data.error
            : "Não foi possível entrar. Tente novamente.",
        );
        setLoading(false);
        return;
      }
      router.replace(nextPath);
      router.refresh();
    } catch {
      setError("Erro de rede. Verifique a conexão.");
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto"
      style={{
        background:
          "linear-gradient(165deg, #f7f9fc 0%, #eef3f9 45%, #e4ecf6 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(46, 115, 212, 0.18), transparent), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(5, 19, 42, 0.06), transparent)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-full flex-col items-center justify-center px-4 py-12 sm:px-6">
        <div
          className="w-full max-w-[420px] rounded-2xl border border-slate-200/90 bg-white/95 p-8 shadow-[0_24px_48px_-12px_rgba(5,19,42,0.12)] backdrop-blur-sm sm:p-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dashboard-login-title"
        >
          <div className="mb-8 text-center">
            <div className="mb-5 inline-flex items-baseline gap-0.5 text-2xl font-semibold tracking-tight">
              <span className="text-[#05132A]">btg</span>
              <span className="text-[#f2b541]">pactual</span>
            </div>
            <div
              className="mx-auto mb-4 h-0.5 w-12 rounded-full bg-[#f2b541]"
              aria-hidden
            />
            <h1
              id="dashboard-login-title"
              className="text-lg font-semibold leading-snug text-[#05132A] sm:text-xl"
            >
              Painel de ofertas
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Acesso restrito. Use o usuário e a senha definidos no servidor.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="btg-user"
                className="block text-sm font-medium text-[#05132A]"
              >
                Usuário
              </label>
              <input
                id="btg-user"
                name="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-[#05132A] shadow-inner shadow-slate-200/50 outline-none transition placeholder:text-slate-400 focus:border-[#2E73D4] focus:bg-white focus:ring-2 focus:ring-[#2E73D4]/25"
                placeholder="Digite seu usuário"
                required
              />
            </div>
            <div>
              <label
                htmlFor="btg-pass"
                className="block text-sm font-medium text-[#05132A]"
              >
                Senha
              </label>
              <input
                id="btg-pass"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-[#05132A] shadow-inner shadow-slate-200/50 outline-none transition placeholder:text-slate-400 focus:border-[#2E73D4] focus:bg-white focus:ring-2 focus:ring-[#2E73D4]/25"
                placeholder="Digite sua senha"
                required
              />
            </div>

            {error ? (
              <p
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#2E73D4] py-3 text-sm font-semibold text-white shadow-md shadow-[#2E73D4]/25 transition hover:bg-[#2563c4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E73D4] disabled:opacity-60"
            >
              {loading ? "Entrando…" : "Entrar"}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-slate-500">
            BTG Pactual — cadastro de ofertas no WordPress
          </p>
        </div>
      </div>
    </div>
  );
}
