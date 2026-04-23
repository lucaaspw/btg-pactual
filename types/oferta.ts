import type { TipoCartao } from "@/constants/cartoes";

export interface Oferta {
  id: number;
  /** Slug do post no WordPress (URL da página de detalhe). */
  slug: string;
  title: {
    rendered: string;
  };
  acf: {
    /** Ex.: `Partners` | `Ultrablue` — ver `constants/cartoes.ts`. */
    tipo_cartao: TipoCartao | string;
    tipo_oferta: string;
    /** Ex.: "Páscoa", "Réveillon" — agrupa ofertas na página Feriados. */
    nome_feriado?: string;
    nacional_internacional?: string;
    /** Na página Feriados: estado (ex. Bahia) se Nacional; país (ex. Chile) se Internacional. */
    estado_pais?: string;
    destino_rota: string;
    nome_da_oferta: string;
    descricao: string;
    imagem?:
      | {
          url?: string;
          sizes?: {
            medium_large?: string;
            large?: string;
            full?: string;
          };
        }
      | number
      | string;
    data_de_inicio: string;
    data_final: string;
    moeda: string;
    /** Parcelas na vitrine (1–10); ex.: "3" → prefixo "3x de ". */
    parcelamento?: string | number;
    preco: string;
    contexto_do_preco: string;
    /** Ex.: "taxas inclusas" — aparece junto ao valor. */
    taxas?: string;
    /** Texto longo opcional (ACF); se vazio, usa `descricao` na página de detalhe. */
    acomodacao?: string;
    /** Texto longo opcional (ACF); linhas ou bullets para "Inclui no pacote". */
    inclui_no_pacote?: string;
    /** Campo novo no payload da API; mantido em paralelo por compatibilidade. */
    incluso_no_pacote?: string;
  };
}
