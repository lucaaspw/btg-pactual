import type { Metadata } from "next";
import { moderatMono, moderatSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "BTG Pactual",
  description: "Ofertas para Partners e Ultrablue",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/btg.ico", type: "image/x-icon" },
    ],
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${moderatSans.variable} ${moderatMono.variable} h-full antialiased`}
    >
      <body className={`${moderatSans.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
