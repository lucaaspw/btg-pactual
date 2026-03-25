import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-btg-navy px-6 py-16 text-white">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold md:text-4xl">BTG Pactual — Ofertas</h1>
        <p className="mt-4 text-[#E7EEFF]">
          Escolha a vitrine por tipo de cartão ou abra o cadastro para publicar
          novas ofertas no WordPress.
        </p>

        <nav className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
          <Link
            href="/partners"
            className="bg-[#2E73D4] px-6 py-3 font-semibold transition hover:bg-[#3A80E4]"
          >
            Landing Partners
          </Link>
          <Link
            href="/ultrablue"
            className="border border-[#7eb4ff] px-6 py-3 font-semibold text-[#E7EEFF] transition hover:bg-white/10"
          >
            Landing Ultrablue
          </Link>
          <Link
            href="/dashboard/nova-oferta?cartao=partners"
            className="bg-[#f2b541] px-6 py-3 font-semibold text-btg-navy transition hover:bg-[#ffc85c]"
          >
            Nova oferta — Partners
          </Link>
          <Link
            href="/dashboard/nova-oferta?cartao=ultrablue"
            className="border border-[#f2b541] px-6 py-3 font-semibold text-[#f2b541] transition hover:bg-white/10"
          >
            Nova oferta — Ultrablue
          </Link>
        </nav>
        <p className="mx-auto mt-6 max-w-lg text-center text-xs text-[#9ca8c9]">
          O mesmo formulário alimenta as duas vitrines: use o link do cartão
          correto ou escolha manualmente no topo do cadastro. Valores aceitos na
          URL são{" "}
          <code className="rounded bg-white/10 px-1">?cartao=partners</code> ou{" "}
          <code className="rounded bg-white/10 px-1">?cartao=ultrablue</code>.
        </p>
      </div>
    </main>
  );
}
