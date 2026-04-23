import {
  DASHBOARD_SESSION_COOKIE,
  verifyDashboardSessionToken,
} from "@/lib/dashboard-session";
import { normalizeParcelamento } from "@/lib/parcelamento-oferta";
import {
  ALLOWED_IMAGE_TYPES,
  getWpAuthHeader,
  imagemAcfToMediaId,
  MAX_IMAGE_BYTES,
  normalizeMoeda,
  toAcfDate,
} from "@/lib/wp-ofertas-api";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

async function requireDashboardSession() {
  const jar = await cookies();
  const session = jar.get(DASHBOARD_SESSION_COOKIE)?.value;
  if (!verifyDashboardSessionToken(session)) {
    return NextResponse.json(
      { error: "Não autorizado. Faça login no painel." },
      { status: 401 },
    );
  }
  return null;
}

const OFERTA_FIELDS =
  "id,title,slug,date,modified,acf";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const unauthorized = await requireDashboardSession();
    if (unauthorized) return unauthorized;

    const { id: idParam } = await context.params;
    const id = Number(idParam);
    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ error: "ID inválido." }, { status: 400 });
    }

    const wpUrl = process.env.NEXT_PUBLIC_WP_URL?.replace(/\/$/, "");
    const authHeader = getWpAuthHeader();

    if (!wpUrl) {
      return NextResponse.json(
        { error: "NEXT_PUBLIC_WP_URL não configurada." },
        { status: 500 },
      );
    }

    if (!authHeader) {
      return NextResponse.json(
        { error: "Configure WP_API_USER e WP_API_APP_PASSWORD." },
        { status: 500 },
      );
    }

    const res = await fetch(
      `${wpUrl}/wp-json/wp/v2/btg_pactual/${id}?_fields=${OFERTA_FIELDS}`,
      {
        headers: { Authorization: authHeader },
        cache: "no-store",
      },
    );

    const text = await res.text();
    let data: unknown = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = null;
    }

    if (!res.ok) {
      const msg =
        data &&
        typeof data === "object" &&
        "message" in data &&
        typeof (data as { message?: unknown }).message === "string"
          ? (data as { message: string }).message
          : res.statusText;
      return NextResponse.json(
        { error: `Oferta não encontrada ou sem permissão (${res.status}): ${msg}` },
        { status: res.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Erro inesperado ao carregar oferta." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const unauthorized = await requireDashboardSession();
    if (unauthorized) return unauthorized;

    const { id: idParam } = await context.params;
    const id = Number(idParam);
    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ error: "ID inválido." }, { status: 400 });
    }

    const wpUrl = process.env.NEXT_PUBLIC_WP_URL?.replace(/\/$/, "");
    const authHeader = getWpAuthHeader();

    if (!wpUrl) {
      return NextResponse.json(
        { error: "NEXT_PUBLIC_WP_URL não configurada." },
        { status: 500 },
      );
    }

    if (!authHeader) {
      return NextResponse.json(
        { error: "Configure WP_API_USER e WP_API_APP_PASSWORD." },
        { status: 500 },
      );
    }

    const res = await fetch(
      `${wpUrl}/wp-json/wp/v2/btg_pactual/${id}?force=true`,
      {
        method: "DELETE",
        headers: { Authorization: authHeader },
        cache: "no-store",
      },
    );

    const text = await res.text();
    let data: unknown = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = null;
    }

    if (!res.ok) {
      const msg =
        data &&
        typeof data === "object" &&
        "message" in data &&
        typeof (data as { message?: unknown }).message === "string"
          ? (data as { message: string }).message
          : res.statusText;
      return NextResponse.json(
        { error: `Falha ao excluir oferta (${res.status}): ${msg}` },
        { status: res.status },
      );
    }

    return NextResponse.json({ ok: true, deleted: data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Erro inesperado ao excluir oferta." },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const unauthorized = await requireDashboardSession();
    if (unauthorized) return unauthorized;

    const { id: idParam } = await context.params;
    const id = Number(idParam);
    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ error: "ID inválido." }, { status: 400 });
    }

    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        {
          error:
            "Envie o formulário com multipart. Recarregue a página e tente novamente.",
        },
        { status: 400 },
      );
    }

    const formData = await request.formData();
    const getStr = (name: string) => String(formData.get(name) ?? "").trim();

    const tipoCartao = getStr("tipo_cartao");
    const tipoOferta = getStr("tipo_oferta");
    const nacionalInternacional = getStr("nacional_internacional");
    const estadoPais = getStr("estado_pais");
    const nomeFeriado = getStr("nome_feriado");
    const destino = getStr("destino_rota");
    const title = getStr("nome_da_oferta");
    const nomeOferta = getStr("nome_da_oferta");
    const descricao = getStr("descricao");
    const inclusoNoPacote = getStr("incluso_no_pacote");
    const file = formData.get("imagem");
    const imagemAlt = getStr("texto_alternativo_alt");
    const dataInicio = toAcfDate(getStr("data_de_inicio"));
    const dataFim = toAcfDate(getStr("data_final"));
    const moeda = normalizeMoeda(getStr("moeda"));
    const parcelamento = normalizeParcelamento(getStr("parcelamento"));
    const preco = getStr("preco");
    const contextoDoPreco = getStr("contexto_do_preco");
    const observacaoTaxa = getStr("taxas");

    if (!title || !destino || !descricao || !preco) {
      return NextResponse.json(
        {
          error:
            "Campos obrigatórios: nome da oferta, destino, descrição e preço.",
        },
        { status: 400 },
      );
    }

    const wpUrl = process.env.NEXT_PUBLIC_WP_URL?.replace(/\/$/, "");
    const authHeader = getWpAuthHeader();

    if (!wpUrl) {
      return NextResponse.json(
        { error: "NEXT_PUBLIC_WP_URL não configurada." },
        { status: 500 },
      );
    }

    if (!authHeader) {
      return NextResponse.json(
        { error: "Configure WP_API_USER e WP_API_APP_PASSWORD." },
        { status: 500 },
      );
    }

    const existingRes = await fetch(
      `${wpUrl}/wp-json/wp/v2/btg_pactual/${id}?_fields=acf`,
      {
        headers: { Authorization: authHeader },
        cache: "no-store",
      },
    );

    const existingText = await existingRes.text();
    let existingData: { acf?: Record<string, unknown> } | null = null;
    try {
      existingData = existingText
        ? (JSON.parse(existingText) as { acf?: Record<string, unknown> })
        : null;
    } catch {
      existingData = null;
    }

    if (!existingRes.ok || !existingData) {
      return NextResponse.json(
        { error: "Não foi possível carregar a oferta atual no WordPress." },
        { status: existingRes.status || 502 },
      );
    }

    const acfPrev = existingData.acf ?? {};
    let imagemAcf: number | null = imagemAcfToMediaId(acfPrev.imagem);

    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_IMAGE_BYTES) {
        return NextResponse.json(
          { error: "Imagem muito grande. Tamanho máximo: 5 MB." },
          { status: 400 },
        );
      }
      const mime = file.type || "";
      if (!ALLOWED_IMAGE_TYPES.has(mime)) {
        return NextResponse.json(
          { error: "Formato não aceito. Use apenas JPG, JPEG ou PNG." },
          { status: 400 },
        );
      }

      const uploadForm = new FormData();
      uploadForm.append("file", file, file.name);

      const mediaRes = await fetch(`${wpUrl}/wp-json/wp/v2/media`, {
        method: "POST",
        headers: { Authorization: authHeader },
        body: uploadForm,
        cache: "no-store",
      });

      const mediaText = await mediaRes.text();
      let mediaData: Record<string, unknown> | null = null;
      try {
        mediaData = mediaText
          ? (JSON.parse(mediaText) as Record<string, unknown>)
          : null;
      } catch {
        mediaData = null;
      }

      if (!mediaRes.ok || !mediaData) {
        const wpMessage =
          (typeof mediaData?.message === "string" && mediaData.message) ||
          mediaRes.statusText;
        return NextResponse.json(
          {
            error: `Falha ao enviar imagem ao WordPress (${mediaRes.status}): ${wpMessage}`,
            details: mediaData,
          },
          { status: mediaRes.status },
        );
      }

      const mediaId =
        typeof mediaData.id === "number" ? mediaData.id : Number(mediaData.id);
      if (!Number.isFinite(mediaId) || mediaId <= 0) {
        return NextResponse.json(
          { error: "ID da mídia inválido." },
          { status: 502 },
        );
      }

      if (imagemAlt && Number.isFinite(mediaId)) {
        await fetch(`${wpUrl}/wp-json/wp/v2/media/${Math.floor(mediaId)}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
          body: JSON.stringify({ alt_text: imagemAlt }),
          cache: "no-store",
        });
      }

      imagemAcf = Math.floor(mediaId);
    }

    if (imagemAcf === null || imagemAcf <= 0) {
      return NextResponse.json(
        {
          error:
            "Imagem obrigatória: a oferta precisa de uma imagem. Envie um arquivo ou restaure a mídia no WordPress.",
        },
        { status: 400 },
      );
    }

    const acfPayload: Record<string, string | number> = {
      tipo_cartao: tipoCartao,
      tipo_oferta: tipoOferta,
      nome_feriado: nomeFeriado,
      nacional_internacional: nacionalInternacional,
      estado_pais: estadoPais,
      destino_rota: destino,
      nome_da_oferta: nomeOferta || title,
      descricao,
      imagem: imagemAcf,
      texto_alternativo_alt: imagemAlt,
      data_de_inicio: dataInicio,
      data_final: dataFim,
      moeda,
      parcelamento,
      preco,
      contexto_do_preco: contextoDoPreco,
      incluso_no_pacote: inclusoNoPacote,
      taxas: observacaoTaxa,
    };

    const wpRes = await fetch(`${wpUrl}/wp-json/wp/v2/btg_pactual/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({
        title,
        status: "publish",
        acf: acfPayload,
      }),
      cache: "no-store",
    });

    const wpText = await wpRes.text();
    let wpData: Record<string, unknown> | null = null;
    try {
      wpData = wpText ? (JSON.parse(wpText) as Record<string, unknown>) : null;
    } catch {
      wpData = null;
    }

    if (!wpRes.ok) {
      const wpMessage =
        (typeof wpData?.message === "string" && wpData.message) ||
        wpRes.statusText;
      return NextResponse.json(
        {
          error: `Falha ao atualizar oferta no WordPress (${wpRes.status}): ${wpMessage}`,
          details: wpData,
        },
        { status: wpRes.status },
      );
    }

    return NextResponse.json(wpData ?? { ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Erro inesperado ao atualizar oferta." },
      { status: 500 },
    );
  }
}
