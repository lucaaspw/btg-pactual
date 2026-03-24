import {
  FeriadosSection,
  type FeriadosSectionProps,
} from "@/components/feriados/FeriadosSection";

const DEFAULT_INTRO_DESCRIPTION =
  "Muito mais do que um cartão: praticidade, economia e experiências exclusivas no seu dia a dia e em suas viagens.";

export type UltrablueFeriadosSectionProps = Omit<
  FeriadosSectionProps,
  "brand" | "homeHref" | "ofertaDetailBasePath" | "tipoCartaoNome"
> &
  Partial<
    Pick<
      FeriadosSectionProps,
      "homeHref" | "ofertaDetailBasePath" | "tipoCartaoNome"
    >
  >;

/** Página de feriados da LP Ultrablue — rotas e estilo definidos aqui. */
export function UltrablueFeriadosSection({
  homeHref = "/ultrablue",
  ofertaDetailBasePath = "/ultrablue/oferta",
  tipoCartaoNome = "Ultrablue",
  introDescription = DEFAULT_INTRO_DESCRIPTION,
  ...rest
}: UltrablueFeriadosSectionProps) {
  return (
    <FeriadosSection
      {...rest}
      brand="ultrablue"
      homeHref={homeHref}
      ofertaDetailBasePath={ofertaDetailBasePath}
      tipoCartaoNome={tipoCartaoNome}
      introDescription={introDescription}
    />
  );
}
