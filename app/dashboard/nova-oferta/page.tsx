"use client";

import { ArrowUpRight, Image as ImagePlaceholderIcon, Minus } from "lucide-react";
import { useRef, useState } from "react";

function formatMoedaLabel(raw?: string): string {
  const moeda = String(raw || "")
    .trim()
    .toLowerCase();
  if (!moeda) return "R$";
  if (
    moeda === "$" ||
    moeda === "us$" ||
    moeda === "us" ||
    moeda.includes("usd") ||
    moeda.includes("dolar") ||
    moeda.includes("dólar")
  ) {
    return "US$";
  }
  if (moeda.includes("eur") || moeda.includes("euro")) {
    return "EUR";
  }
  return "R$";
}

export default function NovaOferta() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const imagemInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState({
    nome_da_oferta: "",
    descricao: "",
    moeda: "R$",
    preco: "",
  });

  function clearPreviewImage() {
    setPreviewImageUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    if (imagemInputRef.current) {
      imagemInputRef.current.value = "";
    }
  }

  function handlePreviewChange(e: React.FormEvent<HTMLFormElement>) {
    const target = e.target;
    if (target instanceof HTMLInputElement && target.type === "file") {
      if (target.name === "imagem") {
        const file = target.files?.[0];
        setPreviewImageUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return file ? URL.createObjectURL(file) : null;
        });
      }
      return;
    }
    if (
      !(target instanceof HTMLInputElement) &&
      !(target instanceof HTMLTextAreaElement) &&
      !(target instanceof HTMLSelectElement)
    ) {
      return;
    }

    const { name, value } = target;
    if (
      name === "nome_da_oferta" ||
      name === "descricao" ||
      name === "moeda" ||
      name === "preco"
    ) {
      setPreview((prev) => ({ ...prev, [name]: value }));
    }
  }

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
            : result?.error || "Nao foi possivel criar a oferta.",
        );
        return;
      }

      setMessage("Oferta criada com sucesso!");
      form.reset();
      setPreviewImageUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      setPreview({
        nome_da_oferta: "",
        descricao: "",
        moeda: "R$",
        preco: "",
      });
    } catch {
      setError("Erro de conexao ao criar oferta.");
    } finally {
      setLoading(false);
    }
  }

  const sectionTitleClass =
    "mb-4 flex items-center gap-2 border-b border-gray-200 pb-2 text-[11px] font-bold tracking-wide uppercase text-[#20334f]";
  const labelClass = "mb-1 block text-xs font-semibold uppercase text-gray-700";
  const inputClass =
    "w-full border border-gray-200 bg-[#f8fafc] px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-[#2E73D4] focus:ring-2 focus:ring-[#2E73D4]/20";

  const cardNome =
    preview.nome_da_oferta.trim() || "Nome da oferta aparecerá aqui";
  const cardDescricao =
    preview.descricao.trim() ||
    "Descrição curta da oferta aparecerá aqui...";
  const moedaLabel = formatMoedaLabel(preview.moeda);
  const temPreco = Boolean(preview.preco.trim());

  return (
    <main className="min-h-screen bg-[#edf1f6] px-4 py-6 md:px-6">
      <div className="mx-auto grid max-w-[1140px] gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <form onSubmit={handleSubmit} onChange={handlePreviewChange}>
          <div className="overflow-hidden border border-gray-200 bg-white shadow-sm">
            <header className="border-b-2 border-[#f2b541] bg-btg-navy px-5 py-4 text-white">
              <h1 className="text-2xl font-bold">Cadastro de Oferta</h1>
              <p className="mt-1 text-xs text-blue-100">
                Preencha os campos abaixo. Itens não preenchidos não aparecem na
                publicação.
              </p>
            </header>

            <div className="space-y-7 p-5">
              <section>
                <h2 className={sectionTitleClass}>
                  <span className="inline-flex h-6 w-6 items-center justify-center bg-[#2E73D4] text-xs text-white">
                    1
                  </span>
                  Identificação
                </h2>

                <div className="space-y-3">
                  <div>
                    <label className={labelClass} htmlFor="tipo_cartao">
                      Tipo de cartao{" "}
                      <span className="bg-red-100 text-red-700 text-[10px] p-1">
                        Obrigatório
                      </span>
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
                      Tipo de oferta{" "}
                      <span className="bg-red-100 text-red-700 text-[10px] p-1">
                        Obrigatório
                      </span>
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
                      Destino / Rota{" "}
                      <span className="bg-red-100 text-red-700 text-[10px] p-1">
                        Obrigatório
                      </span>
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
                      Nome da oferta{" "}
                      <span className="bg-red-100 text-red-700 text-[10px] p-1">
                        Obrigatório
                      </span>
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
                      Descricao curta{" "}
                      <span className="bg-red-100 text-red-700 text-[10px] p-1">
                        Obrigatório
                      </span>
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

                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <label
                        className={labelClass}
                        htmlFor="nacional_internacional"
                      >
                        Nacional / Internacional
                      </label>
                      <select
                        id="nacional_internacional"
                        name="nacional_internacional"
                        defaultValue=""
                        className={inputClass}
                      >
                        <option value="">Selecione</option>
                        <option value="Nacional">Nacional</option>
                        <option value="Internacional">Internacional</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="estado_pais">
                        Estado (Nacional) ou país (Internacional)
                      </label>
                      <input
                        id="estado_pais"
                        name="estado_pais"
                        placeholder="Ex.: Bahia ou Chile — agrupa na página Feriados"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="nome_feriado">
                      Nome do feriado (opcional)
                    </label>
                    <input
                      id="nome_feriado"
                      name="nome_feriado"
                      placeholder="Ex: Páscoa, Carnaval — agrupa na página Feriados"
                      className={inputClass}
                    />
                  </div>
                </div>
              </section>

              <section>
                <h2 className={sectionTitleClass}>
                  <span className="inline-flex h-6 w-6 items-center justify-center bg-[#2E73D4] text-xs text-white">
                    2
                  </span>
                  Imagem
                </h2>

                <div className="space-y-3">
                  <div>
                    <label className={labelClass} htmlFor="imagem">
                      Imagem principal{" "}
                      <span className="bg-red-100 text-red-700 text-[10px] p-1">
                        Obrigatório
                      </span>
                    </label>
                <input
                  ref={imagemInputRef}
                  id="imagem"
                  name="imagem"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className={`${inputClass} file:mr-3 file:border-0 file:bg-[#eef1f5] file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-btg-navy`}
                  required
                />
                    <p className="mt-1 text-xs text-gray-500">
                      JPG, PNG, WebP ou GIF — ate 5 MB. A imagem e enviada para
                      o WordPress.
                    </p>
                  </div>
                  <div>
                    <label
                      className={labelClass}
                      htmlFor="texto_alternativo_alt"
                    >
                      Texto alternativo (alt){" "}
                      <span className="bg-red-100 text-red-700 text-[10px] p-1">
                        Obrigatório
                      </span>
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
                  <span className="inline-flex h-6 w-6 items-center justify-center bg-[#2E73D4] text-xs text-white">
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
                  <span className="inline-flex h-6 w-6 items-center justify-center bg-[#2E73D4] text-xs text-white">
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
                    </select>
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="preco">
                      Preco{" "}
                      <span className="bg-red-100 text-red-700 text-[10px] p-1">
                        Obrigatório
                      </span>
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
              </section>

              <section>
                <h2 className={sectionTitleClass}>
                  <span className="inline-flex h-6 w-6 items-center justify-center bg-[#2E73D4] text-xs text-white">
                    5
                  </span>
                  Detalhes da oferta
                </h2>

                <div className="space-y-3">
                  <div className="mt-3">
                    <label className={labelClass} htmlFor="contexto_do_preco">
                      Acomodação
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

                  <div>
                    <label className={labelClass} htmlFor="incluso_no_pacote">
                      Incluso no pacote
                    </label>
                    <textarea
                      id="incluso_no_pacote"
                      name="incluso_no_pacote"
                      rows={4}
                      placeholder="Drecreva brevemente os itens inclusos no pacote."
                      className={inputClass}
                    />
                  </div>
                </div>
              </section>

              <div className="flex items-center gap-3 border-t border-gray-200 pt-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-btg-navy-card px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
                >
                  {loading ? "Publicando..." : "Publicar oferta"}
                </button>

                {message ? (
                  <p className="text-sm font-medium text-green-700">
                    {message}
                  </p>
                ) : null}
                {error ? (
                  <p className="text-sm font-medium text-red-700">{error}</p>
                ) : null}
              </div>
            </div>
          </div>
        </form>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-2 text-[11px] font-semibold tracking-[0.12em] text-[#6d7f98] uppercase">
            Preview do card
          </p>
          <article className="overflow-hidden bg-[#06214D] text-white shadow-[0_12px_32px_rgba(5,22,53,0.45)] ring-1 ring-white/5">
            {/* Área da imagem (preview ou placeholder) */}
            <div className="relative h-[168px] overflow-hidden bg-[#04152f]">
              {previewImageUrl ? (
                <img
                  src={previewImageUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#0c2854] to-[#04152f]">
                  <ImagePlaceholderIcon
                    className="h-12 w-12 text-white/25"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                </div>
              )}
              {previewImageUrl ? (
                <button
                  type="button"
                  onClick={clearPreviewImage}
                  className="absolute top-2 left-2 flex h-7 w-7 items-center justify-center bg-black/55 text-white shadow-md backdrop-blur-sm transition hover:bg-black/70"
                  aria-label="Remover imagem do preview"
                >
                  <Minus className="h-4 w-4" strokeWidth={2.5} />
                </button>
              ) : null}
            </div>

            <div className="flex flex-col gap-0 px-4 pb-4 pt-3">
              <h3 className="text-[1.15rem] font-bold leading-snug tracking-tight">
                {cardNome}
              </h3>
              <p className="mt-2 line-clamp-3 min-h-[3.5rem] text-[13px] leading-relaxed text-[#b8c9e8]">
                {cardDescricao}
              </p>

              <div className="mt-4">
                <p className="text-[0.7rem] font-medium uppercase tracking-wide text-[#8fa4c4]">
                  A partir de
                </p>
                <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5 text-[1.65rem] font-bold leading-none tracking-tight">
                  <span className="text-[#f2b541]">{moedaLabel}</span>
                  {temPreco ? (
                    <span className="text-white">
                      {preview.preco.trim()}
                    </span>
                  ) : (
                    <span className="text-white/90">—</span>
                  )}
                </p>
                <div className="mt-2 h-px w-full bg-white/10" aria-hidden />
              </div>

              <button
                type="button"
                tabIndex={-1}
                className="mt-4 flex w-full cursor-default items-center justify-between bg-[#2E73D4] px-3 py-2.5 text-left text-[1.05rem] font-bold text-white"
              >
                <span>Saiba mais</span>
                <ArrowUpRight
                  className="h-5 w-5 shrink-0"
                  strokeWidth={2}
                  aria-hidden
                />
              </button>
            </div>
          </article>
        </aside>
      </div>
    </main>
  );
}
