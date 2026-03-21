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
    destino_rota: string;
    nome_da_oferta: string;
    descricao: string;
    imagem: {
      url: string;
      sizes?: {
        medium_large?: string;
        large?: string;
        full?: string;
      };
    };
    data_de_inicio: string;
    data_final: string;
    moeda: string;
    preco: string;
    contexto_do_preco: string;
    /** Ex.: "taxas inclusas" — aparece junto ao valor. */
    taxas?: string;
    /** Texto longo opcional (ACF); se vazio, usa `descricao` na página de detalhe. */
    acomodacao?: string;
    /** Texto longo opcional (ACF); linhas ou bullets para "Inclui no pacote". */
    inclui_no_pacote?: string;
  };
}
