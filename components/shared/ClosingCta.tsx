import { ArrowUpRight } from "lucide-react";

type ClosingCtaProps = {
  sectionClassName: string;
  titleClassName: string;
  descriptionClassName: string;
  buttonClassName: string;
  href: string;
};

export function ClosingCta({
  sectionClassName,
  titleClassName,
  descriptionClassName,
  buttonClassName,
  href,
}: ClosingCtaProps) {
  return (
    <section id="contato" className={sectionClassName}>
      <div className="mx-auto">
        <h2 className={titleClassName}>Quer saber mais?</h2>
        <p className={descriptionClassName}>
          Nossa equipe esta a disposicao para tirar duvidas e personalizar sua
          viagem do jeito que precisar.
        </p>
        <a href={href} className={buttonClassName}>
          Quero falar com meu concierge
          <ArrowUpRight
            className="h-5 w-5 shrink-0"
            strokeWidth={2}
            aria-hidden
          />
        </a>
      </div>
    </section>
  );
}
