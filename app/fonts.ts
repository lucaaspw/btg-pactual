import localFont from "next/font/local";

/** Moderat — família principal BTG (arquivos em `/fonts` na raiz do projeto). */
export const moderatSans = localFont({
  src: [
    { path: "../fonts/Moderat-Thin.otf", weight: "100", style: "normal" },
    { path: "../fonts/Moderat-Light.otf", weight: "300", style: "normal" },
    { path: "../fonts/Moderat-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/Moderat-Medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/Moderat-Bold.otf", weight: "700", style: "normal" },
    { path: "../fonts/Moderat-Black.otf", weight: "900", style: "normal" },
    { path: "../fonts/Moderat-Regular-Italic.otf", weight: "400", style: "italic" },
  ],
  variable: "--font-moderat",
  display: "swap",
});

export const moderatMono = localFont({
  src: [
    { path: "../fonts/Moderat-Mono-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/Moderat-Mono-Medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/Moderat-Mono-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-moderat-mono",
  display: "swap",
});
