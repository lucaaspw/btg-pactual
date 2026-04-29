import type { ConciergeBrand } from "@/constants/concierge";

export type LandingHeaderBrandId = ConciergeBrand;

export type LandingHeaderNavItem = {
  label: string;
  href: string;
};

export type LandingHeaderBrandConfig = {
  homeHref: string;
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className: string;
  };
  nav: readonly LandingHeaderNavItem[];
  conciergeBrand: ConciergeBrand;
  headerWhenSolid: string;
  headerWhenTransparent: string;
  menuToggleHoverClass: string;
  desktopNavLinkClass: string;
  menuIconClass: string;
  overlayClass: string;
  mobilePanelClass: string;
};

/** Tokens visuais e rotas do header fixo por landing (Partners vs Ultrablue). */
export const LANDING_HEADER_BRANDS = {
  partners: {
    homeHref: "/partners",
    logo: {
      src: "/partners_image/btgpactual_logo.png",
      alt: "BTG Pactual",
      width: 110,
      height: 40,
      className: "w-auto h-14",
    },
    nav: [
      { label: "Feriados", href: "/partners/feriados" },
      { label: "Roteiros", href: "/partners/roteiros" },
      { label: "Cruzeiros", href: "/partners/cruzeiros" },
      { label: "Concierge Partners", href: "/partners/concierge" },
      { label: "Benefícios", href: "/partners/beneficios" },
    ],
    conciergeBrand: "partners",
    headerWhenSolid:
      "border-b border-white/10 bg-btg-navy shadow-[0_1px_0_rgba(0,0,0,0.2)]",
    headerWhenTransparent: "border-b border-transparent bg-transparent",
    menuToggleHoverClass: "hover:text-[#b8d4ff]",
    desktopNavLinkClass:
      "drop-shadow-sm text-sm lg:text-xl transition hover:text-[#b8d4ff]",
    menuIconClass: "h-8 w-10",
    overlayClass: "bg-btg-navy-deep/45",
    mobilePanelClass: "bg-[#1c4a99]",
  },
  ultrablue: {
    homeHref: "/ultrablue",
    logo: {
      src: "/partners_image/btgpactual_logo.png",
      alt: "BTG Pactual",
      width: 160,
      height: 40,
      className: "h-14 w-auto",
    },
    nav: [
      { label: "Feriados", href: "/ultrablue/feriados" },
      { label: "Roteiros", href: "/ultrablue/roteiros" },
      { label: "Cruzeiros", href: "/ultrablue/cruzeiros" },
      { label: "Concierge Ultrablue", href: "/ultrablue/concierge" },
      { label: "Benefícios", href: "/ultrablue/beneficios" },
    ],
    conciergeBrand: "ultrablue",
    headerWhenSolid:
      "border-b border-white/20 bg-[#0056B8] shadow-[0_1px_0_rgba(0,0,0,0.2)]",
    headerWhenTransparent: "border-b border-transparent bg-[#10408D]",
    menuToggleHoverClass: "hover:text-[#D6EAFF]",
    desktopNavLinkClass: "text-sm transition hover:text-[#D6EAFF] lg:text-xl",
    menuIconClass: "h-6 w-6",
    overlayClass: "bg-[#05132A]/45",
    mobilePanelClass: "bg-[#0A3C79]",
  },
} as const satisfies Record<LandingHeaderBrandId, LandingHeaderBrandConfig>;
