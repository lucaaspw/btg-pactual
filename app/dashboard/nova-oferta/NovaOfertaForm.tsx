"use client";

import {
  TIPO_CARTAO,
  tipoCartaoFromQueryParam,
  type TipoCartao,
} from "@/constants/cartoes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  type NovaOfertaFormInput,
  type NovaOfertaFormValues,
  novaOfertaSchema,
} from "./novaOfertaSchema";

function initialTipoCartao(search: string | null) {
  return tipoCartaoFromQueryParam(search) ?? "";
}

function tryOpenDatePicker(el: HTMLInputElement) {
  if (typeof el.showPicker === "function") {
    try {
      el.showPicker();
    } catch {
      el.focus();
    }
  } else {
    el.focus();
  }
}

function buildFormData(data: NovaOfertaFormValues) {
  const fd = new FormData();
  fd.append("tipo_cartao", data.tipo_cartao);
  fd.append("tipo_oferta", data.tipo_oferta);
  fd.append("destino_rota", data.destino_rota);
  fd.append("nome_da_oferta", data.nome_da_oferta);
  fd.append("descricao", data.descricao);
  fd.append("nacional_internacional", data.nacional_internacional);
  fd.append("estado_pais", data.estado_pais);
  fd.append("nome_feriado", data.nome_feriado);
  fd.append("imagem", data.imagem);
  fd.append("texto_alternativo_alt", data.texto_alternativo_alt);
  fd.append("data_de_inicio", data.data_de_inicio);
  fd.append("data_final", data.data_final);
  fd.append("moeda", data.moeda);
  fd.append("preco", data.preco);
  fd.append("contexto_do_preco", data.contexto_do_preco);
  fd.append("taxas", data.taxas);
  fd.append("incluso_no_pacote", data.incluso_no_pacote);
  return fd;
}

function emptyFormValues(cartaoQuery: string | null): NovaOfertaFormInput {
  return {
    tipo_cartao: initialTipoCartao(cartaoQuery),
    tipo_oferta: "",
    destino_rota: "",
    nome_da_oferta: "",
    descricao: "",
    nacional_internacional: "",
    estado_pais: "",
    nome_feriado: "",
    imagem: undefined,
    texto_alternativo_alt: "",
    data_de_inicio: "",
    data_final: "",
    moeda: "R$",
    preco: "",
    contexto_do_preco: "",
    taxas: "",
    incluso_no_pacote: "",
  };
}

type NovaOfertaFormProps = {
  lockedTipoCartao?: TipoCartao | null;
};

function formDefaults(cartaoQuery: string | null, lockedTipoCartao: TipoCartao | null) {
  const defaults = emptyFormValues(cartaoQuery);
  return {
    ...defaults,
    tipo_cartao: lockedTipoCartao ?? defaults.tipo_cartao,
  };
}

export function NovaOfertaForm({ lockedTipoCartao = null }: NovaOfertaFormProps) {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<NovaOfertaFormInput, unknown, NovaOfertaFormValues>({
    resolver: zodResolver(novaOfertaSchema),
    defaultValues: formDefaults(searchParams.get("cartao"), lockedTipoCartao),
  });

  useEffect(() => {
    if (lockedTipoCartao) {
      setValue("tipo_cartao", lockedTipoCartao);
      return;
    }
    const next = tipoCartaoFromQueryParam(searchParams.get("cartao"));
    if (next) {
      setValue("tipo_cartao", next);
    }
  }, [lockedTipoCartao, searchParams, setValue]);

  async function onSubmit(data: NovaOfertaFormValues) {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/ofertas", {
        method: "POST",
        body: buildFormData(data),
      });

      const result = await res.json();

      if (!res.ok) {
        const wpMessage =
          typeof result?.details?.message === "string"
            ? result.details.message
            : "";
        setError(
          wpMessage
            ? `${result?.error || "Não foi possível criar a oferta."} (${wpMessage})`
            : result?.error || "Não foi possível criar a oferta.",
        );
        return;
      }

      setMessage("Oferta criada com sucesso!");
      reset(formDefaults(searchParams.get("cartao"), lockedTipoCartao));
    } catch {
      setError("Erro de conexão ao criar oferta.");
    } finally {
      setLoading(false);
    }
  }

  const sectionTitleClass =
    "mb-6 flex items-center gap-2 border-b border-gray-200 pb-3 text-[11px] font-bold  tracking-[0.08em] text-[#20334f]";
  const labelClass =
    "mb-2.5 block text-xs font-semibold  tracking-[0.06em] text-gray-700 leading-snug";
  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-[#f8fafc] px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#2E73D4] focus:ring-2 focus:ring-[#2E73D4]/20";
  const inputErrorClass =
    "border-red-400 focus:border-red-500 focus:ring-red-500/20";
  /** Clique em qualquer ponto abre o calendário (além do ícone nativo). */
  const dateInputClass = `${inputClass} relative cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:start-0 [&::-webkit-calendar-picker-indicator]:top-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0`;

  const fieldError = (msg?: string) =>
    msg ? (
      <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
        {msg}
      </p>
    ) : null;

  return (
    <main className="min-h-screen bg-[#edf1f6] px-4 py-6 md:px-6">
      <div className="mx-auto max-w-[1140px]">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <header className="border-b-2 border-[#f2b541] bg-btg-navy px-5 py-4 text-white">
              <h1 className="text-2xl font-bold">Cadastro de Oferta</h1>
              <p className="mt-1 text-xs text-blue-100">
                Preencha os campos abaixo. Itens não preenchidos não aparecem na
                publicação.
              </p>
            </header>

            <div className="space-y-9 p-6 sm:p-8">
              <section>
                <h2 className={sectionTitleClass}>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#2E73D4] text-xs text-white">
                    1
                  </span>
                  Identificação
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className={labelClass} htmlFor="tipo_cartao">
                      Tipo de cartão{" "}
                      <span className="rounded-sm bg-red-100 p-1 text-[10px] text-red-700">
                        Obrigatório
                      </span>
                    </label>
                    <select
                      id="tipo_cartao"
                      disabled={Boolean(lockedTipoCartao)}
                      className={`${inputClass} ${errors.tipo_cartao ? inputErrorClass : ""}`}
                      aria-invalid={!!errors.tipo_cartao}
                      {...register("tipo_cartao")}
                    >
                      {!lockedTipoCartao ? (
                        <option value="">-- Selecione --</option>
                      ) : null}
                      {!lockedTipoCartao ||
                      lockedTipoCartao === TIPO_CARTAO.PARTNERS ? (
                        <option value={TIPO_CARTAO.PARTNERS}>Partners</option>
                      ) : null}
                      {!lockedTipoCartao ||
                      lockedTipoCartao === TIPO_CARTAO.ULTRABLUE ? (
                        <option value={TIPO_CARTAO.ULTRABLUE}>Ultrablue</option>
                      ) : null}
                    </select>
                    {fieldError(errors.tipo_cartao?.message)}
                    <p className="mt-2.5 text-xs leading-relaxed text-gray-500">
                      A oferta aparece só na vitrine do cartão selecionado. Link
                      com{" "}
                      <code className="rounded bg-gray-100 px-1 text-[11px]">
                        ?cartao=partners
                      </code>{" "}
                      ou{" "}
                      <code className="rounded bg-gray-100 px-1 text-[11px]">
                        ?cartao=ultrablue
                      </code>{" "}
                      pré-define esta lista.
                    </p>
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="tipo_oferta">
                      Tipo de oferta{" "}
                      <span className="rounded-sm bg-red-100 p-1 text-[10px] text-red-700">
                        Obrigatório
                      </span>
                    </label>
                    <select
                      id="tipo_oferta"
                      className={`${inputClass} ${errors.tipo_oferta ? inputErrorClass : ""}`}
                      aria-invalid={!!errors.tipo_oferta}
                      {...register("tipo_oferta")}
                    >
                      <option value="">-- Selecione --</option>
                      <option value="Feriado">Feriado</option>
                      <option value="Roteiro">Roteiro</option>
                      <option value="Cruzeiro">Cruzeiro</option>
                    </select>
                    {fieldError(errors.tipo_oferta?.message)}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="destino_rota">
                      Destino / Rota{" "}
                      <span className="rounded-sm bg-red-100 p-1 text-[10px] text-red-700">
                        Obrigatório
                      </span>
                    </label>
                    <input
                      id="destino_rota"
                      placeholder="Ex: Patagonia Argentina"
                      className={`${inputClass} ${errors.destino_rota ? inputErrorClass : ""}`}
                      aria-invalid={!!errors.destino_rota}
                      {...register("destino_rota")}
                    />
                    {fieldError(errors.destino_rota?.message)}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="nome_da_oferta">
                      Nome da oferta{" "}
                      <span className="rounded-sm bg-red-100 p-1 text-[10px] text-red-700">
                        Obrigatório
                      </span>
                    </label>
                    <input
                      id="nome_da_oferta"
                      placeholder="Ex: Pedras do Patacho - Hotel Boutique Experience"
                      className={`${inputClass} ${errors.nome_da_oferta ? inputErrorClass : ""}`}
                      aria-invalid={!!errors.nome_da_oferta}
                      {...register("nome_da_oferta")}
                    />
                    {fieldError(errors.nome_da_oferta?.message)}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="descricao">
                      Descrição curta{" "}
                      <span className="rounded-sm bg-red-100 p-1 text-[10px] text-red-700">
                        Obrigatório
                      </span>
                    </label>
                    <textarea
                      id="descricao"
                      rows={3}
                      placeholder="2-3 linhas que aparecem no card da oferta."
                      className={`${inputClass} ${errors.descricao ? inputErrorClass : ""}`}
                      aria-invalid={!!errors.descricao}
                      {...register("descricao")}
                    />
                    {fieldError(errors.descricao?.message)}
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 md:gap-x-8 md:gap-y-6">
                    <div>
                      <label
                        className={labelClass}
                        htmlFor="nacional_internacional"
                      >
                        Nacional / Internacional
                      </label>
                      <select
                        id="nacional_internacional"
                        className={inputClass}
                        {...register("nacional_internacional")}
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
                        placeholder="Ex.: Bahia ou Chile — agrupa na página Feriados"
                        className={inputClass}
                        {...register("estado_pais")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="nome_feriado">
                      Nome do feriado (opcional)
                    </label>
                    <input
                      id="nome_feriado"
                      placeholder="Ex: Páscoa, Carnaval — agrupa na página Feriados"
                      className={inputClass}
                      {...register("nome_feriado")}
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

                <div className="space-y-6">
                  <div>
                    <label className={labelClass} htmlFor="imagem">
                      Imagem principal{" "}
                      <span className="rounded-sm bg-red-100 p-1 text-[10px] text-red-700">
                        Obrigatório
                      </span>
                    </label>
                    <Controller
                      name="imagem"
                      control={control}
                      render={({ field: { onChange, onBlur, name, ref } }) => (
                        <input
                          id="imagem"
                          ref={ref}
                          name={name}
                          onBlur={onBlur}
                          type="file"
                          accept="image/jpeg,image/png,.jpg,.jpeg,.png"
                          className={`${inputClass} file:mr-3 file:border-0 file:bg-[#eef1f5] file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-btg-navy ${errors.imagem ? inputErrorClass : ""}`}
                          aria-invalid={!!errors.imagem}
                          onChange={(e) =>
                            onChange(e.target.files?.[0] ?? undefined)
                          }
                        />
                      )}
                    />
                    {fieldError(errors.imagem?.message)}
                    <p className="mt-2.5 text-xs leading-relaxed text-gray-500">
                      JPG, JPEG ou PNG — até 5 MB. A imagem é enviada para
                      o WordPress.
                    </p>
                  </div>
                  <div>
                    <label
                      className={labelClass}
                      htmlFor="texto_alternativo_alt"
                    >
                      Texto alternativo (alt){" "}
                      <span className="rounded-sm bg-red-100 p-1 text-[10px] text-red-700">
                        Obrigatório
                      </span>
                    </label>
                    <input
                      id="texto_alternativo_alt"
                      placeholder="Ex.: praia em Itacaré"
                      className={`${inputClass} ${errors.texto_alternativo_alt ? inputErrorClass : ""}`}
                      aria-invalid={!!errors.texto_alternativo_alt}
                      {...register("texto_alternativo_alt")}
                    />
                    {fieldError(errors.texto_alternativo_alt?.message)}
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

                <div className="grid gap-6 md:grid-cols-2 md:gap-x-8">
                  <div>
                    <label className={labelClass} htmlFor="data_de_inicio">
                      Data de inicio
                    </label>
                    <input
                      id="data_de_inicio"
                      type="date"
                      className={dateInputClass}
                      onClick={(e) => tryOpenDatePicker(e.currentTarget)}
                      {...register("data_de_inicio")}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="data_final">
                      Data de fim
                    </label>
                    <input
                      id="data_final"
                      type="date"
                      className={dateInputClass}
                      onClick={(e) => tryOpenDatePicker(e.currentTarget)}
                      {...register("data_final")}
                    />
                  </div>
                </div>
              </section>

              <section>
                <h2 className={sectionTitleClass}>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#2E73D4] text-xs text-white">
                    4
                  </span>
                  Preço
                </h2>

                <div className="grid gap-6 md:grid-cols-[120px_1fr] md:gap-x-8">
                  <div>
                    <label className={labelClass} htmlFor="moeda">
                      Moeda
                    </label>
                    <select id="moeda" className={inputClass} {...register("moeda")}>
                      <option value="R$">R$</option>
                      <option value="US$">US$</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="preco">
                      Preço{" "}
                      <span className="rounded-sm bg-red-100 p-1 text-[10px] text-red-700">
                        Obrigatório
                      </span>
                    </label>
                    <input
                      id="preco"
                      placeholder="7.529"
                      className={`${inputClass} ${errors.preco ? inputErrorClass : ""}`}
                      aria-invalid={!!errors.preco}
                      {...register("preco")}
                    />
                    {fieldError(errors.preco?.message)}
                  </div>
                </div>
              </section>

              <section>
                <h2 className={sectionTitleClass}>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#2E73D4] text-xs text-white">
                    5
                  </span>
                  Detalhes da oferta
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className={labelClass} htmlFor="contexto_do_preco">
                      Acomodação
                    </label>
                    <input
                      id="contexto_do_preco"
                      placeholder="Ex.: para 2 adultos em acomodação dupla"
                      className={inputClass}
                      {...register("contexto_do_preco")}
                    />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="taxas">
                      Obs. de taxas
                    </label>
                    <input
                      id="taxas"
                      placeholder="Ex: taxas inclusas"
                      className={inputClass}
                      {...register("taxas")}
                    />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="incluso_no_pacote">
                      Incluso no pacote
                    </label>
                    <textarea
                      id="incluso_no_pacote"
                      rows={4}
                      placeholder="Descreva brevemente os itens inclusos no pacote."
                      className={inputClass}
                      {...register("incluso_no_pacote")}
                    />
                  </div>
                </div>
              </section>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-8">
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-xl bg-btg-navy-card px-7 py-3 text-base font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
                  >
                    <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                    {loading ? "Publicando..." : "Publicar oferta"}
                  </button>
                </div>

                <p className="text-sm text-[#8da0bd]">
                  Campos vazios não serão exibidos
                </p>

                {message ? (
                  <p className="w-full text-sm font-medium text-green-700">
                    {message}
                  </p>
                ) : null}
                {error ? (
                  <p className="w-full text-sm font-medium text-red-700">
                    {error}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
