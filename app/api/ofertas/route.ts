import {
  DASHBOARD_SESSION_COOKIE,
  verifyDashboardSessionToken,
} from "@/lib/dashboard-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function getAuthHeader() {
  const user = process.env.WP_API_USER;
  const appPassword = process.env.WP_API_APP_PASSWORD;

  if (user && appPassword) {
    const normalizedPassword = appPassword.replace(/\s+/g, "");
    const basic = Buffer.from(`${user}:${normalizedPassword}`).toString(
      "base64",
    );
    return `Basic ${basic}`;
  }

  return null;
}

/**
 * ACF Date Picker (formato de retorno d/m/Y no seu site): o REST espera a mesma
 * convenção. Inputs type=date enviam YYYY-MM-DD — convertemos para dd/mm/aaaa.
 */
function toAcfDate(value: string): string {
  const v = value.trim();
  if (!v) return "";
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  if (iso) {
    const [, y, m, d] = iso;
    return `${d}/${m}/${y}`;
  }
  return v;
}

function normalizeMoeda(value: string): string {
  const moeda = value.trim().toLowerCase();
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

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/jpg", "image/png"]);

export async function POST(request: Request) {
  try {
    const jar = await cookies();
    const session = jar.get(DASHBOARD_SESSION_COOKIE)?.value;
    if (!verifyDashboardSessionToken(session)) {
      return NextResponse.json(
        { error: "Não autorizado. Faça login no painel." },
        { status: 401 },
      );
    }

    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        {
          error:
            "Envie o formulário com arquivo (multipart). Recarregue a página e tente novamente.",
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
    const preco = getStr("preco");
    const contextoDoPreco = getStr("contexto_do_preco");
    const observacaoTaxa = getStr("taxas");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Imagem obrigatória: selecione um arquivo." },
        { status: 400 },
      );
    }
    if (file.size === 0) {
      return NextResponse.json(
        { error: "Selecione um arquivo de imagem válido." },
        { status: 400 },
      );
    }
    if (file.size > MAX_IMAGE_BYTES) {
      return NextResponse.json(
        { error: "Imagem muito grande. Tamanho máximo: 5 MB." },
        { status: 400 },
      );
    }
    const mime = file.type || "";
    if (!ALLOWED_IMAGE_TYPES.has(mime)) {
      return NextResponse.json(
        {
          error: "Formato não aceito. Use apenas JPG, JPEG ou PNG.",
        },
        { status: 400 },
      );
    }

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
    const authHeader = getAuthHeader();

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

    const uploadForm = new FormData();
    uploadForm.append("file", file, file.name);

    const mediaRes = await fetch(`${wpUrl}/wp-json/wp/v2/media`, {
      method: "POST",
      headers: {
        Authorization: authHeader,
      },
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

    if (!mediaRes.ok) {
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

    if (!mediaData) {
      return NextResponse.json(
        { error: "Resposta inválida do WordPress ao criar mídia." },
        { status: 502 },
      );
    }

    const sourceUrl =
      typeof mediaData.source_url === "string" ? mediaData.source_url : "";
    if (!sourceUrl) {
      return NextResponse.json(
        { error: "WordPress não retornou URL da imagem." },
        { status: 502 },
      );
    }

    const mediaId =
      typeof mediaData.id === "number" ? mediaData.id : Number(mediaData.id);
    if (imagemAlt && Number.isFinite(mediaId)) {
      await fetch(`${wpUrl}/wp-json/wp/v2/media/${mediaId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify({ alt_text: imagemAlt }),
        cache: "no-store",
      });
    }

    // ACF Image (REST write): ID do anexo (inteiro).
    const imagemAcf =
      Number.isFinite(mediaId) && mediaId > 0 ? Math.floor(mediaId) : null;
    if (imagemAcf === null) {
      return NextResponse.json(
        { error: "ID da mídia inválido para o campo ACF de imagem." },
        { status: 502 },
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
      preco,
      contexto_do_preco: contextoDoPreco,
      incluso_no_pacote: inclusoNoPacote,
      taxas: observacaoTaxa,
    };

    const wpRes = await fetch(`${wpUrl}/wp-json/wp/v2/btg_pactual`, {
      method: "POST",
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
          error: `Falha ao criar post no WordPress (${wpRes.status}): ${wpMessage}`,
          details: wpData,
        },
        { status: wpRes.status },
      );
    }

    const postIdRaw = wpData?.id;
    const postId =
      typeof postIdRaw === "number"
        ? postIdRaw
        : typeof postIdRaw === "string"
          ? Number(postIdRaw)
          : NaN;

    // Muitos sites ignoram `acf` no POST inicial; um PUT com o mesmo payload costuma persistir no admin.
    if (Number.isFinite(postId) && postId > 0) {
      const putRes = await fetch(
        `${wpUrl}/wp-json/wp/v2/btg_pactual/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
          body: JSON.stringify({ acf: acfPayload }),
          cache: "no-store",
        },
      );

      const putText = await putRes.text();
      let putData: Record<string, unknown> | null = null;
      try {
        putData = putText
          ? (JSON.parse(putText) as Record<string, unknown>)
          : null;
      } catch {
        putData = null;
      }

      if (!putRes.ok) {
        const putMessage =
          (typeof putData?.message === "string" && putData.message) ||
          putRes.statusText;
        return NextResponse.json(
          {
            error: `Post criado (id ${postId}), mas falhou ao gravar os campos ACF (${putRes.status}): ${putMessage}`,
            details: putData,
            postId,
          },
          { status: 502 },
        );
      }
    }

    return NextResponse.json(wpData ?? { ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erro inesperado ao criar oferta." },
      { status: 500 },
    );
  }
}
