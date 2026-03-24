import Link from "next/link";

export default function DashboardPublicadasPage() {
  return (
    <main className="min-h-[40vh] bg-[#edf1f6] px-4 py-10 md:px-6">
      <div className="mx-auto max-w-[1140px] border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold text-btg-navy">Publicadas</h1>
        <p className="mt-2 text-sm text-gray-600">
          Em breve você poderá listar e editar ofertas publicadas aqui.
        </p>
        <p className="mt-4 text-sm text-gray-600">
          Para ver no site:{" "}
          <Link href="/partners" className="font-semibold text-[#2E73D4] hover:underline">
            Partners
          </Link>{" "}
          ou{" "}
          <Link href="/ultrablue" className="font-semibold text-[#2E73D4] hover:underline">
            Ultrablue
          </Link>
          .
        </p>
        <Link
          href="/dashboard/nova-oferta"
          className="mt-6 inline-block text-sm font-semibold text-[#2E73D4] hover:underline"
        >
          Nova oferta
        </Link>
      </div>
    </main>
  );
}
