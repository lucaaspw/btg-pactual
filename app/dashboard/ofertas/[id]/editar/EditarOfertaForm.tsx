"use client";

import { TIPO_CARTAO, isTipoCartao } from "@/constants/cartoes";
import { acfDateToHtmlDate } from "@/lib/wp-ofertas-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  type EditarOfertaFormInput,
  type EditarOfertaFormValues,
  editarOfertaSchema,
} from "./editarOfertaSchema";

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
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

function imagemPreviewFromAcf(imagem: unknown): string | null {
  if (imagem && typeof imagem === "object" && "url" in imagem) {
    const u = (imagem as { url?: string }).url;
    if (typeof u === "string" && u) return u;
  }
  if (
    imagem &&
    typeof imagem === "object" &&
    "sizes" in imagem &&
    (imagem as { sizes?: { medium_large?: string } }).sizes?.medium_large
  ) {
    return (imagem as { sizes: { medium_large: string } }).sizes.medium_large;
  }
  return null;
}

function mapWpToForm(data: {
  title?: { rendered?: string };
  acf?: Record<string, unknown>;
}): EditarOfertaFormInput {
  const acf = data.acf ?? {};
  const titlePlain = stripTags(data.title?.rendered ?? "");
  const tipoCartaoRaw = String(acf.tipo_cartao ?? "");
  const tipoCartao = isTipoCartao(tipoCartaoRaw) ? tipoCartaoRaw : "";
  const tipoOfertaRaw = String(acf.tipo_oferta ?? "");
  const tipoOferta = ["Feriado", "Roteiro", "Cruzeiro"].includes(tipoOfertaRaw)
    ? tipoOfertaRaw
    : "";
  const moedaRaw = String(acf.moeda ?? "R$");
  let moeda: "R$" | "US$" | "EUR" = "R$";
  if (moedaRaw.includes("US") || moedaRaw === "US$") moeda = "US$";
  else if (moedaRaw.toLowerCase().includes("eur")) moeda = "EUR";

  const ni = acf.nacional_internacional;
  const nacionalInternacional =
    ni === "Nacional" || ni === "Internacional" ? ni : "";

  return {
    tipo_cartao: tipoCartao,
    tipo_oferta: tipoOferta,
    destino_rota: String(acf.destino_rota ?? ""),
    nome_da_oferta: String(acf.nome_da_oferta ?? titlePlain),
    descricao: String(acf.descricao ?? ""),
    nacional_internacional: nacionalInternacional,
    estado_pais: String(acf.estado_pais ?? ""),
    nome_feriado: String(acf.nome_feriado ?? ""),
    imagem: undefined,
    texto_alternativo_alt: String(acf.texto_alternativo_alt ?? ""),
    data_de_inicio: acfDateToHtmlDate(String(acf.data_de_inicio ?? "")),
    data_final: acfDateToHtmlDate(String(acf.data_final ?? "")),
    moeda,
    preco: String(acf.preco ?? ""),
    contexto_do_preco: String(acf.contexto_do_preco ?? ""),
    taxas: String(acf.taxas ?? ""),
    incluso_no_pacote: String(
      acf.incluso_no_pacote ?? acf.inclui_no_pacote ?? "",
    ),
  };
}

function buildFormData(data: EditarOfertaFormValues) {
  const fd = new FormData();
  fd.append("tipo_cartao", data.tipo_cartao);
  fd.append("tipo_oferta", data.tipo_oferta);
  fd.append("destino_rota", data.destino_rota);
  fd.append("nome_da_oferta", data.nome_da_oferta);
  fd.append("descricao", data.descricao);
  fd.append("nacional_internacional", data.nacional_internacional);
  fd.append("estado_pais", data.estado_pais);
  fd.append("nome_feriado", data.nome_feriado);
  if (data.imagem instanceof File) {
    fd.append("imagem", data.imagem);
  }
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

export function EditarOfertaForm() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const idParam = params?.id;
  const id = typeof idParam === "string" ? Number(idParam) : NaN;

  const [loadState, setLoadState] = useState<"loading" | "ok" | "error">(
    "loading",
  );
  const [loadMessage, setLoadMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditarOfertaFormInput, unknown, EditarOfertaFormValues>({
    resolver: zodResolver(editarOfertaSchema),
    defaultValues: mapWpToForm({}),
  });

  useEffect(() => {
    if (!Number.isFinite(id) || id <= 0) {
      setLoadState("error");
      setLoadMessage("ID da oferta inválido.");
      return;
    }

    let cancelled = false;

    async function load() {
      setLoadState("loading");
      setLoadMessage("");
      try {
        const res = await fetch(`/api/ofertas/${id}`, { cache: "no-store" });
        const data = (await res.json()) as {
          title?: { rendered?: string };
          acf?: Record<string, unknown>;
          error?: string;
        };
        if (!res.ok) {
          if (!cancelled) {
            setLoadState("error");
            setLoadMessage(data?.error || "Não foi possível carregar a oferta.");
          }
          return;
        }
        const mapped = mapWpToForm(data);
        const url = imagemPreviewFromAcf(data.acf?.imagem);
        if (!cancelled) {
          reset(mapped);
          setPreviewUrl(url);
          setLoadState("ok");
        }
      } catch {
        if (!cancelled) {
          setLoadState("error");
          setLoadMessage("Erro de conexão ao carregar a oferta.");
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [id, reset]);

  async function onSubmit(data: EditarOfertaFormValues) {
    if (!Number.isFinite(id) || id <= 0) return;

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch(`/api/ofertas/${id}`, {
        method: "PUT",
        body: buildFormData(data),
      });

      const result = (await res.json()) as { error?: string; details?: { message?: string } };

      if (!res.ok) {
        const wpMessage =
          typeof result?.details?.message === "string"
            ? result.details.message
            : "";
        setError(
          wpMessage
            ? `${result?.error || "Não foi possível salvar."} (${wpMessage})`
            : result?.error || "Não foi possível salvar as alterações.",
        );
        return;
      }

      setMessage("Alterações salvas com sucesso.");
      router.refresh();
    } catch {
      setError("Erro de conexão ao salvar.");
    } finally {
      setSaving(false);
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
  const dateInputClass = `${inputClass} relative cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:start-0 [&::-webkit-calendar-picker-indicator]:top-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0`;

  const fieldError = (msg?: string) =>
    msg ? (
      <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
        {msg}
      </p>
    ) : null;

  if (loadState === "loading") {
    return (
      <main className="min-h-screen bg-[#edf1f6] px-4 py-12 md:px-6">
        <p className="mx-auto max-w-[1140px] text-sm text-gray-500">
          Carregando oferta…
        </p>
      </main>
    );
  }

  if (loadState === "error") {
    return (
      <main className="min-h-screen bg-[#edf1f6] px-4 py-12 md:px-6">
        <div className="mx-auto max-w-[1140px] space-y-4">
          <p className="text-sm font-medium text-red-700">{loadMessage}</p>
          <Link
            href="/dashboard/ofertas"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2E73D4] underline-offset-2 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Voltar para a lista
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#edf1f6] px-4 py-6 md:px-6">
      <div className="mx-auto max-w-[1140px]">
        <div className="mb-4">
          <Link
            href="/dashboard/ofertas"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2E73D4] underline-offset-2 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Voltar para ofertas
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <header className="border-b-2 border-[#f2b541] bg-btg-navy px-5 py-4 text-white">
              <h1 className="text-2xl font-bold">Editar oferta</h1>
              <p className="mt-1 text-xs text-blue-100">
                ID {id}. Deixe a imagem em branco para manter a atual. Envie um
                novo arquivo apenas se quiser trocar a foto.
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
                      className={`${inputClass} ${errors.tipo_cartao ? inputErrorClass : ""}`}
                      aria-invalid={!!errors.tipo_cartao}
                      {...register("tipo_cartao")}
                    >
                      <option value="">-- Selecione --</option>
                      <option value={TIPO_CARTAO.PARTNERS}>Partners</option>
                      <option value={TIPO_CARTAO.ULTRABLUE}>Ultrablue</option>
                    </select>
                    {fieldError(errors.tipo_cartao?.message)}
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
                  {previewUrl ? (
                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-[#f8fafc] p-3">
                      <p className="mb-2 text-xs font-semibold text-gray-600">
                        Imagem atual
                      </p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={previewUrl}
                        alt=""
                        className="max-h-48 w-auto max-w-full rounded-md object-contain"
                      />
                    </div>
                  ) : null}

                  <div>
                    <label className={labelClass} htmlFor="imagem">
                      Nova imagem (opcional)
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
                      JPG, JPEG ou PNG — até 5 MB. Se não selecionar arquivo, a
                      imagem atual é mantida.
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
                      <option value="EUR">EUR</option>
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
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-xl bg-btg-navy-card px-7 py-3 text-base font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
                  >
                    <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                    {saving ? "Salvando..." : "Salvar alterações"}
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
