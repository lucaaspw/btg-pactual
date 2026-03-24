import Link from "next/link";

export default function DashboardRascunhosPage() {
  return (
    <main className="min-h-[40vh] bg-[#edf1f6] px-4 py-10 md:px-6">
      <div className="mx-auto max-w-[1140px] border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold text-btg-navy">Rascunhos</h1>
        <p className="mt-2 text-sm text-gray-600">
          Em breve você poderá gerenciar ofertas em rascunho aqui.
        </p>
        <Link
          href="/dashboard/nova-oferta"
          className="mt-6 inline-block text-sm font-semibold text-[#2E73D4] hover:underline"
        >
          Voltar para Nova oferta
        </Link>
      </div>
    </main>
  );
}
