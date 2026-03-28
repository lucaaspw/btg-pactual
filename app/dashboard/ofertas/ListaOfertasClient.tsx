"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  listaOfertasSearchSchema,
  type ListaOfertasSearchValues,
} from "./listaOfertasSearchSchema";

type OfertaListaItem = {
  id: number;
  title: { rendered: string };
  slug: string;
  date: string;
  acf?: {
    nome_da_oferta?: string;
    destino_rota?: string;
    tipo_cartao?: string;
    tipo_oferta?: string;
  };
};

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

function formatDataPt(iso: string | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function ListaOfertasClient() {
  const [ofertas, setOfertas] = useState<OfertaListaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [pendingDelete, setPendingDelete] = useState<{
    id: number;
    label: string;
  } | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const cancelDeleteRef = useRef<HTMLButtonElement>(null);

  const { register, watch } = useForm<ListaOfertasSearchValues>({
    resolver: zodResolver(listaOfertasSearchSchema),
    defaultValues: { busca: "" },
  });

  const busca = watch("busca").trim().toLowerCase();

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const res = await fetch("/api/ofertas", { cache: "no-store" });
      const data = (await res.json()) as { ofertas?: OfertaListaItem[]; error?: string };
      if (!res.ok) {
        setLoadError(data?.error || "Não foi possível carregar as ofertas.");
        setOfertas([]);
        return;
      }
      setOfertas(Array.isArray(data.ofertas) ? data.ofertas : []);
    } catch {
      setLoadError("Erro de conexão ao carregar ofertas.");
      setOfertas([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtradas = useMemo(() => {
    if (!busca) return ofertas;
    return ofertas.filter((o) => {
      const title = stripTags(o.title?.rendered ?? "").toLowerCase();
      const nome = String(o.acf?.nome_da_oferta ?? "").toLowerCase();
      const dest = String(o.acf?.destino_rota ?? "").toLowerCase();
      const slug = String(o.slug ?? "").toLowerCase();
      const cartao = String(o.acf?.tipo_cartao ?? "").toLowerCase();
      const tipo = String(o.acf?.tipo_oferta ?? "").toLowerCase();
      const idStr = String(o.id);
      return (
        title.includes(busca) ||
        nome.includes(busca) ||
        dest.includes(busca) ||
        slug.includes(busca) ||
        cartao.includes(busca) ||
        tipo.includes(busca) ||
        idStr === busca
      );
    });
  }, [ofertas, busca]);

  useEffect(() => {
    if (!pendingDelete) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && deletingId === null) {
        setPendingDelete(null);
        setDeleteError("");
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const t = window.setTimeout(() => cancelDeleteRef.current?.focus(), 0);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(t);
    };
  }, [pendingDelete, deletingId]);

  function openDeleteModal(id: number, label: string) {
    setDeleteError("");
    setPendingDelete({ id, label });
  }

  function closeDeleteModal() {
    if (deletingId !== null) return;
    setPendingDelete(null);
    setDeleteError("");
  }

  async function confirmDelete() {
    if (!pendingDelete) return;

    const { id } = pendingDelete;
    setDeletingId(id);
    setDeleteError("");

    try {
      const res = await fetch(`/api/ofertas/${id}`, { method: "DELETE" });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setDeleteError(data?.error || "Não foi possível excluir.");
        return;
      }
      setOfertas((prev) => prev.filter((o) => o.id !== id));
      setPendingDelete(null);
    } catch {
      setDeleteError("Erro de conexão ao excluir.");
    } finally {
      setDeletingId(null);
    }
  }

  const labelClass =
    "mb-2 block text-xs font-semibold tracking-[0.06em] text-gray-700";
  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-[#f8fafc] px-3 py-2.5 pl-10 text-sm text-gray-900 outline-none transition focus:border-[#2E73D4] focus:ring-2 focus:ring-[#2E73D4]/20";

  return (
    <main className="min-h-screen bg-[#edf1f6] px-4 py-6 md:px-6">
      <div className="mx-auto max-w-[1140px]">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <header className="border-b-2 border-[#f2b541] bg-btg-navy px-5 py-4 text-white">
            <h1 className="text-2xl font-bold">Ofertas cadastradas</h1>
            <p className="mt-1 text-xs text-blue-100">
              Lista ordenada da mais recente para a mais antiga. Use a busca para
              filtrar por nome, destino, tipo ou ID.
            </p>
          </header>

          <div className="space-y-6 p-6 sm:p-8">
            <div>
              <label className={labelClass} htmlFor="busca-ofertas">
                Buscar
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                  aria-hidden
                />
                <input
                  id="busca-ofertas"
                  type="search"
                  autoComplete="off"
                  placeholder="Nome, destino, slug, cartão, tipo ou ID…"
                  className={inputClass}
                  {...register("busca")}
                />
              </div>
            </div>

            {loadError ? (
              <p className="text-sm font-medium text-red-700" role="alert">
                {loadError}
              </p>
            ) : null}

            {loading ? (
              <p className="text-sm text-gray-500">Carregando ofertas…</p>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-[#f4f7fb] text-xs font-semibold uppercase tracking-wide text-[#20334f]">
                    <tr>
                      <th className="px-4 py-3">Data</th>
                      <th className="px-4 py-3">Oferta</th>
                      <th className="px-4 py-3">Destino</th>
                      <th className="px-4 py-3">Cartão / tipo</th>
                      <th className="px-4 py-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtradas.length === 0 ? (
                      <tr>
                        <td
                          className="px-4 py-8 text-center text-gray-500"
                          colSpan={5}
                        >
                          {ofertas.length === 0
                            ? "Nenhuma oferta encontrada."
                            : "Nenhum resultado para esta busca."}
                        </td>
                      </tr>
                    ) : (
                      filtradas.map((o) => {
                        const nome =
                          o.acf?.nome_da_oferta?.trim() ||
                          stripTags(o.title?.rendered ?? "") ||
                          `Oferta #${o.id}`;
                        const destino = o.acf?.destino_rota?.trim() || "—";
                        const cartaoTipo = [o.acf?.tipo_cartao, o.acf?.tipo_oferta]
                          .filter(Boolean)
                          .join(" · ");
                        return (
                          <tr key={o.id} className="bg-white hover:bg-[#fafbfd]">
                            <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                              {formatDataPt(o.date)}
                            </td>
                            <td className="max-w-[220px] px-4 py-3 font-medium text-gray-900">
                              <span className="line-clamp-2" title={nome}>
                                {nome}
                              </span>
                              <span className="mt-0.5 block text-xs font-normal text-gray-400">
                                ID {o.id}
                              </span>
                            </td>
                            <td className="max-w-[180px] px-4 py-3 text-gray-700">
                              <span className="line-clamp-2" title={destino}>
                                {destino}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-600">
                              {cartaoTipo || "—"}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 text-right">
                              <div className="flex flex-wrap items-center justify-end gap-2">
                                <Link
                                  href={`/dashboard/ofertas/${o.id}/editar`}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-btg-navy shadow-sm transition hover:bg-[#f4f7fb]"
                                >
                                  <Pencil className="h-3.5 w-3.5" aria-hidden />
                                  Editar
                                </Link>
                                <button
                                  type="button"
                                  disabled={deletingId === o.id}
                                  onClick={() => openDeleteModal(o.id, nome)}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-50"
                                >
                                  <Trash2 className="h-3.5 w-3.5" aria-hidden />
                                  {deletingId === o.id ? "…" : "Excluir"}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {pendingDelete ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="presentation"
        >
          <button
            type="button"
            aria-label="Fechar"
            className="absolute inset-0 bg-black/45 backdrop-blur-[1px]"
            disabled={deletingId !== null}
            onClick={() => closeDeleteModal()}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="excluir-oferta-titulo"
            aria-describedby="excluir-oferta-desc"
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl"
          >
            <div className="border-b border-gray-100 bg-[#f8fafc] px-5 py-4">
              <h2
                id="excluir-oferta-titulo"
                className="text-lg font-bold text-[#20334f]"
              >
                Excluir oferta?
              </h2>
            </div>
            <div className="space-y-3 px-5 py-4">
              <p id="excluir-oferta-desc" className="text-sm leading-relaxed text-gray-700">
                Tem certeza de que deseja excluir{" "}
                <span className="font-semibold text-gray-900">
                  &quot;{pendingDelete.label}&quot;
                </span>
                ? Esta ação não pode ser desfeita.
              </p>
              {deleteError ? (
                <p className="text-sm font-medium text-red-700" role="alert">
                  {deleteError}
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-gray-100 bg-[#fafbfd] px-5 py-4">
              <button
                ref={cancelDeleteRef}
                type="button"
                disabled={deletingId !== null}
                onClick={() => closeDeleteModal()}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={deletingId !== null}
                onClick={() => void confirmDelete()}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:opacity-60"
              >
                {deletingId !== null ? "Excluindo…" : "Excluir"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
