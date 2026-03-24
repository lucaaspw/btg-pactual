import {
  FeriadosSection,
  type FeriadosSectionProps,
} from "@/components/feriados/FeriadosSection";

export type PartnersFeriadosSectionProps = Omit<
  FeriadosSectionProps,
  "brand" | "homeHref" | "ofertaDetailBasePath" | "tipoCartaoNome"
> &
  Partial<
    Pick<
      FeriadosSectionProps,
      "homeHref" | "ofertaDetailBasePath" | "tipoCartaoNome"
    >
  >;

/** Página de feriados da LP Partners — rotas e estilo definidos aqui. */
export function PartnersFeriadosSection({
  homeHref = "/partners",
  ofertaDetailBasePath = "/partners/oferta",
  tipoCartaoNome = "Partners",
  ...rest
}: PartnersFeriadosSectionProps) {
  return (
    <FeriadosSection
      {...rest}
      brand="partners"
      homeHref={homeHref}
      ofertaDetailBasePath={ofertaDetailBasePath}
      tipoCartaoNome={tipoCartaoNome}
    />
  );
}
