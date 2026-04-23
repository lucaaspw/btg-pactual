import { isTipoCartao } from "@/constants/cartoes";
import type { ParcelamentoValor } from "@/lib/parcelamento-oferta";
import { z } from "zod";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
/** JPG/JPEG e PNG apenas (`.jpg` e `.jpeg` usam o MIME `image/jpeg`). */
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png"]);

const tipoOfertaValues = ["Feriado", "Roteiro", "Cruzeiro"] as const;

const parcelamentoValues = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
] as const satisfies readonly ParcelamentoValor[];

export const novaOfertaSchema = z.object({
  tipo_cartao: z
    .string()
    .refine((v) => isTipoCartao(v), {
      message: "Este campo é obrigatório. Selecione o tipo de cartão.",
    }),
  tipo_oferta: z
    .string()
    .refine((v) => (tipoOfertaValues as readonly string[]).includes(v), {
      message: "Este campo é obrigatório. Selecione o tipo de oferta.",
    }),
  destino_rota: z.string().trim().min(1, "Informe o destino ou rota."),
  nome_da_oferta: z.string().trim().min(1, "Informe o nome da oferta."),
  descricao: z.string().trim().min(1, "Informe a descrição curta."),
  nacional_internacional: z.union([
    z.literal(""),
    z.literal("Nacional"),
    z.literal("Internacional"),
  ]),
  estado_pais: z.string(),
  nome_feriado: z.string(),
  imagem: z
    .custom<File | undefined>(
      (v) => v === undefined || v instanceof File,
      "Selecione uma imagem principal (arquivo).",
    )
    .superRefine((file, ctx) => {
      if (!(file instanceof File)) {
        ctx.addIssue({
          code: "custom",
          message: "Selecione uma imagem principal (arquivo).",
        });
        return;
      }
      if (file.size === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Selecione uma imagem principal (arquivo).",
        });
        return;
      }
      if (file.size > MAX_IMAGE_BYTES) {
        ctx.addIssue({
          code: "custom",
          message: "Imagem muito grande. Tamanho máximo: 5 MB.",
        });
        return;
      }
      if (!ALLOWED_IMAGE_TYPES.has(file.type || "")) {
        ctx.addIssue({
          code: "custom",
          message:
            "Formato não aceito. Use apenas JPG, JPEG ou PNG.",
        });
      }
    })
    .transform((v): File => v as File),
  texto_alternativo_alt: z
    .string()
    .trim()
    .min(1, "Informe o texto alternativo da imagem."),
  data_de_inicio: z.string(),
  data_final: z.string(),
  moeda: z.enum(["R$", "US$"]),
  parcelamento: z.enum(parcelamentoValues),
  preco: z.string().trim().min(1, "Informe o preço."),
  contexto_do_preco: z.string(),
  taxas: z.string(),
  incluso_no_pacote: z.string(),
});

export type NovaOfertaFormInput = z.input<typeof novaOfertaSchema>;
export type NovaOfertaFormValues = z.output<typeof novaOfertaSchema>;
