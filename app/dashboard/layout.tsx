import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-4 py-3 text-sm">
          <Link href="/" className="font-semibold text-btg-navy">
            Início
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/partners" className="text-[#2E73D4] hover:underline">
            Ver Partners
          </Link>
          <Link href="/ultrablue" className="text-[#2E73D4] hover:underline">
            Ver Ultrablue
          </Link>
        </div>
      </div>
      {children}
    </>
  );
}
