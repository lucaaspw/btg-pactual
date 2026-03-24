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

        <nav className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
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
            href="/dashboard/nova-oferta"
            className="bg-[#f2b541] px-6 py-3 font-semibold text-btg-navy transition hover:bg-[#ffc85c]"
          >
            Nova oferta (operador)
          </Link>
        </nav>
      </div>
    </main>
  );
}
