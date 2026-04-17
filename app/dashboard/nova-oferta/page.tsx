import { NovaOfertaForm } from "./NovaOfertaForm";
import { Suspense } from "react";
import { headers } from "next/headers";
import { landingFromHostHeader, tipoCartaoFromLanding } from "@/lib/landing";

export default async function NovaOfertaPage() {
  const host = (await headers()).get("host");
  const lockedTipoCartao = tipoCartaoFromLanding(landingFromHostHeader(host));

  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#edf1f6] px-4 py-12 md:px-6">
          <p className="mx-auto max-w-[1140px] text-sm text-gray-500">
            Carregando formulário…
          </p>
        </main>
      }
    >
      <NovaOfertaForm lockedTipoCartao={lockedTipoCartao} />
    </Suspense>
  );
}
