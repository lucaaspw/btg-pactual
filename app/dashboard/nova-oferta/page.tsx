"use client";

import { useState } from "react";

export default function NovaOferta() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const imagem = formData.get("imagem");
    if (!(imagem instanceof File) || imagem.size === 0) {
      setError("Selecione uma imagem principal (arquivo).");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/ofertas", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        const wpMessage =
          typeof result?.details?.message === "string"
            ? result.details.message
            : "";
        setError(
          wpMessage
            ? `${result?.error || "Nao foi possivel criar a oferta."} (${wpMessage})`
            : result?.error || "Nao foi possivel criar a oferta."
        );
        return;
      }

      setMessage("Oferta criada com sucesso!");
      form.reset();
    } catch {
      setError("Erro de conexao ao criar oferta.");
    } finally {
      setLoading(false);
    }
  }

  const sectionTitleClass =
    "mb-4 flex items-center gap-2 border-b border-gray-300 pb-2 text-sm font-bold tracking-wide uppercase";
  const labelClass = "mb-1 block text-xs font-semibold uppercase text-gray-700";
  const inputClass =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-[#2E73D4] focus:ring-2 focus:ring-[#2E73D4]/20";

  return (
    <main className="min-h-screen bg-[#eef1f5] p-6">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
      >
        <header className="border-b-2 border-[#f2b541] bg-btg-navy px-6 py-5 text-white">
          <h1 className="text-3xl font-bold">Cadastro de Oferta</h1>
          <p className="mt-1 text-sm text-blue-100">
            Preencha os campos abaixo. Itens nao preenchidos nao aparecem na
            publicacao.
          </p>
        </header>

        <div className="space-y-7 p-6">
          <section>
            <h2 className={sectionTitleClass}>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#2E73D4] text-xs text-white">
                1
              </span>
              Identificacao
            </h2>

            <div className="space-y-3">
              <div>
                <label className={labelClass} htmlFor="tipo_cartao">
                  Tipo de cartao *
                </label>
                <select
                  id="tipo_cartao"
                  name="tipo_cartao"
                  defaultValue="Partners"
                  className={inputClass}
                  required
                >
                  <option value="Partners">Partners</option>
                  <option value="Ultrablue">Ultrablue</option>
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="tipo_oferta">
                  Tipo de oferta *
                </label>
                <select
                  id="tipo_oferta"
                  name="tipo_oferta"
                  defaultValue="Feriado"
                  className={inputClass}
                  required
                >
                  <option value="Feriado">Feriado</option>
                  <option value="Roteiro">Roteiro</option>
                  <option value="Cruzeiro">Cruzeiro</option>
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="destino_rota">
                  Destino / Rota *
                </label>
                <input
                  id="destino_rota"
                  name="destino_rota"
                  placeholder="Ex: Patagonia Argentina"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="nome_da_oferta">
                  Nome da oferta *
                </label>
                <input
                  id="nome_da_oferta"
                  name="nome_da_oferta"
                  placeholder="Ex: Pedras do Patacho - Hotel Boutique Experience"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="descricao">
                  Descricao curta *
                </label>
                <textarea
                  id="descricao"
                  name="descricao"
                  rows={3}
                  placeholder="2-3 linhas que aparecem no card da oferta."
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className={sectionTitleClass}>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#2E73D4] text-xs text-white">
                2
              </span>
              Imagem
            </h2>

            <div className="space-y-3">
              <div>
                <label className={labelClass} htmlFor="imagem">
                  Imagem principal *
                </label>
                <input
                  id="imagem"
                  name="imagem"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className={`${inputClass} file:mr-3 file:rounded file:border-0 file:bg-[#eef1f5] file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-btg-navy`}
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  JPG, PNG, WebP ou GIF — ate 5 MB. A imagem e enviada para o
                  WordPress.
                </p>
              </div>
              <div>
                <label className={labelClass} htmlFor="texto_alternativo_alt">
                  Texto alternativo (alt) *
                </label>
                <input
                  id="texto_alternativo_alt"
                  name="texto_alternativo_alt"
                  placeholder="Ex: praia em itacare"
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className={sectionTitleClass}>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#2E73D4] text-xs text-white">
                3
              </span>
              Datas
            </h2>

            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="data_de_inicio">
                  Data de inicio
                </label>
                <input
                  id="data_de_inicio"
                  name="data_de_inicio"
                  type="date"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="data_final">
                  Data de fim
                </label>
                <input
                  id="data_final"
                  name="data_final"
                  type="date"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className={sectionTitleClass}>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#2E73D4] text-xs text-white">
                4
              </span>
              Preco
            </h2>

            <div className="grid gap-3 md:grid-cols-[120px_1fr]">
              <div>
                <label className={labelClass} htmlFor="moeda">
                  Moeda
                </label>
                <select
                  id="moeda"
                  name="moeda"
                  defaultValue="R$"
                  className={inputClass}
                >
                  <option value="R$">R$</option>
                  <option value="US$">US$</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="preco">
                  Preco *
                </label>
                <input
                  id="preco"
                  name="preco"
                  placeholder="7.529"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div className="mt-3">
              <label className={labelClass} htmlFor="contexto_do_preco">
                Contexto do preco
              </label>
              <input
                id="contexto_do_preco"
                name="contexto_do_preco"
                placeholder="Ex: para 2 adultos em acomodacao dupla"
                className={inputClass}
              />
            </div>

            <div className="mt-3">
              <label className={labelClass} htmlFor="taxas">
                Obs. de taxas
              </label>
              <input
                id="taxas"
                name="taxas"
                placeholder="Ex: taxas inclusas"
                className={inputClass}
              />
            </div>
          </section>

          <div className="flex items-center gap-3 border-t border-gray-200 pt-5">
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-btg-navy-card px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
            >
              {loading ? "Criando oferta..." : "Criar oferta"}
            </button>

            {message ? (
              <p className="text-sm font-medium text-green-700">{message}</p>
            ) : null}
            {error ? (
              <p className="text-sm font-medium text-red-700">{error}</p>
            ) : null}
          </div>
        </div>
      </form>
    </main>
  );
}
